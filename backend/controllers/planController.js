
const Plan = require("../models/plan");

exports.CreatePlan = async (req, res) => {
    try {
        const { title, duration, amount } = req.body;

        if (!title || !duration || !amount) {
            return res.status(400).json({ message: "Enter all fields" });
        }

        const newPlan = await Plan.create({
            title,
            duration: Number(duration),
            amount: Number(amount),
        });

        return res.status(201).json({
            message: "Plan created successfully",
            plan: newPlan
        });

    } catch (error) {
        console.error("Plan creation error:", error);
        return res.status(500).json({ message: "Failed to create plan", error });
    }
};


exports.AllPlans = async (req, res) => {
    try {
        const role = req.user.role
        // console.log(role)
        const plans = await Plan.find()
        if (!plans) return (res.status(401).json({ message: " no plans availbale" }))
        // console.log("plans: ", plans)
        res.status(200).json({ message: " these are plans:", plans, role })
    } catch (error) {
        console.log('error in plans', error.message)
    }
}
exports.Deleteplan = async (req, res) => {
    try {
        const planid = req.params.planid
        const delplan = await Plan.findByIdAndDelete(planid)
        console.log(delplan)
        if (!delplan) {
            return res.status(401).json({ message: 'no plan found' })
        }
        return (res.status(200).json({ message: 'plan deleted successfully', plan: delplan }))
    } catch (err) {
        console.log('error in delete', err.message)
        return res.status(500).json({ message: 'error in delete', error: err })
    }
}

exports.updatePlan = async (req, res) => {
  try {
    const planid = req.params.planid;
    const updates = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(
      planid,
      updates,
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({
      message: "Plan updated successfully",
      plan: updatedPlan
    });

  } catch (error) {
    res.status(500).json({
      message: "error in updating plan",
      error: error.message
    });
  }
};
