import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const DisplayBooks = ({ genre }) => {
  const { loading, data } = useQuery(ALL_BOOKS, { variables: { genre } })
  if (loading) return <p>loading...</p>
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {data.allBooks.map((a) => (
          <tr key={a.id}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DisplayBooks