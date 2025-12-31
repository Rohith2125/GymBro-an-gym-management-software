import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../api/config'

const PlanCreation = () => {
  const API = API_BASE_URL

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const CreatePlan = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await axios.post(`${API}/auth/create-plan`, { title, amount, duration }, { withCredentials: true })
      setSuccess(true)
      setTitle('')
      setAmount('')
      setDuration('')
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-sm">
            ➕
          </span>
          Create New Plan
        </h3>
        <p className="text-gray-500 text-sm mt-1">Add a new membership plan for your gym</p>
      </div>

      <form onSubmit={CreatePlan} className="p-6">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-fade-in">
            <span className="text-lg">✓</span>
            Plan created successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-fade-in">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Title
            </label>
            <input
              type="text"
              value={title}
              placeholder="e.g., Basic Plan"
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              placeholder="e.g., 999"
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (months)
            </label>
            <input
              type="number"
              value={duration}
              placeholder="e.g., 3"
              onChange={(e) => setDuration(e.target.value)}
              className="input-field"
              required
              min="1"
              max="24"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`
                            px-8 py-3 rounded-xl font-semibold transition-all duration-300
                            ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 hover:shadow-xl transform hover:scale-105 active:scale-95'
              }
                        `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </span>
            ) : (
              'Create Plan'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PlanCreation