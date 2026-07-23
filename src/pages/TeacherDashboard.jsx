import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import { GlassCard, Button, Pill, Input, AppHeader, AppFooter, Divider, Modal, StatDisplay, MetricCard, ProgressBar, Skeleton } from '../components/DesignSystem';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const CATEGORIES = ['Activities', 'Assessments', 'Curriculum', 'Documentation', 'Other'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB
const UPLOAD_TIMEOUT_MS = 20000;

function withTimeout(promise, timeoutMs, timeoutMessage) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]);
}

function isTransientLockError(error) {
  const message = String(error?.message || '').toLowerCase();
  return message.includes("lock broken by another request") || message.includes("'steal' option");
}

async function runWithLockRetry(operation) {
  try {
    return await operation();
  } catch (error) {
    if (!isTransientLockError(error)) {
      throw error;
    }

    // Small delay gives the competing lock owner time to finish.
    await new Promise(resolve => window.setTimeout(resolve, 350));
    return operation();
  }
}

export default function TeacherDashboard() {
  const { theme, toggle } = useTheme();
  const { logout, user } = useAuth();
  const isLight = theme === 'light';
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [myResources, setMyResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);

  // Upload form state
  const [form, setForm] = useState({ title: '', category: 'Activities', description: '', externalUrl: '' });
  const [uploadMode, setUploadMode] = useState('link'); // 'link' | 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [resourceActionError, setResourceActionError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', category: 'Activities', description: '', file_url: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [deletingResourceId, setDeletingResourceId] = useState(null);

  // Session-aware user data (fallback keeps local mock UX working)
  const userData = {
    name: user?.name || 'Educator',
    school: user?.school || 'Your School',
    subject: user?.subject || 'General',
    email: user?.email || 'educator@school.edu'
  };

  // Load resources from Supabase (or local mock)
  useEffect(() => {
    async function fetchResources() {
      setLoadingResources(true);
      if (isSupabaseConfigured && supabase && user?.id) {
        const { data, error } = await supabase
          .from('resources')
          .select('id, title, category, description, file_url, is_public, downloads, created_at')
          .eq('teacher_id', user.id)
          .order('created_at', { ascending: false });
        if (!error && data) {
          setMyResources(data.map(r => ({ ...r, date: r.created_at })));
        }
      } else {
        setMyResources([]);
      }
      setLoadingResources(false);
    }
    fetchResources();
  }, [user?.id]);

  const openModal = () => {
    setForm({ title: '', category: 'Activities', description: '', externalUrl: '' });
    setUploadMode('link');
    setSelectedFile(null);
    setUploadError('');
    setShowUploadModal(true);
  };

  const openEditModal = (resource) => {
    setEditingResource(resource);
    setEditForm({
      title: resource.title || '',
      category: resource.category || 'Activities',
      description: resource.description || '',
      file_url: resource.file_url || '',
    });
    setEditError('');
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingResource) return;
    if (!editForm.title.trim()) {
      setEditError('Title is required.');
      return;
    }

    setEditLoading(true);
    setEditError('');
    setResourceActionError('');

    try {
      const payload = {
        title: editForm.title.trim(),
        category: editForm.category,
        description: editForm.description.trim() || null,
        file_url: editForm.file_url.trim() || null,
      };

      if (isSupabaseConfigured && supabase && user?.id) {
        const { error } = await runWithLockRetry(() => withTimeout(
          supabase
            .from('resources')
            .update(payload)
            .eq('id', editingResource.id)
            .eq('teacher_id', user.id),
          12000,
          'Update timed out. Please try again.'
        ));
        if (error) {
          throw new Error(error.message);
        }
      }

      setMyResources(prev => prev.map(resource => (
        resource.id === editingResource.id
          ? { ...resource, ...payload }
          : resource
      )));
      setShowEditModal(false);
      setEditingResource(null);
    } catch (err) {
      setEditError(err.message || 'Unable to update resource.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteResource = async (resource) => {
    const confirmed = window.confirm(`Delete \"${resource.title}\"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingResourceId(resource.id);
    setResourceActionError('');

    try {
      if (isSupabaseConfigured && supabase && user?.id) {
        const { error } = await runWithLockRetry(() => withTimeout(
          supabase
            .from('resources')
            .delete()
            .eq('id', resource.id)
            .eq('teacher_id', user.id),
          12000,
          'Delete timed out. Please try again.'
        ));
        if (error) {
          throw new Error(error.message);
        }
      }

      setMyResources(prev => prev.filter(r => r.id !== resource.id));
    } catch (err) {
      setResourceActionError(err.message || 'Unable to delete resource.');
    } finally {
      setDeletingResourceId(null);
    }
  };

  const handleShareToggle = async (resource) => {
    const nextIsPublic = !resource.is_public;
    setResourceActionError('');

    try {
      if (isSupabaseConfigured && supabase && user?.id) {
        const { error } = await runWithLockRetry(() => withTimeout(
          supabase
            .from('resources')
            .update({ is_public: nextIsPublic })
            .eq('id', resource.id)
            .eq('teacher_id', user.id),
          12000,
          'Sharing update timed out. Please try again.'
        ));
        if (error) {
          throw new Error(error.message);
        }
      }

      setMyResources(prev => prev.map(r => (
        r.id === resource.id ? { ...r, is_public: nextIsPublic } : r
      )));
    } catch (err) {
      setResourceActionError(err.message || 'Unable to update sharing settings.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > FILE_SIZE_LIMIT) {
      setUploadError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max allowed is 5 MB. Please use an external link instead.`);
      setSelectedFile(null);
      e.target.value = '';
      return;
    }
    setUploadError('');
    setSelectedFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setUploadError('Title is required.'); return; }
    if (uploadMode === 'link' && !form.externalUrl.trim()) {
      setUploadError('Please paste a link to your resource.'); return;
    }
    if (uploadMode === 'file' && !selectedFile) {
      setUploadError('Please choose a file to upload.'); return;
    }
    setUploading(true);
    setUploadError('');

    try {
      let file_url = null;

      if (uploadMode === 'link') {
        // Basic URL sanity check (must start with http/https)
        try { new URL(form.externalUrl.trim()); } catch {
          throw new Error('Please enter a valid URL (starting with https://).');
        }
        file_url = form.externalUrl.trim();
      } else if (uploadMode === 'file' && selectedFile && isSupabaseConfigured && supabase) {
        if (!user?.id) {
          throw new Error('Your session is not ready yet. Please refresh and try again.');
        }

        const ext = selectedFile.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;

        const { error: storageError } = await runWithLockRetry(() => withTimeout(
          supabase.storage
            .from('resources')
            .upload(path, selectedFile, { upsert: false }),
          UPLOAD_TIMEOUT_MS,
          'File upload timed out. This usually means the Storage bucket or Storage policies are not configured yet. Use an external link for now, or finish the Supabase Storage setup.'
        ));

        if (storageError) throw new Error(storageError.message);
        const { data: urlData } = supabase.storage.from('resources').getPublicUrl(path);
        file_url = urlData?.publicUrl || null;
      } else if (uploadMode === 'file') {
        throw new Error('Direct file upload is unavailable right now. Use an external link or finish Supabase Storage setup.');
      }

      if (isSupabaseConfigured && supabase && user?.id) {
        const { data, error: insertError } = await runWithLockRetry(() => withTimeout(
          supabase
            .from('resources')
            .insert({
              teacher_id: user.id,
              title: form.title.trim(),
              category: form.category,
              description: form.description.trim() || null,
              file_url,
              is_public: false,
            })
            .select()
            .single(),
          12000,
          'Saving the resource took too long. Please try again. If this keeps happening, use an external link instead of direct upload.'
        ));
        if (insertError) throw new Error(insertError.message);
        setMyResources(prev => [{ ...data, date: data.created_at }, ...prev]);
      } else {
        const newResource = {
          id: Date.now(),
          title: form.title.trim(),
          category: form.category,
          description: form.description.trim(),
          file_url,
          is_public: false,
          downloads: 0,
          date: new Date().toISOString(),
        };
        setMyResources(prev => [newResource, ...prev]);
      }

      setShowUploadModal(false);
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const stats = [
    { label: 'Resources Shared', value: myResources.length, icon: '📚', color: 'from-brand-blue to-brand-teal' },
  ];

  const handleLogout = async () => {
    await logout();
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
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#cbd5e1',
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
          <section className="glass-card p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2">
                <h2 className="headline-section">Welcome back, {userData.name.split(' ')[0]}! 👋</h2>
                <p className="body-base opacity-60">
                  {userData.school} · {userData.subject}
                </p>
              </div>
              <Button variant="primary" onClick={openModal}>
                <span>📤</span> Upload Resource
              </Button>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="grid gap-6 sm:grid-cols-1">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="glass-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{stat.icon}</span>
                  <Pill color="teal">Active</Pill>
                </div>
                <div>
                  <div className="stat-value text-brand-blue">{stat.value}</div>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </section>

          {/* My Resources */}
          <section className="glass-card p-6 sm:p-8 md:p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="headline-card">My Resources</h3>
              <span className="text-sm opacity-60">
                {myResources.length} total
              </span>
            </div>

            {resourceActionError && (
              <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {resourceActionError}
              </p>
            )}

            <div className="space-y-4">
              {loadingResources ? (
                <div className="text-center py-8 opacity-60">
                  Loading resources…
                </div>
              ) : myResources.map((resource) => (
                <div
                  key={resource.id}
                  className="glass-card p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📄</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{resource.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <Pill>{resource.category}</Pill>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            resource.is_public ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'opacity-60'
                          }`}>
                            {resource.is_public ? 'Shared' : 'Hidden'}
                          </span>
                          <span className="text-xs opacity-60">{resource.downloads} downloads</span>
                          <span className="text-xs opacity-60">{new Date(resource.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {resource.file_url && (
                      <a href={resource.file_url} target="_blank" rel="noreferrer" className="btn btn-secondary py-1.5 px-3 text-xs">View</a>
                    )}
                    <button onClick={() => handleShareToggle(resource)} className={`btn py-1.5 px-3 text-xs ${resource.is_public ? 'btn-secondary' : 'btn-ghost'}`}>
                      {resource.is_public ? 'Hide' : 'Share'}
                    </button>
                    <button onClick={() => openEditModal(resource)} className="btn btn-secondary py-1.5 px-3 text-xs">Edit</button>
                    <button onClick={() => handleDeleteResource(resource)} className="btn py-1.5 px-3 text-xs" style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.35)' }} disabled={deletingResourceId === resource.id}>
                      {deletingResourceId === resource.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!loadingResources && myResources.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">📚</div>
                <h4 className="text-xl font-bold">No resources yet</h4>
                <p className="opacity-60">Start sharing your materials with the community</p>
                <Button variant="primary" onClick={openModal}>Upload Your First Resource</Button>
              </div>
            )}
          </section>
        </main>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}>
            <div className="max-w-lg w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto rounded-xl border shadow-xl" style={{
              backgroundColor: theme === 'dark' ? '#161b22' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
              boxShadow: theme === 'dark' ? undefined : '0 20px 45px rgba(15,23,42,0.18)',
            }}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Upload Resource</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-2xl hover:opacity-70 transition-opacity"
                  style={{ color: theme === 'dark' ? '#e2e8f0' : '#334155' }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Belonging Circle Prompts for 9th Grade"
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Briefly describe what this resource is and how to use it…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all resize-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  />
                </div>

                {/* Resource Link / File toggle */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Resource <span className="text-red-500">*</span>
                  </label>

                  {/* Tab switcher */}
                  <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0' }}>
                    {[['link', '🔗 External Link', 'Recommended'], ['file', '📁 Upload File', 'Max 5 MB']].map(([mode, label, hint]) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => { setUploadMode(mode); setUploadError(''); setSelectedFile(null); }}
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

                  {/* External link input */}
                  {uploadMode === 'link' && (
                    <div className="space-y-1">
                      <input
                        type="url"
                        value={form.externalUrl}
                        onChange={e => setForm(f => ({ ...f, externalUrl: e.target.value }))}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-blue"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                          color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                        }}
                      />
                      <p className="text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>
                        Paste a shareable link from Google Drive, Dropbox, OneDrive, or any public URL.
                      </p>
                    </div>
                  )}

                  {/* File picker */}
                  {uploadMode === 'file' && (
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
                            <p className="text-sm font-medium text-brand-blue">📎 {selectedFile.name}</p>
                            <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              {(selectedFile.size / 1024).toFixed(0)} KB — click to change
                            </p>
                          </div>
                        ) : (
                          <div className="text-center px-4">
                            <p className="text-2xl mb-1">📁</p>
                            <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              Click to choose a file (max 5 MB)
                            </p>
                          </div>
                        )}
                      </label>
                      <p className="text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>
                        PDF, DOC, DOCX, PPT, PNG, JPG — 5 MB limit. For larger files, use an external link.
                      </p>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {uploadError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all"
                    style={{
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    }}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading…' : 'Submit Resource'}
                  </button>
                </div>

                <p className="text-xs text-center" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>
                  Resources are added directly to your library after upload.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Edit Resource Modal */}
        {showEditModal && editingResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}>
            <div className="max-w-lg w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto rounded-xl border shadow-xl" style={{
              backgroundColor: theme === 'dark' ? '#161b22' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
              boxShadow: theme === 'dark' ? undefined : '0 20px 45px rgba(15,23,42,0.18)',
            }}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Edit Resource</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-2xl hover:opacity-70 transition-opacity"
                  style={{ color: theme === 'dark' ? '#e2e8f0' : '#334155' }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all resize-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                    Resource Link
                  </label>
                  <input
                    type="url"
                    value={editForm.file_url}
                    onChange={e => setEditForm(f => ({ ...f, file_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-blue"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  />
                </div>

                {editError && (
                  <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {editError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all"
                    style={{
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                      color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    }}
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={editLoading}
                  >
                    {editLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
