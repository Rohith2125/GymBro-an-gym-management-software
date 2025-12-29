
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const membershipRoutes = require("./routes/membershipRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // 
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/memberships", membershipRoutes);

app.get("/", (req, res) => {
  res.send("Gym backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
