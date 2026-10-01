const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  examType: { type: String, required: true, enum: ['internal1', 'internal2', 'model', 'assignment', 'practical'] },
  marksObtained: { type: Number, required: true, min: 0 },
  maxMarks: { type: Number, required: true, min: 0 },
  examDate: { type: Date },
  enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

marksSchema.path('marksObtained').validate(function(value) {
  return value <= this.maxMarks;
}, 'Marks obtained cannot exceed max marks');

module.exports = mongoose.model('Marks', marksSchema);
