const mongoose = require("mongoose");

let isConnected = false; // serverless cache

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // ❗ process.exit ❌
  }
};

module.exports = connectDB;

