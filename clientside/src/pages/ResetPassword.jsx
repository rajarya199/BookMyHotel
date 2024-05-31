import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom'
import { resetPassword } from '../auth'
import { API } from '../config'
const ResetPassword = () => {
  const params=useParams()
    const navigate=useNavigate()
  const[values,setValues]=useState({
    password:'',
    cpassword:'',
    success:false,
    error:'',
    redirect:false

  })
  const{password,error,success,cpassword,redirect}=values
  
  const handleChange=mydata=>event=>{
    setValues({...values,error:false,[mydata]:event.target.value})
  }


  const handleSubmit= async e=>{
    e.preventDefault() 
    setValues({...values})
    const id=params.token
   
resetPassword(id,{password})
.then(data=>{
  if(data.error){
      setValues({...values,error:data.error})
  }
  else{
    setValues({...values,password:'',success:true,cpassword:'',redirect:true})

  }
})


}
  //to show error msg 
  const showError=()=>(
    
   error && 
   <div className="alert alert-danger">
    {error}
   </div>
)

// to show success msg
const showSuccess=()=>(
    success &&
    <div className='alert alert-success'>
       Password has been changed
    </div>
)

const redirectPage=()=>{
  if(redirect){
      return navigate('/signin')
  }
}

  return (
    <> 
     <div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-32'>
    <h1 className="text-4xl text-center mb-4">Reset Your Password</h1>
    {showError()}
    {showSuccess()}
    {redirectPage()}
   
<form  className='max-w-md mx-auto  '  >
          
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
    >Update Your Password</button>
   

</form>
    </div>
</div></>
  )
}

export default ResetPassword