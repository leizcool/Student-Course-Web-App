const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Course = require('../models/Course');
const router = express.Router();

// Admin signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log('Admin signup request received:', req.body);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ username, password: hashedPassword });
      await admin.save();
      console.log('Admin created successfully');
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error code
        console.error('Duplicate username error:', error);
        res.status(400).json({ message: 'Username already exists' });
      } else {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  });

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a student
router.post('/students', async (req, res) => {
  const { studentNumber, password, firstName, lastName, address, city, phoneNumber, email, program, favoriteTopic, strongestSkill } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      studentNumber,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      city,
      phoneNumber,
      email,
      program,
      favoriteTopic,
      strongestSkill
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// List all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all students taking a specific course
router.get('/courses/:courseId/students', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('students');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course.students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a course
router.post('/courses', async (req, res) => {
  const { courseCode, courseName, section, semester } = req.body;
  try {
    const newCourse = new Course({
      courseCode,
      courseName,
      section,
      semester
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;