const { AuthenticationError, UserInputError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'super-secret'

const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: (root) => root.books.length
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author)
          filter.author = author._id
      }
      if (args.genre) filter.genres = { $in: args.genre }
      return await Book.find(filter).populate('author')
    },
    allAuthors: async (root) => Author.find({}),
    me: (root, args, { currentUser }) => currentUser
  },
  Mutation: {
    async addBook(root, args, { currentUser }) {
      if (!currentUser) {
        throw new AuthenticationError('unauthorized')
      }
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author })
        author.books.push(book._id)
        await book.save()
        await book.populate('author')
        await author.save()
        pubsub.publish('ADDED_BOOK', { bookAdded: book })
        return book
      } catch (error) {
        console.log(error.message)
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    async editAuthor(root, { name, setBornTo }, { currentUser }) {
      if (!currentUser) {
        throw new AuthenticationError('unauthorized')
      }
      const author = await Author.findOne({ name })
      if (!author)
        throw new UserInputError(`Author '${name}' not found`)
      author.born = setBornTo
      return author.save()
    },
    async createUser(root, args) {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return user
    },
    async login(root, { username, password }) {
      const user = await User.findOne({ username })
      if (!user || password !== 'secret') {
        throw new AuthenticationError('invalid username or password')
      }
      const userForToken = { id: user._id, username }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('ADDED_BOOK')
    }
  }
}

module.exports = resolvers