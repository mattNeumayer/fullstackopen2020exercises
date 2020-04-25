import React from 'react'

const DisplayEntry = ({ person }) => (
  <div> {person.name} {person.number} </div>
)

const Persons = ({ persons, filterStr }) => {
  if (filterStr !== '') {
    var filteredPersons = persons.filter(p =>
      p.name.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase())
    )
  } else {
    filteredPersons = persons
  }

  return (
    <div>
      {filteredPersons.map(p => <DisplayEntry key={p.name} person={p} />)}
    </div>
  )
}

export default Persons