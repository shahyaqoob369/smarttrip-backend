require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// This is the most robust configuration for both local and production
const pool = new Pool({
  // On Render, process.env.DATABASE_URL is set and will be used.
  // On your Mac, this will be undefined, and the Pool will use the
  // individual settings from your .env file below.
  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  
  // Only enable SSL for production (on Render)
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = pool;