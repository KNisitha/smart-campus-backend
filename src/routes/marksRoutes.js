const express = require('express');
const Marks = require('../models/Marks');

const router = express.Router();


// ==========================================
// GET ALL + FILTER
// ==========================================
router.get('/', async (req, res) => {
  try {

    const {
      studentId,
      subjectId,
      examType
    } = req.query;

    const query = {};

    if (studentId) {
      query.studentId = studentId;
    }

    if (subjectId) {
      query.subjectId = subjectId;
    }

    if (examType) {
      query.examType = examType;
    }

    const marks = await Marks.find(query);

    res.json({
      success: true,
      count: marks.length,
      data: marks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to fetch marks',
      error: error.message
    });

  }
});


// ==========================================
// GET MARKS BY ID
// ==========================================
router.get('/:id', async (req, res) => {
  try {

    const marks = await Marks.findById(req.params.id);

    if (!marks) {
      return res.status(404).json({
        success: false,
        message: 'Marks record not found'
      });
    }

    res.json({
      success: true,
      data: marks
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: 'Invalid marks ID',
      error: error.message
    });

  }
});


// ==========================================
// CREATE MARKS
// ==========================================
router.post('/', async (req, res) => {
  try {

    const {
      studentId,
      subjectId,
      examType,
      marksObtained,
      maxMarks,
      examDate,
      enteredBy
    } = req.body;


    // Required fields
    if (
      !studentId ||
      !subjectId ||
      !examType ||
      marksObtained === undefined ||
      maxMarks === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'studentId, subjectId, examType, marksObtained and maxMarks are required'
      });
    }


    // Marks validation
    if (Number(marksObtained) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Marks obtained cannot be negative'
      });
    }


    if (Number(maxMarks) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Max marks cannot be negative'
      });
    }


    if (Number(marksObtained) > Number(maxMarks)) {
      return res.status(400).json({
        success: false,
        message: 'Marks obtained cannot exceed max marks'
      });
    }


    const marks = await Marks.create({
      studentId,
      subjectId,
      examType,
      marksObtained,
      maxMarks,
      examDate,
      enteredBy
    });


    res.status(201).json({
      success: true,
      message: 'Marks created successfully',
      data: marks
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
});


// ==========================================
// UPDATE MARKS
// ==========================================
router.patch('/:id', async (req, res) => {
  try {

    const marks = await Marks.findById(req.params.id);

    if (!marks) {
      return res.status(404).json({
        success: false,
        message: 'Marks record not found'
      });
    }


    // Final values after update
    const finalMarksObtained =
      req.body.marksObtained !== undefined
        ? Number(req.body.marksObtained)
        : Number(marks.marksObtained);


    const finalMaxMarks =
      req.body.maxMarks !== undefined
        ? Number(req.body.maxMarks)
        : Number(marks.maxMarks);


    // Validate negative marks
    if (finalMarksObtained < 0) {
      return res.status(400).json({
        success: false,
        message: 'Marks obtained cannot be negative'
      });
    }


    if (finalMaxMarks < 0) {
      return res.status(400).json({
        success: false,
        message: 'Max marks cannot be negative'
      });
    }


    // Validate obtained marks <= maximum marks
    if (finalMarksObtained > finalMaxMarks) {
      return res.status(400).json({
        success: false,
        message: 'Marks obtained cannot exceed max marks'
      });
    }


    // Update provided fields only
    if (req.body.studentId !== undefined) {
      marks.studentId = req.body.studentId;
    }

    if (req.body.subjectId !== undefined) {
      marks.subjectId = req.body.subjectId;
    }

    if (req.body.examType !== undefined) {
      marks.examType = req.body.examType;
    }

    if (req.body.marksObtained !== undefined) {
      marks.marksObtained = finalMarksObtained;
    }

    if (req.body.maxMarks !== undefined) {
      marks.maxMarks = finalMaxMarks;
    }

    if (req.body.examDate !== undefined) {
      marks.examDate = req.body.examDate;
    }

    if (req.body.enteredBy !== undefined) {
      marks.enteredBy = req.body.enteredBy;
    }


    await marks.save();


    res.json({
      success: true,
      message: 'Marks updated successfully',
      data: marks
    });

  } catch (error) {

    console.error('Marks PATCH Error:', error);

    res.status(400).json({
      success: false,
      message: 'Marks update failed',
      error: error.message
    });

  }
});


// ==========================================
// DELETE MARKS
// ==========================================
router.delete('/:id', async (req, res) => {
  try {

    const marks = await Marks.findByIdAndDelete(req.params.id);

    if (!marks) {
      return res.status(404).json({
        success: false,
        message: 'Marks record not found'
      });
    }

    res.json({
      success: true,
      message: 'Marks deleted successfully',
      data: marks
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: 'Invalid marks ID',
      error: error.message
    });

  }
});


module.exports = router;