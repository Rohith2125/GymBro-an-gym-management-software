const User = require('../models/user')
const payment = require('../models/payment')
const Membership = require('../models/membership')
const Plan = require('../models/plan')
const razorpay = require('../config/razorpay')

exports.CreatePayment = async (req, res) => {
    try {
        const userId = req.user.id
        const { amount, planId } = req.body  // Get planId from request

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Verify plan exists
        const plan = await Plan.findById(planId)
        if (!plan) {
            return res.status(400).json({ message: 'Plan does not exist' })
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        }

        const order = await razorpay.orders.create(options)
        if (!order) {
            return res.status(400).json({ message: 'Transaction failed' })
        }

        // Create payment record
        const orderData = await payment.create({
            userId: userId,
            isPaid: true,
            transactionId: order.id,
            amountPaid: order.amount / 100  // Convert back to rupees
        })

        // Create membership after successful payment
        const fromDate = new Date()
        const expiresOn = new Date(fromDate)
        expiresOn.setMonth(expiresOn.getMonth() + plan.duration)

        const membership = await Membership.create({
            userID: userId,
            planId: planId,
            Date: fromDate,
            expiresOn: expiresOn
        })

        res.status(200).json({
            success: true,
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID,
            orderData: orderData,
            membership: membership
        })

    } catch (error) {
        console.log('Payment error:', error)
        return res.status(400).json({ message: 'Transaction failed', error: error.message })
    }
}