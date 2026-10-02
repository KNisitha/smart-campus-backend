const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST create student
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/students called');
    console.log('Request body:', req.body);

    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Student POST Error:', error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;