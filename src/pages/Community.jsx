import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DropAnimation, SlideAnimation, ScaleAnimation, StaggerAnimation, BlurAnimation, RotateAnimation } from '../components/ScrollAnimations';
import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const fallbackStories = [
  {
    id: 's1',
    title: 'Aarav builds a circle of trust',
    role: 'Grade 7 · Delhi Public School',
    format: 'Audio diary',
    summary: 'Weekly circles helped Aarav feel seen. He now co-leads peer reflections.',
    color: 'from-brand-blue to-brand-purple',
    media: '🎧',
  },
  {
    id: 's2',
    title: 'Priya codes for empathy',
    role: 'Grade 8 · St. Mary\'s Academy',
    format: 'Short film',
    summary: 'A short film created in class shows how autonomy changes classroom energy.',
    color: 'from-brand-teal to-brand-blue',
    media: '🎬',
  },
  {
    id: 's3',
    title: 'Rohan maps belonging',
    role: 'Grade 9 · Greenfield International',
    format: 'Interactive map',
    summary: 'Students tagged "belonging spots" across campus to redesign shared spaces.',
    color: 'from-brand-purple to-brand-teal',
    media: '🗺️',
  },
];

const timeline = [
  { year: '2021', title: 'Listening Labs', detail: 'Shadowed classrooms and ran student circles to surface autonomy gaps.' },
  { year: '2022', title: 'Pilot Cohorts', detail: 'Launched 3-city pilots with teacher councils co-designing rituals of belonging.' },
  { year: '2023', title: 'Story Canvases', detail: 'Introduced audio/video diaries and narrative timelines for student voice.' },
  { year: '2024', title: 'Data to Design', detail: 'Translated belonging metrics into spatial and schedule tweaks across schools.' },
];

const insights = [
  'Students are speaking up earlier when something feels off.',
  'Teachers are using story circles as regular classroom rituals.',
  'Peer mentorship is becoming part of everyday school culture.',
];

const team = [
  {
    slug: 'ipsita-gupta',
    name: 'Ipsita Gupta',
    role: 'City Manager',
    bio: 'Leads belonging programs across NCR schools.',
    img: 'ipsita.png',
    location: 'New Delhi, India',
    experienceYears: '8+ years',
    email: 'ipsita@apnapan.org',
    linkedin: 'https://www.linkedin.com/in/ipsita-gupta',
    profile:
      'Ipsita leads multi-school implementation of belonging programs with a strong focus on measurable student outcomes. She has worked with school leaders, counselors, and teacher cohorts to design routines that improve emotional safety and classroom participation. Her portfolio includes city-wide school improvement pilots, peer support systems, and educator facilitation frameworks that translate social-emotional goals into daily teaching practice.',
    highlights: [
      'Led implementation across 15+ schools with contextual adaptation by grade band.',
      'Designed facilitator playbooks for student circles and reflection routines.',
      'Built school leadership reporting rhythms to track belonging indicators monthly.',
      'Mentored teacher champions on low-cost intervention strategies.',
    ],
  },
  {
    slug: 'alok-sharma',
    name: 'Alok Sharma',
    role: 'Community Engagement Lead',
    bio: 'Co-creates interventions with teachers and students.',
    img: 'alok.png',
    location: 'Gurugram, India',
    experienceYears: '7+ years',
    email: 'alok@apnapan.org',
    linkedin: 'https://www.linkedin.com/in/alok-sharma',
    profile:
      'Alok specializes in partnership design between schools, families, and student communities. He brings a field-first approach to co-creation, ensuring that interventions are practical for classrooms and meaningful for students. His experience spans teacher capacity building, parent dialogue forums, and youth-led community projects that strengthen trust within school ecosystems.',
    highlights: [
      'Built educator-student co-design workshops now used in multiple partner schools.',
      'Facilitated community listening labs to surface local belonging barriers.',
      'Developed mentorship circles that improved student participation consistency.',
      'Coordinated stakeholder campaigns linking school climate and attendance outcomes.',
    ],
  },
  {
    slug: 'butty-saylee',
    name: 'Butty Saylee',
    role: 'Tech & Digital Strategy Lead',
    bio: 'Builds humane digital tools for stories and access.',
    img: 'butty.jpg',
    location: 'Bengaluru, India',
    experienceYears: '6+ years',
    email: 'butty@apnapan.org',
    linkedin: 'https://www.linkedin.com/in/butty-saylee',
    profile:
      'Butty leads digital product strategy for Apnapan, focusing on accessible and ethical tools for educators and school teams. She has experience building education workflows across resource sharing, story moderation, and evidence capture. Her work bridges pedagogy and technology by prioritizing simplicity, safety, and usability for real school contexts with diverse digital readiness.',
    highlights: [
      'Designed role-based educator/admin workflows for resource sharing and moderation.',
      'Implemented analytics-informed product decisions to improve adoption and retention.',
      'Built scalable content operations for teacher-uploaded resources and story pipelines.',
      'Championed accessibility and low-friction UX for mixed-device school environments.',
    ],
  },
];

const partners = [
  { name: 'EduCare Foundation', role: 'Teacher training partner', impact: 'Teacher teams supported in inclusive practices.', img: 'educare.png', link: 'https://educare.org' },
  { name: 'Global Learning Alliance', role: 'Research collaborator', impact: 'Published autonomy studies together.', img: 'globallearning.jpg', link: 'https://globallearning.org' },
  { name: 'Bright Futures NGO', role: 'Community outreach', impact: 'Peer mentoring programs across partner schools.', img: 'brightfuture.png', link: 'https://brightfutures.org' },
];

const fallbackPublicResources = [
  { id: 'f1', title: 'Inclusive Teaching Toolkit', category: 'Documentation', file_url: '', downloads: 128, teacher_name: 'Apnapan Team', created_at: '2024-03-10' },
  { id: 'f2', title: 'Belonging Circle Prompts', category: 'Activities', file_url: '', downloads: 96, teacher_name: 'Apnapan Team', created_at: '2024-03-08' },
  { id: 'f3', title: 'Student Voice Survey Template', category: 'Assessments', file_url: '', downloads: 77, teacher_name: 'Apnapan Team', created_at: '2024-03-05' },
];

const dataPulse = [
  {
    title: 'Classroom trust is deepening',
    detail: 'Teachers report students opening up earlier in circle conversations.',
    tag: 'Relational signal',
  },
  {
    title: 'Participation is more consistent',
    detail: 'More students are contributing in class without being prompted repeatedly.',
    tag: 'Engagement signal',
  },
  {
    title: 'Support happens sooner',
    detail: 'Teams are spotting concerns earlier and acting before issues escalate.',
    tag: 'Early response',
  },
];

export default function Community() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { name: teamSlug } = useParams();
  const profileCloseButtonRef = useRef(null);
  const [publicResources, setPublicResources] = useState([]);
  const [loadingPublicResources, setLoadingPublicResources] = useState(true);
  const [stories, setStories] = useState(fallbackStories);
  const [loadingStories, setLoadingStories] = useState(true);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [storyAuthorName, setStoryAuthorName] = useState('');
  const [storySchoolName, setStorySchoolName] = useState('');
  const [submittingStory, setSubmittingStory] = useState(false);
  const [storyError, setStoryError] = useState('');
  const [storySuccess, setStorySuccess] = useState('');
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const resourcesWithLinks = publicResources.filter((res) => Boolean(res.file_url));

  useEffect(() => {
    if (!teamSlug) {
      setSelectedTeamMember(null);
      return;
    }

    const matched = team.find((member) => member.slug === teamSlug) || null;
    setSelectedTeamMember(matched);
  }, [teamSlug]);

  useEffect(() => {
    if (!selectedTeamMember) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedTeamMember(null);
        navigate('/community');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedTeamMember, navigate]);

  useEffect(() => {
    if (selectedTeamMember && profileCloseButtonRef.current) {
      profileCloseButtonRef.current.focus();
    }
  }, [selectedTeamMember]);

  useEffect(() => {
    async function fetchPublicResources() {
      setLoadingPublicResources(true);

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('resources')
          .select('id, title, category, description, file_url, downloads, created_at, profiles:teacher_id(full_name)')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setPublicResources(
            data.map(item => ({
              ...item,
              teacher_name: item.profiles?.full_name || 'Educator',
            }))
          );
          setLoadingPublicResources(false);
          return;
        }
      }

      setPublicResources(fallbackPublicResources);
      setLoadingPublicResources(false);
    }

    fetchPublicResources();
  }, []);

  useEffect(() => {
    async function fetchStories() {
      setLoadingStories(true);

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('community_stories')
          .select('id, story_text, author_name, school_name, status, is_public, created_at')
          .eq('status', 'approved')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped = data.map((row, idx) => ({
            id: row.id,
            title: `Community Story ${idx + 1}`,
            role: row.school_name ? `${row.author_name || 'Educator'} · ${row.school_name}` : (row.author_name || 'Educator Story'),
            format: 'Community story',
            summary: row.story_text,
            media: '📝',
          }));
          setStories(mapped.length > 0 ? mapped : fallbackStories);
          setLoadingStories(false);
          return;
        }
      }

      setStories(fallbackStories);
      setLoadingStories(false);
    }

    fetchStories();
  }, []);

  const handleOpenStoryModal = () => {
    setStoryText('');
    setStoryAuthorName(user?.name || '');
    setStorySchoolName(user?.school || '');
    setStoryError('');
    setStorySuccess('');
    setShowStoryModal(true);
  };

  const handleOpenTeamProfile = (member) => {
    setSelectedTeamMember(member);
    navigate(`/team/${member.slug}`);
  };

  const handleCloseTeamProfile = () => {
    setSelectedTeamMember(null);
    navigate('/community');
  };

  const handleSubmitStory = async (e) => {
    e.preventDefault();
    const clean = storyText.trim();
    const cleanName = storyAuthorName.trim();
    const cleanSchool = storySchoolName.trim();

    if (!cleanName) {
      setStoryError('Please enter your name.');
      return;
    }
    if (!cleanSchool) {
      setStoryError('Please enter your school.');
      return;
    }

    if (clean.length < 20) {
      setStoryError('Please write at least 20 characters.');
      return;
    }
    if (clean.length > 900) {
      setStoryError('Please keep it under 900 characters.');
      return;
    }

    setSubmittingStory(true);
    setStoryError('');

    try {
      if (isSupabaseConfigured && supabase) {
        if (!user?.id) {
          throw new Error('Please sign in first to share your story.');
        }

        const { data, error } = await supabase
          .from('community_stories')
          .insert({
            author_id: user.id,
            author_name: cleanName,
            school_name: cleanSchool,
            story_text: clean,
            status: 'pending',
            is_public: false,
          })
          .select('id, story_text, created_at')
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setStorySuccess('Story submitted. It will appear after admin approval.');
      } else {
        const localStory = {
          id: `local-${Date.now()}`,
          title: 'Your Story',
          role: `${cleanName} · ${cleanSchool}`,
          format: 'Community story',
          summary: clean,
          media: '📝',
        };
        setStories(prev => [localStory, ...prev]);
        setStorySuccess('Story shared locally (dev fallback mode).');
      }

      if (!isSupabaseConfigured) {
        setShowStoryModal(false);
      }
    } catch (err) {
      setStoryError(err.message || 'Unable to save your story right now.');
    } finally {
      setSubmittingStory(false);
    }
  };

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="min-h-screen">
        <header className="sticky top-0 z-20 border-b" style={{
          backgroundColor: theme === 'dark' ? 'rgba(10,14,20,0.97)' : 'rgba(255,255,255,0.97)',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e5e7eb',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="container-wide flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-contain border border-white/20 light:border-slate-300 bg-white/5 p-1 shadow-lg" loading="lazy" />
              <div>
                <h1 className="text-sm sm:text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Project Apnapan</h1>
                <p className="hidden sm:block text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>Community Hub</p>
              </div>
            </Link>
            <div className="flex-1" />
            <Link to="/schools" className="text-sm font-medium transition-colors hidden sm:block" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#f1f5f9' : '#0f172a'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#94a3b8' : '#64748b'}>
              School Partnership
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(126,184,212,0.15)' : 'rgba(126,184,212,0.2)',
                color: theme === 'dark' ? '#7eb8d4' : '#1a3558',
                border: `1px solid ${theme === 'dark' ? 'rgba(126,184,212,0.3)' : 'rgba(126,184,212,0.4)'}`
              }}
            >
              <span className="hidden sm:inline">👥</span> Portal
            </Link>
            <button
              onClick={toggle}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                color: theme === 'dark' ? '#cbd5e1' : '#475569'
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? '☀ Light' : '☽ Dark'}
            </button>
          </div>
        </header>

        <main className="container-wide space-y-14 md:space-y-16 py-14 md:py-16">
          {/* Community Hero */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="section-shell card-surface overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                <SlideAnimation direction="left" delay={0.1}>
                  <div className="space-y-5">
                    <div className="pill bg-white/10 light:bg-slate-200 text-white light:text-slate-800">Community · Stories · Impact</div>
                    <h2 className="headline">Voices and stories from educators and students transforming schools.</h2>
                    <p className="subhead">Explore the community hub: share your story, learn from others, and co-create belonging-centered solutions.</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={handleOpenStoryModal} className="btn btn-primary">Share Your Story</button>
                    </div>
                  </div>
                </SlideAnimation>
                <SlideAnimation direction="right" delay={0.2}>
                  <div className="glass relative p-6">
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>What we hear across communities</p>
                    <StaggerAnimation delay={0.3} staggerDelay={0.1}>
                      <div className="mt-4 space-y-3">
                        {insights.map((item) => (
                          <div key={item} className="rounded-lg border border-white/10 light:border-slate-200 p-3 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </StaggerAnimation>
                  </div>
                </SlideAnimation>
              </div>
            </section>
          </BlurAnimation>

          {/* Schools Partnership Teaser */}
          <ScaleAnimation delay={0} scale={0.95} duration={0.7}>
            <section className="card-surface p-6 sm:p-8 md:p-10 overflow-hidden relative">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
                <SlideAnimation direction="left" delay={0.1}>
                  <div className="space-y-4">
                    <div className="pill bg-white/10 light:bg-slate-200 text-white light:text-slate-800 w-fit">For School Leaders</div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">Transform How Your School Measures Success</h3>
                    <p className="leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                      Two schools, same test scores. One measures belonging, voice, and authenticity. Discover what happens when you measure what actually matters.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/schools" className="btn btn-primary">Explore School Partnership</Link>
                      <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">See the Data</button>
                    </div>
                  </div>
                </SlideAnimation>
                <SlideAnimation direction="right" delay={0.2}>
                  <StaggerAnimation delay={0.3} staggerDelay={0.15}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="glass p-6 space-y-2 rounded-lg hover:shadow-lg transition-shadow">
                        <p className="text-sm font-semibold text-brand-teal">Earlier intervention</p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Schools identify disconnection sooner and respond before it escalates.</p>
                      </div>
                      <div className="glass p-6 space-y-2 rounded-lg hover:shadow-lg transition-shadow">
                        <p className="text-sm font-semibold text-brand-purple">Healthier classroom climate</p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Teachers report more trust, participation, and collaborative learning habits.</p>
                      </div>
                    </div>
                  </StaggerAnimation>
                </SlideAnimation>
              </div>
            </section>
          </ScaleAnimation>

          {/* Narrative Timeline */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="section-title mb-0">Apnapan Journey</h2>
                <div className="badge-tile">Scroll the milestones →</div>
              </div>
              <StaggerAnimation delay={0.2} staggerDelay={0.12}>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {timeline.map((item, idx) => (
                    <RotateAnimation key={item.year} delay={idx * 0.1} angle={-3 + idx * 1.5}>
                      <div className="tilt-card card-surface p-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-brand-blue font-semibold">
                          <span className="pill bg-white/10 light:bg-slate-100 light:text-slate-800">{item.year}</span>
                          <span>{item.title}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{item.detail}</p>
                        <div className="h-1 w-full bg-white/10 light:bg-slate-200 rounded-full">
                          <div className="h-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full" style={{ width: `${70 + idx * 8}%` }} />
                        </div>
                      </div>
                    </RotateAnimation>
                  ))}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Student Stories */}
          <BlurAnimation delay={0} duration={0.8}>
            <section id="voices-from-classroom" className="card-surface p-6 sm:p-8 md:p-10">
              <h2 className="section-title">Voices from the Classroom</h2>
              {loadingStories && (
                <p className="text-center text-sm mb-6" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Loading stories...
                </p>
              )}
              <StaggerAnimation delay={0.2} staggerDelay={0.1}>
                <div className="grid-auto">
                  {!loadingStories && stories.map((story) => (
                    <DropAnimation key={story.id} distance={40}>
                      <div className="tilt-card card-surface p-6 space-y-3 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{story.media}</span>
                          <div>
                            <p className="text-sm text-brand-blue font-semibold">{story.format}</p>
                            <h3 className="text-lg font-semibold">{story.title}</h3>
                            <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{story.role}</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{story.summary}</p>
                        <div className="h-1 w-full bg-white/10 light:bg-slate-200 rounded-full" />
                      </div>
                    </DropAnimation>
                  ))}
                  {!loadingStories && stories.length === 0 && (
                    <p className="text-center text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      No stories yet. Be the first to share one.
                    </p>
                  )}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Data Pulse & Resources */}
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <BlurAnimation delay={0} duration={0.8}>
              <div className="card-surface p-6 sm:p-8 md:p-10 space-y-6">
                <h2 className="section-title">Data Pulse</h2>
                <StaggerAnimation delay={0.2} staggerDelay={0.1}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {dataPulse.map((item) => (
                      <ScaleAnimation key={item.title} duration={0.6}>
                        <div className="tilt-card card-surface p-4 space-y-2 hover:shadow-lg transition-shadow">
                          <p className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>{item.title}</p>
                          <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{item.detail}</p>
                          <span className="badge-tile text-brand-teal">{item.tag}</span>
                        </div>
                      </ScaleAnimation>
                    ))}
                  </div>
                </StaggerAnimation>
              </div>
            </BlurAnimation>
            <BlurAnimation delay={0.1} duration={0.8}>
              <div id="shared-resources" className="card-surface p-6 sm:p-8 md:p-10 space-y-6">
                <h2 className="section-title">Shared Resources</h2>
                <StaggerAnimation delay={0.3} staggerDelay={0.1}>
                  <div className="space-y-3">
                    {loadingPublicResources && (
                      <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                        Loading shared resources...
                      </div>
                    )}

                    {!loadingPublicResources && resourcesWithLinks.length === 0 && (
                      <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                        No resources have been shared yet.
                      </div>
                    )}

                    {!loadingPublicResources && resourcesWithLinks.map((res) => (
                      <DropAnimation key={res.id} distance={20}>
                        <div className="tilt-card card-surface p-4 text-sm space-y-3 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-3">
                            <span className="text-lg">📄</span>
                            <div className="flex-1">
                              <p className="font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>{res.title}</p>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                <span>{res.category || 'General'}</span>
                                <span>•</span>
                                <span>By {res.teacher_name}</span>
                                <span>•</span>
                                <span>{res.downloads || 0} downloads</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={res.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 text-xs rounded-lg border transition-all hover:bg-white/5"
                              style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0' }}
                            >
                              View
                            </a>
                            <a
                              href={res.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-primary py-2 px-3 text-xs"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </DropAnimation>
                    ))}
                  </div>
                </StaggerAnimation>
              </div>
            </BlurAnimation>
          </section>

          {/* Team */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10">
              <h2 className="section-title">Apnapan Team</h2>
              <StaggerAnimation delay={0.2} staggerDelay={0.15}>
                <div className="grid-auto">
                  {team.map((member) => (
                    <RotateAnimation key={member.name} angle={-8}>
                      <button
                        type="button"
                        onClick={() => handleOpenTeamProfile(member)}
                        className="tilt-card card-surface p-6 space-y-3 text-center hover:shadow-lg transition-shadow w-full"
                        aria-label={`View full profile for ${member.name}`}
                      >
                        <img src={`/images/${member.img}`} alt={member.name} className="h-20 w-20 rounded-full object-cover border border-white/20 light:border-slate-200 mx-auto" loading="lazy" />
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-brand-teal font-semibold">{member.role}</p>
                        <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{member.bio}</p>
                        <p className="text-xs font-semibold" style={{ color: theme === 'dark' ? '#93c5fd' : '#1d4ed8' }}>
                          View Full Profile
                        </p>
                      </button>
                    </RotateAnimation>
                  ))}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Partners */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10">
              <h2 className="section-title">Partner Organizations</h2>
              <StaggerAnimation delay={0.2} staggerDelay={0.15}>
                <div className="grid-auto">
                  {partners.map((p) => (
                    <SlideAnimation key={p.name} direction="right">
                      <div className="tilt-card card-surface p-6 space-y-3 text-center hover:shadow-lg transition-shadow">
                        <img src={`/images/${p.img}`} alt={p.name} className="h-20 w-20 rounded-full object-cover border border-white/20 light:border-slate-200 mx-auto" loading="lazy" />
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <p className="text-sm text-brand-blue font-semibold">{p.role}</p>
                        <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>Impact: {p.impact}</p>
                        <a href={p.link} className="btn btn-primary" target="_blank" rel="noreferrer">Visit Website</a>
                      </div>
                    </SlideAnimation>
                  ))}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Interaction CTA */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-6 sm:p-8 md:p-10 text-center space-y-6">
              <h2 className="section-title">Let's build humane schools together</h2>
              <p className="subhead">Co-design a storytelling pilot, invite a workshop, or explore our research in your context.</p>
              <StaggerAnimation delay={0.3} staggerDelay={0.1} direction="up">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="btn btn-primary">Book a walkthrough</button>
                  <Link to="/calculator" className="btn btn-primary">Calculate Your Transformation</Link>
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>
        </main>

        <footer className="mt-16 py-8 border-t" style={{
          backgroundColor: theme === 'dark' ? '#080c12' : '#f8fafc',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e5e7eb'
        }}>
          <div className="container-wide text-center text-sm" style={{ color: theme === 'dark' ? '#475569' : '#94a3b8' }}>
            © 2026 Project Apnapan | Designed with empathy and innovation
          </div>
        </footer>

        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>
            <div className="w-full max-w-xl rounded-xl border p-6 space-y-5" style={{
              backgroundColor: theme === 'dark' ? '#161b22' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
              boxShadow: theme === 'dark' ? undefined : '0 18px 44px rgba(15,23,42,0.16)',
            }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Share Your Story</h3>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="text-2xl leading-none"
                  style={{ color: theme === 'dark' ? '#e2e8f0' : '#334155' }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitStory} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                      Your name
                    </label>
                    <input
                      type="text"
                      value={storyAuthorName}
                      onChange={(e) => setStoryAuthorName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                      School
                    </label>
                    <input
                      type="text"
                      value={storySchoolName}
                      onChange={(e) => setStorySchoolName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                      }}
                    />
                  </div>
                </div>

                <label className="block text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                  Your story
                </label>
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  rows={6}
                  placeholder="Share a real classroom moment, what changed, and what others can learn..."
                  className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                  }}
                />
                <div className="flex items-center justify-between text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  <span>20-900 characters</span>
                  <span>{storyText.trim().length}/900</span>
                </div>

                {storyError && (
                  <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {storyError}
                  </p>
                )}

                {storySuccess && (
                  <p className="text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                    {storySuccess}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium"
                    style={{
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                      color: theme === 'dark' ? '#cbd5e1' : '#334155',
                    }}
                    disabled={submittingStory}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn btn-primary"
                    disabled={submittingStory}
                  >
                    {submittingStory ? 'Saving...' : 'Save Story'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedTeamMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={handleCloseTeamProfile}
          >
            <div
              className="w-full max-w-2xl rounded-xl border p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
              style={{
              backgroundColor: theme === 'dark' ? '#161b22' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
              boxShadow: theme === 'dark' ? undefined : '0 18px 44px rgba(15,23,42,0.16)',
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="team-profile-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 id="team-profile-title" className="text-2xl font-bold">Team Profile</h3>
                <button
                  onClick={handleCloseTeamProfile}
                  className="text-2xl leading-none"
                  style={{ color: theme === 'dark' ? '#e2e8f0' : '#334155' }}
                  aria-label="Close"
                  ref={profileCloseButtonRef}
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
                <img
                  src={`/images/${selectedTeamMember.img}`}
                  alt={selectedTeamMember.name}
                  className="h-24 w-24 rounded-full object-cover border border-white/20 light:border-slate-300"
                />
                <div>
                  <h4 className="text-xl font-bold">{selectedTeamMember.name}</h4>
                  <p className="text-sm font-semibold text-brand-teal">{selectedTeamMember.role}</p>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {selectedTeamMember.location} · {selectedTeamMember.experienceYears}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme === 'dark' ? '#93c5fd' : '#1d4ed8' }}>
                  Experience Overview
                </h5>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                  {selectedTeamMember.profile}
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme === 'dark' ? '#93c5fd' : '#1d4ed8' }}>
                  Key Highlights
                </h5>
                <ul className="space-y-2">
                  {selectedTeamMember.highlights.map((item) => (
                    <li key={item} className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme === 'dark' ? '#93c5fd' : '#1d4ed8' }}>
                  Connect
                </h5>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selectedTeamMember.email}`}
                    className="px-3 py-2 rounded-lg border text-sm font-medium"
                    style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1' }}
                  >
                    Email
                  </a>
                  <a
                    href={selectedTeamMember.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg border text-sm font-medium"
                    style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseTeamProfile}
                  className="btn btn-primary"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
