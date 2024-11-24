// controllers/pgTestController.js
const PgTest = require('../models/pgTest'); // Import the PgTest model

// GET: Retrieve all records from PgTest
const getAllPgTests = async (req, res) => {
  try {
    const pgTests = await PgTest.findAll(); // Find all records
    res.status(200).json(pgTests);
  } catch (error) {
    console.error('Error retrieving PgTest records:', error);
    res.status(500).json({ message: 'Error retrieving PgTest records', error: error.message });
  }
};

// GET: Retrieve a single record by ID
const getPgTestById = async (req, res) => {
  const { id } = req.params; // Get ID from URL params
  try {
    const pgTest = await PgTest.findByPk(id); // Find record by primary key (ID)
    if (!pgTest) {
      return res.status(404).json({ message: 'PgTest not found' });
    }
    res.status(200).json(pgTest);
  } catch (error) {
    console.error('Error retrieving PgTest record by ID:', error);
    res.status(500).json({ message: 'Error retrieving PgTest record', error: error.message });
  }
};

// POST: Create a new PgTest record
const createPgTest = async (req, res) => {
  const { name, description } = req.body; // Get data from the request body
  try {
    const newPgTest = await PgTest.create({ name, description }); // Create new record
    res.status(201).json(newPgTest); // Return the newly created record
  } catch (error) {
    console.error('Error creating PgTest record:', error);
    res.status(500).json({ message: 'Error creating PgTest record', error: error.message });
  }
};

// PUT: Update an existing PgTest record by ID
const updatePgTest = async (req, res) => {
  const { id } = req.params; // Get ID from URL params
  const { name, description } = req.body; // Get new data from request body
  try {
    const pgTest = await PgTest.findByPk(id); // Find record by ID
    if (!pgTest) {
      return res.status(404).json({ message: 'PgTest not found' });
    }
    // Update the record
    pgTest.name = name || pgTest.name;
    pgTest.description = description || pgTest.description;
    await pgTest.save(); // Save the updated record

    res.status(200).json(pgTest); // Return the updated record
  } catch (error) {
    console.error('Error updating PgTest record:', error);
    res.status(500).json({ message: 'Error updating PgTest record', error: error.message });
  }
};

// DELETE: Delete a PgTest record by ID
const deletePgTest = async (req, res) => {
  const { id } = req.params; // Get ID from URL params
  try {
    const pgTest = await PgTest.findByPk(id); // Find record by ID
    if (!pgTest) {
      return res.status(404).json({ message: 'PgTest not found' });
    }
    await pgTest.destroy(); // Delete the record
    res.status(200).json({ message: 'PgTest record deleted successfully' });
  } catch (error) {
    console.error('Error deleting PgTest record:', error);
    res.status(500).json({ message: 'Error deleting PgTest record', error: error.message });
  }
};

module.exports = { getAllPgTests, getPgTestById, createPgTest, updatePgTest, deletePgTest };
