const express = require('express');
const EventRegistration = require('../models/EventRegistration');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { eventId, studentId, attendanceStatus } = req.query;
    const query = {};

    if (eventId) query.eventId = eventId;
    if (studentId) query.studentId = studentId;
    if (attendanceStatus) query.attendanceStatus = attendanceStatus;

    const registrations = await EventRegistration.find(query);

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event registrations',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const registration = await EventRegistration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Event registration not found'
      });
    }

    res.json({ success: true, data: registration });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid registration ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const registration = await EventRegistration.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Event registration created successfully',
      data: registration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const registration = await EventRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Event registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Event registration updated successfully',
      data: registration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Event registration update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const registration = await EventRegistration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Event registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Event registration deleted successfully',
      data: registration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid registration ID',
      error: error.message
    });
  }
});

module.exports = router;