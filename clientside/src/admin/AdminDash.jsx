import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import axios from 'axios';
import { API } from '../config';
import { useState,useEffect } from 'react';
const AdminDash = () => {
  const { token } = isAuthenticated();
  const[rooms,setRooms]=useState([])
  const[hotels,setHotels]=useState([])


  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${API}/userlist`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => console.log(err))

    //room
    axios.get(`${API}/roomlist`)
    .then(res=>{
     setRooms(res.data)
    })
    .catch(err=>console.log(err))

//hotel
axios.get(`${API}/hotellist`)
.then(res=>{
 setHotels(res.data)
})
.catch(err=>console.log(err))



}  , [token]);
  return (
    <>
      <div className="admin-dashboard bg-gray-100 min-h-screen">
        <header className="admin-header mt-2 bg-gray-200 text-black p-4">
          <h2 className="text-3xl font-semibold text-center ">BookMyHotel</h2>
          <h2 className="text-3xl "> Admin Dashboard</h2>

          <nav className="mt-4">
            <ul className="flex space-x-4">
            <li><Link to="/" className=" text-black hover:underline"> Home </Link></li>

              <li><Link to="/admin/bookings" className=" text-black hover:underline">Manage Bookings</Link></li>
              <li><Link to="/admin/rooms" className=" text-black hover:underline">Manage Rooms</Link></li>
              <li><Link to="/admin/hotels" className=" text-black hover:underline">Manage Hotels</Link></li>
              <li><Link to="/admin/users" className="  text-black hover:underline">Manage Users</Link></li>
              <li><Link to="/signout" className="  text-black hover:underline">Sign Out</Link></li>
            </ul>
          </nav>
        </header>
        <main className="p-6">
          <section className="dashboard-section">
            <h2 className="text-3xl  mb-4">Overview</h2>
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Total Bookings</h3>
                <p className="text-3xl font-bold">1</p>
              </div>
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Rooms</h3>
                <p className="text-3xl font-bold"> {rooms.length} </p>
              </div>
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Registered Users</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="stat-card bg-white shadow p-4 rounded">
                <h3 className="text-xl font-medium">Hotels</h3>
                <p className="text-3xl font-bold">{hotels.length}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default AdminDash;




