const express = require('express');
const Student = require('../models/Student');

const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();


// GET ALL STUDENTS + SEARCH + FILTER
router.get(
  '/',
  authMiddleware,
  authorizeRoles('student', 'faculty', 'admin'),
  async (req, res) => {
    try {
      const {
        search,
        departmentId,
        year,
        semester,
        section
      } = req.query;

      const query = {};

      if (search) {
        query.$or = [
          {
            name: {
              $regex: search,
              $options: 'i'
            }
          },
          {
            registerNumber: {
              $regex: search,
              $options: 'i'
            }
          }
        ];
      }

      if (departmentId) {
        query.departmentId = departmentId;
      }

      if (year) {
        query.year = Number(year);
      }

      if (semester) {
        query.semester = Number(semester);
      }

      if (section) {
        query.section = section;
      }

      const students = await Student.find(query);

      res.json({
        success: true,
        count: students.length,
        data: students
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch students',
        error: error.message
      });
    }
  }
);


// GET STUDENT BY ID
router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('student', 'faculty', 'admin'),
  async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        data: student
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Invalid student ID',
        error: error.message
      });
    }
  }
);


// CREATE STUDENT - ADMIN ONLY
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      console.log('POST /api/students called');
      console.log('Request body:', req.body);

      const student = await Student.create(req.body);

      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: student
      });

    } catch (error) {
      console.error('Student POST Error:', error);

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);


// UPDATE STUDENT - ADMIN ONLY
router.patch(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Update data is required'
        });
      }

      const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        message: 'Student updated successfully',
        data: student
      });

    } catch (error) {
      console.error('Student PATCH Error:', error);

      res.status(400).json({
        success: false,
        message: 'Student update failed',
        error: error.message
      });
    }
  }
);


// DELETE STUDENT - ADMIN ONLY
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        message: 'Student deleted successfully',
        data: student
      });

    } catch (error) {
      console.error('Student DELETE Error:', error);

      res.status(400).json({
        success: false,
        message: 'Invalid student ID',
        error: error.message
      });
    }
  }
);


module.exports = router;