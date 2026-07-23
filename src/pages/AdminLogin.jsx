import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import { GlassCard, Button, Input, AppHeader, Divider } from '../components/DesignSystem';

const DEFAULT_ADMIN_EMAIL = 'buttysaylee4@gmail.com';

export default function AdminLogin() {
  const { theme, toggle } = useTheme();
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const adminEmail = DEFAULT_ADMIN_EMAIL;
  const isDark = theme === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const sessionUser = await login({ email: adminEmail, password, role: 'admin' });
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
              <span className="text-sm sm:text-base font-semibold">Admin Portal</span>
              <p className="hidden sm:block text-xs opacity-50">Restricted Access</p>
            </div>
          </Link>
          <div className="flex-1" />
          <button onClick={toggle} className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs sm:text-sm" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            {isDark ? '☀' : '☽'}
          </button>
        </AppHeader>

        <main className="container-wide min-h-[calc(100vh-4rem)] flex items-center justify-center py-16">
          <div className="w-full max-w-md mx-auto">
            <GlassCard padding="p-6 sm:p-8 md:p-10">
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h2 className="headline-section">Admin Sign In</h2>
                  <p className="body-base opacity-60">
                    Enter the admin password to continue.
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Admin Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter admin password"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-base"
                  >
                    {loading ? 'Signing in...' : 'Sign In As Admin'}
                  </Button>
                </form>

                <Divider />
                <p className="text-center text-sm opacity-60">
                  Educator account?{' '}
                  <Link to="/login" className="text-brand-accent hover:opacity-80 transition-opacity font-semibold">
                    Go to educator login
                  </Link>
                </p>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}