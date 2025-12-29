import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Login Page Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 border border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-400"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-focus-within:w-full transition-all duration-300"></div>
            </div>

            <div className="relative group">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-400"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-focus-within:w-full transition-all duration-300"></div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-black font-semibold hover:underline transition-all duration-200">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment History Component
const PaymentHistory = () => {
  const records = [
    {
      _id: '1',
      userID: { name: 'John Doe' },
      planId: { title: 'Premium Plan', amount: 999 },
      isActive: true,
      expiresOn: new Date('2025-12-31')
    },
    {
      _id: '2',
      userID: { name: 'John Doe' },
      planId: { title: 'Basic Plan', amount: 499 },
      isActive: false,
      expiresOn: new Date('2024-06-30')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 animate-fade-in">Payment History</h1>
        
        <div className="space-y-4">
          {records.map((rec, key) => (
            <div
              key={rec._id}
              className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-102 hover:shadow-2xl border border-gray-200 animate-slide-up"
              style={{ animationDelay: `${key * 100}ms` }}
            >
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">User</p>
                  <p className="font-semibold text-gray-900">{rec.userID.name}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Plan</p>
                  <p className="font-semibold text-gray-900">{rec.planId.title}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount</p>
                  <p className="font-bold text-gray-900">₹{rec.planId.amount}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      rec.isActive
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {rec.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Expires</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(rec.expiresOn).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Payment Button Component
const PaymentButton = () => {
  const [selectedPlan, setSelectedPlan] = useState({ amount: 999 });

  const handlePayment = () => {
    console.log('Payment initiated');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <button
        onClick={handlePayment}
        className="relative px-12 py-4 bg-white text-black text-xl font-bold rounded-full overflow-hidden group transform transition-all duration-300 hover:scale-110 shadow-2xl"
      >
        <span className="relative z-10 flex items-center gap-2">
          Pay ₹{selectedPlan?.amount || "Select a plan"}
        </span>
        <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">
          Pay ₹{selectedPlan?.amount || "Select a plan"}
        </span>
      </button>
    </div>
  );
};

// Signup Page Component
const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Signup submitted');
    }, 2000);
  };

  const handleGoogleSuccess = () => {
    console.log('Google login success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl border-2 border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight">
            Create Account
          </h2>

          {error && (
            <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <input
                type="text"
                value={name}
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white transition-all duration-300 outline-none"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white transition-all duration-300 outline-none"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="password"
                value={password}
                placeholder="Password (min 6 characters)"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white transition-all duration-300 outline-none"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSuccess}
              className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-semibold text-gray-700">Sign up with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already registered?{' '}
              <Link to="/login" className="text-black font-semibold hover:underline transition-all duration-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out backwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

// Demo App showing all components
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-full shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setCurrentPage('login')}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            currentPage === 'login' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage('signup')}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            currentPage === 'signup' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Signup
        </button>
        <button
          onClick={() => setCurrentPage('history')}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            currentPage === 'history' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          History
        </button>
        <button
          onClick={() => setCurrentPage('payment')}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            currentPage === 'payment' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Payment
        </button>
      </div>

      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
      {currentPage === 'history' && <PaymentHistory />}
      {currentPage === 'payment' && <PaymentButton />}
    </div>
  );
}