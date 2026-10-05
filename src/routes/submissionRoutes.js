const express = require('express');
const Submission = require('../models/Submission');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { assignmentId, studentId, status } = req.query;
    const query = {};

    if (assignmentId) query.assignmentId = assignmentId;
    if (studentId) query.studentId = studentId;
    if (status) query.status = status;

    const submissions = await Submission.find(query);

    res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({ success: true, data: submission });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid submission ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const submission = await Submission.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      data: submission
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
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission updated successfully',
      data: submission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Submission update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission deleted successfully',
      data: submission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid submission ID',
      error: error.message
    });
  }
});

module.exports = router;