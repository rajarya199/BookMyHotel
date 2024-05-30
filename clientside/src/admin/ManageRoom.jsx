import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { FaTrash, FaEdit,FaRegEye } from 'react-icons/fa';
import { API,IMG_URL } from '../config';
import { isAuthenticated } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const ManageRoom = () => {
    const {token}=isAuthenticated()
    const[rooms,setRooms]=useState([])
    useEffect(()=>{
        axios.get(`${API}/roomlist`)
        .then(res=>{
         setRooms(res.data)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <>
               <ToastContainer theme='colored' position='top-center'/>

               <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white  border-1 shadow border-gray-300">
        <caption class="caption-top text-center text-2xl font-serif text-black">
            Manage Rooms
      </caption>
      <thead>
            <tr className='font-serif'>
            <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">S.N</th>
            <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Image</th>
              <th className="px-4 py- border-b-2 border-gray-300 bg-gray-100 text-left">Room Title</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Hotel </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Address</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Price</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Avilable</th>

            
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms && rooms.map((room,i)=>(
                            <tr key={i} className="hover:bg-gray-50">
                           <td className="px-4 py-2 border-b border-gray-300 ">{i+1}</td>
                           <td className="px-4 py-0.5 border-b border-gray-300 ">
                            <img src={`${IMG_URL}/${room.room_image[0]}`} alt={room.room_title}  className=" w-28 h-28 object-cover"/></td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{room.room_title}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{room.hotel && room.hotel.htl_name}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{ room.hotel && room.hotel.htl_location}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{room.room_type}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{room.room_price}</td>
                           <td className="px-4 py-2 border-b border-gray-300 ">{room.room_available ? 'yes' :'No'} </td>



                           <td className="px-4 py-2 border-b border-gray-300 ">
                <div className="flex space-x-2">
                <Link to={`/roomdetails/${room._id}`} className="text-green-600 hover:text-green-800">
                  <FaRegEye/>
                </Link>
                    <Link to={`/admin/edithotel/${room._id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button className="text-red-600 hover:text-red-800" 
                    >
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

export default ManageRoom