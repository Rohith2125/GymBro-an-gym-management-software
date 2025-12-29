import axios from 'axios'
import { useEffect, useState} from 'react'
import Login from './Login'

function ProtectedRoute({children}){

    const [isVerified, setIsVerified]= useState(null)

    useEffect(()=>{
       const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/check",
          { withCredentials: true }
        );
        setIsVerified(res.data.authorized);
      } catch (error) {
        setIsVerified(false);
      }
    }
    checkAuth ()
    },[])

    if(isVerified=== null) return <div>loading...</div>

    return( isVerified ? children   : <Login/> )
} 
export default ProtectedRoute