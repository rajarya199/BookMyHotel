import React from "react";
import { Link } from "react-router-dom";
import { IMG_URL } from "../config";
const HotelCard = (props) => {
  const { _id, htl_name, htl_image, htl_city,htl_location } = props.data;
  const image = htl_image && htl_image.length > 0
      ? htl_image[0]
      : "https://www.freepnglogos.com/uploads/hotel-logo-png/download-building-hotel-clipart-png-33.png";
  return (
    <>
      <div className="col">
        <div className="border rounded-xl shadow-lg overflow-hidden mb-5">
          <img
            src={`${IMG_URL}/${image}`}
            alt={htl_name}
            className="object-cover w-full h-64"
          />
          <div className="p-2">
            <h5 className="text-xl font-semibold mb-1">{htl_name}</h5>
            <h5 className="text-gray-600 text-lg  "> {htl_city} </h5>
            <h5 className="text-gray-600  text-lg mb-2">{htl_location} </h5>

            <Link className="inline-block bg-blue-500 text-white px-4 py-1.5  rounded hover:bg-blue-600 transition duration-300">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
