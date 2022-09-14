require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 2) {
  console.log('Usage: node mongo.js')
  process.exit(1)
}

const password = process.env.PASSWORD
const url = process.env.MONGODB_URI

const Person = mongoose.model('Person', new mongoose.Schema({
  name: String,
  number: String
}))

mongoose.connect(url)
  .catch(err => console.log('Unable to connect to Mongodb:', err))

if (process.argv.length == 2) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(({ name, number }) => {
      console.log(name, number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length >= 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  })
  person.save().then(res => {
    console.log('Successfully created!')
    mongoose.connection.close()
  })
}

if (process.argv.length == 3) {
  console.log('Usage: node mongo.js <name> <number>')
  process.exit(1)
}
