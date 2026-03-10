import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlurAnimation, SlideAnimation, StaggerAnimation, DropAnimation } from '../components/ScrollAnimations';
import { useTheme } from '../context/useTheme';

export default function TeacherDashboard() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Mock user data - will come from Supabase
  const userData = {
    name: 'Jane Doe',
    school: 'ABC International School',
    subject: 'Mathematics',
    email: 'jane@school.edu'
  };

  // Mock resources - will come from Supabase
  const myResources = [
    { id: 1, title: 'Belonging Circle Prompts for 9th Grade', category: 'Activities', downloads: 45, date: '2024-03-05', status: 'approved' },
    { id: 2, title: 'Student Voice Survey Template', category: 'Assessments', downloads: 32, date: '2024-02-28', status: 'approved' },
    { id: 3, title: 'Classroom Safety Guidelines', category: 'Documentation', downloads: 18, date: '2024-02-15', status: 'pending' },
  ];

  const stats = [
    { label: 'Resources Shared', value: myResources.length, icon: '📚', color: 'from-brand-blue to-brand-teal' },
    { label: 'Total Downloads', value: myResources.reduce((sum, r) => sum + r.downloads, 0), icon: '⬇️', color: 'from-brand-teal to-brand-purple' },
    { label: 'Community Impact', value: '95', icon: '🌟', color: 'from-brand-purple to-brand-blue' },
  ];

  const handleLogout = () => {
    // TODO: Implement Supabase logout
    localStorage.removeItem('user');
    navigate('/login');
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
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-contain border border-white/20 light:border-slate-300 bg-white/5 p-1 shadow-lg" />
              <div>
                <h1 className="text-sm sm:text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Educator Dashboard</h1>
                <p className="hidden sm:block text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>{userData.name}</p>
              </div>
            </Link>
            <div className="flex-1" />
            <Link to="/community" className="text-sm font-medium transition-colors hidden sm:block" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              Community
            </Link>
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
            <button
              onClick={handleLogout}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569'
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-wide space-y-20 py-16">
          {/* Welcome Section */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Welcome back, {userData.name.split(' ')[0]}! 👋</h2>
                  <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {userData.school} · {userData.subject}
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  <span>📤</span> Upload Resource
                </button>
              </div>
            </section>
          </BlurAnimation>

          {/* Stats Overview */}
          <StaggerAnimation delay={0.2} staggerDelay={0.1}>
            <section className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat, idx) => (
                <DropAnimation key={stat.label} delay={idx * 0.1} distance={30}>
                  <div className="card-surface p-6 space-y-3 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{stat.icon}</span>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${stat.color} text-white`}>
                        Active
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-brand-blue">{stat.value}</div>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{stat.label}</p>
                    </div>
                  </div>
                </DropAnimation>
              ))}
            </section>
          </StaggerAnimation>

          {/* My Resources */}
          <BlurAnimation delay={0.3} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">My Resources</h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm rounded-lg border transition-all" style={{
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                    color: theme === 'dark' ? '#cbd5e1' : '#475569'
                  }}>
                    All
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-lg border transition-all" style={{
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                    color: theme === 'dark' ? '#cbd5e1' : '#475569'
                  }}>
                    Approved
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-lg border transition-all" style={{
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                    color: theme === 'dark' ? '#cbd5e1' : '#475569'
                  }}>
                    Pending
                  </button>
                </div>
              </div>

              <StaggerAnimation delay={0.4} staggerDelay={0.1}>
                <div className="space-y-4">
                  {myResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="glass p-6 rounded-lg hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📄</span>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg">{resource.title}</h4>
                              <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className="pill bg-white/10 light:bg-slate-200 text-xs">{resource.category}</span>
                                <span className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                  {resource.downloads} downloads
                                </span>
                                <span className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                  {new Date(resource.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            resource.status === 'approved' 
                              ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                              : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                          }`}>
                            {resource.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                          </span>
                          <button className="px-3 py-1.5 text-sm rounded-lg border transition-all hover:bg-white/5" style={{
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0'
                          }}>
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </StaggerAnimation>

              {myResources.length === 0 && (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl">📚</div>
                  <h4 className="text-xl font-bold">No resources yet</h4>
                  <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    Start sharing your materials with the community
                  </p>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="btn btn-primary"
                  >
                    Upload Your First Resource
                  </button>
                </div>
              )}
            </section>
          </BlurAnimation>

          {/* Quick Actions */}
          <SlideAnimation direction="up" delay={0.5}>
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="card-surface p-6 space-y-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-3xl">🔍</div>
                <h4 className="font-bold">Browse Resources</h4>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Explore materials shared by other educators
                </p>
              </div>
              <div className="card-surface p-6 space-y-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-3xl">📊</div>
                <h4 className="font-bold">View Analytics</h4>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Track impact and engagement of your resources
                </p>
              </div>
              <div className="card-surface p-6 space-y-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-3xl">⚙️</div>
                <h4 className="font-bold">Settings</h4>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Update profile and notification preferences
                </p>
              </div>
            </section>
          </SlideAnimation>
        </main>

        {/* Upload Modal Placeholder */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}>
            <div className="card-surface max-w-lg w-full p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Upload Resource</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-2xl hover:opacity-70 transition-opacity"
                >
                  ×
                </button>
              </div>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📤</div>
                <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Upload modal component will be implemented with file handling
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
