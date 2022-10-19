import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogsReducer'
import { BlogContainer, Button, Comment, Comments, Input, Title } from '../styles/styles'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) return null

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(event.target.comment.value, id))
  }

  const handleDelete = () => {
    dispatch(removeBlog(id))
    navigate('/')
  }

  const { title, url, likes, author, comments } = blog
  return (
    <div>
      <BlogContainer>
        <Title>{title}</Title>
        <a href={url}>{url}</a>
        <p>added by <em>{author}</em></p>
        <p>
          {likes} likes
          <Button
            small
            onClick={() => dispatch(likeBlog(blog.id))}
            id="like-btn"
          >like</Button>
          <Button
            small
            danger
            onClick={handleDelete}
            id="delete-btn"
          >delete</Button>

        </p>
      </BlogContainer>
      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <Input name="comment" type="text" />
        <Button type="submit" primary>add comment</Button>
      </form>
      <Comments>
        {comments.map((comment, idx) => (
          <Comment key={idx}>{comment}</Comment>
        ))}
      </Comments>
    </div>
  )
}

export default Blog