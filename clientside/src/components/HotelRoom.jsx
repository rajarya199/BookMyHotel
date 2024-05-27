import React from 'react';
import { Link } from "react-router-dom";
import { IMG_URL } from "../config";

const HotelRoom = ({ data }) => {
  const { _id, room_title, room_price, room_image, room_type,room_rating, hotel,room_number,maxguest } = data;
  const imageUrl = room_image && room_image.length > 0 ? `${IMG_URL}/${room_image[0]}` : 'default-image-url';

  return (
    <div className="flex border rounded-lg shadow-lg overflow-hidden">
      <img 
        src={imageUrl} 
        alt={room_title} 
        className="w-1/3 h-auto object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          
         <p className="text-gray-600 p-1">Room Title: {room_title}</p> 
          <p className="text-gray-600 p-1">Room Types: {room_type}</p> 
          <p className="text-gray-600 p-1">city:{hotel.htl_city}</p>   
          <p className="text-gray-600 p-1">Address: {hotel.htl_location}</p>     
          <p className="text-gray-600 p-1">Room Rate: {room_price}/night</p> 
          
        </div>
        <div>
          <Link 
            to={`/rooms/${_id}`} // Assuming each room has a unique ID and you have a route to view room details
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelRoom;
