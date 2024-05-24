import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Home from './pages/Home.jsx';
import MatchSchedule from './pages/MatchSchedule.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PlayerCareer from './components/PlayerCareer.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/match-schedule" element={<MatchSchedule />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/player' element={< PlayerCareer />} />

      </Routes>
    </Router>
  );
}

export default App;
