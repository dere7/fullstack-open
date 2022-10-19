import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setError, setMsg } from './notificationReducer'

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const index = state.findIndex(blog => blog.id === action.payload.id)
      state[index] = action.payload
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

const { addBlog, deleteBlog, setBlogs, updateBlog } = blogsReducer.actions

export const initializeBlog = () => async dispatch => {
  const blogs = await blogsService.getAll()
  dispatch(setBlogs(blogs))
}

export const newBlog = blog => async dispatch => {
  try {
    const createdBlog = await blogsService.createBlog(blog)
    dispatch(addBlog(createdBlog))
    dispatch(setMsg('successfully added new blog'))
  } catch (error) {
    dispatch(setError('unable to add new blog:' + error.response.data.error))
  }
}

export const removeBlog = id => async dispatch => {
  try {
    await blogsService.deleteBlog(id)
    dispatch(deleteBlog(id))
  } catch (error) {
    dispatch(setError('can\'t delete a blog: ' + error.response.data.error))
  }
}

export const likeBlog = id => async dispatch => {
  const newBlog = await blogsService.likeBlog(id)
  dispatch(updateBlog(newBlog))
}

export const commentBlog = (comment, id) => async dispatch => {
  const newBlog = await blogsService.commentBlog(comment, id)
  dispatch(updateBlog(newBlog))
}

export default blogsReducer.reducer
