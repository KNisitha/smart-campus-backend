const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.json({
      success: true,
      count: subjects.length,
      data: subjects
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;