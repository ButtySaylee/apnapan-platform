import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DropAnimation, SlideAnimation, ScaleAnimation, StaggerAnimation, BlurAnimation, RotateAnimation } from '../components/ScrollAnimations';

const stories = [
  {
    title: 'Aarav builds a circle of trust',
    role: 'Grade 7 · Delhi Public School',
    format: 'Audio diary',
    summary: 'Weekly circles helped Aarav feel seen. He now co-leads peer reflections.',
    color: 'from-brand-blue to-brand-purple',
    media: '🎧',
  },
  {
    title: 'Priya codes for empathy',
    role: 'Grade 8 · St. Mary\'s Academy',
    format: 'Short film',
    summary: 'A short film created in class shows how autonomy changes classroom energy.',
    color: 'from-brand-teal to-brand-blue',
    media: '🎬',
  },
  {
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
  { label: 'Students reporting "seen & heard"', value: 78, delta: '+18%', color: 'from-brand-teal to-brand-blue' },
  { label: 'Teacher-led story circles per month', value: 142, delta: '+35%', color: 'from-brand-blue to-brand-purple' },
  { label: 'Peer mentoring pairs active', value: 320, delta: '+22%', color: 'from-brand-purple to-brand-teal' },
];

const team = [
  { name: 'Ipsita Gupta', role: 'City Manager', bio: 'Leads belonging programs across NCR schools.', img: 'ipsita.png' },
  { name: 'Alok Sharma', role: 'Community Engagement Lead', bio: 'Co-creates interventions with teachers and students.', img: 'alok.png' },
  { name: 'Butty Saylee', role: 'Tech & Digital Strategy Lead', bio: 'Builds humane digital tools for stories and access.', img: 'butty.jpg' },
];

const partners = [
  { name: 'EduCare Foundation', role: 'Teacher training partner', impact: '500+ teachers in inclusive practices.', img: 'educare.png', link: 'https://educare.org' },
  { name: 'Global Learning Alliance', role: 'Research collaborator', impact: 'Published autonomy studies together.', img: 'globallearning.jpg', link: 'https://globallearning.org' },
  { name: 'Bright Futures NGO', role: 'Community outreach', impact: 'Peer mentoring in 20 schools.', img: 'brightfuture.png', link: 'https://brightfutures.org' },
];

const resources = [
  'Inclusive Teaching Toolkit (PDF)',
  'Belonging Circle Prompts (Slides)',
  'Emotional Well-being Activity Sheet',
  'Student Voice Survey Template',
];

function useTheme() {
  const prefersDark = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    []
  );
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light'));

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}

export default function Community() {
  const { theme, toggle } = useTheme();

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="min-h-screen">
        <header className="sticky top-0 z-20 bg-slate-900/80 light:bg-white/80 backdrop-blur border-b border-white/10 light:border-slate-200">
          <div className="container-wide flex items-center gap-4 py-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-12 w-12 rounded-full shadow-glow" loading="lazy" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-900">Project Apnapan</h1>
                <p className="text-xs" style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>Community Hub</p>
              </div>
            </Link>
            <div className="flex-1" />
            <Link to="/schools" className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#ffffff' : '#0f172a'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#cbd5e1' : '#475569'}>
              School Partnership
            </Link>
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </header>

        <main className="container-wide space-y-16 py-10">
          {/* Community Hero */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="section-shell card-surface overflow-hidden">
              <div className="section-bg parallax-dots" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 via-brand-purple/15 to-brand-teal/20 blur-3xl -z-10" aria-hidden />
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                <SlideAnimation direction="left" delay={0.1}>
                  <div className="space-y-5">
                    <div className="pill bg-white/10 light:bg-slate-200 text-white light:text-slate-800">Community · Stories · Impact</div>
                    <h2 className="headline">Voices and stories from educators and students transforming schools.</h2>
                    <p className="subhead">Explore the community hub: share your story, learn from others, and co-create belonging-centered solutions.</p>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn btn-primary">Share Your Story</button>
                      <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">Browse Resources</button>
                    </div>
                  </div>
                </SlideAnimation>
                <SlideAnimation direction="right" delay={0.2}>
                  <div className="glass relative p-6">
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>Community Stats</p>
                    <StaggerAnimation delay={0.3} staggerDelay={0.1}>
                      <div className="mt-4 space-y-3">
                        {insights.map((item) => (
                          <div key={item.label} className="space-y-2">
                            <div className="flex items-center justify-between text-sm font-semibold">
                              <span>{item.label}</span>
                              <span className="text-brand-teal">{item.delta}</span>
                            </div>
                            <div className="stat-bar">
                              <div className={`stat-fill bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                            </div>
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
            <section className="card-surface p-8 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-teal/5 to-transparent -z-10" aria-hidden />
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
                <SlideAnimation direction="left" delay={0.1}>
                  <div className="space-y-4">
                    <div className="pill bg-white/10 light:bg-slate-200 text-white light:text-slate-800 w-fit">For School Leaders</div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">Transform How Your School Measures Success</h3>
                    <p className="leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                      Two schools, same test scores. One measures belonging, voice, and authenticity. Discover what happens when you measure what actually matters.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/schools" className="btn btn-primary">Explore School Partnership</Link>
                      <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">See the Data</button>
                    </div>
                  </div>
                </SlideAnimation>
                <SlideAnimation direction="right" delay={0.2}>
                  <StaggerAnimation delay={0.3} staggerDelay={0.15}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass p-6 space-y-3 rounded-lg hover:shadow-lg transition-shadow">
                        <p className="text-3xl font-bold text-brand-teal">+47%</p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Belonging increase</p>
                      </div>
                      <div className="glass p-6 space-y-3 rounded-lg hover:shadow-lg transition-shadow">
                        <p className="text-3xl font-bold text-brand-purple">12+</p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Schools transformed</p>
                      </div>
                      <div className="glass p-6 space-y-3 rounded-lg hover:shadow-lg transition-shadow">
                        <p className="text-3xl font-bold text-brand-blue">89%</p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Predictive accuracy</p>
                      </div>
                      <div className="glass p-6 space-y-3 rounded-lg hover:shadow-lg transition-shadow">
                        <p className="text-3xl font-bold text-brand-teal">6-18mo</p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Implementation timeline</p>
                      </div>
                    </div>
                  </StaggerAnimation>
                </SlideAnimation>
              </div>
            </section>
          </ScaleAnimation>

          {/* Narrative Timeline */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8">
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
            <section className="card-surface p-8">
              <h2 className="section-title">Voices from the Classroom</h2>
              <StaggerAnimation delay={0.2} staggerDelay={0.1}>
                <div className="grid-auto">
                  {stories.map((story) => (
                    <DropAnimation key={story.title} distance={40}>
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
                        <div className="stat-bar">
                          <div className={`stat-fill bg-gradient-to-r ${story.color}`} style={{ width: '85%' }} />
                        </div>
                      </div>
                    </DropAnimation>
                  ))}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Data Pulse & Resources */}
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <BlurAnimation delay={0} duration={0.8}>
              <div className="card-surface p-8 space-y-4">
                <h2 className="section-title">Data Pulse</h2>
                <StaggerAnimation delay={0.2} staggerDelay={0.1}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {insights.map((item) => (
                      <ScaleAnimation key={item.label} duration={0.6}>
                        <div className="tilt-card card-surface p-4 space-y-2 hover:shadow-lg transition-shadow">
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{item.label}</p>
                          <p className="text-3xl font-bold">{item.value}%</p>
                          <span className="badge-tile text-brand-teal">{item.delta}</span>
                        </div>
                      </ScaleAnimation>
                    ))}
                  </div>
                </StaggerAnimation>
              </div>
            </BlurAnimation>
            <BlurAnimation delay={0.1} duration={0.8}>
              <div className="card-surface p-8 space-y-4">
                <h2 className="section-title">Resources</h2>
                <StaggerAnimation delay={0.3} staggerDelay={0.1}>
                  <div className="space-y-3">
                    {resources.map((res) => (
                      <DropAnimation key={res} distance={20}>
                        <div className="tilt-card card-surface p-3 text-sm flex items-center gap-3 hover:shadow-lg transition-shadow">
                          <span className="text-lg">📄</span>
                          <span className="" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{res}</span>
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
            <section className="card-surface p-8">
              <h2 className="section-title">Apnapan Team</h2>
              <StaggerAnimation delay={0.2} staggerDelay={0.15}>
                <div className="grid-auto">
                  {team.map((member) => (
                    <RotateAnimation key={member.name} angle={-8}>
                      <div className="tilt-card card-surface p-6 space-y-3 text-center hover:shadow-lg transition-shadow">
                        <img src={`/images/${member.img}`} alt={member.name} className="h-20 w-20 rounded-full object-cover border border-white/20 light:border-slate-200 mx-auto" loading="lazy" />
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-brand-teal font-semibold">{member.role}</p>
                        <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{member.bio}</p>
                      </div>
                    </RotateAnimation>
                  ))}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Partners */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8">
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
            <section className="card-surface p-8 text-center space-y-4">
              <h2 className="section-title">Let's build humane schools together</h2>
              <p className="subhead">Co-design a storytelling pilot, invite a workshop, or explore our research in your context.</p>
              <StaggerAnimation delay={0.3} staggerDelay={0.1} direction="up">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="btn btn-primary">Book a walkthrough</button>
                  <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">Download pilot kit</button>
                  <Link to="/calculator" className="btn btn-primary">Calculate Your Transformation</Link>
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>
        </main>

        <footer className="mt-16 py-10 bg-slate-950/70 light:bg-white/80 border-t border-white/10 light:border-slate-200">
          <div className="container-wide text-center text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
            © 2026 Project Apnapan | Designed with empathy and innovation
          </div>
        </footer>
      </div>
    </div>
  );
}
