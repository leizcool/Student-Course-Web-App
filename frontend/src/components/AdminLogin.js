import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/api';
import './styles/NavBar.css';
import './styles/AdminLogin.css';
import Footer from './Footer';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', credentials, {
        withCredentials: true
      });
      if (response.status === 200) {
        //alert('Login successful');
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid username or password');
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
      <div className="login-container">
        <h1>Admin Login</h1>
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
          <button type="submit" className="button">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;