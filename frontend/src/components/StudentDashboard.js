import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import './styles/NavBar.css';
import './styles/Dashboard.css';
import Footer from './Footer';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [newCourseId, setNewCourseId] = useState('');
  const [updateCourseId, setUpdateCourseId] = useState('');
  const [updateCourseSection, setUpdateCourseSection] = useState('');
  const [dropCourseId, setDropCourseId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/student-login');
      }
    };

    // Fetch all courses taken by the student
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses for student');
        const response = await axios.get('http://localhost:5000/api/courses', {
          withCredentials: true
        });
        console.log('Courses fetched:', response.data);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Fetch all available courses
    const fetchAllCourses = async () => {
      try {
        console.log('Fetching all courses');
        const response = await axios.get('http://localhost:5000/api/courses/all', {
          withCredentials: true
        });
        console.log('All courses fetched:', response.data);
        setAllCourses(response.data);
      } catch (error) {
        console.error('Error fetching all courses:', error);
      }
    };

    fetchUser();
    fetchCourses();
    fetchAllCourses();
  }, [navigate]);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    // Check if the course is already added
    const courseExists = courses.some(course => course._id === newCourseId);
    if (courseExists) {
      alert('Course is already added.');
      return;
    }
    try {
      console.log('Adding course:', newCourseId);
      const response = await axios.post('http://localhost:5000/api/courses', { courseId: newCourseId }, {
        withCredentials: true
      });
      console.log('Course added:', response.data);
      setCourses([...courses, response.data]);
      setNewCourseId('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating course:', updateCourseId);
      const response = await axios.put(`http://localhost:5000/api/courses/${updateCourseId}`, { section: updateCourseSection }, {
        withCredentials: true
      });
      console.log('Course updated:', response.data);
      setCourses(courses.map(course => course._id === updateCourseId ? response.data : course));
      setUpdateCourseId('');
      setUpdateCourseSection('');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDropCourse = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to drop this course?')) {
      try {
        console.log('Dropping course:', dropCourseId);
        await axios.delete(`http://localhost:5000/api/courses/${dropCourseId}`, {
          withCredentials: true
        });
        console.log('Course dropped');
        setCourses(courses.filter(course => course._id !== dropCourseId));
        setDropCourseId('');
      } catch (error) {
        console.error('Error dropping course:', error);
      }
    }
  };

  const handleLogout = () => {
    // Implement logout functionality
    navigate('/student-login');
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="home-link">
          <img src="/home-icon.png" alt="Home" />
          Home
        </Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      <div className="container">
        <h1>Student Dashboard</h1>
        {user && (
          <div>
            <h2>Welcome, {user.firstName} {user.lastName}</h2>
            <p>Email: {user.email}</p>
            <p>Program: {user.program}</p>
          </div>
        )}
        <form onSubmit={handleAddCourse} className="form">
          <select value={newCourseId} onChange={(e) => setNewCourseId(e.target.value)} required className="input">
            <option value="">Select a course to add</option>
            {allCourses.map(course => (
              <option key={course._id} value={course._id}>{course.courseCode} - {course.courseName}</option>
            ))}
          </select>
          <button type="submit" className="button">Add Course</button>
        </form>
        <form onSubmit={handleUpdateCourse} className="form">
          <select value={updateCourseId} onChange={(e) => setUpdateCourseId(e.target.value)} required className="input">
            <option value="">Select a course to update</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.courseCode} - {course.courseName}</option>
            ))}
          </select>
          <input
            type="text"
            value={updateCourseSection}
            onChange={(e) => setUpdateCourseSection(e.target.value)}
            placeholder="New section"
            required
            className="input"
          />
          <button type="submit" className="button">Update Course</button>
        </form>
        <form onSubmit={handleDropCourse} className="form">
          <select value={dropCourseId} onChange={(e) => setDropCourseId(e.target.value)} required className="input">
            <option value="">Select a course to drop</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.courseCode} - {course.courseName}</option>
            ))}
          </select>
          <button type="submit" className="button">Drop Course</button>
        </form>
        <h2>Courses Taken</h2>
        <ul>
          {courses.map(course => (
            <li key={course._id}>
              {course.courseCode} - {course.courseName} - Section: {course.section}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;