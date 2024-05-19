import React from 'react'
import { isAuthenticated } from '../auth'
const Profile = () => {
    const {user}=isAuthenticated()
  return (
    <>
    <h1 className='text-xl text-center mt-3'>welcome,{user.name}</h1>
    </>
  ) 
}

export default Profile