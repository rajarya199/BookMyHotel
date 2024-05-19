import React from 'react'
import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { signin,isAuthenticated,authenticate } from '../auth'
const Login = () => {
  const navigate=useNavigate()
  const{user}=isAuthenticated()
  const[values,setValues]=useState({
    email:'',
    password:'',
    error:'',
    redirectToPage:false
  })
  const{email,password,error,redirectToPage}=values
  const handleChange=name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
}
const handleSubmit=e=>{
  e.preventDefault()
  setValues({...values,error:false})
  
  signin({email,password})
  .then(data=>{
    if(data.error){
      setValues({...values,error:data.error})
    }
    else{
      authenticate(data,()=>{
        //save user data and redirect:true
        setValues({...values,redirectToPage:true}) 
    })
    }
  })
  }
  const showError=()=>(
    //if error display error
   error && 
   <div className="alert alert-danger">
    {error}
   </div>
  )
  const redirectUser=()=>{
    if(redirectToPage){
        if (user && user.role==1){
            return navigate('/admin/dashboard')
        }
        else{
            return  navigate('/profile')
        }
    }
  }
  return (
    <>
        <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        {showError()}
      {redirectUser()}
    <form  className='max-w-md mx-auto ' >
        <input type="email"
         placeholder="your@email.com" 
         onChange={handleChange('email')} value={email}
         />
        <input type="password" 
        placeholder='password' 
        onChange={handleChange('password')} value={password}

        />
        <button className='primary p-2 w-full text-white rounded-2xl bg-slate-400' onClick={handleSubmit}>Login</button>
        <div className='text-center py-2 text-gray-500'>
            Don't have an account yet? 
            <Link  className='underline text-black' to={'/register'}>
         Register Now
        </Link></div>

    </form>
        </div>
    </div>
    </>
  )
}

export default Login