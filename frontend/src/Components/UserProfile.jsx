import { useState, useEffect } from 'react'
import axios from 'axios'



const AdminDashboard = () => {

    const API = "http://localhost:3000/api"

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${API}/userProfile`, { withCredentials: true })
                console.log(res.data)
                setProfile(res.data.profileData)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetch()
    }, [])

    return (
        <>
            <div>
                <h1>hii</h1>
                {profile ? (
                    <h1>{profile.user.name}</h1>
                ) : (
                    <h1>this is admin place</h1>
                )}
            </div>

        </>
    )
}
export default AdminDashboard