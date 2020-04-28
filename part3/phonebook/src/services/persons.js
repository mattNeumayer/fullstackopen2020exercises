import axios from 'axios'

//const API_URL = 'https://nameless-caverns-31086.herokuapp.com/api/persons'
const API_URL = '/api/persons'

const createPerson = (person) => {
  return axios
    .post(API_URL, person)
    .then(resp => resp.data)
}

const deletePerson = (person) => {
  return axios
    .delete(`${API_URL}/${person.id}`)
    .then(resp => true)
    .catch(() => false)
}

const updatePerson = (person) => {
  return axios
    .put(API_URL + person.id, person)
    .then(resp => resp.data)
}

const getAllPersons = () => {
  return axios
  .get(API_URL)
  .then(resp => resp.data)
}

export default {createPerson, getAllPersons, deletePerson, updatePerson}