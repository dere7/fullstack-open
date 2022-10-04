import React, { useEffect } from 'react'
import './Notification.css'

const Notification = ({ msg, error, hide }) => {
  useEffect(() => {
    setTimeout(() => {
      hide()
    }, 3000)
  })
  return <div className={error ? 'error' : 'success'}>{msg}</div>
}

export default Notification
