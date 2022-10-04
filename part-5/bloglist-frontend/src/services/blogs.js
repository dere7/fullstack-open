import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
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

export default { getAll, createBlog, setToken }
