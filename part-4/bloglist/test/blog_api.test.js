const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const { bloglist, blogsInDb, deletedPost } = require('./test_helpers')

const api = supertest(app)
const blog = {
  title: 'Getting started with Node.js',
  author: 'Steve Cubbs',
  url: 'https://blog.stevecubbs.com/xyz'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(bloglist)
})

describe('api returns data in correct format and data', () => {
  test('returns json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns one post', async () => {
    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(bloglist.length)
    expect(blogs[0].title).toBe(bloglist[0].title)
  })
})

describe('api creates post', () => {
  test('api creates new post', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(bloglist.length + 1)
    expect(blogs.map(post => post.title)).toContain(
      blog.title
    )
  })

  test('api returns 400 if title or url missing', async () => {
    const blog = {
      title: 'Getting started with Node.js',
      author: 'Steve Cubbs',
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(bloglist.length)
  })
})

describe('api adds default list and add id attribute', () => {
  test('api adds default value for likes if not specified', async () => {
    const response = await api.post('/api/blogs').send(blog)
    expect(response.body.likes).toBe(0)
  })

  test('api returns blogs with id', async () => {
    const blogs = await blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
})

describe('api updates post', () => {
  test('updates existing post', async () => {
    const blogs = await blogsInDb()
    const blogToUpdate = blogs[0]

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ title: 'new title', likes: 23 })

    const updated = response.body
    expect(updated).toEqual({
      ...blogToUpdate,
      title: 'new title',
      likes: 23,
    })
  })

  test('updates non-existing post', async () => {
    const id = await deletedPost()

    await api
      .put(`/api/blogs/${id}`)
      .send({ title: 'new title', likes: 23 })
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
