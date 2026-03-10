import React from 'react';
import { Link } from 'react-router-dom';
import { DropAnimation, SlideAnimation, ScaleAnimation, StaggerAnimation, BlurAnimation, RotateAnimation } from '../components/ScrollAnimations';
import { useTheme } from '../context/useTheme';

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
  'Students are speaking up earlier when something feels off.',
  'Teachers are using story circles as regular classroom rituals.',
  'Peer mentorship is becoming part of everyday school culture.',
];

const team = [
  { name: 'Ipsita Gupta', role: 'City Manager', bio: 'Leads belonging programs across NCR schools.', img: 'ipsita.png' },
  { name: 'Alok Sharma', role: 'Community Engagement Lead', bio: 'Co-creates interventions with teachers and students.', img: 'alok.png' },
  { name: 'Butty Saylee', role: 'Tech & Digital Strategy Lead', bio: 'Builds humane digital tools for stories and access.', img: 'butty.jpg' },
];

const partners = [
  { name: 'EduCare Foundation', role: 'Teacher training partner', impact: 'Teacher teams supported in inclusive practices.', img: 'educare.png', link: 'https://educare.org' },
  { name: 'Global Learning Alliance', role: 'Research collaborator', impact: 'Published autonomy studies together.', img: 'globallearning.jpg', link: 'https://globallearning.org' },
  { name: 'Bright Futures NGO', role: 'Community outreach', impact: 'Peer mentoring programs across partner schools.', img: 'brightfuture.png', link: 'https://brightfutures.org' },
];

const resources = [
  'Inclusive Teaching Toolkit (PDF)',
  'Belonging Circle Prompts (Slides)',
  'Emotional Well-being Activity Sheet',
  'Student Voice Survey Template',
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
                      <button className="btn btn-primary">Share Your Story</button>
                      <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">Browse Resources</button>
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
            <section className="card-surface p-6 sm:p-8 md:p-10">
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
                        <div className="h-1 w-full bg-white/10 light:bg-slate-200 rounded-full" />
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
              <div className="card-surface p-6 sm:p-8 md:p-10 space-y-6">
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
            <section className="card-surface p-6 sm:p-8 md:p-10">
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
                  <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">Download pilot kit</button>
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
      </div>
    </div>
  );
}
