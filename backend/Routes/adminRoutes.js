const express= require('express')
const router= express.Router()
const protect= require('../middleware/auth')
const {totalUsers}= require('../Controllers/adminsController')

router.get('/totalUsers',protect,  totalUsers)

module.exports= router