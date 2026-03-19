const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Don't exit in serverless environment
  }
};

module.exports = connectDB;
