const express = require('express');
const EventRegistration = require('../models/EventRegistration');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const registrations = await EventRegistration.find();

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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

module.exports = router;