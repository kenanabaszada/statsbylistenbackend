// /controllers/uploadController.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Install the csv-parser library to read CSV files

const uploadCSV = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

  // Parse the CSV file using csv-parser
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      // After parsing the CSV, you can perform any logic here
      console.log('CSV File successfully processed');
      console.log(results); // Log the results of the parsed CSV

      // Send a response back with the parsed data
      res.json({
        message: 'CSV file uploaded and processed successfully',
        data: results, // Send the processed CSV data 
      });

      // Optional: Delete the file after processing (if no longer needed)
      fs.unlinkSync(filePath);
    })
    .on('error', (err) => {
      res.status(500).json({ error: 'Failed to parse CSV', details: err.message });
    });
};

module.exports = { uploadCSV };
