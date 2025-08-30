const express = require('express');
const router = express.Router();
const seedDatabase = require('../seed');

// This is our secret route. When visited, it runs the seed script.
router.get('/seed-the-database-please', async (req, res) => {
  const message = await seedDatabase();
  res.send(message);
});

module.exports = router;