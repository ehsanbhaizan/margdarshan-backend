const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  bookSession,
  getCounselorSessions,
  updateSessionStatus,
  getMySessions,
} = require("../controllers/sessionController");

// Student
router.post("/book", auth, role("student"), bookSession);
router.get("/my-sessions", auth, role("student"), getMySessions);

// Counselor
router.get("/counselor-sessions", auth, role("counselor"), getCounselorSessions);
router.put("/update/:id", auth, role("counselor"), updateSessionStatus);

module.exports = router;

