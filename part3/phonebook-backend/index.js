const express = require('express')
const personsFile = require('./db.json')
const persons = personsFile.persons

const app = express()

app.get('/info', (req, res) => {
  const numEntries = persons.length
  console.log(persons)
  let text = `<div> Phonebook has info for ${numEntries} people </div>`
  text += `<div> ${new Date()}`
  res.send(text)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.sendStatus(404)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.find(p => p.id !== id)
  response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})