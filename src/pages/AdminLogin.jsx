import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlurAnimation } from '../components/ScrollAnimations';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';

const DEFAULT_ADMIN_EMAIL = 'buttysaylee4@gmail.com';

export default function AdminLogin() {
  const { theme, toggle } = useTheme();
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const adminEmail = DEFAULT_ADMIN_EMAIL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const sessionUser = await login({
        email: adminEmail,
        password,
        role: 'admin',
      });

      if (sessionUser.role !== 'admin') {
        await logout();
        throw new Error('This account is not an admin account.');
      }

      navigate('/dashboard/admin');
    } catch (err) {
      setError(err.message || 'Unable to sign in right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div
        className="min-h-screen"
        style={{
          background: theme === 'dark' ? '#0d1117' : 'linear-gradient(180deg, #e9eff6 0%, #f8fafc 42%)',
          color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
        }}
      >
        <header
          className="sticky top-0 z-20 border-b"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(10,14,20,0.97)' : 'rgba(255,255,255,0.97)',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e5e7eb',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="container-wide flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
            <button
              onClick={() => navigate(-1)}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569',
              }}
            >
              ← Back
            </button>
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-contain border border-white/20 light:border-slate-300 bg-white/5 p-1 shadow-lg" />
              <div>
                <h1 className="text-sm sm:text-lg font-semibold">Admin Portal</h1>
                <p className="hidden sm:block text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>Restricted Access</p>
              </div>
            </Link>
            <div className="flex-1" />
            <button
              onClick={toggle}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569',
              }}
            >
              {theme === 'dark' ? '☀ Light' : '☽ Dark'}
            </button>
          </div>
        </header>

        <main className="container-wide py-16">
          <div className="max-w-md mx-auto">
            <BlurAnimation delay={0} duration={0.8}>
              <div className="card-surface p-6 sm:p-8 md:p-10 space-y-8">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold">Admin Sign In</h2>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    Enter the admin password to continue.
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold">Admin Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In As Admin'}
                  </button>
                </form>

                <p className="text-center text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Educator account?{' '}
                  <Link to="/login" className="text-brand-blue hover:text-brand-teal transition-colors font-semibold">
                    Go to educator login
                  </Link>
                </p>
              </div>
            </BlurAnimation>
          </div>
        </main>
      </div>
    </div>
  );
}
