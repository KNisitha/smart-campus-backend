const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['lost', 'found'] },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  status: { type: String, required: true, enum: ['active', 'claimed', 'closed'], default: 'active' },
  contactInfo: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);
