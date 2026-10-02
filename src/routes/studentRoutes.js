const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/students called');

    const students = await Student.find();

    console.log('Students found:', students.length);

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Student API Error:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;