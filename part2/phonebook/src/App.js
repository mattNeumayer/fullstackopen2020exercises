import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from  './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

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

  // Populate on inital page load
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        const num = response.data.length
        console.log(`Loaded ${num} person(s)`)
        setPersons(response.data)
      })
  }, [])

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