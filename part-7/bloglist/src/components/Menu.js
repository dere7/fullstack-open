import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button, Nav, NavLinkContainer } from '../styles/styles'

const Menu = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login)
  return (
    <Nav>
      <div>
        <NavLinkContainer end to="/">blogs</NavLinkContainer>
        <NavLinkContainer to="/users">users</NavLinkContainer>
      </div>
      <div>
        <b>{loggedInUser.name || loggedInUser.username}</b> logged in
        <Button onClick={() => dispatch(logout())} small>logout</Button>
      </div>
    </Nav>
  )
}

export default Menu