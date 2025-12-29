const User = require("../models/user");
const Membership = require("../models/membership");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const membership = await Membership.findOne({ userID: userId })
      .sort({ createdAt: -1 })
      .populate("planId", "title duration amount");

    const profileData = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        authType: user.authType,
      },
      membership: membership
        ? {
          planName: membership.planId.title,
          duration: membership.planId.duration,
          amount: membership.planId.amount,
          from: membership.from,
          expiresOn: membership.expiresOn,
          isActive: membership.isActive,
        }
        : null,
    };

    res.status(200).json({
      message: "Profile fetched successfully",
      profileData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

exports.UserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    console.log("User count:", userCount);

    res.status(200).json({
      success: true,
      userCount
    });

  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user count",
      error: error.message
    });
  }
};

// Assumes the protect middleware is applied to the route for this controller
exports.MyMembership = async (req, res) => {
  try {
    // 💡 SECURE FIX: Get the user ID from the VERIFIED token payload
    // This value is guaranteed to exist if the 'protect' middleware passed.
    const userId = req.user.id; 
    
    // Optional: Log the verified ID
    console.log(`Verified user ID from token: ${userId}`); 

    // Use findOne to query by the custom 'user_id' field in the Membership model
    const membership = await Membership.findOne({ userID: userId });
    
    console.log(membership);
    
    if (!membership) {
        // Use 404 since the user exists but the associated resource (membership) doesn't
        return res.status(404).json({ message: "Membership not found for this user." });
    }

    res.status(200).json({ message: "Got membership", membership });
  } catch (error) {
    // ⚠️ Use 500 for internal errors like database issues
    console.error("Error fetching membership:", error); 
    res.status(500).json({ message: "An internal server error occurred.", error: error.message });
  }
}