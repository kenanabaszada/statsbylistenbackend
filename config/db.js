const { Sequelize } = require('sequelize');

// Create Sequelize instance using the connection string
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',            // Specify dialect explicitly
  logging: false,                 // Disable query logging
  ssl: true,                      // Enable SSL for Render DB
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,  // Necessary for Render self-signed certs
    },
  },
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

module.exports = { sequelize, connectDB };
