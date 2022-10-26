import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
      setPage('authors')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const submit = event => {
    event.preventDefault()
    login({ variables: { username, password } })
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={event => setUsername(event.target.value)} />
        </div>
        <div>
          password <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm