import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IMG_URL,API } from '../config'
const ConfirmBooking = () => {

    const[booking,setBooking]=useState({})
    const params=useParams()
    useEffect(()=>{
        const id=params.bookingId
        axios.get(`${API}/bookingdetail/${id}`)
        .then(res=>{
            setBooking(res.data)
        })
        .catch(err=>console.log(err))
    },[params.bookingId])

    const imageUrl = booking.room &&  booking.room.room_image &&  booking.room.room_image.length > 0 ? `${IMG_URL}/${ booking.room.room_image[0]}` : 'a';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <> 
        <div className=' mt-2 mb-5 p-4 bg-gray-100'>
        <h1 className=' mt-5 text-3xl text-center'>Confirm your Booking</h1>
        <div className='mt-4 mb-4 grid grid-col-1 md:grid-cols-2'>
            <div>
            <img 
        src={imageUrl} 
        alt={booking.room &&  booking.room.room_title} 
        className="w-1/2 h-auto object-cover p-1"
      />
        <p className="text-gray-600 text-lg  "> <strong className='font-serif '> Room Title </strong>: &nbsp;{booking.room && booking.room.room_title}</p>
        <p className="text-gray-600 text-lg  "><strong className='font-serif '>Room Type </strong>: &nbsp;{booking.room && booking.room.room_type}</p>
        <p className="text-gray-600 text-lg "> <strong className='font-serif '>Hotel</strong>:&nbsp;{booking.hotel && booking.hotel.htl_name}</p>
        <p className="text-gray-600 text-lg "><strong className='font-serif '>Address</strong>:&nbsp;{booking.hotel && booking.hotel.htl_location}</p>


        
            </div>
            <div>
            <p className="text-gray-600 text-lg p-1  "><strong className='font-serif '>Name</strong>:&nbsp;{booking.user && booking.user.name}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Email</strong>:&nbsp;{booking.user && booking.user.email}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Phone</strong>:&nbsp;{booking.user && booking.user.phone}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Checkin Date</strong>:&nbsp;{booking.checkin_date && formatDate(booking.checkin_date)}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Checkout Date</strong>:&nbsp;{booking.checkout_date && formatDate(booking.checkout_date)}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Number of Guest</strong>:&nbsp;{booking.guest_num}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Total Price</strong>:&nbsp;Rs{booking.totalPrice}</p>
            <p className="text-gray-600 text-lg p-1"><strong className='font-serif '>Status</strong>:&nbsp;{booking. booking_status}</p>

            <div>
                <button  className="inline-block mt-2 mb-2 bg-green-600 text-white px-4 py-2.5 rounded hover:bg-green-500 transition duration-300">
                    Confirm Booking
                </button>
            </div>
            </div>

        </div>

        </div>
     </>
  )
}

export default ConfirmBooking