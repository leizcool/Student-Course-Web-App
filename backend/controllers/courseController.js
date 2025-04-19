const Course = require('../models/Course');

// Add a new course
const addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('students');
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get students for a specific course
const getStudentsForCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course.students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addCourse, getCourses, getStudentsForCourse };
