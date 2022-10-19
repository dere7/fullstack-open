import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: userReducer,
    login: loginReducer,
    notification: notificationReducer
  }
})

export default store
