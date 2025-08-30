// This file manages our connection to the PostgreSQL database.
require('dotenv').config();
const { Pool } = require('pg');

// A connection pool is the recommended way to manage connections.
// It's more efficient than opening and closing a new connection for every query.
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,

  ssl: {
    rejectUnauthorized: false
  }
});

// We export the pool so we can use it to run queries in other files.
module.exports = pool;