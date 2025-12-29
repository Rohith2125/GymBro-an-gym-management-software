import { useState } from "react";
import axios from "axios";

const PaymentButton = ({ selectedPlan }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!selectedPlan) {
      alert("Please select a plan!");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create order
      const { data } = await axios.post(
        "http://localhost:3000/api/user/make-payment",
        {
          amount: selectedPlan.amount,
          planId: selectedPlan._id
        },
        { withCredentials: true }
      );

      // Step 2: Open Razorpay popup
      const razor = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "GymMate Membership",
        description: selectedPlan.title,
        order_id: data.orderId,

        // Step 3: After successful payment, verify it
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:3000/api/user/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              alert("Payment Successful! Membership activated.");
              window.location.reload();
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Payment verification failed. Contact support.");
          }
        },

        // Handle cancel/close
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        },

        theme: {
          color: "#000000"
        }
      });

      razor.open();

    } catch (err) {
      console.error("Payment Error:", err.response?.data || err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!selectedPlan || loading}
      className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                ${selectedPlan && !loading
          ? "bg-black text-white hover:bg-gray-800 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }
            `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : selectedPlan ? (
        <span className="flex items-center justify-center gap-2">
          <span>Pay ₹{selectedPlan.amount}</span>
          <span>→</span>
        </span>
      ) : (
        "Select a plan to continue"
      )}
    </button>
  );
};

export default PaymentButton;
