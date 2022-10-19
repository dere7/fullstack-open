import { useState } from 'react'

export const useField = (name, type = 'text') => {
  const [value, setValue] = useState('')
  const onChange = event => setValue(event.target.value)
  const reset = () => setValue('')

  return { value, onChange, reset, type, name, placeholder: name }
}