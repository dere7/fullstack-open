import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogsService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const newBlogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogs = await blogsService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })()
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
      const newBlog = await blogsService.createBlog(blog)
      setBlogs([...blogs, newBlog])
      setMsg('successfully added new blog')
      newBlogFormRef.current.toggleVisible()
    } catch (error) {
      setError('unable to add new note:' + error.response.data.error)
    }
  }

  const handleUpdateBlog = (updatedBlog) => {
    const newBlogs = blogs.map((blog) => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog
      }
      return blog
    })
    setBlogs(newBlogs)
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

  const handleBlogDelete = async (blog) => {
    if (!window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      return
    }
    const id = blog.id
    try {
      await blogsService.deleteBlog(blog.id)
      const newBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(newBlogs)
    } catch (error) {
      if (error.response) setError(error.response.data.error)
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
        {user.name || user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="New blog" ref={newBlogFormRef}>
        <NewBlogForm onSubmit={handleAddBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} deleteBlog={handleBlogDelete} updateBlog={handleUpdateBlog} />
      ))}
    </div>
  )
}

export default App
