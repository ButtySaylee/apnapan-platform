import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import FeedbackButton from './components/FeedbackButton';

const Landing = lazy(() => import('./pages/Landing'));
const Community = lazy(() => import('./pages/Community'));
const SchoolPartnership = lazy(() => import('./pages/SchoolPartnership'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BelongingCalculator = lazy(() => import('./components/BelongingCalculator'));

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
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
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
        </Suspense>
        <FeedbackButton />
      </Router>
    </ThemeProvider>
  );
}
