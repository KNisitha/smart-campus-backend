const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();

    res.json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;