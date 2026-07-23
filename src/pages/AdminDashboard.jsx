import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import { GlassCard, Button, Pill, Input, AppHeader, Divider, Modal, StatDisplay, MetricCard, ProgressBar, Skeleton } from '../components/DesignSystem';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const CATEGORIES = ['Activities', 'Assessments', 'Curriculum', 'Documentation', 'Guides', 'Other'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB
const UPLOAD_TIMEOUT_MS = 20000;

const fallbackResources = [];

export default function AdminDashboard() {
  const { theme, toggle } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('resources');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState('link'); // 'link' | 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [stories, setStories] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [actionError, setActionError] = useState('');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Activities',
    description: '',
    file_url: '',
    is_public: true,
  });

  const stats = useMemo(() => {
    const shared = resources.filter((r) => r.is_public).length;
    const pendingStories = stories.filter((s) => s.status === 'pending').length;
    return [
      { label: 'All Resources', value: resources.length, icon: '📚' },
      { label: 'Shared Resources', value: shared, icon: '🌐' },
      { label: 'Pending Stories', value: pendingStories, icon: '📝' },
    ];
  }, [resources, stories]);

  const visibleResources = useMemo(() => {
    if (resourceFilter === 'shared') {
      return resources.filter((resource) => resource.is_public);
    }
    return resources;
  }, [resourceFilter, resources]);

  useEffect(() => {
    async function fetchAdminData() {
      setLoadingResources(true);
      setLoadingStories(true);

      if (isSupabaseConfigured && supabase) {
        const [resourcesRes, storiesRes] = await Promise.all([
          supabase
            .from('resources')
            .select('id,title,category,description,file_url,is_public,downloads,created_at,profiles:teacher_id(full_name,school)')
            .order('created_at', { ascending: false }),
          supabase
            .from('community_stories')
            .select('id,author_name,school_name,story_text,status,is_public,created_at')
            .order('created_at', { ascending: false }),
        ]);

        if (!resourcesRes.error && resourcesRes.data) {
          setResources(resourcesRes.data.map((row) => ({
            ...row,
            teacher_name: row.profiles?.full_name || 'Educator',
            school_name: row.profiles?.school || 'School not set',
          })));
        } else {
          setResources(fallbackResources);
        }

        if (!storiesRes.error && storiesRes.data) {
          setStories(storiesRes.data);
        } else {
          setStories([]);
        }

        setLoadingResources(false);
        setLoadingStories(false);
        return;
      }

      setResources(fallbackResources);
      setStories([]);
      setLoadingResources(false);
      setLoadingStories(false);
    }

    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleToggleResourceShare = async (resourceId, nextPublic) => {
    setActionError('');

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('resources')
        .update({ is_public: nextPublic })
        .eq('id', resourceId);

      if (error) {
        setActionError(error.message);
        return;
      }
    }

    setResources((prev) => prev.map((r) => (
      r.id === resourceId ? { ...r, is_public: nextPublic } : r
    )));
  };

  const openUploadModal = () => {
    setActionError('');
    setUploadForm({
      title: '',
      category: 'Activities',
      description: '',
      file_url: '',
      is_public: true,
    });
    setUploadMode('link');
    setSelectedFile(null);
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > FILE_SIZE_LIMIT) {
      setActionError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max allowed is 5 MB.`);
      setSelectedFile(null);
      e.target.value = '';
      return;
    }

    setActionError('');
    setSelectedFile(file);
  };

  const handleAdminUpload = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setActionError('Admin session is missing. Please sign in again.');
      return;
    }

    const trimmedTitle = uploadForm.title.trim();
    const trimmedUrl = uploadForm.file_url.trim();

    if (!trimmedTitle) {
      setActionError('Resource title is required.');
      return;
    }

    if (uploadMode === 'link' && !trimmedUrl) {
      setActionError('Resource link is required.');
      return;
    }

    if (uploadMode === 'file' && !selectedFile) {
      setActionError('Please choose a file to upload.');
      return;
    }

    setUploading(true);
    setActionError('');

    const payload = {
      teacher_id: user.id,
      title: trimmedTitle,
      category: uploadForm.category,
      description: uploadForm.description.trim() || null,
      file_url: null,
      is_public: uploadForm.is_public,
    };

    try {
      if (uploadMode === 'link') {
        try {
          new URL(trimmedUrl);
        } catch {
          throw new Error('Please enter a valid URL (starting with https://).');
        }
        payload.file_url = trimmedUrl;
      } else if (uploadMode === 'file') {
        if (!isSupabaseConfigured || !supabase) {
          throw new Error('File upload requires Supabase Storage to be configured. This avoids temporary uploads disappearing after refresh.');
        } else {
          const ext = selectedFile.name.split('.').pop();
          const path = `${user.id}/admin-${Date.now()}.${ext}`;

          const uploadPromise = supabase.storage
            .from('resources')
            .upload(path, selectedFile, { upsert: false });

          const { error: storageError } = await Promise.race([
            uploadPromise,
            new Promise((_, reject) => {
              window.setTimeout(() => reject(new Error('File upload timed out. Use an external link or check storage bucket policies.')), UPLOAD_TIMEOUT_MS);
            }),
          ]);

          if (storageError) {
            const storageMessage = String(storageError.message || 'Storage upload failed.');
            if (storageMessage.toLowerCase().includes('bucket') || storageMessage.toLowerCase().includes('policy')) {
              throw new Error(`Storage upload failed: ${storageMessage}. Ensure the 'resources' bucket exists and admin storage policies allow uploads.`);
            }
            throw new Error(storageMessage);
          }

          const { data: urlData } = supabase.storage.from('resources').getPublicUrl(path);
          payload.file_url = urlData?.publicUrl || null;
        }
      }

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('resources')
          .insert(payload)
          .select('id,title,category,description,file_url,is_public,downloads,created_at')
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setResources((prev) => ([{
          ...data,
          teacher_name: user.name || 'Admin',
          school_name: user.school || 'School not set',
        }, ...prev]));
      } else {
        setResources((prev) => ([{
          id: `admin-${Date.now()}`,
          title: payload.title,
          category: payload.category,
          description: payload.description,
          file_url: payload.file_url,
          is_public: payload.is_public,
          downloads: 0,
          created_at: new Date().toISOString(),
          teacher_name: user.name || 'Admin',
          school_name: user.school || 'School not set',
        }, ...prev]));
      }

      setShowUploadModal(false);
    } catch (err) {
      setActionError(err.message || 'Failed to upload resource.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    setActionError('');
    if (!window.confirm('Delete this resource? This cannot be undone.')) return;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId);

      if (error) {
        setActionError(error.message);
        return;
      }
    }

    setResources((prev) => prev.filter((r) => r.id !== resourceId));
  };

  const handleApproveStory = async (storyId) => {
    setActionError('');

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('community_stories')
        .update({ status: 'approved', is_public: true })
        .eq('id', storyId);
      if (error) {
        setActionError(error.message);
        return;
      }
    }

    setStories((prev) => prev.map((s) => (
      s.id === storyId ? { ...s, status: 'approved', is_public: true } : s
    )));
  };

  const handleRejectStory = async (storyId) => {
    setActionError('');

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('community_stories')
        .update({ status: 'rejected', is_public: false })
        .eq('id', storyId);
      if (error) {
        setActionError(error.message);
        return;
      }
    }

    setStories((prev) => prev.map((s) => (
      s.id === storyId ? { ...s, status: 'rejected', is_public: false } : s
    )));
  };

  const handleDeleteStory = async (storyId) => {
    setActionError('');
    if (!window.confirm('Delete this story permanently?')) return;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('community_stories')
        .delete()
        .eq('id', storyId);
      if (error) {
        setActionError(error.message);
        return;
      }
    }

    setStories((prev) => prev.filter((s) => s.id !== storyId));
  };

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="min-h-screen" style={{
        background: theme === 'dark' ? '#0d1117' : 'linear-gradient(180deg, #e9eff6 0%, #f8fafc 42%)',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      }}>
        <header className="sticky top-0 z-20 border-b" style={{
          backgroundColor: theme === 'dark' ? 'rgba(10,14,20,0.97)' : 'rgba(255,255,255,0.97)',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#cbd5e1',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="container-wide flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
            <Link
              to="/"
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all hover:opacity-80"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              }}
            >
              ← Home
            </Link>
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-contain border border-white/20 light:border-slate-300 bg-white/5 p-1 shadow-lg" />
              <div>
                <h1 className="text-sm sm:text-lg font-semibold">Admin Control Center</h1>
                <p className="hidden sm:block text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>{user?.name ? `Signed in as ${user.name}` : 'Platform Management'}</p>
              </div>
            </Link>
            <div className="flex-1" />
            <button
              onClick={toggle}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium"
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
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium"
              style={{
                borderColor: theme === 'dark' ? 'rgba(239,68,68,0.35)' : 'rgba(220,38,38,0.28)',
                color: theme === 'dark' ? '#fca5a5' : '#b91c1c',
                backgroundColor: theme === 'dark' ? 'rgba(239,68,68,0.10)' : 'rgba(239,68,68,0.08)',
              }}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="container-wide space-y-12 py-12">
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
              <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                Moderate stories and manage all platform resources (shared and hidden).
              </p>
            </section>
          </BlurAnimation>

          <StaggerAnimation delay={0.2} staggerDelay={0.08}>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <DropAnimation key={stat.label} distance={20}>
                  <div className="card-surface p-5 space-y-2">
                    <div className="text-2xl">{stat.icon}</div>
                    <div className="text-2xl font-bold text-brand-blue">{stat.value}</div>
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{stat.label}</p>
                  </div>
                </DropAnimation>
              ))}
            </section>
          </StaggerAnimation>

          <div className="flex gap-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 font-semibold ${activeTab === 'resources' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500'}`}
            >
              Resource Manager
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-4 py-2 font-semibold ${activeTab === 'stories' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500'}`}
            >
              Story Approval
            </button>
          </div>

          {actionError && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {actionError}
            </p>
          )}

          {activeTab === 'resources' && (
            <BlurAnimation delay={0.3} duration={0.8}>
              <section className="card-surface p-6 sm:p-8 md:p-10 space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">All Resources</h3>
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      View every uploaded resource or focus only on shared resources.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openUploadModal}
                      className="px-3 py-2 rounded-lg border text-sm font-semibold"
                      style={{
                        borderColor: 'rgba(37,99,235,0.35)',
                        color: '#2563eb',
                        backgroundColor: 'rgba(37,99,235,0.08)',
                      }}
                    >
                      + Upload Resource
                    </button>
                    <button
                      onClick={() => setResourceFilter('all')}
                      className="px-3 py-2 rounded-lg border text-sm"
                      style={{
                        borderColor: resourceFilter === 'all' ? '#3b82f6' : (theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1'),
                        color: resourceFilter === 'all' ? '#3b82f6' : (theme === 'dark' ? '#cbd5e1' : '#475569'),
                        backgroundColor: resourceFilter === 'all' ? 'rgba(59,130,246,0.10)' : 'transparent',
                      }}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setResourceFilter('shared')}
                      className="px-3 py-2 rounded-lg border text-sm"
                      style={{
                        borderColor: resourceFilter === 'shared' ? '#10b981' : (theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1'),
                        color: resourceFilter === 'shared' ? '#10b981' : (theme === 'dark' ? '#cbd5e1' : '#475569'),
                        backgroundColor: resourceFilter === 'shared' ? 'rgba(16,185,129,0.10)' : 'transparent',
                      }}
                    >
                      Shared Only
                    </button>
                  </div>
                </div>
                {loadingResources ? (
                  <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Loading resources...</p>
                ) : visibleResources.length === 0 ? (
                  <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    No {resourceFilter === 'shared' ? 'shared ' : ''}resources found.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {visibleResources.map((resource) => (
                      <div key={resource.id} className="glass p-5 rounded-lg">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <h4 className="font-bold text-lg">{resource.title}</h4>
                            <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              {resource.teacher_name} · {resource.school_name}
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="pill bg-white/10 light:bg-slate-200">{resource.category || 'General'}</span>
                              <span className={`px-2 py-0.5 rounded-full border ${resource.is_public ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
                                {resource.is_public ? 'Shared' : 'Hidden'}
                              </span>
                              <span style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{resource.downloads || 0} downloads</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {resource.file_url && (
                              <a
                                href={resource.file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-2 rounded-lg border text-sm"
                                style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1' }}
                              >
                                View
                              </a>
                            )}
                            <button
                              onClick={() => handleToggleResourceShare(resource.id, !resource.is_public)}
                              className="px-3 py-2 rounded-lg border text-sm"
                              style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1' }}
                            >
                              {resource.is_public ? 'Hide' : 'Share'}
                            </button>
                            <button
                              onClick={() => handleDeleteResource(resource.id)}
                              className="px-3 py-2 rounded-lg border text-sm"
                              style={{ borderColor: 'rgba(220,38,38,0.28)', color: '#b91c1c', backgroundColor: 'rgba(239,68,68,0.08)' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </BlurAnimation>
          )}

          {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.72)' : 'rgba(15,23,42,0.45)' }}
                onClick={() => !uploading && setShowUploadModal(false)}
              />
              <form
                onSubmit={handleAdminUpload}
                className="relative z-10 card-surface w-full max-w-2xl p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-bold">Upload Resource as Admin</h3>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-3 py-1.5 rounded-lg border text-sm"
                    disabled={uploading}
                    style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1' }}
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold">
                    Title
                    <input
                      required
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                      }}
                    />
                  </label>
                  <label className="space-y-2 text-sm font-semibold">
                    Category
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                      }}
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold">Resource Source</label>

                  <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0' }}>
                    {[['link', 'External Link', 'Recommended'], ['file', 'Upload File', 'Max 5 MB']].map(([mode, label, hint]) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => { setUploadMode(mode); setActionError(''); setSelectedFile(null); }}
                        className="flex-1 py-2.5 text-sm font-medium transition-all"
                        style={{
                          backgroundColor: uploadMode === mode
                            ? (theme === 'dark' ? 'rgba(59,130,246,0.2)' : '#eff6ff')
                            : (theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc'),
                          color: uploadMode === mode ? '#3b82f6' : (theme === 'dark' ? '#94a3b8' : '#64748b'),
                          borderRight: mode === 'link' ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0'}` : 'none',
                        }}
                      >
                        {label}
                        <span className="block text-xs font-normal opacity-60">{hint}</span>
                      </button>
                    ))}
                  </div>

                  {uploadMode === 'link' ? (
                    <label className="space-y-2 text-sm font-semibold block">
                      Resource Link
                      <input
                        type="url"
                        required
                        value={uploadForm.file_url}
                        onChange={(e) => setUploadForm((prev) => ({ ...prev, file_url: e.target.value }))}
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                          color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                        }}
                      />
                    </label>
                  ) : (
                    <div className="space-y-1">
                      <label
                        className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-brand-blue"
                        style={{
                          borderColor: selectedFile ? '#3b82f6' : (theme === 'dark' ? 'rgba(255,255,255,0.15)' : '#cbd5e1'),
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                        }}
                      >
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                        />
                        {selectedFile ? (
                          <div className="text-center px-4">
                            <p className="text-sm font-medium text-brand-blue">{selectedFile.name}</p>
                            <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              {(selectedFile.size / 1024).toFixed(0)} KB - click to change
                            </p>
                          </div>
                        ) : (
                          <div className="text-center px-4">
                            <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              Click to choose a file (max 5 MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  )}
                </div>

                <label className="space-y-2 text-sm font-semibold block">
                  Description
                  <textarea
                    rows={3}
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  />
                </label>

                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={uploadForm.is_public}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, is_public: e.target.checked }))}
                  />
                  Share immediately to community
                </label>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploading}
                    className="px-4 py-2 rounded-lg border text-sm"
                    style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-blue text-white"
                  >
                    {uploading ? 'Uploading...' : 'Upload Resource'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'stories' && (
            <BlurAnimation delay={0.3} duration={0.8}>
              <section className="card-surface p-6 sm:p-8 md:p-10 space-y-6">
                <h3 className="text-2xl font-bold">Story Moderation</h3>
                {loadingStories ? (
                  <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Loading stories...</p>
                ) : (
                  <div className="space-y-4">
                    {stories.map((story) => (
                      <div key={story.id} className="glass p-5 rounded-lg">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <h4 className="font-bold text-lg">{story.author_name || 'Unnamed'} · {story.school_name || 'School not set'}</h4>
                            <p className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{story.story_text}</p>
                            <div className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              Status: {story.status || 'pending'} • {new Date(story.created_at).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleApproveStory(story.id)} className="px-3 py-2 rounded-lg bg-green-500/20 text-green-500 border border-green-500/30 text-sm">Approve</button>
                            <button onClick={() => handleRejectStory(story.id)} className="px-3 py-2 rounded-lg bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-sm">Reject</button>
                            <button onClick={() => handleDeleteStory(story.id)} className="px-3 py-2 rounded-lg bg-red-500/20 text-red-500 border border-red-500/30 text-sm">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </BlurAnimation>
          )}
        </main>
      </div>
    </div>
  );
}
