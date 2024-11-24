// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./config/db');
const PgTest = require('./models/pgTest'); // Import models here
const pgTestRoutes = require('./routes/pgTestRoutes'); 
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Sync Models
const initializeModels = async () => {
  await PgTest.sync({ alter: true }); // Ensure the table exists or update it
  console.log('PgTest table synced successfully!');
};

// Connect DB and Initialize Models
connectDB()
  .then(initializeModels)
  .catch((err) => console.error('Error initializing models:', err));

// Routes
app.get('/api/test', async (req, res) => {
  try {
    const result = await sequelize.query('SELECT * FROM pgtest');
    res.json(result[0]);
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ error: 'Failed to fetch data', err: err.message });
  }
});

app.use('/api', pgTestRoutes); 
// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
