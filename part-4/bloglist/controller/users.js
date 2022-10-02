const usersRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

usersRouter.post('', async (req, res) => {
  const { username, name, password } = req.body
  const saltRounds = 10
  if (!password || password.length < 3)
    return res.status(400).json({error: 'password must be at least 3 character long'})
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'user already exists' })
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.get('', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.send(users)
})

module.exports = usersRouter
