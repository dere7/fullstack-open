import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload
    }
  }
})

const { addNotification } = notificationSlice.actions

export const setNotification = (msg, seconds = 5) => dispatch => {
  dispatch(addNotification(msg))
  setTimeout(() => {
    dispatch(addNotification(''))
  }, seconds * 1000)
}
export default notificationSlice.reducer