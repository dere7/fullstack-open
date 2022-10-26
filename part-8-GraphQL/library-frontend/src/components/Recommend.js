import { useQuery } from '@apollo/client'
import React from 'react'
import { ME } from '../queries'
import DisplayBooks from './DisplayBooks'

const Recommend = () => {
  const { loading, data } = useQuery(ME)

  if (loading) return <p>loading...</p>
  const genre = data.me.favouriteGenre
  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre <b>{genre}</b></p>
      <DisplayBooks genre={genre} />
    </div>
  )
}

export default Recommend