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

    const oldPerson = persons.find(p => p.name === newName)

    if (oldPerson) {
      // Entry already exists, ask if we should update the number
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        let newPerson = {...oldPerson, number: newNumber}
        console.log(newPerson)
        personService
          .updatePerson(newPerson)
          .then(respPerson => {
            // update the old entry in our state with respPerson
            let personsCopy = [...persons]
            const index = personsCopy.findIndex(p => p.name === respPerson.name)
            personsCopy[index] = respPerson
            setPersons(personsCopy)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      let newPerson = {number: newNumber, name: newName}
      personService
        .createPerson(newPerson)
        .then(respPerson => {
          setPersons(persons.concat(respPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${respPerson.name}`)
        })
    }
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