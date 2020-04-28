import React, { useState, useEffect } from 'react'

import Filter from  './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const addEntry = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .createPerson(newPerson)
      .then(respPerson => {
        setPersons(persons.concat(respPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${respPerson.name}`)
      })
  }

  const deleteEntry = (person) => {
    personService
    .deletePerson(person)
    .then(success => {
      if (success) {
        console.log('Successfully deleted entry!')
        setPersons(persons.filter(otherP => otherP.id !== person.id))
      } else {
        console.log('Failed to delete entry!')
      }
    })
  }

  // Populate on inital page load
  useEffect(() => {
    personService
      .getAllPersons()
      .then(initalPersons => {
        const num = initalPersons.length
        console.log(`Loaded ${num} person(s).`)
        setPersons(initalPersons)
      })
  }, [])

  return (
    <div>
      <Notification message={notification} />
      <h3>Phonebook</h3>

      <Filter setFilter={setFilter} />

      <h3>Add entry</h3>

      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addEntry={addEntry} />

      <h3>Numbers</h3>

      <Persons persons={persons} filterStr={filterStr} deleteEntry={deleteEntry} />

    </div>
  )
}

export default App