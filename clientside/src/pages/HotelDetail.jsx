import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IMG_URL,API } from '../config'
import ImgSlider from '../components/ImgSlider'
import HotelRoom from '../components/HotelRoom'

import { CiWifiOn } from 'react-icons/ci';
import { MdPool, MdPets, MdElectricBolt } from 'react-icons/md';
import { LuParkingCircle } from 'react-icons/lu';
import { BiSolidDrink } from 'react-icons/bi';
import { FaChild } from 'react-icons/fa';

const HotelDetail = () => {
    const[hotels,setHotels]=useState({})
    const [rooms,setRooms]=useState([])
    const roomsRef = useRef(null); // reference for the rooms section
    const params=useParams() 
    useEffect(()=>{
        const id=params.hotelId
        axios.get(`${API}/listhotelrooms/${id}`)
        .then(res=>{
            setHotels(res.data.hotel)
            setRooms(res.data.rooms)
        })
        .catch(err=>console.log(err))
    },[params.hotelId])

    //amenity switch case
    const getAmenityIcon = (amenity) => {
      switch (amenity.toLowerCase()) {
        case 'wifi':
          return <CiWifiOn className="w-6 h-6" />;
        case 'pool':
          return <MdPool className="w-6 h-6" />;
        case 'free parking':
          return <LuParkingCircle className="w-6 h-6" />;
        case 'bar':
          return <BiSolidDrink className="w-6 h-6" />;
        case 'pets':
          return <MdPets className="w-6 h-6" />;
        case 'power backup':
          return <MdElectricBolt className="w-6 h-6" />;
        case 'play area':
          return <FaChild className="w-6 h-6" />;
        default:
          return <span> </span>;
      }
    };
 // Func to scroll to the rooms 
 const scrollToRooms = () => {
  roomsRef.current.scrollIntoView({ behavior: 'smooth' });
};
  return (
    <>
            <div className="mt-4 mb-5 bg-gray-100 mx-8 px-8 py-8">
                <h1 className='text-3xl'>{hotels.htl_name}</h1>
                <p className='my-2 block font-semibold '>{hotels.htl_location}</p>

         <div className=" mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-2 ">
        {hotels.htl_image && hotels.htl_image.length > 0 && (
                    
                    <ImgSlider  images={hotels.htl_image} />
                  )}
        </div>
       <div className="mt-5 mb-5 ">
        <div  className='p-4 bg-white shadow rounded-2xl '>
        <h2 className="text-xl font-semibold mb-2">{ hotels.htl_name}</h2>
        <p className="text-gray-600 p-1"><strong>City:</strong> {hotels.htl_city}</p>
        <p className="text-gray-600 p-1"><strong>Address:</strong> {hotels.htl_location}</p>
        <p className="text-gray-600 p-1"><strong>Contact:</strong> 9800000000</p>
        <p className="text-gray-600 p-1 mb-4"><strong>Number of Rooms:</strong> {rooms.length}</p>

        <Link  
        
          onClick={scrollToRooms}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          View Rooms
        </Link>
        </div>
      
        </div>
          
        </div>

             
                <div className="grid mt-2 gap-2 grid-cols-1  mb-5">
   <div className="my-2">
            <h2 className="font-semibold text-2xl">Description</h2>
            {hotels.htl_description}
          </div>
   </div>
   <div className='mt-2'>
                <h2 className="font-semibold text-2xl">Amenities Provided by hotels</h2>
                <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2">
                  {hotels.htl_amenities && hotels.htl_amenities.map((amenity,i)=>(
                    <div key={i} className="border p-3 flex rounded-2xl gap-2 items-center">
                     {getAmenityIcon(amenity)}
                     <span>{amenity}</span>
                  
                    </div>
        
                  ))}
          
                  </div>

                </div>
                {/* ref to room */}
   <div className='mt-8' ref={roomsRef}>  
          <h2 className="font-semibold text-2xl mb-4">Rooms</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {rooms && rooms.map((room, i) => (
              <HotelRoom key={i} data={room} />
            ))}
          </div>
        </div>

              </div>  
    </>
  )
}

export default HotelDetail  