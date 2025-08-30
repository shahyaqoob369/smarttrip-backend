const pool = require('./config/db');
const suppliersData = require('./data/suppliers.json');

const seedDatabase = async () => {
  try {
    console.log('Starting to seed the database...');

    // Clear any existing data in the suppliers table
    await pool.query('DELETE FROM suppliers');
    console.log('Cleared existing suppliers.');

    // Get the list of service keys from the JSON file
    const serviceKeys = Object.keys(suppliersData.suppliers);

    // Loop through each service and insert it into the database
    for (const key of serviceKeys) {
      const supplier = suppliersData.suppliers[key];
      // A simple way to create a user-friendly label from the key
      const label = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      const queryText = 'INSERT INTO suppliers(service_key, label, url) VALUES($1, $2, $3) RETURNING *';
      const values = [key, label, supplier.url];
      
      const res = await pool.query(queryText, values);
      console.log(`Added: ${res.rows[0].label}`);
    }

    console.log('Database seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    console.log('Seed script finished.');
  }
};

seedDatabase();