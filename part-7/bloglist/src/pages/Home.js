import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NewBlogForm from '../components/NewBlogForm'
import Togglable from '../components/Togglable'
import { Box, Grid } from '../styles/styles'

function Home() {
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
  console.log(blogs)
  const newBlogFormRef = useRef()

  const toggleVisible = async () => {
    newBlogFormRef.current.toggleVisible()
  }

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={newBlogFormRef}>
        <NewBlogForm toggleVisible={toggleVisible} />
      </Togglable>
      <Grid id="blogs">
        {blogs.map(({ id, title }) => (
          <Box key={id} className='blog'>
            <Link to={`/blogs/${id}`}>
              {title}
            </Link>
          </Box>
        ))}
      </Grid>
    </div>
  )
}

export default Home