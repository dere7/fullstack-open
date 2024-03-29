import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data: { data } }) => {
      const bookAdded = data.bookAdded
      alert(`New ${bookAdded.title} added `)
      client.cache.updateQuery({ query: ALL_BOOKS }, data => {
        if (!data) return
        return {
          allBooks: data.allBooks.concat(bookAdded)
        }
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    client.resetStore()
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} isLoggedIn={!!token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      {page === 'recommend' && <Recommend />}

      {page === 'login' && <LoginForm setToken={setToken} setPage={setPage} />}
    </div>
  )
}

export default App
