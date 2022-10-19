import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { setError } from './notificationReducer'

const userReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

const { setUsers } = userReducer.actions

export const initializeUsers = () => async dispatch => {
  try {
    const users = await usersService.getAll()
    console.log(users)
    dispatch(setUsers(users))
  } catch (e) {
    setError(e.message())
  }
}

export default userReducer.reducer
