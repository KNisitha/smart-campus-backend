const express = require('express');
const CareerProfile = require('../models/CareerProfile');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { studentId, targetCareer } = req.query;
    const query = {};

    if (studentId) query.studentId = studentId;

    if (targetCareer) {
      query.targetCareer = {
        $regex: targetCareer,
        $options: 'i'
      };
    }

    const profiles = await CareerProfile.find(query);

    res.json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch career profiles',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profile = await CareerProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Career profile not found'
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid career profile ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const profile = await CareerProfile.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Career profile created successfully',
      data: profile
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
    const profile = await CareerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Career profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Career profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Career profile update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const profile = await CareerProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Career profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Career profile deleted successfully',
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid career profile ID',
      error: error.message
    });
  }
});

module.exports = router;