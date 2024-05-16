import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <> 
     <div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-32'>
    <h1 className="text-4xl text-center mb-4">Register</h1>
   
<form  className='max-w-md mx-auto  '  >
    <input type="text" 
    placeholder='your name '
    
     />
    <input type="email"
     placeholder="your@email.com"
    
    />
    <input type="password" 
    placeholder='password' 
    />
    <button className='primary primary p-2 w-full text-white rounded-2xl bg-slate-400'>Register</button>
    <div className='text-center py-2 text-gray-500'>
        Already a member? &nbsp;&nbsp;
        <Link  className=' text-black' to='/login'>  
      login
    </Link></div>

</form>
    </div>
</div></>
  )
}

export default Register