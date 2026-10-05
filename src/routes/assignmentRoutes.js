const express = require('express');
const Assignment = require('../models/Assignment');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, subjectId, facultyId, status } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (subjectId) query.subjectId = subjectId;
    if (facultyId) query.facultyId = facultyId;
    if (status) query.status = status;

    const assignments = await Assignment.find(query);

    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid assignment ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: assignment
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
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    res.json({
      success: true,
      message: 'Assignment updated successfully',
      data: assignment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Assignment update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    res.json({
      success: true,
      message: 'Assignment deleted successfully',
      data: assignment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid assignment ID',
      error: error.message
    });
  }
});

module.exports = router;