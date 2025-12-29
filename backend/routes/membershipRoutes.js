const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createMembership,
  getMyMemberships,
} = require("../controllers/membershipController");

router.post("/", protect, createMembership);
router.get("/", protect, getMyMemberships);

module.exports = router;
