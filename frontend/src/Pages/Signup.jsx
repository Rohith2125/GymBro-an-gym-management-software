import { useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const API = "http://localhost:3000/api"

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await axios.post(
                `${API}/register`, 
                { name, email, password },  
                { withCredentials: true }
            )
            console.log(res.data)
            navigate('/Admindashboard')
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSuccess = async (response) => {
        setError('')
        setLoading(true)

        try {
            console.log('Google credential:', response.credential)
            const res = await axios.post(
                `${API}/googleLogin`, 
                { token: response.credential },
                { withCredentials: true }
            )
            console.log(res.data)
            navigate('/Admindashboard')
        } catch (err) {
            console.error('Google login error:', err)
            setError(err.response?.data?.message || 'Google login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-8 bg-white rounded-2xl shadow-md w-80 border"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    Sign Up
                </h2>

                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    value={name}
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    minLength={6}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-3">Or sign up with</p>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            console.log("Google Login Failed")
                            setError('Google login failed')
                        }}
                        useOneTap
                    />
                </div>
            </form>
        </div>
    )
}

export default Signup