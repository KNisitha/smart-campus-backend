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

module.exports = router;