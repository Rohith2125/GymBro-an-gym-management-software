const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { adminOnly } = require('../middleware/admin')
const { getProfile, MyMembership } = require("../controllers/userController");
const { CreatePayment, VerifyPayment, AllPayments } = require("../controllers/paymentController");
const { AllPlans } = require("../controllers/planController");

router.get("/profile", protect, getProfile);
router.post("/make-payment", protect, CreatePayment);
router.post("/verify-payment", protect, VerifyPayment);
router.get('/all-plans', protect, AllPlans)
router.get('/my-membership', protect, MyMembership)
router.get('/check', protect, (req, res) => {
    try {
        res.status(200).json({ message: ' authorized user', authorized: true })
    } catch (error) {
        res.status(400).json({ message: ' unauthorized user', authorized: false })

    }
})

module.exports = router;

