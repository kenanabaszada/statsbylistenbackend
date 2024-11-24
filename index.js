require('dotenv').config();  

const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./config/db'); 
const uploadRoutes = require('./routes/uploadRoutes');  
const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable Cross-Origin Requests

// Test route to verify database connection
app.get('/api/test', async (req, res) => {
  try {
    // Using Sequelize query example
    const result = await sequelize.query('SELECT * FROM pgtest');
    res.json(result[0]); // Sequelize returns the result as an array
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ error: 'Failed to fetch data', err: err.message });
  }
});

// Setup file upload route
app.use('/api/', uploadRoutes);

// Connect to the database using Sequelize
connectDB();

// Start the server
app.listen(port, () => {  
  console.log(`Server running on port ${port}`);
});
