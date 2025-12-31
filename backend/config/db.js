const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined! Please check your Render environment variables (MONGO_URI or MONGODB_URI).");
    }

    await mongoose.connect(mongoURI, {
      // options are optional in latest mongoose
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
