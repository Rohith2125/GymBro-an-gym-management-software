import { useState } from 'react'
import Dashboard from './Pages/Dashboard'
import AdminDashboard from './Pages/AdminDashboard'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { Routes, Route} from 'react-router-dom'
import ProtectedRoute from './Pages/ProtectedRoute'
import LandingPage from './Pages/LandingPage'
function App() {

  return (
    <>

       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={ <Login/> } />
        <Route path='/Admindashboard' element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
          } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          }/>
      </Routes>

    </>
  )
}

export default App
