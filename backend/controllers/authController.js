const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

const login = async (req, res) => {
  const { studentNumber, password } = req.body;

  const student = await Student.findOne({ studentNumber });

  if (!student || !(await bcrypt.compare(password, student.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: student._id, role: 'student' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful' });
};

module.exports = { login };
