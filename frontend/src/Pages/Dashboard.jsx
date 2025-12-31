import { useState, useEffect } from "react";
import axios from "axios";
import Plans from "../Components/Plans";
import PaymentButton from "../Components/PaymentButton";
import MyMembership from "../Components/MyMembership";
import LogoutButton from "../Components/LogoutButton";

function Dashboard() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/Profile", {
        withCredentials: true
      });
      setUser(res.data.profileData?.user);
    } catch (err) {
      console.log("Error fetching profile:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl"></span>
            <span className="text-xl font-bold text-gray-900">GymBro</span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-600">
                Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your membership and explore our fitness plans
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Membership & Payment */}
          <div className="lg:col-span-1 space-y-6">
            {/* Membership Card */}
            <div className="animate-fade-in-up">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Your Membership
              </h2>
              <MyMembership />
            </div>

            {/* Payment Section */}
            <div className="animate-fade-in-up delay-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Complete Payment
              </h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                {selectedPlan ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Selected Plan</p>
                      <p className="font-bold text-xl text-gray-900">{selectedPlan.title}</p>
                      <p className="text-gray-600">{selectedPlan.duration} months • ₹{selectedPlan.amount}</p>
                    </div>
                    <PaymentButton selectedPlan={selectedPlan} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-4xl mb-2"></p>
                    <p>Select a plan to proceed</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Plans */}
          <div className="lg:col-span-2 animate-fade-in-up delay-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Available Plans
            </h2>
            <Plans
              setSelectedPlan={setSelectedPlan}
              selectedPlan={selectedPlan}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2024 GymMate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
