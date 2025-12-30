const User = require('../models/user')
const payment = require('../models/payment')
const Membership = require('../models/membership')
const Plan = require('../models/plan')
const razorpay = require('../config/razorpay')

exports.CreatePayment = async (req, res) => {
  try {
    const userId = req.user.id
    const { amount, planId } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // 🛡️ RESTRICTION: Check if user already has an active membership
    const activeMembership = await Membership.findOne({
      userID: userId,
      isActive: true,
      expiresOn: { $gt: new Date() }
    })

    if (activeMembership) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active membership. You can only buy a new one once it expires.'
      })
    }

    const plan = await Plan.findById(planId)
    if (!plan) {
      return res.status(400).json({ message: 'Plan does not exist' })
    }

    // Just create Razorpay order (no membership yet!)
    const options = {
      amount: Math.round(amount * 100), // Ensure amount is an integer
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
      notes: {
        userId: userId.toString(),
        planId: planId.toString()
      }
    }

    const order = await razorpay.orders.create(options)
    if (!order) {
      return res.status(400).json({ message: 'Transaction failed' })
    }

    // Save pending payment record
    const orderData = await payment.create({
      userId: userId,
      isPaid: false, // ⚠️ FALSE because user hasn't paid yet
      transactionId: order.id,
      amountPaid: order.amount / 100,
      planId: planId
    })

    // user hasn't paid yet!
    res.status(200).json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID
    })

  } catch (error) {
    console.log('Payment error:', error)
    return res.status(400).json({ message: 'Transaction failed', error: error.message })
  }
}

// Add this NEW controller function
const crypto = require('crypto')

exports.VerifyPayment = async (req, res) => {
  try {
    const userId = req.user.id
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    // STEP 1: Verify Razorpay signature (prove payment is real)
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature'
      })
    }

    // 🛡️ RE-CHECK RESTRICTION: Secondary safeguard before membership creation
    const existingActive = await Membership.findOne({
      userID: userId,
      isActive: true,
      expiresOn: { $gt: new Date() }
    })

    if (existingActive) {
      return res.status(400).json({
        success: false,
        message: 'Membership already active.'
      })
    }

    // STEP 2: Update payment record to paid
    const paymentRecord = await payment.findOneAndUpdate(
      { transactionId: razorpay_order_id },
      {
        isPaid: true,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      },
      { new: true }
    ).populate('planId')

    if (!paymentRecord) {
      return res.status(404).json({ message: 'Payment record not found' })
    }

    // STEP 3: NOW create membership (payment is verified!)
    const plan = paymentRecord.planId

    const fromDate = new Date()
    const expiresOn = new Date(fromDate)
    expiresOn.setMonth(expiresOn.getMonth() + plan.duration)

    const membership = await Membership.create({
      userID: userId,
      planId: plan._id,
      from: fromDate, // Explicitly use fromDate
      expiresOn: expiresOn,
      isActive: true
    })

    res.status(200).json({
      success: true,
      message: 'Payment verified and membership created!',
      membership: membership
    })

  } catch (error) {
    console.log('Verification error:', error)
    return res.status(500).json({
      message: 'Verification failed',
      error: error.message
    })
  }
}

exports.AllPayments = async (req, res) => {
  try {
    const subscribers = await payment.find()
      .populate("userId", "name")
      .populate('planId', "title duration")
      .sort({ createdAt: -1 })

    res.status(200).json({ subscribers: subscribers })
  } catch (error) {
    console.log('error at all payments', error?.message)
    res.status(400).json({ message: " error at all payments" })
  }
}

exports.TotalRevenue = async (req, res) => {
  try {
    const { range } = req.query;
    let query = { isPaid: true };

    if (range === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      query.createdAt = { $gte: weekAgo };
    } else if (range === 'month') {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      query.createdAt = { $gte: monthAgo };
    }

    const subscriptions = await payment.find(query);
    const revenue = subscriptions.reduce((total, item) => total + (Number(item.amountPaid) || 0), 0);

    console.log(`Total Revenue (${range || 'all'}):`, revenue);
    res.status(200).json({
      success: true,
      message: `Total revenue (${range || 'all-time'}) calculated successfully`,
      subscriptions,
      revenue
    });
  } catch (error) {
    console.log("error in total revenue cal:", error.message);
    res.status(500).json({
      success: false,
      message: "Error calculating total revenue",
      error: error.message
    });
  }
};

exports.DeletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment record deleted successfully",
      deletedPayment
    });
  } catch (error) {
    console.log("Error deleting payment:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting payment",
      error: error.message
    });
  }
};