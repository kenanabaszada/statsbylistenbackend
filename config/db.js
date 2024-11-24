// require('dotenv').config();
// const { Pool } = require('pg');

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// module.exports = pool;
const { Sequelize } = require('sequelize');

// Set up Sequelize connection to PostgreSQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST,    // e.g., localhost
  dialect: 'postgres',
  username: process.env.DB_USER,  // Database username
  password: process.env.DB_PASSWORD,  // Database password
  database: process.env.DB_NAME,  // Database name
  logging: false,  // Disable logging
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
