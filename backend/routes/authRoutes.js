const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

dotenv.config();

// Register route (for students)
router.post('/register', async (req, res) => {
   const { studentNumber, password, firstName, lastName, email, program } = req.body;

   // Check if student already exists
   const studentExists = await Student.findOne({ email });
   if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
   }

   // Hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   // Create the student
   const newStudent = new Student({
      studentNumber,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      program,
   });

   try {
      await newStudent.save();
      res.status(201).json({ message: 'Student registered successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Error registering student', error });
   }
});

// Login route (for students)
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   // Check if student exists
   const student = await Student.findOne({ email });
   if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
   }

   // Compare the password with the hashed password stored in DB
   const isMatch = await bcrypt.compare(password, student.password);
   if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
   }

   // Generate a JWT token
   const token = jwt.sign(
      { id: student._id, studentNumber: student.studentNumber, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
   );

   // Set token in HTTP-only cookie
   res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      sameSite: 'strict', // Cross-site cookie protection
   });

   res.status(200).json({ message: 'Logged in successfully', token });
});

// Middleware to protect routes and check if user is authenticated
const protect = (req, res, next) => {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
   }
};

// Example of protected route
router.get('/profile', protect, async (req, res) => {
   try {
      const student = await Student.findById(req.user.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });

      res.status(200).json({
         firstName: student.firstName,
         lastName: student.lastName,
         email: student.email,
         program: student.program,
      });
   } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
   }
});

// Get current student
router.get('/me', authMiddleware, async (req, res) => {
   try {
     const student = await Student.findById(req.user.id).select('-password');
     res.json(student);
   } catch (error) {
     console.error('Error fetching student:', error);
     res.status(500).json({ message: 'Server error' });
   }
 });

module.exports = router;
