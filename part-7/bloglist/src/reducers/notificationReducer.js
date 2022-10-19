import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notificationReducer',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

const { setNotification } = notificationReducer.actions
let id = null

export const removeNotification = () => dispatch => {
  dispatch(setNotification(null))
}

export const addNotification = (msg, isError = true, timeout = 5) => dispatch => {
  dispatch(setNotification({ msg, isError }))
  clearTimeout(id)
  id = setTimeout(() => {
    dispatch(removeNotification())
  }, timeout * 1000)
}

export const setError = (msg) => dispatch => {
  dispatch(addNotification(msg))
}
export const setMsg = (msg) => dispatch => {
  dispatch(addNotification(msg, false))
}

export default notificationReducer.reducer
