const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    from: {
      type: Date,
      default: Date.now,
      required: true,
    },
    expiresOn: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
