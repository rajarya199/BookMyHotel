import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit,FaRegEye } from 'react-icons/fa';
import { API,IMG_URL } from '../config';
import { isAuthenticated } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ManageBooking = () => {
    const[bookings,setBookings]=useState([])
    useEffect(()=>{
        axios.get(`${API}/bookinglist`)
        .then(res=>{
         setBookings(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    const formatDate = (bdate) => {
        const date = new Date(bdate);
        return date.toLocaleDateString();
      };
  return (
   
    <>
       <ToastContainer theme='colored' position='top-center'/>
       <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white  border-1 shadow border-gray-300">
        <caption class="caption-top text-center text-2xl font-serif text-black">
            Manage Booking
  </caption>
          <thead>
            <tr className='font-serif'>
            <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">S.N</th>
              <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Room</th>
              <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Room Number</th>
              <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Hotel</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Booked By</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Guest</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Checkin</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Checkout</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Total price</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Phone</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.map((book, i) => (
              <tr key={i} className="hover:bg-gray-50">
               <td className="px-4 py-2 border-b border-gray-300 ">{i+1}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{book.room && book.room.room_title}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{book.room && book.room.room_number}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{book.hotel && book.hotel.htl_name}</td>

                <td className="px-4 py-2 border-b border-gray-300 ">{book.user && book.user.name}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{book.guest_num}</td>
                <td className="px-4 py-2 border-b border-gray-300">{book.checkin_date && formatDate(book.checkin_date)}</td>
                <td className="px-4 py-2 border-b border-gray-300">{book.checkout_date && formatDate(book.checkout_date)}</td>
                <td className="px-4 py-2 border-b border-gray-300">{book.totalPrice}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">{book.user && book.user.phone}</td>
                <td className="px-4 py-2 border-b border-gray-300 ">
                <div className="flex space-x-2">
                    <Link to={`/admin/edituser/${book._id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
  )
}

export default ManageBooking