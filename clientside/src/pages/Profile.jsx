import React, { useState,useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { RiHotelLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API,IMG_URL } from '../config';

const Profile = () => {
    const {user}=isAuthenticated()
    const[bookings,setBookings]=useState([])
    console.log(user)
    useEffect(()=>{
      
      axios.get(`${API}/userbooking/${user._id}`)
      .then(res=>{
       setBookings(res.data)
      })
      .catch(err=>console.log(err))
  },[user._id])


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <>
    <div className='bg-gray-100 mt-1 mb-5 mx-8 px-8 py-8'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
        <div>
          <h1 className='text-3xl'>{user.name}</h1>
          <p className='my-2 block font-semibold '>{user.email}</p>
        </div>
        <div className='flex justify-end items-center'>
            <div className='flex items-center bg-white shadow-sm px-8 py-1 rounded-md'>
              <RiHotelLine className='w-14 h-20 mr-2' />
              <span className='text-xl font-semibold'>{bookings.length}</span>
            </div>
          </div>
      </div>
    <div className='border-t-2 mt-2'>
    <h2 className="font-semibold text-2xl mb-4"> My booking </h2>
    <div className="grid gap-4 grid-cols-1">
      {bookings.map((book,i)=>(
              <div key={i} className="flex border rounded-lg shadow-lg overflow-hidden">
              <img src={`${IMG_URL}/${book.room && book.room.room_image[0]}`} alt={book.room && book.room.room_title}    className="w-1/3 h-auto object-cover"/>
              <div className="p-3 flex flex-col justify-between">
                  <div>
                    
                   <p className="text-gray-600 p-1">Room Title : {book.room && book.room.room_title} </p> 
                    <p className="text-gray-600 p-1">Room Types :{book.room && book.room.room_type} </p>
                    <p className="text-gray-600 p-1">Room Rate : {book.room && book.room.room_price} </p> 
                    <p className="text-gray-600 p-1">Room Number :{book.room && book.room.room_number} </p>
                    <p className="text-gray-600 p-1">Address :{book.hotel && book.hotel.htl_city} </p>     
                   </div>
                  
               </div>
               <div className='p-3 flex flex-col justify-between'>
                <div>
                <p className="text-gray-600 p-1">Checkin :{book.checkin_date && formatDate(book.checkin_date)} </p> 
                    <p className="text-gray-600 p-1">Checkout :{book.checkout_date && formatDate(book.checkout_date)} </p> 
                    <p className="text-gray-600 p-1">Guest :{book.guest_num} </p> 
                    <p className="text-gray-600 p-1">Total Price :{book.totalPrice} </p>
                    <p className="text-gray-600 p-1">Status :{book.booking_status} </p>
          
                </div>
                <div>
                <Link 
            to={`/roomdetails/${book.room && book.room._id}`} 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            View Room
          </Link>
                </div>
               
               </div>
          
          </div>
      ))}

</div>


    </div>
    

    </div>
    </>
  ) 
}

export default Profile