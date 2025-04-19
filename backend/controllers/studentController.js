const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

// Add a new student
const addStudent = async (req, res) => {
  try {
    const { studentNumber, password, firstName, lastName, email } = req.body;

    // Validate required fields
    if (!studentNumber || !password || !firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate student number or email
    const existingStudent = await Student.findOne({ $or: [{ studentNumber }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student number or email already exists' });
    }

    // Hash the password before saving the student
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student and save it to the database
    const student = new Student({
      ...req.body,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({
      message: 'Student added successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

module.exports = { addStudent, getStudents };
