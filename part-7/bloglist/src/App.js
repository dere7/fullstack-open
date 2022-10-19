import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Blog from './pages/Blog'
import Home from './pages/Home'
import User from './pages/User'
import Users from './pages/Users'
import { initializeBlog } from './reducers/blogsReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { Container, Main } from './styles/styles'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const user = match ? users.find(user => user.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])

  let content

  if (!loggedInUser) {
    content = (
      <div className='centered'>
        <LoginForm />
      </div>
    )
  } else {
    content = (
      <>
        <Menu />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </Main>
      </>
    )
  }

  return (
    <Container transparent={!loggedInUser}>
      <Notification />
      {content}
      <Footer />
    </Container>
  )
}

export default App
