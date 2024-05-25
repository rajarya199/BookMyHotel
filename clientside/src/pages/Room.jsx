
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { API } from '../config'
import RoomCard from '../components/RoomCard'
const Room = () => {
    const[rooms,setRooms]=useState([])
    useEffect(()=>{
        axios.get( `${API}/roomlist` )
        .then(res=>{
            setRooms(res.data)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <>
        <div className="container mx-auto px-4 py-2 mt-5 mb-5">
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms && rooms.map((room, i) => (
          <RoomCard key={i} data={room} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Room