import React from 'react'

const PersonForm = ({ setNewName, setNewNumber, addEntry }) => {

  const handleChangeNewName = (event) => setNewName(event.target.value)
  const handleChangeNewNumber = (event) => setNewNumber(event.target.value)

  return (
    <form onSubmit={addEntry}>
      <div>name: <input onChange={handleChangeNewName} /></div>
      <div>number: <input onChange={handleChangeNewNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm