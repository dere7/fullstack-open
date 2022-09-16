const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => {
    console.log('Unable to connect to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'name is required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'number is required'],
    validate: {
      validator: function (str) {
        return str.includes('-') ?
          /^\d{2,3}-?\d+$/.test(str) : true
      }
    }
  }
})

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
