const HealthRecord = require('../models/healthRecordModel');

// Get all health records for the authenticated user
exports.getHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find({ user: req.user._id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new health record for the authenticated user
exports.createHealthRecord = async (req, res) => {
  const { date, bodyTemperature, bloodPressure, heartRate } = req.body;

  try {
    const newRecord = new HealthRecord({
      user: req.user._id,  // Associate the health record with the logged-in user
      date,
      bodyTemperature,
      bloodPressure,
      heartRate,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error creating health record' });
  }
};

// Update health record
exports.updateHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Check if the logged-in user owns the record
    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    record.date = req.body.date || record.date;
    record.bodyTemperature = req.body.bodyTemperature || record.bodyTemperature;
    record.bloodPressure = req.body.bloodPressure || record.bloodPressure;
    record.heartRate = req.body.heartRate || record.heartRate;

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete health record
exports.deleteHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Check if the logged-in user owns the record
    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await record.deleteOne();
    res.json({ message: 'Record removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
