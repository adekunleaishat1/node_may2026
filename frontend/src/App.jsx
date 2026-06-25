import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Otpverify from './Components/Otpverify';
import { ToastContainer } from 'react-toastify';
import Login from './Components/Login';
import Dashbaord from './Components/Dashbaord';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify" element={<Otpverify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashbaord" element={<Dashbaord />} />
      </Routes>
    </div>
  )
}

export default App