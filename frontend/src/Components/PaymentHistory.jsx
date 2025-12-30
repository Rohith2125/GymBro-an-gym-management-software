import axios from 'axios'
import { useState, useEffect } from 'react'

const PaymentHistory = ({ limit }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/user/all-members', { withCredentials: true })
      // console.log('PaymentHistory API Response:', data)
      // console.log('Subscribers:', data.subscribers)
      const allRecords = data.subscribers || []
      setRecords(limit ? allRecords.slice(0, limit) : allRecords)
    } catch (error) {
      console.log('Error fetching members:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">👥</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">No Members Yet</h3>
        <p className="text-gray-500 text-sm">Members will appear here once they purchase a plan</p>
      </div>
    )
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment record?')) return
    try {
      await axios.delete(`http://localhost:3000/api/auth/delete-payment/${id}`, { withCredentials: true })
      setRecords(prev => prev.filter(rec => rec._id !== id))
    } catch (error) {
      console.log('Error deleting payment:', error.message)
      alert('Failed to delete payment record')
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="col-span-2">Member</div>
        <div>Plan</div>
        <div>Amount</div>
        <div>Status</div>
        <div>Date</div>
        <div className="text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {records.map((rec, index) => (
          <div
            key={rec._id}
            className="grid grid-cols-7 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Member */}
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                {rec.userId?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{rec.userId?.name || 'Unknown'}</p>
                <p className="text-xs text-gray-500">Member</p>
              </div>
            </div>

            {/* Plan */}
            <div>
              <p className="font-medium text-gray-900">{rec.planId?.title || '-'}</p>
            </div>

            {/* Amount */}
            <div>
              <p className="font-bold text-gray-900">₹{rec.amountPaid || 0}</p>
            </div>

            {/* Status */}
            <div>
              <span className={`
                                inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                ${rec.isPaid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                }
                            `}>
                {rec.isPaid ? 'Paid' : 'Pending'}
              </span>
            </div>

            {/* Date */}
            <div>
              <p className="text-gray-600 text-sm">
                {rec.createdAt
                  ? new Date(rec.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                  : '-'
                }
              </p>
            </div>

            {/* Actions */}
            <div className="text-right">
              <button
                onClick={() => handleDelete(rec._id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete Record"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show more link if limited */}
      {limit && records.length >= limit && (
        <div className="px-6 py-4 border-t border-gray-100 text-center">
          <span className="text-sm text-gray-500">
            Showing {limit} of total members
          </span>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
