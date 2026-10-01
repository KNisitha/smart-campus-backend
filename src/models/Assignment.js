const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
  attachmentUrl: { type: String },
  status: { type: String, required: true, enum: ['active', 'closed', 'draft'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
