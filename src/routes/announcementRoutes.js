const express = require('express');
const Announcement = require('../models/Announcement');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();

    res.json({
      success: true,
      count: announcements.length,
      data: announcements
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
    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;