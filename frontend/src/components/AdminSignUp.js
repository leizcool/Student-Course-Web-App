import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/api';
import './styles/NavBar.css';
import './styles/SignUp.css';
import Footer from './Footer';

const AdminSignUp = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting admin signup form:', credentials);
    try {
      const response = await axios.post('http://localhost:5000/api/admin/signup', credentials, {
        withCredentials: true
      });
      console.log('Admin signup response:', response);
      if (response.status === 201) {
        alert('Admin created successfully');
        navigate('/admin-login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.status === 400) {
        alert('Username already exists');
      } else {
        alert('An error occurred while signing up');
      }
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
        <h1>Admin Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
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
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSignUp;