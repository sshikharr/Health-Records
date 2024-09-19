const express = require('express');
const { getHealthRecords, createHealthRecord, updateHealthRecord, deleteHealthRecord, getHealthRecordById } = require('../controllers/healthRecordController');
const auth = require('../middleware/authMiddleware')
const router = express.Router();

// Get all records
router.get('/', auth, getHealthRecords);

// Create a new record
router.post('/', auth, createHealthRecord);

// Update a record
router.put('/:id', auth, updateHealthRecord);

// Delete a record
router.delete('/:id', auth, deleteHealthRecord);

// Single record
router.get('/:id', auth, getHealthRecordById)

module.exports = router;
