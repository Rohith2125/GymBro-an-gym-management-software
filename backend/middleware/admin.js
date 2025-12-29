const User = require('../models/user')

// adminOnly.js (or wherever this lives)

// NOTE: This middleware MUST run AFTER the 'protect' middleware.
exports.adminOnly = (req, res, next) => {
  // 1. Check if the user object was successfully attached by the 'protect' middleware
  if (!req.user || !req.user.role) {
    // This happens if 'protect' fails or is missing
    return res.status(401).json({ msg: "Access denied! Authentication required." });
  }

  // 2. Authorize: Check the role property attached to req.user
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied! Admin only." });
  }

  // If the user is an admin, proceed
  next();
};