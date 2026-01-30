const Session = require("../models/Session");

// Student books session
exports.bookSession = async (req, res) => {
  try {
    const { counselorId, date, time } = req.body;

    const session = await Session.create({
      student: req.user.id,
      counselor: counselorId,
      date,
      time,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Counselor gets his sessions
exports.getCounselorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ counselor: req.user.id })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Counselor approve/reject
exports.updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved / rejected

    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.status = status;
    await session.save();

    res.json({ message: "Session updated", session });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student views his sessions
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ student: req.user.id })
      .populate("counselor", "name email")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

