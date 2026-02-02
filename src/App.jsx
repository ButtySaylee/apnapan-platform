import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Community from './pages/Community';
import SchoolPartnership from './pages/SchoolPartnership';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/community" element={<Community />} />
        <Route path="/schools" element={<SchoolPartnership />} />
      </Routes>
    </Router>
  );
}
