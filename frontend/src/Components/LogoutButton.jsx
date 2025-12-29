import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LogoutButton({ variant = 'light' }) {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true })
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"

    const variants = {
        light: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        dark: "bg-white/10 text-white hover:bg-white/20"
    }

    return (
        <button
            onClick={handleLogout}
            className={`${baseClasses} ${variants[variant]}`}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
        </button>
    )
}

export default LogoutButton