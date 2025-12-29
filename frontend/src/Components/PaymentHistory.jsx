import axios from 'axios'
import { useState, useEffect } from 'react'

const PaymentHistory = ({ limit }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/user/all-members', { withCredentials: true })
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="col-span-2">Member</div>
        <div>Plan</div>
        <div>Amount</div>
        <div>Status</div>
        <div>Expires</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {records.map((rec, index) => (
          <div
            key={rec._id}
            className="grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Member */}
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                {rec.userID?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{rec.userID?.name || 'Unknown'}</p>
                <p className="text-xs text-gray-500">Member</p>
              </div>
            </div>

            {/* Plan */}
            <div>
              <p className="font-medium text-gray-900">{rec.planId?.title || '-'}</p>
            </div>

            {/* Amount */}
            <div>
              <p className="font-bold text-gray-900">₹{rec.planId?.amount || 0}</p>
            </div>

            {/* Status */}
            <div>
              <span className={`
                                inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                ${rec.isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
                }
                            `}>
                {rec.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Expires */}
            <div>
              <p className="text-gray-600 text-sm">
                {rec.expiresOn
                  ? new Date(rec.expiresOn).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                  : '-'
                }
              </p>
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
