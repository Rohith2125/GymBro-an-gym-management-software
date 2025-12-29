const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: { // ✅ ADD THIS
      type: mongoose.Types.ObjectId,
      ref: "Plan",
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: { // ✅ ADD THIS
      type: String,
    },
    razorpaySignature: { // ✅ ADD THIS
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", paymentSchema, 'payments');
