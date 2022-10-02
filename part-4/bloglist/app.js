const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controller/blog')
const usersRouter = require('./controller/users')
const { MONGODB_URI } = require('./utils/config')
const {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
} = require('./utils/middlewares')
const loginRouter = require('./controller/login')

mongoose.connect(MONGODB_URI).then(() => console.log('Connected to db'))

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
