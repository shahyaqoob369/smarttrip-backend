const pool = require('./config/db');
const suppliersData = require('./data/suppliers.json');

// We now wrap the logic in an exportable function
const seedDatabase = async () => {
  try {
    console.log('Starting to seed the database...');
    await pool.query('DELETE FROM suppliers');
    console.log('Cleared existing suppliers.');

    const serviceKeys = Object.keys(suppliersData.suppliers);

    for (const key of serviceKeys) {
      const supplier = suppliersData.suppliers[key];
      const label = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const queryText = 'INSERT INTO suppliers(service_key, label, url) VALUES($1, $2, $3) RETURNING *';
      const values = [key, label, supplier.url];
      const res = await pool.query(queryText, values);
      console.log(`Added: ${res.rows[0].label}`);
    }

    console.log('Database seeding completed successfully!');
    return "Database seeded successfully!"; // Return a success message
  } catch (error) {
    console.error('Error seeding the database:', error);
    return "Error seeding database."; // Return an error message
  }
  // We no longer call pool.end() here because the server manages the connection.
};

// We now export the function instead of running it automatically.
module.exports = seedDatabase;