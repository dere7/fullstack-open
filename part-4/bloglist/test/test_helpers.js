const Blog = require('../model/blog')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const bloglist = [
  {
    title: 'HTML is easy!',
    author: 'John Doe',
    url: 'https://some.site/xyz'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const deletedPost = async () => {
  const newBlog = new Blog({
    title: 'something to delete',
    author: 'Someone',
    url: 'somewhere'
  })
  await newBlog.save()
  await newBlog.delete()
  return newBlog.id
}

module.exports = { bloglist, blogsInDb, deletedPost, api }
