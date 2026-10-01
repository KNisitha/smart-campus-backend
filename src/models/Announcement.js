const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetRole: { type: String, required: true, enum: ['all', 'student', 'faculty'], default: 'all' },
  targetDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  targetYear: { type: Number },
  priority: { type: String, required: true, enum: ['normal', 'important', 'urgent'], default: 'normal' },
  expiresAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
