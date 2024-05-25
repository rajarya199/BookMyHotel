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

            </Route>
            <Route path='/' element={<ClientRoute/>}>
              <Route path='/profile' element={<Profile/>}/>

            </Route>

            <Route path="admin/" element={<AdminRoute/>}>
                <Route path="dashboard" element={<AdminDash/>}/>
                <Route path='addroom' element={<AddRoom/>}/>
                <Route path='addhotel' element={<AddHotel/>}/>
            </Route>
            <Route path='/*' element={<NotFound/>}/>

        </Routes>
    </Router>
  )
}

export default MyRoute