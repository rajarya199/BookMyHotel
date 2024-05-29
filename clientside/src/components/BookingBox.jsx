
import React from 'react'
import { API } from '../config';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { isAuthenticated} from '../auth'

const BookingBox = (props) => {
  const navigate=useNavigate()
  const { user } = isAuthenticated()
const[redirect,setRedirect]=useState('')
  const{_id,room_title,room_price,room_image,room_type,hotel}=props.data
 const [values,setValues]=useState({
  checkinDate:'',
  checkoutDate:'',
  guestNum:1,
 })
 
const{checkinDate,checkoutDate,guestNum}=values
const handleChange=mydata=>event=>{
  setValues({...values,[mydata]:event.target.value})
}

const handleSubmit=async (e)=>{
  e.preventDefault()
  const userId=user._id
  const hotelId=hotel._id
 const bookingData={
  hotel:hotelId,
  room:_id,
  user:userId,
  checkin_date: checkinDate,
  checkout_date: checkoutDate,
  guest_num: guestNum
 }
 
    try {
      const response = await axios.post(`${API}/booking`, bookingData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log('Booking successful!', response.data);
      alert('Booking successful!');
      const bookingId=response.data._id;
      setRedirect(`/confirmbooking/${bookingId}`)
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }

}
  if(redirect){
    return navigate(redirect)
  }
  return (
    
    <>
                 <div className='p-3 bg-white shadow rounded-2xl '>
                    <div className='text-2xl text-center'>
                    Price:Rs {room_price}/per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className=" grid grid-cols-1 md:grid-cols-2 ">
                        <div className=' px-3 py-3' >
                    <label > Check in:</label>
                    <input   type="date" 
                     onChange={handleChange('checkinDate')}
                     value={checkinDate} />
                  </div>
                  <div className='p-3 border-l' >
                    <label  > Check out:</label>
                    <input   type="date" 
                     onChange={handleChange('checkoutDate')}
                      value={checkoutDate}
 />
                  </div>
                        </div>
                        <div className="py-3 px-3 border-t">
                            <label > Number of Guest :</label>
                            <input type="number" step={1} min={1}
                             onChange={handleChange('guestNum')}
                             value={guestNum}
                            />
                        </div>
                  
                    </div>
                  
                  <button  className=" mt-4 inline-block bg-blue-500 text-white ml-3 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  onClick={handleSubmit}
> Book Room</button>
                  </div>
    </>
  )
}

export default BookingBox