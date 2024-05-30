
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit,FaRegEye } from 'react-icons/fa';
import { API,IMG_URL } from '../config';
import { isAuthenticated } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const ManageHotel = () => {
    const {token}=isAuthenticated()
    const[hotels,setHotels]=useState([])
    useEffect(()=>{
        axios.get(`${API}/hotellist`)
        .then(res=>{
         setHotels(res.data)
        })
        .catch(err=>console.log(err))
    },[])
  //delete hotel
  const deleteHotel=(id)=>{
    const confirmed=window.confirm('Are you sure want to delete this product ?')
    if(confirmed){
        axios.delete(`${API}/deletehotel/${id}`,{
           headers:{
            Authorization:`Bearer ${token}`
           } 
        })
        .then(res=>{
            toast.success('hotel deleted')
            setProducts(hotels.filter((h)=>h._id!==id))
        })
        .catch(err=>{
            toast.error('Failed to delete')
        })

    }
}
  return (
    <>
           <ToastContainer theme='colored' position='top-center'/>
           <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white  border-1 shadow border-gray-300">
        <caption class="caption-top text-center text-2xl font-serif text-black">
            Manage Hotels
      </caption>
      <thead>
            <tr className='font-serif'>
            <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">S.N</th>
            <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Image</th>
              <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left"> Hotel Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">City</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Address</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels && hotels.map((hotel,i)=>(
                            <tr key={i} className="hover:bg-gray-50">
                           <td className="px-4 py-2 border-b border-gray-300 ">{i+1}</td>
                           <td className="px-4 py-0.5 border-b border-gray-300 ">
                            <img src={`${IMG_URL}/${hotel.htl_image[0]}`} alt={hotel.htl_name}  className=" w-28 h-28 object-cover"/></td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{hotel.htl_name}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{hotel.htl_city}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{hotel.htl_location}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">
                <div className="flex space-x-2">
                <Link to={`/hoteldetails/${hotel._id}`} className="text-green-600 hover:text-green-800">
                  <FaRegEye/>
                </Link>
                    <Link to={`/admin/edithotel/${hotel._id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button className="text-red-600 hover:text-red-800" 
                    onClick={()=>deleteHotel(hotel._id)}>
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

export default ManageHotel
