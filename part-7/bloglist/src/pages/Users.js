import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Title } from '../styles/styles'

const Users = ({ users }) => {

  return (
    <div>
      <Title>Users</Title>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} >
                  {user.name || user.username}
                </ Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  )
}

export default Users