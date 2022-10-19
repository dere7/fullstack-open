import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import loginService from '../services/login'
import { setError, setMsg } from './notificationReducer'

const loginReducer = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

const { setUser } = loginReducer.actions

export const initializeUser = () => dispatch => {
  const userData = localStorage.getItem('user')
  if (userData) {
    const user = JSON.parse(userData)
    dispatch(setUser(user))
    blogsService.setToken(user.token)
  }
}

export const login = credentials => async dispatch => {
  try {
    const user = await loginService.login(credentials)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch(setUser(user))
    dispatch(setMsg('Successfully Logged in'))
  } catch (e) {
    dispatch(setError('Invalid credentials'))
  }
}

export const logout = () => async dispatch => {
  blogsService.setToken(null)
  localStorage.removeItem('user')
  dispatch(setUser(null))
}

export default loginReducer.reducer
