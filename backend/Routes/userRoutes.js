const express= require('express')
const router= express.Router()
const protect= require('../middleware/auth')

const {userProfile, createMembership, }= require('../Controllers/userController')
const {CreatePayment}= require('../Controllers/paymentController')
const {CreatePlan}= require('../Controllers/planController')

router.get('/userProfile', protect, userProfile)
router.get('/createMembership', protect, createMembership)
router.post('/CreatePayment', protect, CreatePayment)
router.post('/CreatePlan', protect, CreatePlan)



module.exports= router 