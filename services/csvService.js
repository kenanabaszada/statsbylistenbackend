const fs = require('fs');
const csv = require('csv-parser');
const { User } = require('../models/userModel');

const processCSVData = async (filePath) => {
  const users = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Map CSV data to user model fields
        const userData = {
          username: data.username,
          email: data.email,
          password: data.password, 
        };
        users.push(userData);
      })
      .on('end', async () => {
        // Save users to DB
        await User.bulkCreate(users); // Bulk insert for efficiency
        resolve(users);
      })
      .on('error', (err) => reject(err));
  });
};

module.exports = { processCSVData };
