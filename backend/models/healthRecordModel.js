const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  date: { type: Date, required: true },
  bodyTemperature: { type: Number, required: true },
  bloodPressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true },
  },
  heartRate: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
