const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['academic', 'hostel', 'transport', 'infrastructure', 'faculty', 'other'] },
  priority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  status: { type: String, required: true, enum: ['pending', 'in-progress', 'resolved', 'rejected'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminComment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
