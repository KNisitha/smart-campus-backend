const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true },
  leaveType: { type: String, required: true, enum: ['medical', 'personal', 'other'] },
  status: { type: String, required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewComment: { type: String }
}, { timestamps: true });

leaveRequestSchema.path('fromDate').validate(function(value) {
  return value <= this.toDate;
}, 'fromDate must not be after toDate');

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
