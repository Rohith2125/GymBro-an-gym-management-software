const User = require('../models/user')
const payment = require('../models/payment')
const razorpay = require('../Config/razorpay')

exports.CreatePayment = async (req, res) => {
    try {

        const { userId } = req.user.id

        const user = await User.findById(userId)

        const options = {
            amount: req.body.amount * 100,
            currency: 'INR',
            receipt: 'reciept' + Date.now()
        }

        const order = await razorpay.orders.create(options)
        if (!order) {
            return res.status(400).json({ message: 'transaction failed' })
        }
        const orderData = await payment.create({
            userId: userId,
            isPaid: true,
            transactionId: order.id,
            amountPaid: order.amount
        })
        res.status(200).json({
            success: true,
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID, OrderData: orderData
        })

    } catch (error) {
        console.log('the error is :', error)
        return res.status(400).json({ message: 'transaction failed', error: error.message })
    }



}