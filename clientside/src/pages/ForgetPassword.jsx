import React from 'react'
import { useState } from 'react'
import axios  from 'axios'
import { API } from '../config'
import { Link ,useNavigate} from 'react-router-dom'

const ForgetPassword = () => {
    const navigate=useNavigate()

    const[email,setEmail]=useState('')
    const[redirect,setRedirect]=useState(false)
    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const config={
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
            }
            await axios.post(`${API}/forgetpassword`,{email}, config )
            setEmail('')
            setRedirect(true)
        
        }
        catch(err){
            console.log(err)
        }
    }
    const redirectHome=()=>{
        if(redirect){
            return navigate('/')
        }
    }
  return (
    <>
         <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
        <h1 className="text-4xl text-center mb-4">Forget Password</h1>
        {redirectHome()}
    <form  className='max-w-md mx-auto ' >
        <input type="email"
         placeholder="your@email.com" 
          value={email}
          onChange={e=>setEmail(e.target.value)}
         />
        <button className='primary p-2 w-full text-white rounded-2xl bg-slate-400' onClick={handleSubmit}> Send Password Reset Link</button>
    </form>
        </div>
    </div>


    </>
  )
}

export default ForgetPassword