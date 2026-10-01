const mongoose = require('mongoose');

const careerProfileSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
  targetCareer: { type: String, required: true },
  skills: [{
    name: { type: String },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
  }],
  skillGaps: [{ type: String }],
  recommendedRoadmap: [{
    topic: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'] }
  }],
  recommendedProjects: [{ type: String }],
  lastAnalyzedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CareerProfile', careerProfileSchema);
