// config/db.js
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // Disable query logging
});

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Export sequelize and connectDB
module.exports = { sequelize, connectDB };
