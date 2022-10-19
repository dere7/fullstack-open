const jwt = require('jsonwebtoken')
const Blog = require('../model/blog')
const User = require('../model/user')
const logger = require('../utils/logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case 'CastError':
      return res.status(400).json({ error: 'malformatted id' })
    case 'ValidationError':
      return res.status(400).json({ error: error.message })
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' })
    case 'TokenExpiredError':
      return res.status(401).json({
        eror: 'token expired',
      })
  }
  logger.error(error)
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  req.user = await User.findById(decodedToken.id)
  next()
}

const blogExtracter = async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user', {
    username: 1,
    name: 1,
  })

  if (!blog) {
    return response.status(404).end()
  }
  request.blog = blog
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  blogExtracter
}
