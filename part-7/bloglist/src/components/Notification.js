import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import { NotificationContainer } from '../styles/styles'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const handleClose = () => {
    dispatch(removeNotification())
  }

  if (!notification) return null
  const { msg, isError } = notification
  return (
    <NotificationContainer error={isError}>
      <p>
        {msg}
      </p>
      <span onClick={handleClose}>
        ✕
      </span>

    </NotificationContainer>
  )
}

export default Notification
