import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App