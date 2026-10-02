const express = require('express');
const Marks = require('../models/Marks');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const marks = await Marks.find();

    res.json({
      success: true,
      count: marks.length,
      data: marks
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
    const marks = await Marks.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Marks created successfully',
      data: marks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;