const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, departmentId, semester, facultyId } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }

    if (departmentId) query.departmentId = departmentId;
    if (semester) query.semester = Number(semester);
    if (facultyId) query.facultyId = facultyId;

    const subjects = await Subject.find(query);

    res.json({
      success: true,
      count: subjects.length,
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subjects',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid subject ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Update data is required'
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject updated successfully',
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Subject update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject deleted successfully',
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid subject ID',
      error: error.message
    });
  }
});

module.exports = router;