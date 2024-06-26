
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ImgSlider from '../components/ImgSlider';
import {useState,useEffect} from 'react'
import axios from 'axios'
import { API } from '../config'
import RoomCard from '../components/RoomCard'
const Homepage = () => {

const[rooms,setRooms]=useState([])
useEffect(()=>{
  axios.get( `${API}/roomlist` )
  .then(res=>{
      setRooms(res.data)
  })
  .catch(err=>console.log(err))
},[])

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} text-black`}
        style={{ ...style, display: "block", right: 10 }}
        onClick={onClick}
      />
    );
  }
  
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} text-black`}
        style={{ ...style, display: "block", left: 10, zIndex: 1 }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="container mt-5 mb-5">
      <span className='text-2xl p-2'>Hotel in Popular Cities of Nepal</span>
      <Slider {...settings}>
        <div className="p-2">
          <div className="relative w-96 h-72 overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://www.travelsewa.com/storage/images/kathmandu-20200105102416.jpg"
              alt="Kathmandu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-60 flex flex-col justify-center items-center p-5 text-center text-white">
              <h1 className="text-2xl mt-5 font-bold">Kathmandu</h1>
              <p className="mt-3 text-lg">10 Hotels</p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="relative w-96 h-72 overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1576948187290-457c015b3bff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pokhara"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-center items-center p-5 text-center text-white">
              <h1 className="text-2xl mt-5 font-bold">Pokhara</h1>
              <p className="mt-3 text-lg">40 Hotels</p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="relative w-96 h-72 overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1577089909715-2bfa66d60a7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Butwal"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-center items-center p-5 text-center text-white">
              <h1 className="text-2xl mt-5 font-bold">Butwal</h1>
              <p className="mt-3 text-lg">20 Hotels</p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="relative w-96 h-72 overflow-hidden rounded-xl shadow-lg">
            <img
                src="https://images.unsplash.com/photo-1699204121879-f7d805d3bc41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Lalitpur"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-center items-center p-5 text-center text-white">
              <h1 className="text-2xl mt-5 font-bold">Lalitpur</h1>
              <p className="mt-3 text-lg">20 Hotels</p>
            </div>
          </div>
        </div>
      </Slider>
      <div className='mt-5 mb-5 '>
      <span className='text-2xl p-2 '> Rooms For You </span>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms && rooms.map((room, i) => (
          <RoomCard key={i} data={room} />
        ))}
      </div>
      </div>
      
    </div>
  );
}



export default Homepage;
