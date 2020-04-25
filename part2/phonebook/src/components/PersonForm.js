import React from 'react'

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addEntry }) => {

  const handleChangeNewName = (event) => setNewName(event.target.value)
  const handleChangeNewNumber = (event) => setNewNumber(event.target.value)

  return (
    <form onSubmit={addEntry}>
      <div>name: <input onChange={handleChangeNewName} value={newName} /></div>
      <div>number: <input onChange={handleChangeNewNumber} value={newNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm