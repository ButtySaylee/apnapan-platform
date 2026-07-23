import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import { GlassCard, Button, Pill, Input, AppHeader, AppFooter, Divider, Modal } from '../components/DesignSystem';

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
  const isDark = theme === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

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
        setVerificationEmail(formData.email.trim());
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseVerifyPopup = () => {
    setShowVerifyPopup(false);
    navigate('/login');
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
                  <h2 className="headline-section">Join Our Community</h2>
                  <p className="body-base opacity-60">
                    Create an account to share and access educator resources
                  </p>
                </div>

                {/* Messages */}
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Full Name"
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                  />

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

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="School Name"
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      placeholder="ABC School"
                    />
                    <Input
                      label="Subject Area"
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Math"
                    />
                  </div>

                  <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Min. 8 characters"
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter password"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-base"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <p className="text-xs text-center opacity-50">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>

                {/* Sign In Link */}
                <Divider />
                <p className="text-center text-sm opacity-60">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-accent hover:opacity-80 transition-opacity font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </GlassCard>

            {/* Info Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-card p-4 space-y-2">
                <span className="text-2xl">📚</span>
                <h4 className="font-bold text-sm">Share Resources</h4>
                <p className="text-xs opacity-70">Upload lessons, activities, and tools</p>
              </div>
              <div className="glass-card p-4 space-y-2">
                <span className="text-2xl">🤝</span>
                <h4 className="font-bold text-sm">Collaborate</h4>
                <p className="text-xs opacity-70">Connect with educators nationwide</p>
              </div>
            </div>
          </div>
        </main>

        {/* Verification Popup */}
        <Modal isOpen={showVerifyPopup} onClose={handleCloseVerifyPopup} title="Verify Your Email">
          <div className="space-y-6">
            <p className="body-base opacity-70">
              Your account has been created. You can now log in.
            </p>
            <p className="text-sm font-semibold text-brand-accent">
              {verificationEmail}
            </p>
            <div className="flex justify-end">
              <Button variant="primary" onClick={handleCloseVerifyPopup}>
                Go To Sign In
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}