const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  hodName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
