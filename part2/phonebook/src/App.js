import React, { useState } from 'react'

const DisplayEntry = ({ person }) => (
  <div> {person.name} {person.number} </div>
)

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

  const handleChangeNewName = (event) => setNewName(event.target.value)
  const handleChangeNewNumber = (event) => setNewNumber(event.target.value)
  const handleChangeFilter = (event) => setFilter(event.target.value)

  if (filterStr !== '') {
    var filteredPersons = persons.filter(p =>
      p.name.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase())
    )
  } else {
    var filteredPersons = persons
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>filter shown with <input onChange={handleChangeFilter} /></div>

      <h2>Add entry</h2>
      <form onSubmit={addEntry}>
        <div>name: <input onChange={handleChangeNewName} /></div>
        <div>number: <input onChange={handleChangeNewNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      {filteredPersons.map(p => <DisplayEntry key={p.name} person={p} />)}

    </div>
  )
}

export default App