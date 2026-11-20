const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then((client) => {
    console.log("Neon PostgreSQL Connected Successfully!");
    client.release();
  })
  .catch((error) => {
    console.error("Database Connection Failed:", error.message);
  });

module.exports = pool;
