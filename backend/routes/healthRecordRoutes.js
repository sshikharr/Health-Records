const express = require('express');
const { getHealthRecords, createHealthRecord, updateHealthRecord, deleteHealthRecord, getHealthRecordById } = require('../controllers/healthRecordController');
const auth = require('../middleware/authMiddleware')
const router = express.Router();

// Get all records
router.get('/', getHealthRecords);

// Create a new record
router.post('/', createHealthRecord);

// Update a record
router.put('/:id', updateHealthRecord);

// Delete a record
router.delete('/:id', deleteHealthRecord);

// Single record
router.get('/:id', getHealthRecordById)

module.exports = router;
