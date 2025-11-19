const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    // meta: {
    //   type: Object, // optional extra data
    //   default: {},
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
