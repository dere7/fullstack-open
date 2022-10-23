const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'super-secret'
const MONGODB_URI = 'mongodb://127.0.0.1:27017/library_db'
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
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
    allAuthors: async (root) => await Author.find({}),
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
        await book.save()
        return book.populate('author')
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
