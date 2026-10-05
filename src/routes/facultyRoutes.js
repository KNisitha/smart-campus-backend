const express = require('express');
const Faculty = require('../models/Faculty');

const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();


// ==========================================
// GET ALL + SEARCH + FILTER
// ==========================================
router.get(
  '/',
  authMiddleware,
  authorizeRoles('student', 'faculty', 'admin'),
  async (req, res) => {
    try {
      console.log('🔥 FACULTY GET ALL');
      console.log('USER:', req.user);

      const {
        search,
        departmentId,
        designation
      } = req.query;

      const query = {};

      if (search) {
        query.$or = [
          {
            employeeId: {
              $regex: search,
              $options: 'i'
            }
          },
          {
            designation: {
              $regex: search,
              $options: 'i'
            }
          }
        ];
      }

      if (departmentId) {
        query.departmentId = departmentId;
      }

      if (designation) {
        query.designation = designation;
      }

      const faculty = await Faculty.find(query);

      res.json({
        success: true,
        count: faculty.length,
        data: faculty
      });

    } catch (error) {

      console.error('Faculty GET Error:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to fetch faculty',
        error: error.message
      });
    }
  }
);


// ==========================================
// GET FACULTY BY ID
// ==========================================
router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('student', 'faculty', 'admin'),
  async (req, res) => {
    try {
      console.log('🔥 FACULTY GET BY ID');
      console.log('USER:', req.user);

      const faculty = await Faculty.findById(
        req.params.id
      );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: 'Faculty not found'
        });
      }

      res.json({
        success: true,
        data: faculty
      });

    } catch (error) {

      console.error('Faculty GET ID Error:', error);

      res.status(400).json({
        success: false,
        message: 'Invalid faculty ID',
        error: error.message
      });
    }
  }
);


// ==========================================
// CREATE FACULTY - ADMIN ONLY
// ==========================================
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {

    console.log('================================');
    console.log('🔥 FACULTY POST ROUTE REACHED');
    console.log('USER:', req.user);
    console.log('USER ROLE:', req.user?.role);
    console.log('================================');

    try {

      const faculty = await Faculty.create(
        req.body
      );

      res.status(201).json({
        success: true,
        message: 'Faculty created successfully',
        data: faculty
      });

    } catch (error) {

      console.error(
        'Faculty POST Error:',
        error
      );

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);


// ==========================================
// UPDATE FACULTY - ADMIN ONLY
// ==========================================
router.patch(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {

    console.log('🔥 FACULTY PATCH ROUTE');
    console.log('USER:', req.user);

    try {

      if (
        !req.body ||
        Object.keys(req.body).length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: 'Update data is required'
        });
      }

      const faculty =
        await Faculty.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: 'Faculty not found'
        });
      }

      res.json({
        success: true,
        message: 'Faculty updated successfully',
        data: faculty
      });

    } catch (error) {

      console.error(
        'Faculty PATCH Error:',
        error
      );

      res.status(400).json({
        success: false,
        message: 'Faculty update failed',
        error: error.message
      });
    }
  }
);


// ==========================================
// DELETE FACULTY - ADMIN ONLY
// ==========================================
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {

    console.log('🔥 FACULTY DELETE ROUTE');
    console.log('USER:', req.user);

    try {

      const faculty =
        await Faculty.findByIdAndDelete(
          req.params.id
        );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: 'Faculty not found'
        });
      }

      res.json({
        success: true,
        message: 'Faculty deleted successfully',
        data: faculty
      });

    } catch (error) {

      console.error(
        'Faculty DELETE Error:',
        error
      );

      res.status(400).json({
        success: false,
        message: 'Invalid faculty ID',
        error: error.message
      });
    }
  }
);


module.exports = router;