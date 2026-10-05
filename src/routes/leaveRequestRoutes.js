const express = require('express');
const LeaveRequest = require('../models/LeaveRequest');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { studentId, leaveType, status } = req.query;
    const query = {};

    if (studentId) query.studentId = studentId;
    if (leaveType) query.leaveType = leaveType;
    if (status) query.status = status;

    const requests = await LeaveRequest.find(query);

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leave requests',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    res.json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid leave request ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const request = await LeaveRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Leave request created successfully',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const request = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    res.json({
      success: true,
      message: 'Leave request updated successfully',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Leave request update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const request = await LeaveRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    res.json({
      success: true,
      message: 'Leave request deleted successfully',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid leave request ID',
      error: error.message
    });
  }
});

module.exports = router;