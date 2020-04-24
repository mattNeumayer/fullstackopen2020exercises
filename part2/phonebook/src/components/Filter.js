import React from 'react'

const Filter = ({ setFilter }) => {

  const handleChangeFilter = (event) => setFilter(event.target.value)

  return (
    <div>filter shown with <input onChange={handleChangeFilter} /></div>
  )
}

export default Filter