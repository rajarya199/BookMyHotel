import React from "react"
import axios from 'axios'
import { API } from "../config";
import { useState,useEffect } from "react";
import {isAuthenticated} from "../auth/index"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdPool } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { BiSolidDrink } from "react-icons/bi";
import { MdPets } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import { MdElectricBolt } from "react-icons/md";
import { FaChild } from "react-icons/fa";
const UpdateHotel = () => {
    const params=useParams()
    const id=params.hotelId
  const{token}=isAuthenticated()
  const[initialValues,setInitialValues]=useState({})

  const[htldata,setHtldata]=useState({
    htl_name:'',
    htl_city:'',
    htl_location:'',
    htl_description:'',
    htl_amenities: [],
    htl_image: []
  })
  const {htl_name,htl_city,htl_location,htl_description,htl_amenities}=htldata
  const[success,setSuccess]=useState(false)
const [error,setError]=useState('')

useEffect(()=>{
    axios.get(`${API}/hoteldetails/${id}`)
    .then(res=>{
        setInitialValues(res.data)
        setHtldata({
            htl_name: res.data.htl_name,
          htl_city: res.data.htl_city,
          htl_location:res.data.htl_location,
          htl_description: res.data.htl_description,
          htl_amenities: res.data.htl_amenities,
          htl_image: res.data.htl_image 
        })
    })
    .catch(err => console.log(err))


},[id])

const handleChange=info=>event=>{
  setHtldata({
    ...htldata,
    error:false,
    [info]:event.target.value
  })
}

const handleChangeAmenity = event => {
  const value = event.target.value;
   const checked = event.target.checked;
  let updatedAmenities = [...htldata.htl_amenities];
  console.log(value,checked)
  if (checked) {
    updatedAmenities.push(value);
    
  } else {
     updatedAmenities = updatedAmenities.filter(e => e !== value);
  }

  setHtldata({
    ...htldata,
    htl_amenities: updatedAmenities
  });
};
  

const handleImageChange=event=>{
  setHtldata({
      ...htldata,
      htl_image:Array.from(event.target.files)
  })
}
const handleSubmit=async event=>{
  event.preventDefault()
  try{
    const formData=new FormData();
    formData.append('htl_name',htldata.htl_name)
    formData.append('htl_city',htldata.htl_city)
    formData.append('htl_location',htldata.htl_location)
    formData.append('htl_description',htldata.htl_description)
    formData.append('htl_amenities',JSON.stringify(htl_amenities))
    htldata.htl_image.forEach(image => {
      formData.append('htl_image',image);
    });
    const config={
      headers:{
        "Content-Type":'multipart/form-data',
        Authorization:`Bearer ${token}`
      }
    }
    await axios.put(`${API}/updatehotel/${id}`,formData,config)
    setSuccess(true)
        setError('')
        // setHtldata({
        //   htl_name:'',
        //   htl_city:'',
        //   htl_location:'',
        //   htl_description:'',
        //   htl_amenities:[],
        //   htl_image:[]
        // })
  }
  catch(err){
    setError(err.response.data.error)
        setSuccess(false)
  }
}
 //to show error msg 
 const showError=()=>(
  <div className='alert alert-danger' style={{display:error ? '':'none'}}>
      {error}
  </div>
)

// to show success msg
const showSuccess=()=>(
  <div className='alert alert-success' style={{display:success ? '':'none'}}>
     Hotel is updated
  </div>
)
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center mb-10">
          <div className="col-md-10">
            <form className="shadow p-3">
              <h3 className="text-center text-2xl ">Update Hotel</h3>
              {showError()}
                {showSuccess()}
              <div className="mb-2">
                <label htmlFor="hname">Hotel Name</label>
                <p className="text-gray-500 text-sm">
                  Your Hotel name to advertise
                </p>
                <input
                  type="text"
                  id="hname"
                  className="form-control"
                  required
                  placeholder="name"
                  onChange={handleChange('htl_name')} 
                  value={htl_name}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="hcity">City</label>
                <p className="text-gray-500 text-sm">
                  city where your hotel located
                </p>
                <input
                  type="text"
                  id="hcity"
                  className="form-control"
                  required
                  placeholder="city"
                  onChange={handleChange('htl_city')} 
                  value={htl_city}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="hadd">Address</label>
                <p className="text-gray-500 text-sm">
                  Details Address of your hotel
                </p>
                <input
                  type="text"
                  id="hadd"
                  className="form-control"
                  placeholder="address"
                  onChange={handleChange('htl_location')} 
                  value={htl_location}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="hdesc">Hotel Description</label>
                <p className="text-gray-500 text-sm">Describe your Hotel</p>
                <textarea
                  type="text"
                  id="hdetail"
                  className="form-control rounded-2xl"
                  placeholder="Details"
                  onChange={handleChange('htl_description')} 
                  value={htl_description}
                >
                  
                </textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="hamen">Amenities</label>
                <p className="text-gray-500 text-sm">
                  Select the ammenities provided by your Hotel
                </p>

                <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2">
                
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="wifi"
                    value='wifi'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('wifi')}
                     
                    />
                    <CiWifiOn  className="w-6 h-6"/>
                    <span>Wifi</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="ac"
                    value='ac' 
                     onChange={handleChangeAmenity}
                     checked={htl_amenities.includes('ac')}
                    />
                   
                    <span>AC</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="pool" value='pool'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('pool')} />
                    <MdPool className="w-6 h-6" />
                    <span>Pool</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="free Parking" value='free parking'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('free parking')} />
                    <LuParkingCircle className="w-6 h-6" />
                    <span>Free parking</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="bar" value='bar'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('bar')} />
                    <BiSolidDrink className="w-6 h-6" />

                    <span>Bar</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="pets" value='pets'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('pets')} />
                    <MdPets className="w-6 h-6" />
                    <span>Pets</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="backup" value='power backup'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('power backup')} />
                    <MdElectricBolt className="w-6 h-6" />
                    <span>Backup</span>
                  </label>
                  <label className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" name="play area" value='play area'
                     onChange={handleChangeAmenity}
                     checked={htl_amenities .includes('play area')} />
                    <FaChild className="w-6 h-6" />
                    <span>Play area</span>
                  </label>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="himg">Images</label>
                <p className="text-gray-500 text-sm">Hotel images</p>
                <input
                  type="file"
                  id="himg"
                  className="form-control rounded-2xl"
                  accept='image/*'
                  required
                  multiple
                  onChange={handleImageChange} 
                
                />
              </div>
              <div className="mb-2">
                
                {/*primary p-2 w-full text-white rounded-2xl bg-slate-400  */}
                <button 
                className="btn btn-primary w-fit"
                onClick={handleSubmit}
                
                > Update </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHotel;
