const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            // required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member',
        },
        authType:{
            type:String,
            enum:['oAuth','local' ],
            default:'local'

        }


    },
    { timestamps: true },
)

module.exports = mongoose.model('user', userSchema, 'user_gallu')