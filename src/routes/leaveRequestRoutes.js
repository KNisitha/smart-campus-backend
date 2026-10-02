const express = require('express');
const LeaveRequest = require('../models/LeaveRequest');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();

    res.json({
      success: true,
      count: leaveRequests.length,
      data: leaveRequests
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
    const leaveRequest = await LeaveRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Leave request created successfully',
      data: leaveRequest
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;