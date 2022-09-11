import React from 'react'

const FilterForm = ({ filter, onChange }) => {
  return (
    <div>
      filter show with{' '}
      <input value={filter} onChange={onChange} />
    </div>
  )
}

export default FilterForm