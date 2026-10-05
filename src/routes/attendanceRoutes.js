const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { studentId, subjectId, status } = req.query;
    const query = {};

    if (studentId) query.studentId = studentId;
    if (subjectId) query.subjectId = subjectId;
    if (status) query.status = status;

    const attendance = await Attendance.find(query);

    res.json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid attendance ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Attendance created successfully',
      data: attendance
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
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      data: attendance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Attendance update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      message: 'Attendance deleted successfully',
      data: attendance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid attendance ID',
      error: error.message
    });
  }
});

module.exports = router;