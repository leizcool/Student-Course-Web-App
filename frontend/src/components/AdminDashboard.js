import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import './styles/NavBar.css';
import './styles/AdminDashboard.css';
import Footer from './Footer';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [studentsInCourse, setStudentsInCourse] = useState([]);
  const navigate = useNavigate();

  const [newStudent, setNewStudent] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: '',
    favoriteTopic: '',
    strongestSkill: '',
  });

  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/students', { withCredentials: true });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/courses', { withCredentials: true });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/students', newStudent, {
        withCredentials: true,
      });
      setStudents([...students, response.data]);
      alert('Student added successfully');
      setNewStudent({
        studentNumber: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        phoneNumber: '',
        email: '',
        program: '',
        favoriteTopic: '',
        strongestSkill: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/courses', newCourse, {
        withCredentials: true,
      });
      setCourses([...courses, response.data]);
      alert('Course added successfully');
      setNewCourse({
        courseCode: '',
        courseName: '',
        section: '',
        semester: '',
      });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleFetchStudentsInCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/courses/${selectedCourseId}/students`, {
        withCredentials: true,
      });
      setStudentsInCourse(response.data);
    } catch (error) {
      console.error('Error fetching students in course:', error);
    }
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="dashboard-container">
    {/* NAVBAR */}
    <nav className="navbar">
      <Link to="/" className="home-link">
        <img src="/home-icon.png" alt="Home" />
        Home
      </Link>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>

    {/* DASHBOARD GRID */}
    <div className="dashboard-grid">
      <div className="full-width-admin">
        <h1>Welcome to Admin Dashboard</h1>
      </div>
      <div className="card full-width">
        <h2>List Students in a Course</h2>
        <form onSubmit={handleFetchStudentsInCourse} className="form">
          <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} required className="input">
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.courseCode} - {course.courseName}</option>
            ))}
          </select>
          <button type="submit" className="button">Fetch Students</button>
        </form>
        <ul className="list">
          {studentsInCourse.map((student) => (
            <li key={student._id}>{student.studentNumber} - {student.firstName} {student.lastName}</li>
          ))}
        </ul>
      </div>

        {/* STUDENTS LIST */}
        <div className="card">
          <h2>All Students</h2>
          <ul className="list">
            {students.map((student) => (
              <li key={student._id}>
                {student.studentNumber} - {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* ADD STUDENT FORM */}
        <div className="card">
          <h2>Add a Student</h2>
          <form onSubmit={handleAddStudent} className="form">
            {Object.keys(newStudent).map((key) => (
              <input
                key={key}
                type={key === "password" ? "password" : "text"}
                name={key}
                value={newStudent[key]}
                onChange={(e) => setNewStudent({ ...newStudent, [key]: e.target.value })}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                required
                className="input"
              />
            ))}
            <button type="submit" className="button">Add Student</button>
          </form>
        </div>

        {/* COURSES LIST */}
        <div className="card">
          <h2>All Courses</h2>
          <ul className="list">
            {courses.map((course) => (
              <li key={course._id}>
                {course.courseCode} - {course.courseName}
              </li>
            ))}
          </ul>
        </div>

        {/* ADD COURSE FORM */}
        <div className="card">
          <h2>Add a Course</h2>
          <form onSubmit={handleAddCourse} className="form">
            {Object.keys(newCourse).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={newCourse[key]}
                onChange={(e) => setNewCourse({ ...newCourse, [key]: e.target.value })}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                required
                className="input"
              />
            ))}
            <button type="submit" className="button">Add Course</button>
          </form>
        </div>
      </div>

    {/* FOOTER */}
    <Footer />
  </div>
  );
};

export default AdminDashboard;