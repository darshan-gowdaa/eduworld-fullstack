const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Don't exit in serverless environment
  }
};

module.exports = connectDB;
