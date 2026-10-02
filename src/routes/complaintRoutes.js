const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();

    res.json({
      success: true,
      count: complaints.length,
      data: complaints
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
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;