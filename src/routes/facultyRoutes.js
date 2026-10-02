const express = require('express');
const Faculty = require('../models/Faculty');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find();

    res.json({
      success: true,
      count: faculty.length,
      data: faculty
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
    const faculty = await Faculty.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: faculty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;