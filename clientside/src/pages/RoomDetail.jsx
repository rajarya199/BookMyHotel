import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IMG_URL,API } from '../config'
import ImgSlider from '../components/ImgSlider'
import BookingBox from '../components/BookingBox'

import { CiWifiOn } from 'react-icons/ci';
import { MdPool, MdPets, MdElectricBolt, MdOutlineBathroom, MdOutlineRoomService, MdBalcony } from 'react-icons/md';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import { BiCloset } from 'react-icons/bi';
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

      // Function to get the corresponding icon for a facility
  const getFacilityIcon = (facility) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <CiWifiOn className="w-6 h-6" />;
      case 'tv':
        return <PiTelevisionSimpleFill className="w-6 h-6" />;
      case 'attached bathroom':
        return <MdOutlineBathroom className="w-6 h-6" />;
      case 'room service':
        return <MdOutlineRoomService className="w-6 h-6" />;
      case 'pets':
        return <MdPets className="w-6 h-6" />;
      case 'power backup':
        return <MdElectricBolt className="w-6 h-6" />;
      case 'balcony':
        return <MdBalcony className="w-6 h-6" />;
      case 'closet':
        return <BiCloset className="w-6 h-6" />;
      default:
        return <span> </span>;
    }
  };
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

                <BookingBox data={room}/>
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
   <div className='mt-4 mb-5'>
                <h2 className="font-semibold text-2xl">Facilities </h2>
                <div className="grid mt-4 gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2">
                  {room.room_facility && room.room_facility.map((facility,index)=>(
                    <div key={index}  className="border p-3 flex rounded-2xl gap-2 items-center">
                       {getFacilityIcon(facility)}
                <span>{facility}</span>
                    </div>
        
                  ))}
          
                  </div>

                </div>
     </div>

    </>
  )
}

export default RoomDetail