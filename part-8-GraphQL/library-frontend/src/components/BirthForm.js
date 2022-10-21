import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(birthYear) } })
    setName('')
    setBirthYear('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => <option value={author}>{author}</option>)}
          </select>
        </div>
        <div>
          birthyear <input type="number" value={birthYear} onChange={({ target }) => setBirthYear(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthForm