import axios from 'axios'

const createPerson = (person) => {
  return axios
    .post('http://localhost:3001/persons', person)
    .then(resp => resp.data)
}

const deletePerson = (person) => {
  return axios
    .delete('http://localhost:3001/persons/' + person.id)
    .then(resp => true)
    .catch(() => false)
}

const updatePerson = (person) => {
  return axios
    .put('http://localhost:3001/persons/' + person.id, person)
    .then(resp => resp.data)
}

const getAllPersons = () => {
  return axios
  .get("http://localhost:3001/persons")
  .then(resp => resp.data)
}

export default {createPerson, getAllPersons, deletePerson, updatePerson}