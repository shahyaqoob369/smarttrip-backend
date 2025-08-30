const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const supplierData = require('../data/suppliers.json');

router.get('/:serviceName', async (req, res) => {
  const { serviceName } = req.params;
  
  try {
    const queryText = 'SELECT url FROM suppliers WHERE service_key = $1';
    const result = await pool.query(queryText, [serviceName]);

    if (result.rows.length > 0) {
      const supplierUrl = result.rows[0].url;
      const destinationUrl = new URL(supplierUrl);
      destinationUrl.searchParams.append('marker', supplierData.affiliate_marker);
      
      // Instead of redirecting, send the URL back as JSON data
      res.json({ url: destinationUrl.toString() });

    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (err) {
    console.error('Database query error', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;