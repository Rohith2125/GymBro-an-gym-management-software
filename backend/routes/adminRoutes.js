const express = require("express");
const {adminOnly} = require("../middleware/admin.js");
const protect = require("../middleware/auth");
const {createAdmin}= require('../controllers/authController.js')
const { getProfile, UserCount } = require("../controllers/userController.js");
const {CreatePlan,AllPlans,Deleteplans}= require('../controllers/planController.js')


const router = express.Router();

router.post("/admin-Dashboard", protect, adminOnly)
router.post('/create-admin',protect,adminOnly, createAdmin)
router.get("/profile", protect, adminOnly, getProfile);
router.get('/user-count',protect,adminOnly, UserCount)
router.post('/create-plan', protect,adminOnly, CreatePlan)
router.get('/all-plans',protect,adminOnly, AllPlans)
router.delete('/delete-plan/:planid',protect,adminOnly, Deleteplans)



module.exports= router;
