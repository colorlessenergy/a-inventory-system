import axios from 'axios';

export default () => {

  return axios.create({
    baseURL: 'http://localhost:3000',

    // TODO: store the token and retrieve it here
    // headers: {
    //   Authorization: 
    // }
  })
}