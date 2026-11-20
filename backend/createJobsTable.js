const pool = require("./db");
const createJobsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        recruiter_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        title VARCHAR(150) NOT NULL,
        company VARCHAR(150) NOT NULL,
        location VARCHAR(150),
        job_type VARCHAR(50),
        salary VARCHAR(100),
        description TEXT,
        status VARCHAR(20) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Jobs Table Created Successfully!");
  } catch (error) {
    console.error("Error Creating Jobs Table:", error.message);
  } finally {
    await pool.end();
  }
};
createJobsTable();
