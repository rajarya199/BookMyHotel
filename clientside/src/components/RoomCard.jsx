import React from 'react'
import { Link } from "react-router-dom";
import { IMG_URL } from "../config";
const RoomCard = (props) => {
    const{_id,room_title,room_price,room_image,room_type,hotel}=props.data
  return (
    <>
        <div className="hotel-card border rounded-lg shadow-lg overflow-hidden">
      <img 
        src={`${IMG_URL}/${room_image[0]}`} 
        alt={room_title} 
        className="w-full h-56 object-cover"
      />
      <div className="p-2">
        <h2 className="text-xl font-semibold mb-1">{room_title}</h2>
        <p className="text-gray-800 text-lg ">Room Type:&nbsp;{room_type}</p>
        <p className="text-gray-600 text-lg "> RS {room_price}</p>
        <p className="text-gray-600 text-lg  ">{ hotel && hotel.htl_location}</p>
        <p className="text-gray-600 text-lg  mb-2">{ hotel && hotel.htl_name}</p>

        <Link 
          to=''
          className="inline-block bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
    </>
  )
}

export default RoomCard