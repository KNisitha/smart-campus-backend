const express = require('express');
const LostFound = require('../models/LostFound');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lostFound = await LostFound.find();

    res.json({
      success: true,
      count: lostFound.length,
      data: lostFound
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;