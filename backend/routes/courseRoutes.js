const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware');

// Get all courses for a student
router.get('/', authMiddleware, async (req, res) => {
    console.log('Fetching courses for student:', req.user.id);
  try {
    const courses = await Course.find({ students: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all available courses
router.get('/all', authMiddleware, async (req, res) => {
    console.log('Fetching all courses');
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new course
router.post('/', authMiddleware, async (req, res) => {
    console.log('Adding course for student:', req.user.id);
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.students.push(req.user.id);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a course
router.put('/:id', authMiddleware, async (req, res) => {
    console.log('Updating course:', req.params.id);
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a course
router.delete('/:id', authMiddleware, async (req, res) => {
    console.log('Dropping course:', req.params.id);
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.students = course.students.filter(studentId => studentId.toString() !== req.user.id);
    await course.save();
    res.json({ message: 'Course dropped' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;