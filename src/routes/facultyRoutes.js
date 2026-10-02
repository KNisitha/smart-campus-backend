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

module.exports = router;