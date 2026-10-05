const express = require('express');
const LostFound = require('../models/LostFound');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, type, status, location } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { itemName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (type) query.type = type;
    if (status) query.status = status;

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const items = await LostFound.find(query);

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lost and found records',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Lost and found record not found'
      });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid lost and found ID',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = await LostFound.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Lost and found record created successfully',
      data: item
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
    const item = await LostFound.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Lost and found record not found'
      });
    }

    res.json({
      success: true,
      message: 'Lost and found record updated successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lost and found update failed',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await LostFound.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Lost and found record not found'
      });
    }

    res.json({
      success: true,
      message: 'Lost and found record deleted successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid lost and found ID',
      error: error.message
    });
  }
});

module.exports = router;