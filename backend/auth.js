
const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const router = express.Router();

// Signup API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, account_type } = req.body;

    if (!name || !email || !password || !account_type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!["Student", "Recruiter"].includes(account_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account type"
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (name, email, password, account_type)
       VALUES ($1, $2, $3, $4)`,
      [name, email, hashedPassword, account_type]
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully!"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
});

module.exports = router;

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        account_type: user.account_type
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});
