import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createBlog = async (data) => {
  const config = {
    headers: {
      authorization: token,
    },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const likeBlog = async (id) => {
  const config = {
    headers: {
      authorization: token,
    },
  }
  const response = await axios.put(`${baseUrl}/${id}/like`, {}, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      authorization: token,
    },
  }
  console.log(config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const commentBlog = async (comment, id) => {
  const config = {
    headers: {
      authorization: token,
    },
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

const blogsService = { getAll, get, createBlog, setToken, likeBlog, deleteBlog, commentBlog }
export default blogsService
