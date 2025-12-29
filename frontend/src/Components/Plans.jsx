import { useEffect, useState } from 'react'
import axios from 'axios'

function Plans({ selectedPlan, setSelectedPlan }) {
  const API = 'http://localhost:3000/api'
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState()

  useEffect(() => {
    fetchPlans()
  }, [])

  async function fetchPlans() {
    try {
      const { data } = await axios.get(`${API}/user/all-plans`, { withCredentials: true })
      setPlans(data.plans || [])
      setRole(data.role)
      console.log(role)
    } catch (error) {
      console.log('Error loading plans:', error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
        <p className="text-5xl mb-4">📋</p>
        <p className="text-gray-500 text-lg">No plans available at the moment</p>
      </div>
    )
  }


  function AdminActions() {
    return (
      <div>
        <button className="btn-primary">Edit</button>
        <button className="btn-primary">Delete</button>
      </div>
    )
  }

  function HandleEdit() {

  }
  const handleDelete = async () => {
    try {


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {plans.map((plan, index) => (
        <div
          key={plan._id}
          onClick={() => setSelectedPlan(plan)}
          className={`
                        relative cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300
                        ${selectedPlan?._id === plan._id
              ? 'border-black shadow-xl scale-[1.02] bg-gray-50'
              : 'border-gray-200 hover:border-gray-400 hover:shadow-lg'
            }
                    `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Popular Badge */}
          {index === 1 && (
            <div className="absolute -top-3 left-6">
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>
          )}

          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {plan.title}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-gray-900">
                  ₹{plan.amount}
                </span>
                <span className="text-gray-500">
                  / {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Full gym access • All equipment
              </p>
            </div>
            <div>
              {role == 'admin' && <AdminAction />
              }
            </div>

            {/* Radio Button */}
            <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                            ${selectedPlan?._id === plan._id
                ? 'border-black bg-black'
                : 'border-gray-300'
              }
                        `}>
              {selectedPlan?._id === plan._id && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                Access to all gym equipment
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                Locker room access
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                {plan.duration >= 6 ? 'Free personal training session' : 'Group classes included'}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Plans
