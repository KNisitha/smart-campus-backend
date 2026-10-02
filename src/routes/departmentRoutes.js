const express = require('express');
const Department = require('../models/Department');

const router = express.Router();

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();

    res.json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST create department
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/departments called');
    console.log('Request body:', req.body);

    const department = await Department.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    });
  } catch (error) {
    console.error('Department POST Error:', error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;