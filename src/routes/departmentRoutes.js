const express = require('express');
const Department = require('../models/Department');

const router = express.Router();

// Get all departments
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

module.exports = router;