const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

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

router.post('/', async (req, res) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;