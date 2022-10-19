import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../styles/styles'

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => setVisible(!visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible,
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisible}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button small onClick={toggleVisible}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
