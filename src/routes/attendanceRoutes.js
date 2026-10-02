const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find();

    res.json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;