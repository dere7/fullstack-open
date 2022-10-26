import { useState } from 'react'
import DisplayBooks from './DisplayBooks'
import FilterGenre from './FilterGenre'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre || 'all genres'}</b></p>
      <DisplayBooks genre={genre} />
      <FilterGenre setGenre={setGenre} />
    </div>
  )
}

export default Books
