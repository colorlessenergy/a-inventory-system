import axios from 'axios';

export default () => {

  return axios.create({
    // DEV
    // baseURL: 'http://localhost:3001',
    // Production
    baseURL: 'https://inventory-systems.herokuapp.com',

    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}