const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).json({ error: 'title and url are required' })
  }
  const blog = new Blog({
    title, author, url,
    likes: likes || 0
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body
  const newPost = await Blog.findByIdAndUpdate(id,
    { title, author, url, likes },
    { new: true })
  if (!newPost) {
    return response.status(404).end()
  }
  response.json(newPost)
})

module.exports = blogRouter
