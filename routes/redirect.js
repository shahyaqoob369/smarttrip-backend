const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Our database connection pool
const supplierData = require('../data/suppliers.json'); // We still need this for the affiliate marker

router.get('/:serviceName', async (req, res) => {
  const { serviceName } = req.params;
  
  try {
    // Query the database to find the URL for the requested service
    const queryText = 'SELECT url FROM suppliers WHERE service_key = $1';
    const result = await pool.query(queryText, [serviceName]);

    // Check if we found a result
    if (result.rows.length > 0) {
      const supplierUrl = result.rows[0].url;
      const destinationUrl = new URL(supplierUrl);
      
      // We still get the affiliate marker from the json file for now
      destinationUrl.searchParams.append('marker', supplierData.affiliate_marker);
      
      // Send the user to the destination
      res.redirect(302, destinationUrl.toString());
    } else {
      // If the service_key wasn't found in the database
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (err) {
    console.error('Database query error', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;