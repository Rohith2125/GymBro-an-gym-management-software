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

    const plan = await Plan.findById(planId)
    if (!plan) {
      return res.status(400).json({ message: 'Plan does not exist' })
    }

    // Just create Razorpay order (no membership yet!)
    const options = {
      amount: amount * 100,
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
      Date: fromDate,
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

exports.AllPayments= async (req,res)=>{
try{

    const subscribers= await Membership.find().populate("userID", "name").populate('planId', "title amount isActive ").sort({created: -1})
    // const record= {
    //     name: subscribers.name,
    //     title: subscribers.title,
    //     amount: subscribers.amount,
    //     isActive: subscribers.isAvtive,
    //     expiresOn: subscribers.expiredOn
    // }
    res.status(200).json({subscribers: subscribers })
    // console.log(subscribers)
}catch(error){
    console.log('error at all payments', error?.message)
    res.status(400).json({message:" error at all payments"})
}

}