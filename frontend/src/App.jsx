import { useState } from 'react'
import Dashboard from './Pages/Dashboard'
import AdminDashboard from './Pages/AdminDashboard'
import Signup from './Pages/Signup'
import { Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>

       <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/Admindashboard' element={<AdminDashboard />} />
      </Routes>

    </>
  )
}

export default App
