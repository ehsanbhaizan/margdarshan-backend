const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 SERVERLESS-SAFE DB CONNECT
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

module.exports = app;


