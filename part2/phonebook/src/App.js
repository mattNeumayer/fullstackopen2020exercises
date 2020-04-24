import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name == newName)) {
        alert(`${newName} is already added to phonebook`)
        return
    }

    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(p => <div key={p.name}> {p.name} </div>)}

    </div>
  )
}

export default App