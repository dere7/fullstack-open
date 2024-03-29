const loginRouter = require('express').Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }
  const userForToken = {
    username: user.username,
    id: user._id.toString(),
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 15, // expires in 15 days
  })

  res.json({ token, username, name: user.name })
})

module.exports = loginRouter
