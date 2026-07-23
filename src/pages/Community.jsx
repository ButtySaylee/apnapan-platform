import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  GlassCard, SurfaceCard, BentoGrid, BentoItem,
  Section, SectionHeader, Button, Pill, StatDisplay,
  FeatureCard, TimelineItem, ComparisonCard,
  AppHeader, AppFooter, Modal, Input, TextArea,
  IconBox, Divider, Skeleton
} from '../components/DesignSystem';

const fallbackStories = [
  {
    id: 's1',
    title: 'Aarav builds a circle of trust',
    role: 'Grade 7 · Delhi Public School',
    format: 'Audio diary',
    summary: 'Weekly circles helped Aarav feel seen. He now co-leads peer reflections.',
    media: '🎧',
  },
  {
    id: 's2',
    title: 'Priya codes for empathy',
    role: 'Grade 8 · St. Mary\'s Academy',
    format: 'Short film',
    summary: 'A short film created in class shows how autonomy changes classroom energy.',
    media: '🎬',
  },
  {
    id: 's3',
    title: 'Rohan maps belonging',
    role: 'Grade 9 · Greenfield International',
    format: 'Interactive map',
    summary: 'Students tagged "belonging spots" across campus to redesign shared spaces.',
    media: '🗺️',
  },
];

const timeline = [
  { year: '2021', title: 'Listening Labs', detail: 'Shadowed classrooms and ran student circles to surface autonomy gaps.', icon: '👂', progress: 100 },
  { year: '2022', title: 'Pilot Cohorts', detail: 'Launched 3-city pilots with teacher councils co-designing rituals of belonging.', icon: '✏️', progress: 100 },
  { year: '2023', title: 'Story Canvases', detail: 'Introduced audio/video diaries and narrative timelines for student voice.', icon: '🎬', progress: 100 },
  { year: '2024', title: 'Data to Design', detail: 'Translated belonging metrics into spatial and schedule tweaks across schools.', icon: '📊', progress: 100 },
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
    profile: 'Ipsita leads multi-school implementation of belonging programs with a strong focus on measurable student outcomes. She has worked with school leaders, counselors, and teacher cohorts to design routines that improve emotional safety and classroom participation.',
    highlights: [
      'Led implementation across 15+ schools with contextual adaptation by grade band.',
      'Designed facilitator playbooks for student circles and reflection routines.',
      'Built school leadership reporting rhythms to track belonging indicators monthly.',
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
    profile: 'Alok specializes in partnership design between schools, families, and student communities. He brings a field-first approach to co-creation, ensuring that interventions are practical for classrooms and meaningful for students.',
    highlights: [
      'Built educator-student co-design workshops now used in multiple partner schools.',
      'Facilitated community listening labs to surface local belonging barriers.',
      'Developed mentorship circles that improved student participation consistency.',
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
    profile: 'Butty leads digital product strategy for Apnapan, focusing on accessible and ethical tools for educators and school teams. She has experience building education workflows across resource sharing, story moderation, and evidence capture.',
    highlights: [
      'Designed role-based educator/admin workflows for resource sharing and moderation.',
      'Implemented analytics-informed product decisions to improve adoption and retention.',
      'Built scalable content operations for teacher-uploaded resources and story pipelines.',
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
  { title: 'Classroom trust is deepening', detail: 'Teachers report students opening up earlier in circle conversations.', tag: 'Relational signal' },
  { title: 'Participation is more consistent', detail: 'More students are contributing in class without being prompted repeatedly.', tag: 'Engagement signal' },
  { title: 'Support happens sooner', detail: 'Teams are spotting concerns earlier and acting before issues escalate.', tag: 'Early response' },
];

export default function Community() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { name: teamSlug } = useParams();
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
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!teamSlug) { setSelectedTeamMember(null); return; }
    const matched = team.find((member) => member.slug === teamSlug) || null;
    setSelectedTeamMember(matched);
  }, [teamSlug]);

  useEffect(() => {
    if (!selectedTeamMember) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setSelectedTeamMember(null); navigate('/community'); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedTeamMember, navigate]);

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
          setPublicResources(data.map(item => ({ ...item, teacher_name: item.profiles?.full_name || 'Educator' })));
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

  const handleSubmitStory = async (e) => {
    e.preventDefault();
    const clean = storyText.trim();
    const cleanName = storyAuthorName.trim();
    const cleanSchool = storySchoolName.trim();
    if (!cleanName) { setStoryError('Please enter your name.'); return; }
    if (!cleanSchool) { setStoryError('Please enter your school.'); return; }
    if (clean.length < 20) { setStoryError('Please write at least 20 characters.'); return; }
    if (clean.length > 900) { setStoryError('Please keep it under 900 characters.'); return; }
    setSubmittingStory(true);
    setStoryError('');
    try {
      if (isSupabaseConfigured && supabase) {
        if (!user?.id) throw new Error('Please sign in first to share your story.');
        const { error } = await supabase.from('community_stories').insert({
          author_id: user.id, author_name: cleanName, school_name: cleanSchool,
          story_text: clean, status: 'pending', is_public: false,
        });
        if (error) throw new Error(error.message);
        setStorySuccess('Story submitted. It will appear after admin approval.');
      } else {
        const localStory = { id: `local-${Date.now()}`, title: 'Your Story', role: `${cleanName} · ${cleanSchool}`, format: 'Community story', summary: clean, media: '📝' };
        setStories(prev => [localStory, ...prev]);
        setStorySuccess('Story shared locally (dev fallback mode).');
      }
      if (!isSupabaseConfigured) setShowStoryModal(false);
    } catch (err) {
      setStoryError(err.message || 'Unable to save your story right now.');
    } finally {
      setSubmittingStory(false);
    }
  };

  return (
    <div className={isDark ? '' : 'light'}>
      <div className="min-h-screen" style={{ backgroundColor: isDark ? '#0d1117' : '#f8fafc' }}>

        {/* ============================================================
            HEADER
        ============================================================ */}
        <AppHeader>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <img src="/images/logo.png" alt="Project Apnapan" className="h-9 w-9 rounded-xl object-contain border" style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
            <div>
              <span className="text-sm sm:text-base font-semibold">Project Apnapan</span>
              <p className="hidden sm:block text-xs opacity-50">Community Hub</p>
            </div>
          </Link>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <Link to="/schools" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">School Partnership</Link>
            <Link to="/calculator" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Calculator</Link>
          </nav>
          <Link to="/login" className="btn btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
            <span>👥</span> <span className="hidden sm:inline">Portal</span>
          </Link>
          <button onClick={toggle} className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs sm:text-sm" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            {isDark ? '☀' : '☽'}
          </button>
        </AppHeader>

        <main className="pt-20">
          {/* ============================================================
              HERO
          ============================================================ */}
          <Section>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div className="space-y-6">
                <Pill color="teal">Community · Stories · Impact</Pill>
                <h1 className="headline-hero">
                  Voices and stories from educators and students transforming schools.
                </h1>
                <p className="subhead-hero">
                  Explore the community hub: share your story, learn from others, and co-create belonging-centered solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" onClick={handleOpenStoryModal}>Share Your Story</Button>
                  <Button variant="secondary" href="#shared-resources">Browse Resources</Button>
                </div>
              </div>
              <div className="glass-card p-6 space-y-4">
                <p className="label opacity-60">What we hear across communities</p>
                <div className="space-y-3">
                  {insights.map((item) => (
                    <div key={item} className="glass-card p-3 text-sm opacity-80">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ============================================================
              SCHOOL PARTNERSHIP TEASER
          ============================================================ */}
          <Section dark>
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
              <div className="space-y-4">
                <Pill color="blue">For School Leaders</Pill>
                <h2 className="headline-section">Transform How Your School Measures Success</h2>
                <p className="body-large opacity-80">
                  Two schools, same test scores. One measures belonging, voice, and authenticity. 
                  Discover what happens when you measure what actually matters.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" href="/schools">Explore School Partnership</Button>
                  <Button variant="secondary">See the Data</Button>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="glass-card p-5 space-y-2">
                  <p className="text-sm font-semibold text-brand-teal">Earlier intervention</p>
                  <p className="body-small opacity-70">Schools identify disconnection sooner and respond before it escalates.</p>
                </div>
                <div className="glass-card p-5 space-y-2">
                  <p className="text-sm font-semibold text-brand-purple">Healthier classroom climate</p>
                  <p className="body-small opacity-70">Teachers report more trust, participation, and collaborative learning habits.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* ============================================================
              APNAPAN JOURNEY — Timeline
          ============================================================ */}
          <Section>
            <SectionHeader title="Apnapan Journey" subtitle="From listening labs to school-wide transformation" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {timeline.map((item) => (
                <TimelineItem key={item.year} {...item} />
              ))}
            </div>
          </Section>

          {/* ============================================================
              STUDENT STORIES
          ============================================================ */}
          <Section dark>
            <SectionHeader title="Voices from the Classroom" subtitle="Real stories of belonging from students and educators" />
            {loadingStories && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map(i => <Skeleton key={i} height="180px" />)}
              </div>
            )}
            {!loadingStories && (
              <BentoGrid cols={3}>
                {stories.map((story) => (
                  <BentoItem key={story.id} colSpan={1}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{story.media}</span>
                        <div>
                          <Pill color="teal">{story.format}</Pill>
                          <h3 className="font-semibold text-sm mt-1">{story.title}</h3>
                        </div>
                      </div>
                      <p className="body-small opacity-70">{story.summary}</p>
                      <p className="text-xs opacity-50">{story.role}</p>
                    </div>
                  </BentoItem>
                ))}
              </BentoGrid>
            )}
            {!loadingStories && stories.length === 0 && (
              <p className="text-center body-base opacity-50">No stories yet. Be the first to share one.</p>
            )}
            <div className="text-center mt-8">
              <Button variant="primary" onClick={handleOpenStoryModal}>Share Your Story</Button>
            </div>
          </Section>

          {/* ============================================================
              DATA PULSE & RESOURCES
          ============================================================ */}
          <Section>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="space-y-6">
                <h2 className="headline-section">Data Pulse</h2>
                <div className="grid gap-4">
                  {dataPulse.map((item) => (
                    <div key={item.title} className="glass-card p-5 space-y-2 hover-lift">
                      <p className="font-semibold">{item.title}</p>
                      <p className="body-small opacity-70">{item.detail}</p>
                      <Pill color="teal">{item.tag}</Pill>
                    </div>
                  ))}
                </div>
              </div>
              <div id="shared-resources" className="space-y-6">
                <h2 className="headline-section">Shared Resources</h2>
                <div className="space-y-3">
                  {loadingPublicResources && <Skeleton height="120px" />}
                  {!loadingPublicResources && resourcesWithLinks.length === 0 && (
                    <p className="body-base opacity-50">No resources have been shared yet.</p>
                  )}
                  {!loadingPublicResources && resourcesWithLinks.map((res) => (
                    <div key={res.id} className="glass-card p-4 space-y-3 hover-lift">
                      <div className="flex items-start gap-3">
                        <span className="text-lg">📄</span>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{res.title}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs opacity-50 mt-1">
                            <span>{res.category || 'General'}</span>
                            <span>·</span>
                            <span>By {res.teacher_name}</span>
                            <span>·</span>
                            <span>{res.downloads || 0} downloads</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <a href={res.file_url} target="_blank" rel="noreferrer" className="btn btn-secondary py-1.5 px-3 text-xs">View</a>
                        <a href={res.file_url} target="_blank" rel="noreferrer" className="btn btn-primary py-1.5 px-3 text-xs">Download</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ============================================================
              TEAM
          ============================================================ */}
          <Section dark>
            <SectionHeader title="Apnapan Team" subtitle="The people behind the mission" />
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member) => (
                <button
                  key={member.name}
                  onClick={() => { setSelectedTeamMember(member); navigate(`/team/${member.slug}`); }}
                  className="glass-card p-6 text-center space-y-4 hover-lift w-full text-left"
                >
                  <img src={`/images/${member.img}`} alt={member.name} className="h-20 w-20 rounded-full object-cover border mx-auto" style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-brand-teal font-semibold">{member.role}</p>
                    <p className="body-small opacity-70 mt-2">{member.bio}</p>
                  </div>
                  <p className="text-xs font-semibold text-brand-accent">View Full Profile →</p>
                </button>
              ))}
            </div>
          </Section>

          {/* ============================================================
              PARTNERS
          ============================================================ */}
          <Section>
            <SectionHeader title="Partner Organizations" subtitle="Organizations we collaborate with to drive change" />
            <div className="grid md:grid-cols-3 gap-6">
              {partners.map((p) => (
                <div key={p.name} className="glass-card p-6 text-center space-y-4 hover-lift">
                  <img src={`/images/${p.img}`} alt={p.name} className="h-20 w-20 rounded-full object-cover border mx-auto" style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-brand-blue font-semibold">{p.role}</p>
                  <p className="body-small opacity-70">Impact: {p.impact}</p>
                  <Button variant="primary" href={p.link} size="sm">Visit Website</Button>
                </div>
              ))}
            </div>
          </Section>

          {/* ============================================================
              CTA
          ============================================================ */}
          <Section>
            <div className="glass-card p-10 sm:p-14 text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="headline-section">Let's build humane schools together</h2>
              <p className="subhead-section">Co-design a storytelling pilot, invite a workshop, or explore our research in your context.</p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Button variant="primary" size="lg">Book a walkthrough</Button>
                <Button variant="secondary" size="lg" href="/calculator">Calculate Your Transformation</Button>
              </div>
            </div>
          </Section>
        </main>

        <AppFooter />

        {/* ============================================================
            STORY MODAL
        ============================================================ */}
        <Modal isOpen={showStoryModal} onClose={() => setShowStoryModal(false)} title="Share Your Story">
          <form onSubmit={handleSubmitStory} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Your name" value={storyAuthorName} onChange={(e) => setStoryAuthorName(e.target.value)} placeholder="Enter your name" />
              <Input label="School" value={storySchoolName} onChange={(e) => setStorySchoolName(e.target.value)} placeholder="Enter your school" />
            </div>
            <TextArea
              label="Your story"
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              rows={6}
              placeholder="Share a real classroom moment, what changed, and what others can learn..."
            />
            <div className="flex items-center justify-between text-xs opacity-50">
              <span>20-900 characters</span>
              <span>{storyText.trim().length}/900</span>
            </div>
            {storyError && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{storyError}</p>}
            {storySuccess && <p className="text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">{storySuccess}</p>}
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowStoryModal(false)} disabled={submittingStory} className="flex-1">Cancel</Button>
              <Button variant="primary" type="submit" disabled={submittingStory} className="flex-1">{submittingStory ? 'Saving...' : 'Save Story'}</Button>
            </div>
          </form>
        </Modal>

        {/* ============================================================
            TEAM PROFILE MODAL
        ============================================================ */}
        <Modal isOpen={!!selectedTeamMember} onClose={() => { setSelectedTeamMember(null); navigate('/community'); }} title="Team Profile">
          {selectedTeamMember && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
                <img src={`/images/${selectedTeamMember.img}`} alt={selectedTeamMember.name} className="h-24 w-24 rounded-full object-cover border" style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
                <div>
                  <h4 className="text-xl font-bold">{selectedTeamMember.name}</h4>
                  <p className="text-sm font-semibold text-brand-teal">{selectedTeamMember.role}</p>
                  <p className="text-sm opacity-60">{selectedTeamMember.location} · {selectedTeamMember.experienceYears}</p>
                </div>
              </div>
              <Divider text="Experience" />
              <p className="body-base opacity-80">{selectedTeamMember.profile}</p>
              <div className="space-y-3">
                <h5 className="label text-brand-accent">Key Highlights</h5>
                <ul className="space-y-2">
                  {selectedTeamMember.highlights.map((item) => (
                    <li key={item} className="body-small opacity-70 flex gap-2">
                      <span className="text-brand-teal">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Divider text="Connect" />
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" href={`mailto:${selectedTeamMember.email}`}>Email</Button>
                <Button variant="secondary" size="sm" href={selectedTeamMember.linkedin} target="_blank">LinkedIn</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}