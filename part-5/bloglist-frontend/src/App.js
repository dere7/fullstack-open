import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogsService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleAddBlog = async (blog) => {
    try {
      await blogsService.createBlog(blog)
      setBlogs([...blogs, blog])
      setMsg('successfully added new blog')
    } catch (error) {
      setError('unable to add new note:' + error.response.data.error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogsService.setToken(null)
    localStorage.removeItem('user')
  }

  const handleLogin = async (credential) => {
    try {
      const user = await loginService.login(credential)
      setUser(user)
      blogsService.setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
      setMsg('successfully logged in')
    } catch (error) {
        setError('invalid credetials')
    }
  }

  if (!user) {
    return (
      <>
        {error && (
          <Notification
            error
            msg={error}
            hide={() => {
              setError('')
            }}
          />
        )}
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <div>
      {error && (
        <Notification
          error
          msg={error}
          hide={() => {
            setError('')
          }}
        />
      )}
      {msg && (
        <Notification
          msg={msg}
          hide={() => {
            setMsg('')
          }}
        />
      )}
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <NewBlogForm onSubmit={handleAddBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
