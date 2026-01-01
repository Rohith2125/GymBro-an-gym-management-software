
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
const allowedOrigins = [
  "https://gymbro-w1qp.onrender.com",
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".onrender.com")) {
        callback(null, true);
      } else {
        console.log("Origin not allowed by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/memberships", membershipRoutes);

app.get("/", (req, res) => {
  res.send("Gym backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
