const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { studentId, category, priority, status } = req.query;
    const query = {};

    if (studentId) query.studentId = studentId;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const complaints = await Complaint.find(query);

    res.json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({ success: true, data: complaint });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid complaint ID',
      error: error.message
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

router.patch('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint updated successfully',
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Complaint update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint deleted successfully',
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid complaint ID',
      error: error.message
    });
  }
});

module.exports = router;