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

// Debug Logger Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// FIXED: Whitelist specific origins instead of allowing any
const allowedOrigins = [
  "https://gymbro-w1qp.onrender.com",
  "https://gymbro.onrender.com",
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400 // Cache preflight for 24 hours
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // Handle preflight requests for all routes

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
