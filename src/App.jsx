import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Community from './pages/Community';
import SchoolPartnership from './pages/SchoolPartnership';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BelongingCalculator from './components/BelongingCalculator';
import FeedbackButton from './components/FeedbackButton';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Preserve scroll on browser back/forward navigation.
    if (navigationType === 'POP') {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, search, navigationType]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/schools" element={<SchoolPartnership />} />
          <Route path="/calculator" element={<BelongingCalculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/educator" element={<TeacherDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <FeedbackButton />
      </Router>
    </ThemeProvider>
  );
}
