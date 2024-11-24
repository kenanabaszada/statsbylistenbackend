// models/pgTest.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Import sequelize correctly

if (!sequelize) {
  console.error('Sequelize instance is undefined');
}

const PgTest = sequelize.define('PgTest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'pgtest', // Explicitly specify table name
  timestamps: false,   // Disable createdAt and updatedAt columns
});

module.exports = PgTest;
console.log('Sequelize instance:', sequelize);
