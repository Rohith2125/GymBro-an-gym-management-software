const Membership = require("../models/membership");
const Plan = require("../models/plan");

exports.createMembership = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;
    console.log("Received body:", req.body);


    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(400).json({ message: "Plan does not exist" });
    }

    const fromDate = new Date();
    const expiresOn = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth() + plan.duration,
      fromDate.getDate()
    );

    const membership = await Membership.create({
      userID: userId,
      planId,
      from: fromDate,
      expiresOn,
      isActive: true,
    });

    return res.status(201).json({
      message: "Membership created successfully",
      membership,
    });
  } catch (error) {
    console.log("failed in creating membership: ", error.message);
    return res.status(500).json({
      message: "failed to create membership",
      error: error.message,
    });
  }
};

exports.getMyMemberships = async (req, res) => {
  try {
    const userId = req.user.id;

    const memberships = await Membership.find({ userID: userId })
      .populate("planId", "title duration amount")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Memberships fetched",
      memberships,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching memberships",
      error: error.message,
    });
  }
};
