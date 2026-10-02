const express = require('express');
const Submission = require('../models/Submission');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find();

    res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;