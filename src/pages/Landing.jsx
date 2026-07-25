import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import { GlassCard, BentoGrid, BentoItem, Section, SectionHeader, Button, Pill, StatDisplay, FeatureCard, ProgressBar, AppHeader, AppFooter } from '../components/DesignSystem';
import { ScrollReveal, StaggerGroup } from '../components/ScrollReveal';
import { ParticleField, MorphBlob, GradientMesh, ScanLine, OrbitingRings, DataStream } from '../components/FuturisticBackground';

const impactMetrics = [
  { value: '78%', label: 'Students feel seen' },
  { value: '320+', label: 'Peer mentoring pairs' },
  { value: '12+', label: 'Partner schools' },
  { value: '94%', label: 'Teacher retention' },
];

const pillars = [
  {
    icon: '🔍',
    title: 'Collective Inquiry',
    description: 'Build shared understanding through data-driven inquiry and stakeholder reflections across classrooms, staff rooms, and leadership teams.',
  },
  {
    icon: '🎨',
    title: 'Co-Design Solutions',
    description: 'Work with schools, teachers, and leaders to design contextually relevant interventions that respect local culture and resources.',
  },
  {
    icon: '📊',
    title: 'Action Research',
    description: 'Conduct participatory research with students, teachers, and administrators to understand the real barriers to belonging.',
  },
  {
    icon: '⚡',
    title: 'Adaptive Implementation',
    description: 'Deploy low-resource, creative solutions that reduce barriers and enhance belonging, iterating based on real-time feedback.',
  },
];

const solutions = [
  { number: '01', title: 'Digital & ethical AI-based K-12 Solutions', color: 'from-brand-blue to-brand-teal' },
  { number: '02', title: 'Local Innovations rooted in global K-12 research', color: 'from-brand-teal to-brand-purple' },
  { number: '03', title: 'The power of data & Educational Analytics', color: 'from-brand-purple to-brand-blue' },
  { number: '04', title: 'Teacher Professional Development & Support', color: 'from-brand-teal to-brand-blue' },
  { number: '05', title: 'Belonging-centered Curriculum Frameworks', color: 'from-brand-blue to-brand-purple' },
  { number: '06', title: 'Research-backed Implementation Tools', color: 'from-brand-purple to-brand-teal' },
];

const problems = [
  {
    icon: '📉',
    title: 'Academic Decline',
    description: 'Disconnected students engage less, lose motivation, and struggle academically, falling behind their peers.',
  },
  {
    icon: '⚠️',
    title: 'Behavioral Problems',
    description: 'Students without belonging are more likely to disengage, act out, or skip school entirely.',
  },
  {
    icon: '💔',
    title: 'Emotional Distress',
    description: 'Loneliness, anxiety, and depression increase significantly when students feel they don\'t belong.',
  },
  {
    icon: '⬇️',
    title: 'Lower Self-Esteem',
    description: 'Exclusion and invisibility shape a student\'s confidence and self-worth for years to come.',
  },
];

export default function Landing() {
  const { theme, toggle } = useTheme();
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty('--mouse-x', `${x}%`);
      heroRef.current.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className={isDark ? '' : 'light'}>
      <div className="min-h-screen relative" style={{ backgroundColor: isDark ? '#0d1117' : '#f8fafc' }}>
        
        {/* ============================================================
            GLOBAL FUTURISTIC BACKGROUND LAYER
        ============================================================ */}
        <ParticleField count={50} color="rgba(13, 115, 119, 0.12)" speed={0.2} />
        <div className="fixed inset-0 pointer-events-none z-[1] futuristic-grid" />

        {/* ============================================================
            HEADER — Enterprise Glass Header
        ============================================================ */}
        <AppHeader>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Project Apnapan"
              className="h-9 w-9 rounded-xl object-contain border"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }}
            />
            <span className="hidden sm:inline text-base font-semibold">Project Apnapan</span>
          </Link>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <Link to="/community" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
              Community
            </Link>
            <Link to="/schools" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
              For Schools
            </Link>
            <Link to="/calculator" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
              Calculator
            </Link>
          </nav>
          <Link to="/login" className="btn btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
            <span>👥</span>
            <span className="hidden sm:inline">Educator Portal</span>
            <span className="sm:hidden">Portal</span>
          </Link>
          <button
            onClick={toggle}
            className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs sm:text-sm"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? '☀' : '☽'}
          </button>
        </AppHeader>

        {/* ============================================================
            HERO SECTION — Full-viewport cinematic hero with futuristic effects
        ============================================================ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(13,115,119,0.08) 0%, rgba(26,53,88,0.05) 40%, transparent 70%), linear-gradient(180deg, #0d1117 0%, #0a0e14 100%)`
              : `radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(13,115,119,0.06) 0%, rgba(26,53,88,0.03) 40%, transparent 70%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)`
          }}
        >
          {/* Futuristic background elements — enhanced visibility */}
          <GradientMesh />
          <MorphBlob size={600} color="rgba(13, 115, 119, 0.12)" left="20%" top="30%" speed={10} />
          <MorphBlob size={500} color="rgba(59, 130, 246, 0.08)" left="70%" top="55%" speed={8} />
          <MorphBlob size={400} color="rgba(74, 111, 165, 0.06)" left="50%" top="70%" speed={12} />
          <OrbitingRings />
          <ScanLine />
          <DataStream lines={8} />

          {/* Decorative gradient blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-blob" style={{ background: isDark ? 'rgba(13,115,119,0.15)' : 'rgba(13,115,119,0.08)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000" style={{ background: isDark ? 'rgba(74,111,165,0.15)' : 'rgba(74,111,165,0.08)' }} />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Pill label */}
              <ScrollReveal animation="reveal-up" delay={0}>
                <div className="flex justify-center">
                  <Pill color="teal">Educational Innovation · Equity · Belonging</Pill>
                </div>
              </ScrollReveal>

              {/* Main headline */}
              <ScrollReveal animation="reveal-up" delay={0.1}>
                <h1 className="headline-hero">
                  <span className="block mb-2" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
                    Building schools where
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-brand-blue to-brand-purple text-glow-teal">
                    every child is seen, heard, and empowered.
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subheading */}
              <ScrollReveal animation="reveal-up" delay={0.2}>
                <p className="subhead-hero max-w-3xl mx-auto">
                  A humane, evidence-based platform that transforms school culture through 
                  belonging-centered design, data-driven insights, and co-created solutions.
                </p>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal animation="reveal-up" delay={0.3}>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Button variant="primary" size="lg" href="/community">
                    Explore the Community
                    <span className="text-lg ml-1">→</span>
                  </Button>
                  <Button variant="secondary" size="lg" href="/schools">
                    For School Leaders
                  </Button>
                  <Button variant="ghost" size="lg" href="/calculator">
                    Belonging Calculator
                  </Button>
                </div>
              </ScrollReveal>

              {/* Stats */}
              <ScrollReveal animation="reveal-up" delay={0.4}>
                <div className="pt-10 sm:pt-14">
                  <p className="label mb-6 opacity-50">Impact across partner schools</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-3xl mx-auto">
                    {impactMetrics.map((stat) => (
                      <StatDisplay key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Scroll indicator */}
              <div className="pt-8 animate-pulse-soft">
                <p className="label opacity-30 mb-2">Scroll to explore</p>
                <svg className="w-5 h-5 mx-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY IT MATTERS — Problem & Vision
        ============================================================ */}
        <Section dark>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Vision */}
            <ScrollReveal animation="reveal-left">
              <div className="space-y-6">
                <Pill color="blue">Why we exist</Pill>
                <h2 className="headline-section">
                  Think back to your school days
                </h2>
                <p className="body-large opacity-80">
                  Was there ever a moment when you felt truly{' '}
                  <span className="text-brand-teal font-semibold">valued</span>,{' '}
                  <span className="text-brand-purple font-semibold">heard</span>, or{' '}
                  <span className="text-brand-blue font-semibold">connected</span>?
                </p>
                <p className="body-base opacity-60">
                  Maybe it was a teacher who noticed your effort, a friend who supported you, 
                  or just knowing you had a place where you belonged.
                </p>
                <div className="pl-5 border-l-2 animate-border-glow" style={{ borderColor: '#0d7377' }}>
                  <p className="body-base italic opacity-75">
                    "Now imagine the opposite—feeling invisible, unheard, or unsafe. 
                    That's the difference between a student who thrives and one who disengages."
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Problems as Bento cards */}
            <ScrollReveal animation="reveal-right">
              <div className="grid gap-4">
                {problems.map((problem, idx) => (
                  <div
                    key={idx}
                    className="glass-card-holo p-5 hover-lift shimmer-overlay"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl flex-shrink-0 mt-1">{problem.icon}</span>
                      <div>
                        <h4 className="font-semibold mb-1">{problem.title}</h4>
                        <p className="body-small opacity-70">{problem.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* ============================================================
            OUR APPROACH — Four Pillars (Bento Grid)
        ============================================================ */}
        <Section>
          <SectionHeader
            title="Our Four-Pillar Approach"
            subtitle="Creating inclusive school environments through research, co-design, and adaptive implementation"
          />
          <BentoGrid>
            {pillars.map((pillar, idx) => (
              <BentoItem key={idx} colSpan={idx === 0 ? 2 : 1} rowSpan={idx === 0 ? 1 : 1}>
                <ScrollReveal animation="reveal-up" delay={idx * 0.1}>
                  <div className="space-y-4">
                    <span className="text-4xl">{pillar.icon}</span>
                    <h3 className="headline-card">{pillar.title}</h3>
                    <p className="body-base opacity-75">{pillar.description}</p>
                  </div>
                </ScrollReveal>
              </BentoItem>
            ))}
          </BentoGrid>
        </Section>

        {/* ============================================================
            SOLUTIONS — Numbered Feature List
        ============================================================ */}
        <Section dark>
          <SectionHeader
            title="Our Solutions"
            subtitle="Comprehensive, evidence-based tools and frameworks for educational transformation"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((solution, idx) => (
              <ScrollReveal key={idx} animation="reveal-up" delay={idx * 0.05}>
                <div className="glass-card-holo p-6 flex items-start gap-4 hover-lift shimmer-overlay">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border"
                    style={{
                      background: `linear-gradient(135deg, rgba(13,115,119,0.15), rgba(26,53,88,0.15))`,
                      borderColor: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    {solution.number}
                  </span>
                  <p className="font-medium leading-relaxed">{solution.title}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* ============================================================
            IMPACT — Data Stories
        ============================================================ */}
        <Section>
          <SectionHeader
            title="The Belonging Transformation"
            subtitle="What happens when schools measure what actually matters"
          />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ScrollReveal animation="reveal-left">
              <div className="glass-card-holo p-6 space-y-5 shimmer-overlay">
                <Pill color="teal">Traditional School</Pill>
                <ProgressBar value={38} label="Student Voice & Agency" />
                <ProgressBar value={45} label="Student Belonging" />
                <ProgressBar value={52} label="Classroom Safety" />
                <ProgressBar value={58} label="Student-Reported Wellbeing" />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right">
              <div className="glass-card-holo p-6 space-y-5 border-l-4 shimmer-overlay" style={{ borderLeftColor: '#0d7377' }}>
                <Pill color="teal">Transformed School</Pill>
                <ProgressBar value={82} label="Student Voice & Agency" />
                <ProgressBar value={88} label="Student Belonging" />
                <ProgressBar value={91} label="Classroom Safety" />
                <ProgressBar value={89} label="Student-Reported Wellbeing" />
              </div>
            </ScrollReveal>
          </div>
          <div className="text-center">
            <p className="body-small opacity-50">
              Same academic benchmarks. Completely different lived experiences.
            </p>
          </div>
        </Section>

        {/* ============================================================
            CTA SECTION
        ============================================================ */}
        <Section className="!py-20 lg:!py-28">
          <ScrollReveal animation="reveal-scale">
            <div className="glass-card-holo p-10 sm:p-14 lg:p-16 text-center space-y-8 max-w-4xl mx-auto shimmer-overlay">
              <h2 className="headline-section">
                Ready to transform your school?
              </h2>
              <p className="subhead-section max-w-2xl mx-auto">
                Join a growing community of educators, school leaders, and changemakers 
                building a future where every child feels they belong.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Button variant="primary" size="lg" href="/community">
                  Join the Community
                </Button>
                <Button variant="secondary" size="lg" href="mailto:projectapnapan@gmail.com">
                  Contact Us
                </Button>
              </div>
              <p className="body-small opacity-50">
                projectapnapan@gmail.com
              </p>
            </div>
          </ScrollReveal>
        </Section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <AppFooter />

        {/* Admin Access */}
        <div className="fixed bottom-4 left-4 z-40">
          <Link
            to="/admin/login"
            className="btn-ghost px-4 py-2 rounded-lg border text-sm font-semibold"
            style={{
              borderColor: isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.25)',
              color: isDark ? '#c4b5fd' : '#7c3aed',
              background: isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.05)',
            }}
          >
            🛡 Admin
          </Link>
        </div>
      </div>
    </div>
  );
}