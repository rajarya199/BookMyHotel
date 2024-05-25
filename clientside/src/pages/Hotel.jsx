import React,{useState,useEffect} from 'react'
import HotelCard from '../components/HotelCard'
import axios from 'axios'
import { API } from '../config'
const Hotel = () => {
    const[hotels,setHotels]=useState([])
    useEffect(()=>{
        axios.get( `${API}/hotellist` )
        .then(res=>{
            setHotels(res.data)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <>
         
        <div className="container-fluid mt-5 mb-5">
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels && hotels.map((hotel, i) => (
          <HotelCard key={i} data={hotel} />
        ))}
      </div>
            
        </div>
     
    </>
  )
}

export default Hotel