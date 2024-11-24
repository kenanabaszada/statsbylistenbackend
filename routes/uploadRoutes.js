// /routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Import the upload middleware
const uploadController = require('../controllers/uploadController'); // Import the controller

// POST route to upload a CSV file
router.post('/upload', upload.single('csvFile'), uploadController.uploadCSV);

module.exports = router;
