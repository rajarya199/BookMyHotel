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
      <input 
              type="text" 
              placeholder='Phone number' 
            />
             {/* <select 
              className="block w-full mb-2 p-2 border rounded" 
              placeholder='Gender'>
              <option value="" disabled selected>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select> */}
             <div className="  flex justify-evenly mb-2 mt-2 ">
               <span className="block mb-1 mr-10">Gender:</span>  
              <label className='mr-8' >
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  className="mr-2"
                />
                Male
              </label>
              <label className="mr-8">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  className="mr-2"
                />
                Female
              </label>
              <label className="mr-8">
                <input 
                  type="radio" 
                  name="gender" 
                  value="other" 
                  className="mr-2"
                />
                Other
              </label>
            </div>
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