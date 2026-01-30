const User = require("../models/User");

// Get all pending users
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      isApproved: false,
      role: { $in: ["counselor", "ngo"] },
    }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve user
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isApproved = true;
    await user.save();

    res.json({ message: "User approved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete / Reject user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User rejected and deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
