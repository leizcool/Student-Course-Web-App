import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <nav className="navbar">
        <img src="/logoTechWebsite.png" alt="System Logo" />
        <div>
          {/* Replace <a> tags with <Link> */}
          <Link to="/admin-login">Admin</Link>
          {/* hide this link */}
          {/* <Link to="/admin-signup">Admin Sign Up</Link>       */}
        </div>
      </nav>
      <div className="home-container">
        <h1 className="welcome-text">Welcome to the Student/Course System</h1>
        <p className="sub-text">Manage students and courses.</p>
        <div className="button-container">
          {/* Add working buttons to navigate */}
          <Link to="/student-login">
            <button>Student Login</button>
          </Link>
          <Link to="/student-signup">
            <button>Student Sign Up</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
