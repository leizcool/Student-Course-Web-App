import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import './styles/NavBar.css';
import './styles/StudentLogin.css';
import Footer from './Footer';

const StudentLogin = () => {
  const [credentials, setCredentials] = useState({
    studentNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students/login', credentials, {
        withCredentials: true // Include credentials in the request
      });
      if (response.status === 200) {
        //alert('Login successful');
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid student number or password');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="home-link">
          <img src="/home-icon.png" alt="Home" />
          Home
        </Link>
      </nav>
      <div className="container">
        <h1>Student Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentNumber"
            value={credentials.studentNumber}
            onChange={handleChange}
            placeholder="Student Number"
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLogin;