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

const allowedOrigins = [
  "https://gymbro-w1qp.onrender.com",
  "https://gymbro.onrender.com",
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

// 1. Security Headers (COOP for Google Auth)
app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// 2. CORS Middleware
const corsOptions = {
  origin: (origin, callback) => {
    // If no origin (server-to-server or mobile app), allow
    if (!origin) return callback(null, true);

    // Check key allowed origins
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".onrender.com") ||
      origin.includes("localhost")
    ) {
      return callback(null, true);
    }

    // Log blocked origins for debugging but don't crash
    console.log("Blocked by CORS:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200 // Legacy browser support
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// 2. Debug Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// 3. Other Middlewares
app.use(express.json());
app.use(cookieParser());

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
