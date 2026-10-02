const express = require('express');
const CareerProfile = require('../models/CareerProfile');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const profiles = await CareerProfile.find();

    res.json({
      success: true,
      count: profiles.length,
      data: profiles
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
    const profile = await CareerProfile.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Career profile created successfully',
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;