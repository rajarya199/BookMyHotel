import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth'
const Register = () => {
  const[values,setValues]=useState({
    name:'',
    email:'',
    password:'',
    cpassword:'',
    phone:'',
    gender:'',
    error:'',
    success:false

  })
  const{name,email,password,gender,phone,error,success,cpassword}=values
  
  const handleChange=mydata=>event=>{
    setValues({...values,error:false,[mydata]:event.target.value})
  }


  const handleSubmit=e=>{
    e.preventDefault() //prevent form  Bydefault action
    setValues({...values})
    if(password !==cpassword){
      setValues({...values,error:'password donot match'})
    }
    else{
      signup({name,email,password,gender,phone}) //single arg as obj {n,e,p}
      .then(data=>{
          if(data.error){
             setValues({...values,error:data.error}) 
          }
          else{
              //after data submit form input are make empty
              setValues({...values,name:'',email:'',password:'',gender:'',phone:'',success:true,cpassword:''})
          }
      })
    } 
}
  //to show error msg 
  const showError=()=>(
    //if error display error
   error && 
   <div className="alert alert-danger">
    {error}
   </div>
)

// to show success msg
const showSuccess=()=>(
    success &&
    <div className='alert alert-success'>
       New account created, verify your account before login
    </div>
)

  return (
    <> 
     <div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-32'>
    <h1 className="text-4xl text-center mb-4">Register</h1>
    {showError()}
    {showSuccess()}
   
<form  className='max-w-md mx-auto  '  >
    <input type="text" 
    placeholder='your name '
    onChange={handleChange('name')} value={name}
     />
    <input type="email"
     placeholder="your@email.com"
     onChange={handleChange('email')} value={email}

    />
      <input 
              type="text" 
              placeholder='Phone number' 
              onChange={handleChange('phone')} value={phone}

            />
            
             <div className="  flex justify-evenly mb-2 mt-2 ">
               <span className="block mb-1 mr-10">Gender:</span>  
              <label className='mr-8' >
                <input 
                  type="radio" 
                  name="gender" 
                  value="male"
                  className="mr-2"
                  onChange={handleChange('gender')}
                  checked={gender === 'male'}
                />
                Male
              </label>
              <label className="mr-8">
                <input 
                  type="radio"     
                  name="gender" 
                  value="female" 
                  className="mr-2"
                  onChange={handleChange('gender')}
                  checked={gender === 'female'}
                />
                Female
              </label>
              <label className="mr-8">
                <input 
                  type="radio" 
                  name="gender" 
                  value="other" 
                  className="mr-2"
                  onChange={handleChange('gender')}
                  checked={gender === 'other'}
                />
                Other
              </label>
            </div>
    <input type="password" 
    placeholder='password' 
    onChange={handleChange('password')} value={password}

    />
     <input type="password" 
    placeholder='confirm password' 
    onChange={handleChange('cpassword')} value={cpassword}

    />

    <button className='primary primary p-2 w-full text-white rounded-2xl bg-slate-400'
    onClick={handleSubmit}
    >Register</button>
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