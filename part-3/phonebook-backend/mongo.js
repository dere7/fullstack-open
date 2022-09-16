require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack-dev:${password}@cluster0.jehqh.mongodb.net/phonebook?retryWrites=true&w=majority`

const Person = mongoose.model('Person', new mongoose.Schema({
  name: String,
  number: String
}))

mongoose.connect(url).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Unable to connect to Mongodb:', err))

if (process.argv.length == 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(({ name, number }) => {
      console.log(name, number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length >= 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log('Successfully created!')
    mongoose.connection.close()
  })
}

if (process.argv.length == 4) {
  console.log('Usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}
