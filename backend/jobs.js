const express = require("express");
const pool = require("./db");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs WHERE status = 'Active' ORDER BY created_at DESC"
    );
    res.json({
      success: true,
      jobs: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const {recruiter_id,title,company,location,job_type,salary,description} = req.body;
    if (!title || !company) {
      return res.status(400).json({
        success: false,
        message: "Job title and company are required"
      });
    }
    const result = await pool.query(`INSERT INTO jobs(recruiter_id, title, company, location, job_type, salary, description)VALUES ($1, $2, $3, $4, $5, $6, $7)RETURNING *`,
      [
        recruiter_id || null,
        title,
        company,
        location || null,
        job_type || null,
        salary || null,
        description || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Job added successfully!",
      job: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add job"
    });
  }
});

module.exports = router;
