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

module.exports = router;