const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const router = express.Router();
const { addStudent, getStudents } = require('../controllers/studentController');

// Signup route
router.post('/', async (req, res) => {
    try {
      const { studentNumber, password, firstName, lastName, address, city, phoneNumber, email, program, favoriteTopic, strongestSkill } = req.body;
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
      res.status(201).send('Student created successfully');
    } catch (error) {
      res.status(500).send('Error creating student: ' + error.message);
    }
  });

// Login route
router.post('/login', async (req, res) => {
  const { studentNumber, password } = req.body;
  try {
    const student = await Student.findOne({ studentNumber });
    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: 'Invalid student number or password' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new student
router.post('/', addStudent);

// Route to get all students
router.get('/', getStudents);

module.exports = router;
