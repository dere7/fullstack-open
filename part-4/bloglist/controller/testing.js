const testingRouter = require('express').Router()
const User = require('../model/user')
const Blog = require('../model/blog')

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = testingRouter
