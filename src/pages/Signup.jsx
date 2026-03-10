import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlurAnimation, SlideAnimation } from '../components/ScrollAnimations';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';

export default function Signup() {
  const { theme, toggle } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    school: '',
    subject: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        school: formData.school.trim(),
        subject: formData.subject.trim(),
      });
      setLoading(false);
      if (result.requiresEmailVerification) {
        const signupEmail = formData.email.trim();
        setVerificationEmail(signupEmail);
        setSuccess('Account created. Please verify your email address before signing in.');
        setShowVerifyPopup(true);
        return;
      }
      navigate('/dashboard/teacher');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Unable to create account right now. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCloseVerifyPopup = () => {
    setShowVerifyPopup(false);
    navigate('/login');
  };

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="min-h-screen" style={{
        background: theme === 'dark' ? '#0d1117' : 'linear-gradient(180deg, #e9eff6 0%, #f8fafc 42%)',
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
                  <h2 className="text-3xl font-bold">Join Our Community</h2>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    Create an account to share and access educator resources
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
                    {success}
                  </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                      }}
                      placeholder="Jane Doe"
                    />
                  </div>

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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="school" className="block text-sm font-semibold">
                        School Name
                      </label>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                          color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                        }}
                        placeholder="ABC School"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-semibold">
                        Subject Area
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                          color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                        }}
                        placeholder="Math"
                      />
                    </div>
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
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                      }}
                      placeholder="Re-enter password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <p className="text-xs text-center" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>

                {/* Sign In Link */}
                <p className="text-center text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-blue hover:text-brand-teal transition-colors font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </BlurAnimation>

            {/* Info Section */}
            <SlideAnimation direction="up" delay={0.2}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg border" style={{
                  backgroundColor: theme === 'dark' ? 'rgba(126,184,212,0.05)' : 'rgba(126,184,212,0.1)',
                  borderColor: theme === 'dark' ? 'rgba(126,184,212,0.2)' : 'rgba(126,184,212,0.3)'
                }}>
                  <div className="text-2xl mb-2">📚</div>
                  <h4 className="font-bold text-sm mb-1">Share Resources</h4>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                    Upload lessons, activities, and tools
                  </p>
                </div>
                <div className="p-4 rounded-lg border" style={{
                  backgroundColor: theme === 'dark' ? 'rgba(155,135,245,0.05)' : 'rgba(155,135,245,0.1)',
                  borderColor: theme === 'dark' ? 'rgba(155,135,245,0.2)' : 'rgba(155,135,245,0.3)'
                }}>
                  <div className="text-2xl mb-2">🤝</div>
                  <h4 className="font-bold text-sm mb-1">Collaborate</h4>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                    Connect with educators nationwide
                  </p>
                </div>
              </div>
            </SlideAnimation>
          </div>
        </main>
      </div>

      {showVerifyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.72)' : 'rgba(15,23,42,0.45)' }}
            onClick={handleCloseVerifyPopup}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border p-6 space-y-4" style={{
            backgroundColor: theme === 'dark' ? '#161b22' : '#ffffff',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
            boxShadow: theme === 'dark' ? '0 20px 45px rgba(0,0,0,0.4)' : '0 20px 45px rgba(15,23,42,0.18)',
          }}>
            <h3 className="text-xl font-bold">Verify Your Email</h3>
            <p className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
              Your account is has been created. You can now Login.
            </p>
            <p className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#93c5fd' : '#1d4ed8' }}>
              {verificationEmail}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCloseVerifyPopup}
                className="btn btn-primary"
              >
                Go To Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
