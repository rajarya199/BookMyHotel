import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerify from './auth/EmailVerify';
const MyRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Homepage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/email/confirmation/:token' element={<EmailVerify/>}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default MyRoute