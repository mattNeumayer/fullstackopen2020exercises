import React, { useState } from 'react'

const DisplayEntry = ({ person }) => (
    <div key={person.name}> {person.name} {person.number} </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name == newName)) {
        alert(`${newName} is already added to phonebook`)
        return
    }

    const newPerson = {name: newName, number: newNumber}
    setPersons(persons.concat(newPerson))
  }

  const handleChangeNewName   = (event) => setNewName(event.target.value)
  const handleChangeNewNumber = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>name: <input onChange={handleChangeNewName} /></div>
        <div>number: <input  onChange={handleChangeNewNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      {persons.map(p => <DisplayEntry person={p} /> )}

    </div>
  )
}

export default App