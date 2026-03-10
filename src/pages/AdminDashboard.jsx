import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlurAnimation, SlideAnimation, StaggerAnimation, DropAnimation } from '../components/ScrollAnimations';
import { useTheme } from '../context/useTheme';

export default function AdminDashboard() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

  // Mock admin data - will come from Supabase
  const pendingResources = [
    { id: 1, title: 'Classroom Safety Guidelines', teacher: 'Jane Doe', school: 'ABC School', category: 'Documentation', date: '2024-03-08' },
    { id: 2, title: 'Peer Mentoring Activity Pack', teacher: 'John Smith', school: 'XYZ Academy', category: 'Activities', date: '2024-03-07' },
    { id: 3, title: 'Belonging Survey Template', teacher: 'Maria Garcia', school: 'DEF International', category: 'Assessments', date: '2024-03-06' },
  ];

  const allTeachers = [
    { id: 1, name: 'Jane Doe', school: 'ABC School', resources: 3, joined: '2024-01-15', status: 'active' },
    { id: 2, name: 'John Smith', school: 'XYZ Academy', resources: 5, joined: '2024-02-01', status: 'active' },
    { id: 3, name: 'Maria Garcia', school: 'DEF International', resources: 2, joined: '2024-02-20', status: 'active' },
  ];

  const platformStats = [
    { label: 'Total Resources', value: 142, icon: '📚', change: '+12 this week', color: 'from-brand-blue to-brand-teal' },
    { label: 'Active Teachers', value: allTeachers.length, icon: '👥', change: '+3 this month', color: 'from-brand-teal to-brand-purple' },
    { label: 'Pending Review', value: pendingResources.length, icon: '⏳', change: 'Needs attention', color: 'from-brand-purple to-brand-blue' },
    { label: 'Total Downloads', value: '2.4K', icon: '⬇️', change: '+18% vs last month', color: 'from-brand-blue to-brand-teal' },
  ];

  const handleApprove = (id) => {
    // TODO: Implement Supabase update
    console.log('Approved resource:', id);
  };

  const handleReject = (id) => {
    // TODO: Implement Supabase update
    console.log('Rejected resource:', id);
  };

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
                <h1 className="text-sm sm:text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Admin Dashboard</h1>
                <p className="hidden sm:block text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>Platform Management</p>
              </div>
            </Link>
            <div className="flex-1" />
            <div className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-brand-purple to-brand-blue text-white">
              ADMIN
            </div>
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
              <h2 className="text-3xl font-bold mb-2">Admin Control Panel 🛠️</h2>
              <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                Manage resources, users, and platform content
              </p>
            </section>
          </BlurAnimation>

          {/* Platform Stats */}
          <StaggerAnimation delay={0.2} staggerDelay={0.1}>
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {platformStats.map((stat, idx) => (
                <DropAnimation key={stat.label} delay={idx * 0.1} distance={30}>
                  <div className="card-surface p-6 space-y-3 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-brand-blue">{stat.value}</div>
                      <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>{stat.label}</p>
                      <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{stat.change}</p>
                    </div>
                  </div>
                </DropAnimation>
              ))}
            </section>
          </StaggerAnimation>

          {/* Tabs */}
          <div className="flex gap-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === 'pending' 
                  ? 'border-b-2 border-brand-blue text-brand-blue' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Pending Resources ({pendingResources.length})
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === 'teachers' 
                  ? 'border-b-2 border-brand-blue text-brand-blue' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Teachers ({allTeachers.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === 'analytics' 
                  ? 'border-b-2 border-brand-blue text-brand-blue' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Pending Resources Tab */}
          {activeTab === 'pending' && (
            <BlurAnimation delay={0.3} duration={0.8}>
              <section className="card-surface p-6 sm:p-8 md:p-10 space-y-8">
                <h3 className="text-2xl font-bold">Resources Awaiting Approval</h3>
                <StaggerAnimation delay={0.4} staggerDelay={0.1}>
                  <div className="space-y-4">
                    {pendingResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="glass p-6 rounded-lg"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">📄</span>
                              <div className="flex-1">
                                <h4 className="font-bold text-lg">{resource.title}</h4>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                  <span className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                    By <span className="font-semibold text-brand-teal">{resource.teacher}</span>
                                  </span>
                                  <span className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                    {resource.school}
                                  </span>
                                  <span className="pill bg-white/10 light:bg-slate-200 text-xs">{resource.category}</span>
                                  <span className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                    Submitted {new Date(resource.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(resource.id)}
                              className="px-4 py-2 rounded-lg bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/30 transition-all font-semibold"
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => handleReject(resource.id)}
                              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30 transition-all font-semibold"
                            >
                              × Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </StaggerAnimation>
              </section>
            </BlurAnimation>
          )}

          {/* Teachers Tab */}
          {activeTab === 'teachers' && (
            <BlurAnimation delay={0.3} duration={0.8}>
              <section className="card-surface p-6 sm:p-8 md:p-10 space-y-8">
                <h3 className="text-2xl font-bold">Registered Educators</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">School</th>
                        <th className="text-left py-3 px-4 font-semibold">Resources</th>
                        <th className="text-left py-3 px-4 font-semibold">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTeachers.map((teacher) => (
                        <tr key={teacher.id} className="border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9' }}>
                          <td className="py-4 px-4 font-medium">{teacher.name}</td>
                          <td className="py-4 px-4" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{teacher.school}</td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold">
                              {teacher.resources}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                            {new Date(teacher.joined).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/30">
                              {teacher.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-sm text-brand-blue hover:text-brand-teal transition-colors">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </BlurAnimation>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <BlurAnimation delay={0.3} duration={0.8}>
              <section className="card-surface p-6 sm:p-8 md:p-10 space-y-8 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold">Analytics Dashboard</h3>
                <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Detailed analytics and insights will be implemented with data visualization
                </p>
              </section>
            </BlurAnimation>
          )}
        </main>
      </div>
    </div>
  );
}
