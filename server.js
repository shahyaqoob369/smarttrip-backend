const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

// Import routes
const redirectRoute = require('./routes/redirect');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const seedRoute = require('./routes/seedRoute');

const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('SmartTripDeals Backend Server is running!');
});

app.use('/redirect', redirectRoute);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', seedRoute); 


// --- Main Server Startup Function ---
const startServer = async () => {
  try {
    // 1. First, connect to the database to ensure it's ready.
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    client.release(); // Release the client back to the pool

    // 2. If the database connection is successful, THEN start the Express server.
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });

  } catch (err) {
    // 3. If the database connection fails, log the error and do not start the server.
    console.error('❌ Failed to connect to the database. Server will not start.');
    console.error(err.stack);
    process.exit(1); // Exit with a failure code
  }
};

// --- Run the Server ---
startServer();