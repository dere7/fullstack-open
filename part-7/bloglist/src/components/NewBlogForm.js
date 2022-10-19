import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { newBlog } from '../reducers/blogsReducer'
import { Button, Input, Title } from '../styles/styles'

const NewBlogForm = ({ toggleVisible }) => {
  const { reset: resetTitle, ...title } = useField('title')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetUrl, ...url } = useField('url')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(newBlog(blog))
    toggleVisible()
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div className="new-blog">
      <Title>Create new</Title>
      <form onSubmit={handleSubmit}>
        <Input block id="title" {...title} />
        <Input block id="author" {...author} />
        <Input block id="url" {...url} />
        <Button small primary type="submit" id="create-btn">create</Button>
      </form>
    </div>
  )
}

export default NewBlogForm
