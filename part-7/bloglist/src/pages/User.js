import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Title } from '../styles/styles'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <Title>{user.name || user.username}</Title>
      <h3>added blogs</h3>
      <Grid>
        {user.blogs.map(({ id, title }) => (
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

export default User
