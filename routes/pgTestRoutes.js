// routes/pgTestRoutes.js
const express = require('express');
const {
  getAllPgTests,
  getPgTestById,
  createPgTest,
  updatePgTest,
  deletePgTest,
} = require('../controllers/pgTestController'); // Import controller

const router = express.Router();

// GET all PgTest records
router.get('/pgtests', getAllPgTests);

// GET a single PgTest record by ID
router.get('/pgtests/:id', getPgTestById);

// POST: Create a new PgTest record
router.post('/pgtests', createPgTest);

// PUT: Update a PgTest record by ID
router.put('/pgtests/:id', updatePgTest);

// DELETE: Delete a PgTest record by ID
router.delete('/pgtests/:id', deletePgTest);

module.exports = router;
