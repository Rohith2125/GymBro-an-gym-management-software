import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../api/config'



const AdminDashboard = () => {

    const API = API_BASE_URL

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${API}/user/Profile`, { withCredentials: true })
                console.log(res.data.count)
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
                    <div>
                        <h1>{profile.user.name}</h1>
                        <h1>{profile.user.email}</h1>
                    </div>
                ) : (
                    <h1>this is admin place</h1>
                )}
            </div>


        </>
    )
}
export default AdminDashboard