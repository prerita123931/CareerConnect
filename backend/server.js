const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const authRoutes = require("./auth");
const jobRoutes = require("./jobs");
const app = express();
app.use(cors());
app.use(express.json());

// Signup and authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("CareerConnect Backend is Running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "CareerConnect API is working!"
  });
});

// Database test
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Neon PostgreSQL Connected Successfully!",
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
