import { useState } from 'react'
import PropTypes from 'prop-types'
import './Blog.css'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  const [show, setShow] = useState(false)

  const { user, likes, author, title, url } = blog
  const toggleVisible = () => setShow(!show)

  return (
    <div className="blog">
      <b>{title}</b> by {author}
      <button onClick={toggleVisible}>{show ? 'hide' : 'view'}</button>
      {show && (
        <>
          <p>{url}</p>
          <p>
            likes {likes} <button onClick={() => handleLike(blog.id)}>like</button>
          </p>
          <p>{user.name || user.username}</p>
          <button onClick={() => deleteBlog(blog)}>Delete</button>
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog
