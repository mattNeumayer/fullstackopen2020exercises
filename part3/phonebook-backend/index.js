const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

let persons = require('./db.json').persons

const PORT = process.env.PORT || 3001
const MAX_ALLOWED_ID = 100000

// setup express and middleware
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('post-content', req => {
  // on non-POST request a space is required otherwise a '-' will be displayed
  return req.method === 'POST' ? JSON.stringify(req.body) : ' ' 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content'))


// routes

app.get('/info', (req, res) => {
  const numEntries = persons.length
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
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  let newPerson = request.body

  
  if (!newPerson.number) {
    return response.status(400).json({error: 'number missing'})
  }
  if (!newPerson.name) {
    return response.status(400).json({error: 'name missing'})
  }
  if (persons.find(p => p.name === newPerson.name)) {
    return response.status(400).json({error: 'name must be unique'})
  }

  const generateID = () => {
    let id = Math.floor(Math.random() * MAX_ALLOWED_ID)
    while (persons.find(p => p.id === id)) {
      id = Math.floor(Math.random() * MAX_ALLOWED_ID)
    }
    return id
  }

  newPerson.id = generateID()
  persons.push(newPerson)

  response.json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})