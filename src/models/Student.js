const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registerNumber: { type: String, required: true, unique: true },
  rollNumber: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  section: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  admissionYear: { type: Number },
  skills: [{
    name: { type: String },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
