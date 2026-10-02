const express = require('express');
const LostFound = require('../models/LostFound');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await LostFound.find();

    res.json({
      success: true,
      count: items.length,
      data: items
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
    const item = await LostFound.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Lost and found item created successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;