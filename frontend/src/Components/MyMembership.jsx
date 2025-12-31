import axios from 'axios'
import { useEffect, useState } from 'react'

function MyMembership() {
    const [memberships, setMemberships] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMemberships()
    }, [])

    async function fetchMemberships() {
        try {
            const res = await axios.get('http://localhost:3000/api/memberships', {
                withCredentials: true
            })
            console.log('Membership API Response:', res.data)
            setMemberships(res.data.memberships || [])
        } catch (error) {
            console.log('Error fetching memberships:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const getTimeRemaining = (expiresOn) => {
        const now = new Date()
        const expiry = new Date(expiresOn)
        const diffTime = expiry - now
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        )
    }

    const now = new Date()
    const activeMembership = memberships.find(m => m.isActive && new Date(m.expiresOn) > now)
        || memberships[0] // Fallback to most recent if none are "active & unexpired"

    if (!activeMembership) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎫</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Active Membership</h3>
                    <p className="text-gray-500 text-sm">Choose a plan below to get started</p>
                </div>
            </div>
        )
    }

    const daysRemaining = getTimeRemaining(activeMembership.expiresOn)
    const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0
    const isExpired = daysRemaining <= 0

    return (
        <div className={`
            bg-gradient-to-br rounded-2xl p-6 border-2 transition-all
            ${isExpired
                ? 'from-red-50 to-red-100 border-red-200'
                : isExpiringSoon
                    ? 'from-yellow-50 to-orange-50 border-yellow-200'
                    : 'from-gray-900 to-black border-gray-800'
            }
        `}>
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-4">
                <span className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    ${isExpired
                        ? 'bg-red-500 text-white'
                        : isExpiringSoon
                            ? 'bg-yellow-500 text-black'
                            : 'bg-green-500 text-white'
                    }
                `}>
                    {isExpired ? 'EXPIRED' : isExpiringSoon ? 'EXPIRING SOON' : 'ACTIVE'}
                </span>
            </div>

            {/* Plan Info */}
            <div className={isExpired || isExpiringSoon ? 'text-gray-900' : 'text-white'}>
                <h3 className="text-2xl font-bold mb-1">
                    {activeMembership.planId?.title || 'Membership'}
                </h3>
                <p className={`text-sm mb-4 ${isExpired || isExpiringSoon ? 'text-gray-600' : 'text-gray-300'}`}>
                    {activeMembership.planId?.duration} month plan
                </p>

                {/* Expiry Info */}
                <div className={`
                    p-3 rounded-xl 
                    ${isExpired || isExpiringSoon ? 'bg-white/50' : 'bg-white/10'}
                `}>
                    <p className={`text-sm ${isExpired || isExpiringSoon ? 'text-gray-500' : 'text-gray-400'}`}>
                        {isExpired ? 'Expired on' : 'Valid until'}
                    </p>
                    <p className="font-bold text-lg">
                        {new Date(activeMembership.expiresOn).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </p>
                    {!isExpired && (
                        <p className={`text-sm mt-1 ${isExpiringSoon ? 'text-orange-600 font-semibold' : 'text-gray-400'}`}>
                            {daysRemaining} days remaining
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyMembership