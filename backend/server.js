const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const adminRoutes = require('./routes/adminRoutes'); // Import adminRoutes
const authMiddleware = require('./middleware/authMiddleware'); // Import authMiddleware

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Use the CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials
}));

// Middleware
app.use(express.json());
app.use(cookieParser()); // Add this middleware

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', authMiddleware, courseRoutes); // Protect course routes
app.use('/api/auth', authRoutes); // Add this route
app.use('/api/admin', adminRoutes); // Use adminRoutes

// Additional API to create a student
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send('Student created successfully');
  } catch (error) {
    res.status(500).send('Error creating student: ' + error.message);
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});