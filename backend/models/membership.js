const mongoose = require('mongoose')

const membership = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    planId: {
        type: mongoose.Types.ObjectId,
        ref: 'plan',
        required: true
    },
    from: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiresOn: {
        type: Date,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model('membership', membership, 'memberships')