import React, { useState } from 'react'
import Filter from  './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilter] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h3>Phonebook</h3>

      <Filter setFilter={setFilter} />

      <h3>Add entry</h3>

      <PersonForm setNewName={setNewName} setNewNumber={setNewNumber} addEntry={addEntry} />

      <h3>Numbers</h3>

      <Persons persons={persons} filterStr={filterStr}/>

    </div>
  )
}

export default App