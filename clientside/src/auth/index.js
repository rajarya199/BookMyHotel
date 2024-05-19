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
//login
export const signin = (user) => {
    return axios.post(`${API}/signin`, user, {
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

  //authenticate -store user info,token accodingly
export const authenticate=(data,next)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()

    }
}
// redirect user by role if authenticated
export const isAuthenticated=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
      return axios.post(`${API}/signout`)
        .then(response => {
          console.log('signout', response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };