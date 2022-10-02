const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../model/user')

const api = supertest(app)

const users = [
  {
    username: 'jane',
    name: 'Jane Doe',
    passwordHash: bcrypt.hashSync('jane123', 10),
  },
  {
    username: 'john',
    name: 'John Doe',
    passwordHash: bcrypt.hashSync('john123', 10),
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(users)
})

test('create user', async () => {
  const response = await api
    .post('/api/users')
    .send({ username: 'jonnah', name: 'Jonnah Doe', password: 'jonnah123' })
  expect(response.statusCode).toBe(201)
  expect(response.body.username).toBe('jonnah')
})

test('validates username', async () => {
  await api
    .post('/api/users')
    .send({ username: 'ja', password: 'test123' })
    .expect(400)
})

test('validates password', async () => {
  await api
    .post('/api/users')
    .send({ username: 'jade', password: 'te' })
    .expect(400)
})

test('creating user with already existing username', async () => {
  await api
    .post('/api/users')
    .send({ username: 'jane', password: 'jane1234' })
    .expect(400)
})
