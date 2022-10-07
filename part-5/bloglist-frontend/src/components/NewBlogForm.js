import React, { useState } from 'react'

const NewBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="new-blog">
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" id="create-btn">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
