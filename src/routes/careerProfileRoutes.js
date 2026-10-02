const express = require('express');
const CareerProfile = require('../models/CareerProfile');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const careerProfiles = await CareerProfile.find();

    res.json({
      success: true,
      count: careerProfiles.length,
      data: careerProfiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;