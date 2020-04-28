import React from 'react'

const DisplayEntry = ({ person, deleteEntry}) => {
  const handler = (event) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      deleteEntry(person)
    }
  }

  return (
    <div> 
      {person.name} {person.number}
      <button onClick={handler}> delete </button>
    </div>
  )
}

const Persons = ({ persons, filterStr, deleteEntry }) => {
  if (filterStr !== '') {
    var filteredPersons = persons.filter(p =>
      p.name.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase())
    )
  } else {
    filteredPersons = persons
  }

  return (
    <div>
      {filteredPersons.map(p => <DisplayEntry key={p.name} person={p} deleteEntry={deleteEntry} />)}
    </div>
  )
}

export default Persons