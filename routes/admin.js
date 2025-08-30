const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/admin/suppliers
// @desc    Get all suppliers
// @access  Private
router.get('/suppliers', authMiddleware, async (req, res) => {
  try {
    const allSuppliers = await pool.query('SELECT * FROM suppliers ORDER BY id ASC');
    res.json(allSuppliers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/suppliers/:id
// @desc    Update a supplier's URL
// @access  Private
router.put('/suppliers/:id', authMiddleware, async (req, res) => {
  const { url } = req.body;
  const { id } = req.params;

  try {
    const updatedSupplier = await pool.query(
      'UPDATE suppliers SET url = $1 WHERE id = $2 RETURNING *',
      [url, id]
    );

    if (updatedSupplier.rows.length === 0) {
      return res.status(404).json({ msg: 'Supplier not found' });
    }

    res.json(updatedSupplier.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;