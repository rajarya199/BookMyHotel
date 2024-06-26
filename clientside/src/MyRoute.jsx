import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerify from './auth/EmailVerify';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ClientRoute from './auth/ClientRoute';
import AdminRoute from './auth/AdminRoute';
import AdminDash from './admin/AdminDash';
import AddHotel from './admin/AddHotel';
import AddRoom from './admin/AddRoom';
import Hotel from './pages/Hotel';
import Room from './pages/Room';
import HotelDetail from './pages/HotelDetail';
import RoomDetail from './pages/RoomDetail';
import ConfirmBooking from './pages/ConfirmBooking';
import Users from './admin/Users';
import ManageHotel from './admin/ManageHotel';
import ManageRoom from './admin/ManageRoom';
import ManageBooking from './admin/ManageBooking';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import UpdateHotel from './admin/UpdateHotel';
import UpdateRoom from './admin/UpdateRoom';
const MyRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Homepage/>}/>
                <Route path='/signin' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/email/confirmation/:token' element={<EmailVerify/>}/>
                <Route path='/hotel' element={<Hotel/>}/>
                <Route path='/room' element={<Room/>}/>
                <Route path='hoteldetails/:hotelId' element={<HotelDetail/>}/>
                <Route path='roomdetails/:roomId' element={<RoomDetail/>}/>
                <Route path='/confirmbooking/:bookingId' element={<ConfirmBooking/>}/>
                <Route path='/forgetpassword' element={<ForgetPassword/>}/>
                <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
            </Route>
            <Route path='/' element={<ClientRoute/>}>
              <Route path='/profile' element={<Profile/>}/>

            </Route>

            <Route path="admin/" element={<AdminRoute/>}>
                <Route path="dashboard" element={<AdminDash/>}/>
                <Route path='addroom' element={<AddRoom/>}/>
                <Route path='addhotel' element={<AddHotel/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='hotels' element={<ManageHotel/>}/>
                <Route path='rooms' element={<ManageRoom/>}/>
                <Route path='bookings' element={<ManageBooking/>}/>
                <Route path='updatehotel/:hotelId' element={<UpdateHotel/>}/>
                <Route path='updateroom/:roomId' element={<UpdateRoom/>}/>
            </Route>
            <Route path='/*' element={<NotFound/>}/>

        </Routes>
    </Router>
  )
}

export default MyRoute