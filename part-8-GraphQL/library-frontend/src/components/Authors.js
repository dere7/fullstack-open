import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthForm from './BirthForm'

const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }


  if (loading) return <p>loading...</p>

  console.log(data)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.isLoggedIn &&
        <BirthForm authors={data.allAuthors.map(a => a.name)} />
      }
    </div>
  )
}

export default Authors
