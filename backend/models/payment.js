const mongoose = require('mongoose')

const payment = new mongoose.Schema(
    {
        isPaid: {
            type: Boolean,
            default: false

        },
        transactionId: {
            type: String,
            unique: true,
            required: true
        },
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        amountPaid:{
            type:Number,
required: true,
        },
        Status:{
            type: String,
            enum:['peding', 'failed', 'successfull']
        }


    },{timeStamps: true}
)

module.exports= new mongoose.model('payment', payment, 'payments')