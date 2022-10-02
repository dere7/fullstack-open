const mongoose = require('mongoose')
const Blog = require('../model/blog')
const { bloglist, blogsInDb, deletedPost } = require('./test_helpers')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../model/user')

const api = supertest(app)

const blog = {
  title: 'Getting started with Node.js',
  author: 'Steve Cubbs',
  url: 'https://blog.stevecubbs.com/xyz',
}

const testUser = {
  username: 'test',
  passwordHash: bcrypt.hashSync('test', 10),
}

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const user = new User(testUser)
  await user.save()
  await Blog.insertMany(
    bloglist.map((blog) => ({ ...blog, user: user._id.toString() }))
  )
  const response = await api
    .post('/api/login')
    .send({ username: 'test', password: 'test' })
  token = 'Bearer ' + response.body.token
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
      .set({ Authorization: token })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(bloglist.length + 1)
    expect(blogs.map((post) => post.title)).toContain(blog.title)
  })

  test('api returns 400 if title or url missing', async () => {
    const blog = {
      title: 'Getting started with Node.js',
      author: 'Steve Cubbs',
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: token })
      .expect(400)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(bloglist.length)
  })
})

test('api does not create a blog if token not provided', async () => {
  await api.post('/api/blogs').send(blog).expect(401)
})

describe('api adds default list and add id attribute', () => {
  test('api adds default value for likes if not specified', async () => {
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: token })
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
      .set({ Authorization: token })

    const updated = response.body
    expect(updated.title).toBe('new title')
  })

  test('updates non-existing post', async () => {
    const id = await deletedPost()

    await api
      .put(`/api/blogs/${id}`)
      .send({ title: 'new title', likes: 23 })
      .set({ Authorization: token })
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
