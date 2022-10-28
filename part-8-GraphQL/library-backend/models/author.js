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
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

const Author = mongoose.model('Author', schema)

module.exports = Author
