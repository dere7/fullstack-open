import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import { Box, Button, Input, Title } from '../styles/styles'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('username')
  const { reset: resetPassword, ...password } = useField('password', 'password')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login({
      username: username.value,
      password: password.value
    }))
    resetUsername('')
    resetPassword('')
  }

  return (
    <Box>
      <Title center>Log in</Title>
      <form onSubmit={handleSubmit}>
        <Input block id="username" {...username} />
        <Input block id="password" {...password} />
        <Button primary type="submit">Login</Button>
      </form >
    </Box>
  )
}

export default LoginForm
