const express = require('express');
const Assignment = require('../models/Assignment');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();

    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;