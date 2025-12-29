import { useState, useEffect } from 'react'
import axios from 'axios'
import PlanCreation from '../Components/PlanCreation'
import LogoutButton from '../Components/LogoutButton'
import PaymentHistory from '../Components/PaymentHistory'
import Plans from '../Components/Plans'
const AdminDashboard = () => {
    const API = "http://localhost:3000/api"

    const [profile, setProfile] = useState(null)
    const [userCount, setUserCount] = useState(0)
    const [activeTab, setActiveTab] = useState('overview')

    async function AllUsers() {
        try {
            const { data } = await axios.get(`${API}/auth/user-count`, { withCredentials: true })
            setUserCount(data.userCount)
        } catch (err) {
            console.log('Error fetching users:', err.message)
        }
    }

    const UserProfile = async () => {
        try {
            const res = await axios.get(`${API}/user/Profile`, { withCredentials: true })
            setProfile(res.data.profileData)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        UserProfile()
        AllUsers()
    }, [])

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'plans', label: 'Manage Plans', icon: '📋' },
        { id: 'members', label: 'Members', icon: '👥' },
    ]

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-black text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🏋️</span>
                        <div>
                            <span className="text-xl font-bold">GymMate</span>
                            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs font-medium">ADMIN</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {profile && (
                            <span className="text-gray-300">
                                Welcome, <span className="font-semibold text-white">{profile.user?.name}</span>
                            </span>
                        )}
                        <LogoutButton variant="dark" />
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 text-white">
                            <p className="text-gray-400 text-sm mb-1">Total Users</p>
                            <p className="text-3xl font-bold">{userCount}</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                            <p className="text-gray-500 text-sm mb-1">Active Members</p>
                            <p className="text-3xl font-bold text-gray-900">-</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                            <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">-</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                            <p className="text-gray-500 text-sm mb-1">Plans Created</p>
                            <p className="text-3xl font-bold text-gray-900">-</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 flex items-center gap-2
                                    ${activeTab === tab.id
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                    }
                                `}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveTab('plans')}
                                    className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                        ➕
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">Create New Plan</h3>
                                    <p className="text-gray-500 text-sm">Add a new membership plan</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('members')}
                                    className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                        👥
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">View Members</h3>
                                    <p className="text-gray-500 text-sm">See all active memberships</p>
                                </button>
                                <div className="p-6 bg-white rounded-2xl border border-gray-200 text-left">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        📈
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">Analytics</h3>
                                    <p className="text-gray-500 text-sm">Coming soon...</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Members</h2>
                            <PaymentHistory limit={5} />
                        </div>
                    </div>
                )}

                {activeTab === 'plans' && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Plans</h2>
                        <PlanCreation />
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Existing Plans</h3>
                            <Plans />
                        </div>
                    </div>
                )}

                {activeTab === 'members' && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Members</h2>
                        <PaymentHistory />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-auto py-6 border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
                    © 2024 GymMate Admin Panel. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default AdminDashboard
