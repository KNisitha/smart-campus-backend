const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

console.log('USER ROUTES LOADED - NEW VERSION');

const router = express.Router();


// ===============================
// GET ALL USERS
// ===============================
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ===============================
// GET USER BY ID
// ===============================
router.get('/:id', async (req, res) => {

  console.log('USER GET BY ID HIT:', req.params.id);

  try {
    const user = await User.findById(req.params.id)
      .select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('GET USER ERROR:', error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ===============================
// CREATE USER
// ===============================
router.post('/', async (req, res) => {

  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      profileImage,
      isActive
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'name, email, password and role are required'
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      phone,
      profileImage,
      isActive
    });

    const safeUser = await User.findById(user._id)
      .select('-passwordHash');

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: safeUser
    });

  } catch (error) {

    console.error('CREATE USER ERROR:', error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ===============================
// UPDATE USER
// ===============================
router.patch('/:id', async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      phone,
      profileImage,
      isActive
    } = req.body;

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (email !== undefined) {
      updateData.email = email.toLowerCase();
    }

    if (password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    if (role !== undefined) {
      updateData.role = role;
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    if (profileImage !== undefined) {
      updateData.profileImage = profileImage;
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });

  } catch (error) {

    console.error('UPDATE USER ERROR:', error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ===============================
// DELETE USER
// ===============================
router.delete('/:id', async (req, res) => {

  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const safeUser = user.toObject();

    delete safeUser.passwordHash;

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: safeUser
    });

  } catch (error) {

    console.error('DELETE USER ERROR:', error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;