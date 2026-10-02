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

module.exports = router;