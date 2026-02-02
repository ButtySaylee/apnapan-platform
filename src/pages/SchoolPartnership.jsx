import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DropAnimation, SlideAnimation, ScaleAnimation, StaggerAnimation, BlurAnimation, RotateAnimation } from '../components/ScrollAnimations';

const schoolMetrics = [
  {
    metric: 'Student Belonging',
    schoolA: 45,
    schoolB: 88,
    description: 'Feel accepted and valued at school',
  },
  {
    metric: 'Voice & Agency',
    schoolA: 38,
    schoolB: 82,
    description: 'Feel heard in decisions about their learning',
  },
  {
    metric: 'Classroom Safety',
    schoolA: 52,
    schoolB: 91,
    description: 'Safe to be authentic and take risks',
  },
  {
    metric: 'Learning Motivation',
    schoolA: 61,
    schoolB: 87,
    description: 'Intrinsic drive to learn and participate',
  },
];

const outcomeData = [
  { label: 'Academic Performance (standardized tests)', traditional: 72, transformed: 75, delta: '+3%' },
  { label: 'Attendance Consistency', traditional: 84, transformed: 94, delta: '+10%' },
  { label: 'Discipline Incidents', traditional: 22, transformed: 8, delta: '-64%' },
  { label: 'Student-Reported Wellbeing', traditional: 58, transformed: 89, delta: '+31%' },
  { label: 'Teacher Retention', traditional: 68, transformed: 91, delta: '+23%' },
];

const implementationPhases = [
  {
    phase: 'Phase 1: Listen',
    duration: '6-8 weeks',
    activities: [
      'Conduct student & teacher listening circles',
      'Map current culture and belonging gaps',
      'Co-create measurement framework',
    ],
    icon: '👂',
    color: 'from-brand-blue to-brand-teal',
  },
  {
    phase: 'Phase 2: Design',
    duration: '8-10 weeks',
    activities: [
      'Co-design interventions with teachers',
      'Create monthly pulse survey templates',
      'Build feedback loops into routines',
    ],
    icon: '✏️',
    color: 'from-brand-teal to-brand-purple',
  },
  {
    phase: 'Phase 3: Implement',
    duration: '12-16 weeks',
    activities: [
      'Launch rituals of belonging (weekly circles)',
      'Track metrics & iterate monthly',
      'Build peer mentoring structures',
    ],
    icon: '🚀',
    color: 'from-brand-purple to-brand-blue',
  },
  {
    phase: 'Phase 4: Scale',
    duration: 'Ongoing',
    activities: [
      'Document outcomes & lessons learned',
      'Train teacher leaders & peer facilitators',
      'Adapt for other departments/schools',
    ],
    icon: '📈',
    color: 'from-brand-blue to-brand-teal',
  },
];

const studentVoices = [
  {
    quote: 'Before: "I show up because I have to. Nobody notices if I\'m struggling."',
    after: 'After: "My teachers ask about my day. I actually want to come to class."',
    grade: 'Grade 9',
    school: 'First Implementation School',
    impact: 'Engagement +42%',
    type: 'belonging',
  },
  {
    quote: 'Before: "I\'m afraid to ask questions. I don\'t want to look stupid."',
    after: 'After: "I ask tons of questions now. Everyone else does too. It\'s normal here."',
    grade: 'Grade 7',
    school: 'First Implementation School',
    impact: 'Voice Score +58%',
    type: 'voice',
  },
  {
    quote: 'Before: "I\'m not really myself at school. I need to be someone else."',
    after: 'After: "I can just be me. No one pretends to be different here."',
    grade: 'Grade 10',
    school: 'First Implementation School',
    impact: 'Authenticity +65%',
    type: 'authentic',
  },
];

const successStories = [
  {
    title: 'Mountain Valley High',
    location: 'Colorado, USA',
    studentCount: 1200,
    timeframe: '6 months',
    headline: 'From 41% to 88% belonging—while test scores stayed strong',
    result: 'Implemented weekly "belonging circles" where students share challenges. School redesigned lunch seating patterns to mix friend groups, added peer mentoring. Result: Attendance spike, 34% fewer discipline referrals, mental health visits dropped.',
    metrics: [
      { label: 'Belonging increase', value: '+47%' },
      { label: 'Attendance rate', value: '+12%' },
      { label: 'Mental health support drop', value: '-34%' },
    ],
  },
  {
    title: 'Riverside Academy',
    location: 'Toronto, Canada',
    studentCount: 850,
    timeframe: '8 months',
    headline: 'Teachers now say: "I actually know my students."',
    result: 'Shifted from traditional report cards to narrative portfolios including student self-reflections. Teachers met monthly in circles to discuss how belonging shows up in academic work. Completely changed how they graded—less punitive, more supportive.',
    metrics: [
      { label: 'Teacher satisfaction', value: '+58%' },
      { label: 'Student voice score', value: '+71%' },
      { label: 'Grading equity gaps', value: '-22%' },
    ],
  },
  {
    title: 'Nova International',
    location: 'Singapore',
    studentCount: 1600,
    timeframe: '10 months',
    headline: 'Belonging metrics predicted academic gains 3 months ahead',
    result: 'Tracked belonging metrics weekly. Schools realized that when belonging goes down, academics follow 2-3 months later. Shifted from reactive to predictive. Now intervene early based on belonging data, not crisis behavior.',
    metrics: [
      { label: 'Predictive accuracy', value: '89%' },
      { label: 'Early intervention rate', value: '76%' },
      { label: 'Academic gains (following term)', value: '+18%' },
    ],
  },
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

// Data visualization component for comparison
function MetricComparison() {
  const [activeMetric, setActiveMetric] = useState(0);
  const metric = schoolMetrics[activeMetric];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {schoolMetrics.map((m, idx) => (
          <button
            key={m.metric}
            onClick={() => setActiveMetric(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeMetric === idx
                ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg'
                : 'bg-white/10 light:bg-slate-200 text-white light:text-slate-900 hover:bg-white/20 light:hover:bg-slate-300'
            }`}
          >
            {m.metric}
          </button>
        ))}
      </div>

      <div className="glass p-8 space-y-8">
        <div>
          <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{metric.description}</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Traditional School (A)</span>
                <span className="text-lg font-bold text-white/70 light:text-slate-700">{metric.schoolA}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 light:bg-slate-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-400 to-slate-500 transition-all duration-500"
                  style={{ width: `${metric.schoolA}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Transformed School (B)</span>
                <span className="text-lg font-bold text-brand-teal">{metric.schoolB}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 light:bg-slate-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-teal to-brand-blue transition-all duration-500"
                  style={{ width: `${metric.schoolB}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/5 light:bg-slate-100 rounded-lg border border-white/10 light:border-slate-200">
            <p className="text-sm text-white light:text-slate-900">
              <span className="font-semibold text-brand-teal">+{metric.schoolB - metric.schoolA}%</span> difference.
              <br />
              <span className="text-xs mt-2 block" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Same test scores. Different lived experience.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scrollable carousel for implementation phases
function ImplementationTimeline() {
  const containerRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const scroll = (direction) => {
    if (containerRef.current) {
      const amount = 400;
      containerRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScroll({
          left: scrollLeft > 0,
          right: scrollLeft < scrollWidth - clientWidth - 10,
        });
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title mb-0">Implementation Journey (6-18 months)</h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScroll.left}
            className="p-2 rounded-lg bg-white/10 light:bg-slate-200 hover:bg-white/20 light:hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScroll.right}
            className="p-2 rounded-lg bg-white/10 light:bg-slate-200 hover:bg-white/20 light:hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {implementationPhases.map((item, idx) => (
          <div
            key={item.phase}
            className="flex-shrink-0 w-80 glass p-6 space-y-4 rounded-xl hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-brand-blue font-semibold uppercase tracking-wide">{item.duration}</p>
                <h4 className="text-xl font-bold mt-1">{item.phase}</h4>
              </div>
              <span className="text-3xl">{item.icon}</span>
            </div>

            <div className="space-y-2">
              {item.activities.map((activity, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-brand-teal mt-0.5">▸</span>
                  <span className="leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{activity}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 light:border-slate-200">
              <div className={`h-1 rounded-full bg-gradient-to-r ${item.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Before/After student voice component
function StudentVoiceComparison() {
  const [activeVoice, setActiveVoice] = useState(0);
  const voice = studentVoices[activeVoice];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {studentVoices.map((v, idx) => (
          <button
            key={idx}
            onClick={() => setActiveVoice(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeVoice === idx
                ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg'
                : 'bg-white/10 light:bg-slate-200 text-white light:text-slate-900 hover:bg-white/20 light:hover:bg-slate-300'
            }`}
          >
            {v.grade}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass p-6 space-y-3 border border-slate-600/30">
          <p className="text-xs font-semibold uppercase" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Before Implementation</p>
          <p className="text-sm italic leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>" {voice.quote}"</p>
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <span className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{voice.school}</span>
          </div>
        </div>

        <div className="glass p-6 space-y-3 border-l-4 border-brand-teal bg-gradient-to-br from-brand-teal/5 to-brand-blue/5">
          <p className="text-xs text-brand-teal font-semibold uppercase">After Implementation</p>
          <p className="text-sm italic leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>" {voice.after}"</p>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{voice.school}</span>
            <span className="badge-tile bg-brand-teal/20 text-brand-teal">{voice.impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Outcomes table with interactive comparison
function OutcomesComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 light:border-slate-200">
            <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>Metric</th>
            <th className="text-right py-3 px-4 text-sm font-semibold">Traditional</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-brand-teal">Transformed</th>
            <th className="text-right py-3 px-4 text-sm font-semibold">Change</th>
          </tr>
        </thead>
        <tbody>
          {outcomeData.map((row, idx) => (
            <tr key={idx} className="border-b border-white/10 light:border-slate-200 hover:bg-white/5 light:hover:bg-slate-100 transition-colors">
              <td className="py-3 px-4 text-sm">{row.label}</td>
              <td className="py-3 px-4 text-right text-sm font-semibold" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{row.traditional}%</td>
              <td className="py-3 px-4 text-right text-sm font-semibold text-brand-teal">{row.transformed}%</td>
              <td className="py-3 px-4 text-right">
                <span className="badge-tile bg-brand-teal/20 text-brand-teal">{row.delta}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SchoolPartnership() {
  const { theme, toggle } = useTheme();

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-slate-900/80 light:bg-white/80 backdrop-blur border-b border-white/10 light:border-slate-200">
          <div className="container-wide flex items-center gap-4 py-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Project Apnapan Logo" className="h-12 w-12 rounded-full shadow-glow" loading="lazy" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-900">Project Apnapan</h1>
                <p className="text-xs" style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>School Partnership</p>
              </div>
            </Link>
            <div className="flex-1" />
            <Link to="/community" className="text-sm font-semibold text-muted hover:text-white light:hover:text-slate-900 transition-colors mr-4">
              Community Hub
            </Link>
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </header>

        <main className="container-wide space-y-16 py-10">
          {/* Hero Section */}
          <BlurAnimation delay={0} duration={0.9}>
            <section className="section-shell card-surface overflow-hidden min-h-[60vh] flex items-center">
              <div className="section-bg parallax-dots" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-purple/15 to-brand-teal/20 blur-3xl -z-10" aria-hidden />
              <div className="space-y-8">
                <SlideAnimation direction="left" delay={0.1}>
                  <div className="space-y-4">
                    <div className="pill bg-white/10 light:bg-slate-200 text-white light:text-slate-800 w-fit">
                      Data Storytelling · School Transformation · Futures in Education
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                      What if schools measured
                      <span className="block bg-gradient-to-r from-brand-blue via-brand-teal to-brand-purple bg-clip-text text-transparent">
                        what actually matters?
                      </span>
                    </h1>
                  </div>
                </SlideAnimation>

                <SlideAnimation direction="left" delay={0.2}>
                  <p className="text-lg max-w-3xl leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                    Two schools. Same test scores. One measures belonging, voice, and authenticity. The results? Completely different outcomes. Join a movement of forward-thinking schools transforming how they define and measure success.
                  </p>
                </SlideAnimation>

                <StaggerAnimation delay={0.3} staggerDelay={0.12} direction="up">
                  <div className="flex flex-wrap gap-4">
                    <button className="btn btn-primary">See the Transformation</button>
                    <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">
                      Explore Implementation Guide
                    </button>
                  </div>
                </StaggerAnimation>

                <ScaleAnimation delay={0.4} scale={0.9}>
                  <div className="mt-8 p-6 glass rounded-lg border border-brand-teal/30">
                    <p className="text-sm text-brand-teal font-semibold uppercase tracking-wide">Quick Stats</p>
                    <StaggerAnimation delay={0.5} staggerDelay={0.1}>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-2xl font-bold text-white light:text-slate-900">+47%</p>
                          <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Belonging increase</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white light:text-slate-900">12+</p>
                          <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Schools transformed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white light:text-slate-900">89%</p>
                          <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Predictive accuracy</p>
                        </div>
                      </div>
                    </StaggerAnimation>
                  </div>
                </ScaleAnimation>
              </div>
            </section>
          </BlurAnimation>

          {/* The Core Question */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="section-title">Two Schools. Same Benchmark. Different Reality.</h2>
                <p className="subhead">Let's compare what happens when schools measure belonging, voice, and authentic self-expression alongside academic achievement.</p>
              </div>
              <MetricComparison />
            </section>
          </BlurAnimation>

          {/* Why This Matters */}
          <StaggerAnimation delay={0} staggerDelay={0.2} direction="up">
            <section className="grid gap-8 md:grid-cols-3">
              <ScaleAnimation duration={0.6}>
                <div className="glass p-6 space-y-4 rounded-xl hover:shadow-xl transition-shadow">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-lg font-bold">Belonging Predicts Performance</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                    Schools tracking belonging metrics found that when belonging goes up, academic gains follow within 2-3 months. It's a leading indicator, not a trailing one.
                  </p>
                </div>
              </ScaleAnimation>
              <ScaleAnimation duration={0.6} delay={0.1}>
                <div className="glass p-6 space-y-4 rounded-xl hover:shadow-xl transition-shadow">
                  <span className="text-3xl">🗣️</span>
                  <h3 className="text-lg font-bold">Student Voice Changes Everything</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                    When students feel heard, they participate more deeply. Teachers report higher engagement. Learning becomes collaborative, not extractive.
                  </p>
                </div>
              </ScaleAnimation>
              <ScaleAnimation duration={0.6} delay={0.2}>
                <div className="glass p-6 space-y-4 rounded-xl hover:shadow-xl transition-shadow">
                  <span className="text-3xl">🔄</span>
                  <h3 className="text-lg font-bold">Quick to Iterate, Easy to Sustain</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                    Monthly pulse surveys let schools respond fast. Teachers co-design solutions. Changes stick because they're rooted in actual feedback, not mandates.
                  </p>
                </div>
              </ScaleAnimation>
            </section>
          </StaggerAnimation>

          {/* Implementation Timeline */}
          <section className="card-surface p-8 space-y-8">
            <ImplementationTimeline />
          </section>

          {/* Real Outcomes */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="section-title">What Changed in Real Schools</h2>
                <p className="subhead">Academic metrics + belonging metrics = sustainable transformation</p>
              </div>
              <OutcomesComparison />

              <DropAnimation delay={0.3} distance={30}>
                <div className="mt-8 p-6 bg-brand-teal/5 light:bg-brand-teal/10 border border-brand-teal/30 rounded-lg">
                  <p className="text-sm text-white light:text-slate-900">
                    <span className="font-semibold text-brand-teal">Key insight:</span> Schools didn't sacrifice test scores to gain belonging. In fact, once belonging went up, academic outcomes improved too. The two aren't competing.
                  </p>
                </div>
              </DropAnimation>
            </section>
          </BlurAnimation>

          {/* Student Voices */}
          <BlurAnimation delay={0.1} duration={0.8}>
            <section className="card-surface p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="section-title">Hear from Students</h2>
                <p className="subhead">Real stories of transformation—from students themselves</p>
              </div>
              <StudentVoiceComparison />
            </section>
          </BlurAnimation>

          {/* Success Stories Deep Dive */}
          <section className="space-y-8">
            <h2 className="section-title">Partner Schools in Action</h2>
            <StaggerAnimation delay={0} staggerDelay={0.25} direction="up">
              {successStories.map((story, idx) => (
                <DropAnimation key={idx} distance={50} delay={idx * 0.15}>
                  <div className="card-surface p-8 space-y-6">
                    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <h3 className="text-2xl font-bold">{story.title}</h3>
                          <span className="badge-tile bg-white/10 light:bg-slate-200">{story.timeframe}</span>
                        </div>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{story.location} • {story.studentCount.toLocaleString()} students</p>
                        <p className="text-lg font-semibold text-white light:text-slate-900">{story.headline}</p>
                      </div>
                      <div className="space-y-4">
                        {story.metrics.map((m, i) => (
                          <div key={i} className="space-y-1">
                            <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{m.label}</p>
                            <p className="text-2xl font-bold text-brand-teal">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed border-t border-white/10 light:border-slate-200 pt-4">{story.result}</p>
                  </div>
                </DropAnimation>
              ))}
            </StaggerAnimation>
          </section>

          {/* The Partnership Process */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="section-title">How Partnership Works</h2>
                <p className="subhead">We don't come with pre-built solutions. We co-design with you.</p>
              </div>

              <StaggerAnimation delay={0.2} staggerDelay={0.15} direction="left">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Your Role</h3>
                    <ul className="space-y-3">
                      {[
                        'Lead the cultural vision with us',
                        'Release teachers for co-design meetings (2 hours/month)',
                        'Build infrastructure for pulse surveys',
                        'Champion the shift from metrics to meaning-making',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="text-brand-teal mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-muted leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Our Role</h3>
                    <ul className="space-y-3">
                      {[
                        'Facilitate listening circles & teacher councils',
                        'Design measurement framework with your team',
                        'Build data visualization & pulse surveys',
                        'Coach on translating data into action',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="text-brand-blue mt-0.5 flex-shrink-0">→</span>
                          <span className="text-muted leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Investment & Timeline */}
          <StaggerAnimation delay={0} staggerDelay={0.2} direction="up">
            <section className="grid gap-6 md:grid-cols-2 mb-8">
              <ScaleAnimation delay={0} scale={0.95}>
                <div className="glass p-8 rounded-xl space-y-4">
                  <h3 className="text-2xl font-bold">Investment</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Depends on school size & scope. Typically ranges from $40-80K for 12-18 months of full partnership support, including all facilitation, design, and data tools.
                  </p>
                  <p className="text-xs text-brand-teal font-semibold">We work with you on flexible pricing models.</p>
                </div>
              </ScaleAnimation>

              <ScaleAnimation delay={0.1} scale={0.95}>
                <div className="glass p-8 rounded-xl space-y-4">
                  <h3 className="text-2xl font-bold">Time Commitment</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Expect 8-15 hours/month from your leadership team. Most meetings happen during existing staff meeting blocks or after-school sessions.
                  </p>
                  <p className="text-xs text-brand-teal font-semibold">We minimize disruption, maximize impact.</p>
                </div>
              </ScaleAnimation>
            </section>
          </StaggerAnimation>

          {/* Who Should Apply */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="section-title">The Right Fit</h2>
                <p className="subhead">We're looking for schools ready to measure what matters—and willing to change based on what they find.</p>
              </div>

              <StaggerAnimation delay={0.2} staggerDelay={0.15} direction="up">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3 p-6 bg-brand-teal/5 light:bg-brand-teal/10 rounded-lg border border-brand-teal/30">
                    <h4 className="font-bold text-brand-teal">We're a great fit if:</h4>
                    <ul className="space-y-2">
                      {[
                        'Leadership is genuinely curious about student experience',
                        'You want data that informs, not data that judges',
                        'Teachers are open to trying new approaches',
                        'You see student wellbeing as core to achievement',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted">
                          <span className="text-brand-teal">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 p-6 bg-slate-500/5 light:bg-slate-400/10 rounded-lg border border-slate-500/30">
                    <h4 className="font-bold" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>We might not be a fit if:</h4>
                    <ul className="space-y-2">
                      {[
                        'You want to keep doing what you\'ve always done',
                        'Data should justify existing decisions, not reshape them',
                        'You\'re looking for a short-term quick fix',
                        'Teaching staff is resistant to change',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted">
                          <span className="" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>✗</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Call to Action */}
          <ScaleAnimation delay={0} scale={0.95}>
            <section className="card-surface p-10 text-center space-y-6 bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-teal/10 border border-brand-blue/30">
              <h2 className="section-title">Ready to Join the Movement?</h2>
              <p className="subhead max-w-2xl mx-auto">
                The future of education isn't just about test scores. It's about belonging, voice, and every student feeling like they matter. Let's build that together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn btn-primary">Start a Conversation</button>
              <button className="btn bg-white/10 light:bg-slate-100 text-white light:text-slate-900 border border-white/20 light:border-slate-200">
                Download Partnership Guide
              </button>
            </div>
            <p className="text-xs text-muted pt-4">No commitment. Just a 30-minute call to explore if we're a fit.</p>
            </section>
          </ScaleAnimation>

          {/* FAQ */}
          <BlurAnimation delay={0} duration={0.8}>
            <section className="card-surface p-8 space-y-8">
              <h2 className="section-title">Questions?</h2>
              <StaggerAnimation delay={0.2} staggerDelay={0.15} direction="up">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      q: 'Will this interfere with our existing curriculum?',
                      a: 'No. This works within existing structures—staff meetings, classroom time, student surveys. We integrate, not replace.',
                    },
                    {
                      q: 'How do we know it actually works?',
                      a: 'We track outcomes monthly and share transparent dashboards. You\'ll see changes in student engagement, attendance, and wellbeing—often within 6-8 weeks.',
                    },
                    {
                      q: 'What happens after 12-18 months?',
                      a: 'You\'ll have internal expertise to sustain. We transition from deep involvement to lighter-touch advisory. Many schools continue independently.',
                    },
                    {
                      q: 'Can we pilot with just one grade or department?',
                      a: 'Absolutely. Many schools start small (one grade/9th grade advisory) and expand based on initial results.',
                    },
                  ].map((item, idx) => (
                    <DropAnimation key={idx} distance={30} delay={idx * 0.1}>
                      <div className="space-y-3 p-6 glass rounded-lg">
                        <h4 className="font-bold text-white light:text-slate-900">{item.q}</h4>
                        <p className="text-sm text-muted leading-relaxed">{item.a}</p>
                      </div>
                    </DropAnimation>
                  ))}
                </div>
              </StaggerAnimation>
            </section>
          </BlurAnimation>

          {/* Contact Section */}
          <DropAnimation delay={0} distance={40}>
            <section className="card-surface p-8 space-y-4 text-center">
              <h3 className="text-xl font-bold">Let's Talk</h3>
              <p className="text-muted">
                Questions about partnership? Interested in becoming a pilot school?
                <br />
                <a href="mailto:schools@apnapan.org" className="text-brand-blue hover:text-brand-teal transition-colors font-semibold">
                  schools@apnapan.org
                </a>
              </p>
            </section>
          </DropAnimation>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-10 bg-slate-950/70 light:bg-white/80 border-t border-white/10 light:border-slate-200">
          <div className="container-wide text-center text-sm text-muted space-y-4">
            <p>© 2026 Project Apnapan | Measuring What Matters in Education</p>
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <Link to="/" className="hover:text-white light:hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link to="/community" className="hover:text-white light:hover:text-slate-900 transition-colors">
                Community Hub
              </Link>
              <a href="mailto:contact@apnapan.org" className="hover:text-white light:hover:text-slate-900 transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-white light:hover:text-slate-900 transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
