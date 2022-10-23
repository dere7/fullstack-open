const mongoose = require('mongoose')
const Book = require('./book')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  born: {
    type: Number,
  }
}, {
  virtuals: {
    bookCount: {
      async get() {
        const books = await Book.find({ author: this._id }).count()
        return books
      }
    }
  }
})

const Author = mongoose.model('Author', schema)

module.exports = Author
