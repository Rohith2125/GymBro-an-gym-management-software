const express = require("express");
const { adminOnly } = require("../middleware/admin.js");
const protect = require("../middleware/auth");
const { createAdmin } = require('../controllers/authController.js')
const { getProfile, UserCount, ActiveList } = require("../controllers/userController.js");
const { CreatePlan, AllPlans, Deleteplan, updatePlan } = require('../controllers/planController.js')
const { TotalRevenue, DeletePayment } = require('../controllers/paymentController.js')


const router = express.Router();

router.post("/admin-Dashboard", protect, adminOnly)
router.post('/create-admin', protect, adminOnly, createAdmin)
router.get("/profile", protect, adminOnly, getProfile);
router.get('/user-count', protect, adminOnly, UserCount)
router.post('/create-plan', protect, adminOnly, CreatePlan)
router.get('/all-plans', protect, adminOnly, AllPlans)
router.get('/active-list', protect, adminOnly, ActiveList)
router.delete('/delete-plan/:planid', protect, adminOnly, Deleteplan)
router.put('/update-plan/:planid', protect, adminOnly, updatePlan)
router.get('/total-revenue', protect, adminOnly, TotalRevenue)
router.delete('/delete-payment/:id', protect, adminOnly, DeletePayment)
router.get('/all-members', protect, adminOnly, AllPayments)
module.exports = router;
