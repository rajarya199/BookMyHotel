import {API} from "../config"
import axios from 'axios';

//for signup-register

export const signup = (user) => {
  return axios.post(`${API}/register`, user, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });
};
