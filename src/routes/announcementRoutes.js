const express = require('express');
const Announcement = require('../models/Announcement');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, targetRole, targetDepartment, targetYear, priority } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (targetRole) query.targetRole = targetRole;
    if (targetDepartment) query.targetDepartment = targetDepartment;
    if (targetYear) query.targetYear = Number(targetYear);
    if (priority) query.priority = priority;

    const announcements = await Announcement.find(query);

    res.json({
      success: true,
      count: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid announcement ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement
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
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      data: announcement
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Announcement update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: 'Announcement deleted successfully',
      data: announcement
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid announcement ID',
      error: error.message
    });
  }
});

module.exports = router;