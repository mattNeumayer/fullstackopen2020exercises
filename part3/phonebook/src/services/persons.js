import axios from 'axios'

const BASE_URL = 'https://nameless-caverns-31086.herokuapp.com/api/persons'

const createPerson = (person) => {
  return axios
    .post(BASE_URL, person)
    .then(resp => resp.data)
}

const deletePerson = (person) => {
  return axios
    .delete(`${BASE_URL}/${person.id}`)
    .then(resp => true)
    .catch(() => false)
}

const updatePerson = (person) => {
  return axios
    .put(BASE_URL + person.id, person)
    .then(resp => resp.data)
}

const getAllPersons = () => {
  return axios
  .get(BASE_URL)
  .then(resp => resp.data)
}

export default {createPerson, getAllPersons, deletePerson, updatePerson}