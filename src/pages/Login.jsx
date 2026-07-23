import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import { GlassCard, Button, Pill, Input, AppHeader, AppFooter, Divider } from '../components/DesignSystem';

export default function Login() {
  const { theme, toggle } = useTheme();
  const { login, isUsingSupabase } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'teacher',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isDark = theme === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const sessionUser = await login({
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });
      setLoading(false);
      navigate(sessionUser.role === 'admin' ? '/dashboard/admin' : '/dashboard/teacher');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Unable to sign in right now. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={isDark ? '' : 'light'}>
      <div className="min-h-screen" style={{ backgroundColor: isDark ? '#0d1117' : '#f8fafc' }}>

        <AppHeader>
          <button
            onClick={() => navigate(-1)}
            className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs sm:text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-contain border" style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
            <div>
              <span className="text-sm sm:text-base font-semibold">Project Apnapan</span>
              <p className="hidden sm:block text-xs opacity-50">Educator Portal</p>
            </div>
          </Link>
          <div className="flex-1" />
          <button onClick={toggle} className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs sm:text-sm" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            {isDark ? '☀' : '☽'}
          </button>
        </AppHeader>

        <main className="container-wide min-h-[calc(100vh-4rem)] flex items-center justify-center py-16">
          <div className="w-full max-w-md mx-auto space-y-8">
            <GlassCard padding="p-6 sm:p-8 md:p-10">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                  <h2 className="headline-section">Welcome Back</h2>
                  <p className="body-base opacity-60">
                    Sign in to access your educator dashboard
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="teacher@school.edu"
                  />

                  <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />

                  {!isUsingSupabase && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold opacity-80">Sign in as</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                        style={{
                          backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                          borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                          color: isDark ? '#f1f5f9' : '#0f172a',
                        }}
                      >
                        <option value="teacher">Educator</option>
                      </select>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded accent-brand-teal" />
                      <span className="opacity-60">Remember me</span>
                    </label>
                    <Link to="/login" className="text-brand-accent hover:opacity-80 transition-opacity font-semibold">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-base"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <Divider text="Or continue with" />

                {/* Social Login */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border font-medium transition-all hover:bg-white/5"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                    color: isDark ? '#f1f5f9' : '#0f172a',
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm opacity-60">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-brand-accent hover:opacity-80 transition-opacity font-semibold">
                    Sign up here
                  </Link>
                </p>
              </div>
            </GlassCard>

            {/* Info Section */}
            <div className="glass-card p-6 space-y-2">
              <Pill color="teal">For Educators</Pill>
              <p className="body-small opacity-70">
                Share resources, access community materials, and collaborate with educators nationwide.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}