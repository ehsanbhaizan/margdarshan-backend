const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getPendingUsers,
  approveUser,
  deleteUser,
} = require("../controllers/adminController");

// Only Admin can access
router.get("/pending-users", auth, role("admin"), getPendingUsers);
router.put("/approve/:id", auth, role("admin"), approveUser);
router.delete("/reject/:id", auth, role("admin"), deleteUser);

module.exports = router;
