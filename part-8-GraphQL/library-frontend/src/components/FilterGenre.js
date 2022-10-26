import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const extractGenres = (books) => {
  if (!books) return
  const duplicateGenres = books.map(b => b.genres).flat()
  const uniqueGenres = []
  duplicateGenres.forEach(genre => {
    if (!uniqueGenres.includes(genre))
      uniqueGenres.push(genre)
  })
  return uniqueGenres
}

const FilterGenre = ({ setGenre }) => {
  const { loading, data } = useQuery(ALL_BOOKS)

  if (loading) return <p>loading...</p>
  const genres = data.allBooks ? extractGenres(data.allBooks) : []
  return (
    <>
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => setGenre(genre)}
        >{genre}</button>))}
      <button
        onClick={() => setGenre(null)}
      >all genres</button>
    </>)
}

export default FilterGenre