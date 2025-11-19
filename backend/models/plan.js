const mongoose = require('mongoose')

const plan = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,

    }
})

module.exports = mongoose.model('plan', plan, 'plans')