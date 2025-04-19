import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api';
import './styles/NavBar.css';
import './styles/SignUp.css';
import Footer from './Footer';

const AddStudent = () => {
  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', formData, {
        withCredentials: true // Include credentials in the request
      });
      alert('Student data successfully saved!');
      navigate('/student-login');
    } catch (error) {
      console.error('Error saving student data:', error);
      alert('An error occurred while saving the data.');
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
        <h1>Student Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="studentNumber"
            placeholder="Student Number"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="program"
            placeholder="Program"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="favoriteTopic"
            placeholder="Favorite Topic"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="strongestSkill"
            placeholder="Strongest Technical Skill"
            onChange={handleChange}
            required
            className="input"
          />
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddStudent;