const blogRouter = require('express').Router()
const Blog = require('../model/blog')
const { userExtractor } = require('../utils/middlewares')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
  if (!blog) {
    return response.status(404)
  }
  response.json(blog)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).json({ error: 'title and url are required' })
  }
  const user = request.user
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  if (blog.user.toString() !== request.user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'you cannot delete a blog that you haven\'t created' })
  }
  await blog.remove()
  response.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).end()
  }
  console.log('handler', blog.user)
  if (blog.user.toString() !== request.user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'you cannot update a blog that you haven\'t created' })
  }
  const newBlog = await Blog.findByIdAndUpdate(
    blog.id,
    request.body,
    { new: true, context: 'query' }
  ).populate('user', { name: 1, username: 1 })
  response.json(newBlog)
})

module.exports = blogRouter
