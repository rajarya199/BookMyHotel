import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IMG_URL,API } from '../config'
import ImgSlider from '../components/ImgSlider'
const RoomDetail = () => {
    const[room,setRoom]=useState({})
    const params=useParams()
    useEffect(()=>{
        const id=params.roomId 
        axios.get(`${API}/roomdetails/${id} ` )
        .then(res=>{
            setRoom(res.data)
        })
        .catch(err=>console.log(err))
    },[params.roomId])
  return (
    <>
            <div className="mt-4 mb-5 bg-gray-100 mx-8 px-8 py-8">
            <h1 className='text-3xl'>{room.room_title}</h1>
                <p className='my-2 block font-semibold '>{room.hotel && room.hotel.htl_location}</p>
                <p className='my-2 block font-semibold '>{room.hotel && room.hotel.htl_name} ,{room.hotel && room.hotel.htl_city}</p>
               
                <div className=" mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 ">
          {room.room_image && room.room_image.length > 0 && (
                    
                    <ImgSlider  images={room.room_image} />
                  )}
        </div> 
        <div className="mt-5 mb-5 ">
                  <div className='p-3 bg-white shadow rounded-2xl '>
                    <div className='text-2xl text-center'>
                    Price:Rs {room.room_price}/per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                        <div className=' px-3 py-3' >
                    <label > Check in:</label>
                    <input   type="date" />
                  </div>
                  <div className='p-3 border-l' >
                    <label  > Check out:</label>
                    <input   type="date" />
                  </div>
                        </div>
                        <div className="py-3 px-3 border-t">
                            <label > Number of Guest :</label>
                            <input type="number" step={1} min={1} />
                        </div>
                  
                    </div>
                  
                  <button  className=" mt-4 inline-block bg-blue-500 text-white ml-3 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
> Book Room</button>

                  </div>
               

                 
        </div>
                </div>
                <div className="grid mt-2 gap-2 grid-cols-1 lg:grid-cols-2">
   <div className="my-2">
            <h2 className="font-semibold text-2xl">Description</h2>
            {room.room_description}
          </div>

          <div className='mt-4'>
            <div className='  p-3 shadow-sm border rounded-xl'>
            <p className="text-gray-600 p-1"><strong>Room Types:</strong> {room.room_type}</p> 
          <p className="text-gray-600 p-1"><strong>Room Number:</strong> {room.room_number}</p> 
          <p className="text-gray-600 p-1"><strong>Rating:</strong> {room.room_rating}</p>        
          <p className="text-gray-600 p-1"><strong>Room Rate:</strong> {room.room_price}/night</p> 
          <p className="text-gray-600 p-1"><strong>Max number of Guest</strong> {room.maxguest}</p>
            </div>
         

     </div>
   </div>
   <div className='mt-2 mb-5'>
                <h2 className="font-semibold text-2xl">Amenities Provided by hotels</h2>
                <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2">
                  {room.room_facility && room.room_facility.map((facility)=>(
                    <div>
                      {facility}
                    </div>
        
                  ))}
          
                  </div>

                </div>
     </div>

    </>
  )
}

export default RoomDetail