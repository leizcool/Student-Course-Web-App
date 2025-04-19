import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change here
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminSignUp from './components/AdminSignUp';
import StudentLogin from './components/StudentLogin';
import AddStudent from './components/AddStudent';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/admin-signup" element={<AdminSignUp/>} />
        <Route path="/student-login" element={<StudentLogin/>} />
        <Route path="/student-signup" element={<AddStudent/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;



/* import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
};

export default App; */
