import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlurAnimation, SlideAnimation } from '../components/ScrollAnimations';
import { useTheme } from '../context/useTheme';

export default function Login() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // TODO: Implement Supabase authentication
    console.log('Login attempt:', formData);
    
    // Temporary navigation for UI testing
    setTimeout(() => {
      setLoading(false);
      // navigate('/dashboard/teacher'); // Will enable after Supabase integration
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="min-h-screen" style={{
        background: theme === 'dark' ? '#0d1117' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      }}>
        {/* Header */}
        <header className="sticky top-0 z-20 border-b" style={{
          backgroundColor: theme === 'dark' ? 'rgba(10,14,20,0.97)' : 'rgba(255,255,255,0.97)',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e5e7eb',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="container-wide flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all hover:bg-white/5"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569'
              }}
            >
              ← Back
            </button>
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-contain border border-white/20 light:border-slate-300 bg-white/5 p-1 shadow-lg" />
              <div>
                <h1 className="text-sm sm:text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Project Apnapan</h1>
                <p className="hidden sm:block text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>Educator Portal</p>
              </div>
            </Link>
            <div className="flex-1" />
            <button
              onClick={toggle}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569'
              }}
            >
              {theme === 'dark' ? '☀ Light' : '☽ Dark'}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-wide py-16">
          <div className="max-w-md mx-auto">
            <BlurAnimation delay={0} duration={0.8}>
              <div className="card-surface p-6 sm:p-8 md:p-10 space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold">Welcome Back</h2>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
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
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                      }}
                      placeholder="teacher@school.edu"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                      }}
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-brand-blue hover:text-brand-teal transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4" style={{ 
                      backgroundColor: theme === 'dark' ? '#0d1117' : '#ffffff',
                      color: theme === 'dark' ? '#64748b' : '#94a3b8' 
                    }}>
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border font-medium transition-all hover:bg-white/5"
                  style={{
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                    color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
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
                <p className="text-center text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-brand-blue hover:text-brand-teal transition-colors font-semibold">
                    Sign up here
                  </Link>
                </p>
              </div>
            </BlurAnimation>

            {/* Info Section */}
            <SlideAnimation direction="up" delay={0.2}>
              <div className="mt-8 p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? 'rgba(126,184,212,0.05)' : 'rgba(126,184,212,0.1)',
                borderColor: theme === 'dark' ? 'rgba(126,184,212,0.2)' : 'rgba(126,184,212,0.3)'
              }}>
                <h3 className="font-bold text-brand-teal mb-2">For Educators</h3>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                  Share resources, access community materials, and collaborate with educators nationwide.
                </p>
              </div>
            </SlideAnimation>
          </div>
        </main>
      </div>
    </div>
  );
}
