import React from "react";
import axios from 'axios'
import { API } from "../config";
import { useState,useEffect } from "react";
import {isAuthenticated} from "../auth/index"


import { MdPets } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import { MdElectricBolt } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { MdBalcony } from "react-icons/md";
import { MdOutlineRoomService } from "react-icons/md";
import { MdOutlineBathroom } from "react-icons/md";
import { BiCloset } from "react-icons/bi";


const AddRoom = () => {

  const [hotels,setHotels]=useState([])
  useEffect(()=>{
    axios.get(`${API}/hotellist`)
    .then(res=>setHotels(res.data))
    .catch(err=>console.log(err))
  },[])

  const {token}=isAuthenticated()
  const[roomData,setRoomData]=useState({
    room_title:'',
    room_number:'',
    room_type:'',
    room_price:'',
    room_description:'',
    hotel:'',
    maxguest:'',
    room_facility:[],
    room_image:[]
  })
  const{room_title,room_number,room_type,room_price,room_description,room_facility,maxguest}=roomData
  const[success,setSuccess]=useState(false)
const [error,setError]=useState('')
 const handleChange=info=>e=>{
  setRoomData({
    ...roomData,
    error:false,
    [info]:e.target.value
  })
 }
 const handleChangeFacility=e=>{
  const value=e.target.value;
  const checked=e.target.checked;
  console.log(value,checked)
  let newFacility=[...roomData.room_facility];
  if (checked) {
    newFacility.push(value);
    
  } else {
     newFacility = newFacility.filter(e => e !== value);
  }
  setRoomData({
    ...roomData,
    room_facility:newFacility
  })

 }
 const handleImageChange=e=>{
  setRoomData({
    ...roomData,
    room_image:Array.from(e.target.files)

  })

 }
 const handleSubmit=async event=>{
  event.preventDefault()
  try{
    const formData=new FormData()
    formData.append('room_title',room_title)
    formData.append('room_price',room_price)
    formData.append('room_description',room_description)
    formData.append('room_number',room_number)
    formData.append('maxguest',maxguest)
    formData.append('room_type',room_type)
    formData.append('hotel',roomData.hotel)
    // formData.append('room_image',roomData.room_image)
    roomData.room_image.forEach(image => {
      formData.append('room_image',image);
    });
    formData.append('room_facility',JSON.stringify(room_facility))

    const config={
      headers:{
          "Content-Type":'multipart/form-data',
          Authorization:`Bearer ${token}`
      }
  }
  await axios.post(`${API}/postroom`,formData,config)
  setSuccess(true)
  setError(false)
  setRoomData({
    room_title:'',
    room_number:'',
    room_type:'',
    room_price:'',
    room_description:'',
    hotel:'',
    maxguest:'',
    room_facility:[],
    room_image:[]
  })

  } 
  catch(err){
    setError(err.response.data.error)
        setSuccess(false)
  }   
 }
 const showError=()=>(
  <div className='alert alert-danger' style={{display:error ? '':'none'}}>
      {error}
  </div>
)

// to show success msg
const showSuccess=()=>(
  <div className='alert alert-success' style={{display:success ? '':'none'}}>
    new Room added
  </div>
)
    return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center mb-10">
          <div className="col-md-10">
            <form className="shadow p-3">
              <h3 className="text-center text-2xl ">Add Room</h3>
              {showError()}
                            {showSuccess()}
              <div className="mb-2">
                <label htmlFor="hname">Room title</label>
                <p className="text-gray-500 text-sm">
                  Give title/heading to your Room
                </p>
                <input
                  type="text"
                  id="rtitle"
                  className="form-control"
                  required
                  placeholder="room title"
                  onChange={handleChange("room_title")}
                   value={room_title}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="rnumber">Room Number</label>
                <p className="text-gray-500 text-sm">
                  Room Number,code to identify your room in AddHotel
                </p>
                <input
                  type="number"
                  id="rnumber"
                  className="form-control"
                  required
                  placeholder="room number"
                  onChange={handleChange("room_number")}
                 value={room_number}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="hname">Room's Type</label>
                <p className="text-gray-500 text-sm">
                  Select the type of Your room
                </p>
                <div className="  flex justify-evenly mb-2 mt-2 ">
                <label className="mr-8">
                    <input type="radio" name='room_type' value="single" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "single"} />
                    Single
                  </label>
                  <label className="mr-8">
                    <input type="radio" name='room_type' value="double" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "double"} />
                    Double
                  </label>
                  <label className="mr-8">
                    <input type="radio" name='room_type' value="deluxe" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "deluxe"} />
                    Deluxe
                  </label>
                  <label className="mr-8">
                    <input type="radio" name='room_type' value="standard" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "standard"} />
                    Standard
                  </label>
                  <label className="mr-8">
                    <input type="radio" name='room_type' value="suite" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "suite"} />
                    Suite
                  </label>
                  <label className="mr-8">
                    <input type="radio" name='room_type' value="family" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "family"} />
                    Family
                  </label>
                  <label className="mr-8">
                    <input type="radio" name='room_type' value="classic" className="mr-2" onChange={handleChange("room_type")} checked={room_type === "classic"} />
                    Classic
                  </label>
            </div>
              </div>
              <div className="mb-2">
                <label htmlFor="rdesc">Room Description</label>
                <p className="text-gray-500 text-sm">Describe your Room</p>
                <textarea
                  type="text"
                  id="rdesc"
                  className="form-control rounded-2xl"
                  placeholder="Details"
                  onChange={handleChange("room_description")}
                //   value={room_description}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="price">Price per Night </label>
                <p className="text-gray-500 text-sm">
                  State rate of room per night
                </p>

                <input
                  type="number"
                  id="price"
                  min={0}
                  className="form-control rounded-2xl"
                  placeholder="room price"
                  onChange={handleChange("room_price")}
                  value={room_price}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="rmax">Max Guest</label>
                <p className="text-gray-500 text-sm">
                  Maximum people room can accomodate
                </p>
                <input
                  type="number"
                  id="rmax"
                  min={1}
                  className="form-control"
                  required
                  placeholder="max guets"
                  onChange={handleChange("maxguest")}
                  value={maxguest}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category">Hotel</label>
                <select
                  className="form-control rounded-2xl"
                  onChange={handleChange("hotel")}
                >
                  <option></option>
                  {hotels.map((c, i) => (
                                        <option key={i} value={c._id}>{c.htl_name}</option>
                                    ))} 
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="rfacility">Facilities</label>
                <p className="text-gray-500 text-sm">
                  Select the facilities provided by your Hotel
                </p>

                <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2">
                
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="wifi"
                    value='wifi'
                     onChange={handleChangeFacility}
                     checked={room_facility .includes('wifi')}
                     
                    />
                    <CiWifiOn  className="w-6 h-6"/>
                    <span>Wifi</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="ac"
                    value='ac' 
                     onChange={handleChangeFacility}
                     checked={room_facility.includes('ac')}
                    />

                    <span>AC</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="tv" value='tv'
                     onChange={handleChangeFacility}
                     checked={room_facility.includes('tv')} />
                    <PiTelevisionSimpleFill className="w-6 h-6"/>
                    <span>Tv</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="attched bathroom" value='attached bathroom'
                     onChange={handleChangeFacility}
                     checked={room_facility.includes('attached bathroom')} />
                    <MdOutlineBathroom className="w-6 h-6" />
                    <span>Attached Bathroom</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="room service" value='room service'
                     onChange={handleChangeFacility}
                     checked={room_facility.includes('room service')} />
                    <MdOutlineRoomService className="w-6 h-6" />

                    <span> Room Service</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="pets" value='pets'
                     onChange={handleChangeFacility}
                     checked={room_facility.includes('pets')} />
                    <MdPets className="w-6 h-6" />
                    <span>Pets</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="backup" value='power backup'
                     onChange={handleChangeFacility}
                     checked={room_facility .includes('power backup')} />
                    <MdElectricBolt className="w-6 h-6" />
                    <span>Backup</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="balcony" value='balcony'
                     onChange={handleChangeFacility}
                     checked={room_facility .includes('balcony')} />
                    <MdBalcony className="w-6 h-6" />
                    <span>Balcony</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="closet" value='closet'
                     onChange={handleChangeFacility}
                     checked={room_facility .includes('closet')} />
                    <BiCloset className="w-6 h-6" />
                    <span>closet</span>
                  </label>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="rimg">Images</label>
                <p className="text-gray-500 text-sm">
                
                  Upload images of your room
                </p>
                <input
                  type="file"
                  id="rimg"
                  className="form-control rounded-2xl"
                  accept="image/*"
                  required
                  multiple
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-2">
                <button
                  className="btn btn-primary w-fit"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoom;
