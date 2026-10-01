const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['symposium', 'hackathon', 'workshop', 'seminar', 'sports', 'cultural', 'placement', 'other'] },
  venue: { type: String, required: true },
  eventDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  organizer: { type: String, required: true },
  capacity: { type: Number },
  registrationRequired: { type: Boolean, default: false },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
