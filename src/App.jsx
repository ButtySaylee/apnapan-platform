import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './context/useAuth';
import FeedbackButton from './components/FeedbackButton';

const Landing = lazy(() => import('./pages/Landing'));
const Community = lazy(() => import('./pages/Community'));
const SchoolPartnership = lazy(() => import('./pages/SchoolPartnership'));
const Login = lazy(() => import('./pages/Login'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Signup = lazy(() => import('./pages/Signup'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BelongingCalculator = lazy(() => import('./components/BelongingCalculator'));

function FullScreenLoader({ label = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center px-6">
      <div className="text-center space-y-3">
        <div className="mx-auto h-10 w-10 rounded-full border-2 border-slate-700 border-t-sky-500 animate-spin" />
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </div>
  );
}

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

function defaultDashboardPath(user) {
  if (!user) {
    return '/login';
  }
  return user.role === 'admin' ? '/dashboard/admin' : '/dashboard/teacher';
}

function ProtectedRoute({ children, allowedRoles, redirectTo = '/login' }) {
  const { user, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return <FullScreenLoader label="Checking your educator session..." />;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={defaultDashboardPath(user)} replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <FullScreenLoader label="Loading sign-in..." />;
  }

  if (user) {
    return <Navigate to={defaultDashboardPath(user)} replace />;
  }

  return children;
}

// Only redirect away if the user is already an admin — lets wrongly-role'd sessions retry
function AdminPublicRoute({ children }) {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <FullScreenLoader label="Loading sign-in..." />;
  }

  if (user && user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<FullScreenLoader label="Loading page..." />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/community" element={<Community />} />
              <Route path="/team/:name" element={<Community />} />
              <Route path="/schools" element={<SchoolPartnership />} />
              <Route path="/calculator" element={<BelongingCalculator />} />
              <Route
                path="/login"
                element={(
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                )}
              />
              <Route
                path="/admin/login"
                element={(
                  <AdminPublicRoute>
                    <AdminLogin />
                  </AdminPublicRoute>
                )}
              />
              <Route
                path="/signup"
                element={(
                  <PublicOnlyRoute>
                    <Signup />
                  </PublicOnlyRoute>
                )}
              />
              <Route
                path="/dashboard/teacher"
                element={(
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/dashboard/educator"
                element={<Navigate to="/dashboard/teacher" replace />}
              />
              <Route
                path="/dashboard/admin"
                element={(
                  <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
                    <AdminDashboard />
                  </ProtectedRoute>
                )}
              />
              <Route path="*" element={<Landing />} />
            </Routes>
          </Suspense>
          <FeedbackButton />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
