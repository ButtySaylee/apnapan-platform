import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import {
  GlassCard, BentoGrid, BentoItem,
  Section, SectionHeader, Button, Pill, StatDisplay,
  FeatureCard, TimelineItem, ComparisonCard, ProgressBar,
  AppHeader, AppFooter, MetricCard, IconBox, Divider
} from '../components/DesignSystem';

const schoolMetrics = [
  { metric: 'Student Belonging', schoolA: 45, schoolB: 88, description: 'Feel accepted and valued at school' },
  { metric: 'Voice & Agency', schoolA: 38, schoolB: 82, description: 'Feel heard in decisions about their learning' },
  { metric: 'Classroom Safety', schoolA: 52, schoolB: 91, description: 'Safe to be authentic and take risks' },
  { metric: 'Learning Motivation', schoolA: 61, schoolB: 87, description: 'Intrinsic drive to learn and participate' },
];

const outcomeData = [
  { label: 'Academic Performance (standardized tests)', traditional: 72, transformed: 75, delta: '+3%' },
  { label: 'Attendance Consistency', traditional: 84, transformed: 94, delta: '+10%' },
  { label: 'Discipline Incidents', traditional: 22, transformed: 8, delta: '-64%' },
  { label: 'Student-Reported Wellbeing', traditional: 58, transformed: 89, delta: '+31%' },
  { label: 'Teacher Retention', traditional: 68, transformed: 91, delta: '+23%' },
];

const implementationPhases = [
  { phase: 'Phase 1: Listen', duration: '6-8 weeks', activities: ['Conduct student & teacher listening circles', 'Map current culture and belonging gaps', 'Co-create measurement framework'], icon: '👂' },
  { phase: 'Phase 2: Design', duration: '8-10 weeks', activities: ['Co-design interventions with teachers', 'Create monthly pulse survey templates', 'Build feedback loops into routines'], icon: '✏️' },
  { phase: 'Phase 3: Implement', duration: '12-16 weeks', activities: ['Launch rituals of belonging (weekly circles)', 'Track metrics & iterate monthly', 'Build peer mentoring structures'], icon: '🚀' },
  { phase: 'Phase 4: Scale', duration: 'Ongoing', activities: ['Document outcomes & lessons learned', 'Train teacher leaders & peer facilitators', 'Adapt for other departments/schools'], icon: '📈' },
];

const studentVoices = [
  {
    quote: 'I show up because I have to. Nobody notices if I\'m struggling.',
    after: 'My teachers ask about my day. I actually want to come to class.',
    grade: 'Grade 9', school: 'First Implementation School', impact: 'Students re-engage in classroom routines',
  },
  {
    quote: 'I\'m afraid to ask questions. I don\'t want to look stupid.',
    after: 'I ask tons of questions now. Everyone else does too. It\'s normal here.',
    grade: 'Grade 7', school: 'First Implementation School', impact: 'Question-asking and participation become normalized',
  },
  {
    quote: 'I\'m not really myself at school. I need to be someone else.',
    after: 'I can just be me. No one pretends to be different here.',
    grade: 'Grade 10', school: 'First Implementation School', impact: 'Students report feeling safer being themselves',
  },
];

const successStories = [
  {
    title: 'Mountain Valley High', location: 'Colorado, USA', studentCount: 1200, timeframe: '6 months',
    headline: 'Belonging improved significantly while academics stayed steady',
    result: 'Implemented weekly "belonging circles" where students share challenges. The school redesigned lunch seating to mix friend groups and added peer mentoring. Teams reported calmer climate and fewer behavior escalations.',
    highlight: 'Early belonging rituals created a more stable learning culture.',
  },
  {
    title: 'Riverside Academy', location: 'Toronto, Canada', studentCount: 850, timeframe: '8 months',
    headline: 'Teachers now say: "I actually know my students."',
    result: 'Shifted from traditional report cards to narrative portfolios including student self-reflections. Teachers met monthly in circles to discuss how belonging shows up in academic work.',
    highlight: 'Narrative assessment shifted classroom relationships toward trust and growth.',
  },
  {
    title: 'Nova International', location: 'Singapore', studentCount: 1600, timeframe: '10 months',
    headline: 'Belonging metrics predicted academic gains 3 months ahead',
    result: 'Tracked belonging metrics weekly. Schools realized that when belonging goes down, academics follow 2-3 months later. Shifted from reactive to predictive.',
    highlight: 'Weekly check-ins helped leaders intervene before problems became crises.',
  },
];

const faqs = [
  { q: 'Will this interfere with our existing curriculum?', a: 'No. This works within existing structures—staff meetings, classroom time, student surveys. We integrate, not replace.' },
  { q: 'How do we know it actually works?', a: 'We track outcomes monthly and share transparent dashboards. You\'ll see changes in student engagement, attendance, and wellbeing—often within 6-8 weeks.' },
  { q: 'What happens after 12-18 months?', a: 'You\'ll have internal expertise to sustain. We transition from deep involvement to lighter-touch advisory. Many schools continue independently.' },
  { q: 'Can we pilot with just one grade or department?', a: 'Absolutely. Many schools start small (one grade/9th grade advisory) and expand based on initial results.' },
];

export default function SchoolPartnership() {
  const { theme, toggle } = useTheme();
  const [activeMetric, setActiveMetric] = useState(0);
  const [activeVoice, setActiveVoice] = useState(0);
  const metric = schoolMetrics[activeMetric];
  const voice = studentVoices[activeVoice];
  const isDark = theme === 'dark';

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
              <p className="hidden sm:block text-xs opacity-50">School Partnership</p>
            </div>
          </Link>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <Link to="/community" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Community Hub</Link>
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
            <div className="max-w-4xl space-y-8">
              <Pill color="teal">Data Storytelling · School Transformation · Futures in Education</Pill>
              <h1 className="headline-hero">
                What if schools measured{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-brand-blue to-brand-purple">
                  what actually matters?
                </span>
              </h1>
              <p className="subhead-hero max-w-3xl">
                Two schools. Same test scores. One measures belonging, voice, and authenticity. 
                The results? Completely different outcomes. Join a movement of forward-thinking schools 
                transforming how they define and measure success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">See the Transformation</Button>
                <Button variant="secondary" size="lg">Explore Implementation Guide</Button>
              </div>
              {/* Insight Card */}
              <div className="glass-card p-6 max-w-2xl border-l-4" style={{ borderLeftColor: '#0d7377' }}>
                <p className="label text-brand-teal mb-4">What leaders notice first</p>
                <div className="space-y-3">
                  {[
                    'Students participate more consistently in class and advisory spaces.',
                    'Teachers spend less time in reactive discipline cycles.',
                    'Leadership teams act earlier because warning signals are visible sooner.',
                  ].map((item, idx) => (
                    <p key={idx} className="body-base opacity-80 flex gap-2">
                      <span className="text-brand-teal">→</span> {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ============================================================
              COMPARISON — Bento Data Storytelling
          ============================================================ */}
          <Section dark>
            <SectionHeader
              title="Two Schools. Same Benchmark. Different Reality."
              subtitle="Let's compare what happens when schools measure belonging, voice, and authentic self-expression alongside academic achievement."
            />
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Metric Selector */}
              <div className="flex flex-wrap gap-2">
                {schoolMetrics.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMetric(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeMetric === idx
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    {m.metric}
                  </button>
                ))}
              </div>

              {/* Comparison Bars */}
              <div className="glass-card p-6 sm:p-8 space-y-8">
                <p className="body-base opacity-70">{metric.description}</p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Traditional School (A)</span>
                      <span className="text-sm font-semibold opacity-60">Needs support</span>
                    </div>
                    <div className="progress-bar h-3">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${metric.schoolA}%`,
                          background: 'linear-gradient(90deg, #64748b, #94a3b8)',
                        }}
                      />
                    </div>
                    <span className="text-xs opacity-50">{metric.schoolA}%</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Transformed School (B)</span>
                      <span className="text-sm font-semibold text-brand-teal">Stronger climate</span>
                    </div>
                    <div className="progress-bar h-3">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${metric.schoolB}%`,
                          background: 'linear-gradient(90deg, #0d7377, #1a3558)',
                        }}
                      />
                    </div>
                    <span className="text-xs text-brand-teal">{metric.schoolB}%</span>
                  </div>
                </div>

                <p className="text-xs opacity-50 pt-4 divider">Same test scores. Different lived experience.</p>
              </div>
            </div>
          </Section>

          {/* ============================================================
              WHY THIS MATTERS — 3 Pillars
          ============================================================ */}
          <Section>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon="🎯"
                title="Belonging Predicts Performance"
                description="Schools tracking belonging metrics found that when belonging goes up, academic gains follow within 2-3 months. It's a leading indicator, not a trailing one."
              />
              <FeatureCard
                icon="🗣️"
                title="Student Voice Changes Everything"
                description="When students feel heard, they participate more deeply. Teachers report higher engagement. Learning becomes collaborative, not extractive."
              />
              <FeatureCard
                icon="🔄"
                title="Quick to Iterate, Easy to Sustain"
                description="Monthly pulse surveys let schools respond fast. Teachers co-design solutions. Changes stick because they're rooted in actual feedback."
              />
            </div>
          </Section>

          {/* ============================================================
              IMPLEMENTATION TIMELINE
          ============================================================ */}
          <Section dark>
            <SectionHeader
              title="Implementation Timeline"
              subtitle="12 months from listening to measurable transformation"
            />
            <div className="grid md:grid-cols-2 gap-4">
              {implementationPhases.map((item, idx) => (
                <div key={idx} className="glass-card p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{item.phase}</h3>
                      <p className="text-xs opacity-50">{item.duration}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {item.activities.map((activity, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="text-brand-teal mt-0.5">▸</span>
                        <span className="opacity-70">{activity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="divider" />
                  <div className="h-1 rounded-full bg-gradient-to-r from-brand-teal to-brand-blue" />
                </div>
              ))}
            </div>
          </Section>

          {/* ============================================================
              OUTCOMES — Data Table
          ============================================================ */}
          <Section>
            <SectionHeader
              title="What Changed in Real Schools"
              subtitle="Academic metrics + belonging metrics = sustainable transformation"
            />
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                      <th className="text-left py-4 px-5 text-sm font-semibold opacity-70">Metric</th>
                      <th className="text-right py-4 px-5 text-sm font-semibold opacity-70">Traditional</th>
                      <th className="text-right py-4 px-5 text-sm font-semibold text-brand-teal">Transformed</th>
                      <th className="text-right py-4 px-5 text-sm font-semibold opacity-70">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcomeData.map((row, idx) => (
                      <tr key={idx} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                        <td className="py-4 px-5 text-sm">{row.label}</td>
                        <td className="py-4 px-5 text-right text-sm font-semibold opacity-60">{row.traditional}%</td>
                        <td className="py-4 px-5 text-right text-sm font-semibold text-brand-teal">{row.transformed}%</td>
                        <td className="py-4 px-5 text-right">
                          <Pill color="teal">{row.delta}</Pill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="glass-card p-6 mt-6 border-l-4" style={{ borderLeftColor: '#0d7377' }}>
              <p className="body-base">
                <span className="font-semibold text-brand-teal">Key insight:</span> Schools didn't sacrifice test scores to gain belonging. 
                In fact, once belonging went up, academic outcomes improved too. The two aren't competing.
              </p>
            </div>
          </Section>

          {/* ============================================================
              STUDENT VOICES — Before/After
          ============================================================ */}
          <Section dark>
            <SectionHeader
              title="Hear from Students"
              subtitle="Real stories of transformation—from students themselves"
            />
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex flex-wrap gap-2">
                {studentVoices.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVoice(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeVoice === idx ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {v.grade}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card p-6 space-y-3 opacity-80">
                  <span className="label text-red-400/80">Before Implementation</span>
                  <p className="body-base italic">"{voice.quote}"</p>
                  <p className="text-xs opacity-50">{voice.school}</p>
                </div>
                <div className="glass-card p-6 space-y-3 border-l-4" style={{ borderLeftColor: '#0d7377' }}>
                  <span className="label text-brand-teal">After Implementation</span>
                  <p className="body-base italic">"{voice.after}"</p>
                  <div className="flex items-center justify-between pt-2 divider">
                    <p className="text-xs opacity-50">{voice.school}</p>
                    <Pill color="teal">{voice.impact}</Pill>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ============================================================
              SUCCESS STORIES
          ============================================================ */}
          <Section>
            <SectionHeader title="Partner Schools in Action" subtitle="Real schools, real results" />
            <div className="space-y-6">
              {successStories.map((story, idx) => (
                <div key={idx} className="glass-card p-6 sm:p-8 space-y-6 hover-lift">
                  <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <h3 className="headline-card">{story.title}</h3>
                        <Pill color="blue">{story.timeframe}</Pill>
                      </div>
                      <p className="text-sm opacity-60">{story.location} · {story.studentCount.toLocaleString()} students</p>
                      <p className="text-lg font-semibold">{story.headline}</p>
                    </div>
                    <div className="space-y-2 glass-card p-4">
                      <p className="label text-brand-teal">Key takeaway</p>
                      <p className="body-small opacity-80">{story.highlight}</p>
                    </div>
                  </div>
                  <Divider />
                  <p className="body-base opacity-70">{story.result}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ============================================================
              PARTNERSHIP PROCESS
          ============================================================ */}
          <Section dark>
            <SectionHeader
              title="How Partnership Works"
              subtitle="We don't come with pre-built solutions. We co-design with you."
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h3 className="headline-card">Your Role</h3>
                <div className="space-y-3">
                  {[
                    'Lead the cultural vision with us',
                    'Release teachers for co-design meetings (2 hours/month)',
                    'Build infrastructure for pulse surveys',
                    'Champion the shift from metrics to meaning-making',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-brand-teal mt-0.5 flex-shrink-0">✓</span>
                      <span className="opacity-70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="headline-card">Our Role</h3>
                <div className="space-y-3">
                  {[
                    'Facilitate listening circles & teacher councils',
                    'Design measurement framework with your team',
                    'Build data visualization & pulse surveys',
                    'Coach on translating data into action',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-brand-blue mt-0.5 flex-shrink-0">→</span>
                      <span className="opacity-70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ============================================================
              INVESTMENT & TIMELINE
          ============================================================ */}
          <Section>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 sm:p-8 space-y-4">
                <h3 className="headline-card">Investment</h3>
                <p className="body-base opacity-70">
                  Depends on school size & scope. Typically ranges from $40-80K for 12-18 months of full partnership support, 
                  including all facilitation, design, and data tools.
                </p>
                <p className="text-xs text-brand-teal font-semibold">We work with you on flexible pricing models.</p>
              </div>
              <div className="glass-card p-6 sm:p-8 space-y-4">
                <h3 className="headline-card">Time Commitment</h3>
                <p className="body-base opacity-70">
                  Expect 8-15 hours/month from your leadership team. Most meetings happen during existing staff 
                  meeting blocks or after-school sessions.
                </p>
                <p className="text-xs text-brand-teal font-semibold">We minimize disruption, maximize impact.</p>
              </div>
            </div>
          </Section>

          {/* ============================================================
              FIT ASSESSMENT
          ============================================================ */}
          <Section dark>
            <SectionHeader title="The Right Fit" subtitle="We're looking for schools ready to measure what matters—and willing to change based on what they find." />
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 space-y-4 border-l-4 border-brand-teal">
                <h4 className="font-bold text-brand-teal">We're a great fit if:</h4>
                <ul className="space-y-3">
                  {[
                    'Leadership is genuinely curious about student experience',
                    'You want data that informs, not data that judges',
                    'Teachers are open to trying new approaches',
                    'You see student wellbeing as core to achievement',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm opacity-70">
                      <span className="text-brand-teal">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 space-y-4">
                <h4 className="font-bold opacity-70">We might not be a fit if:</h4>
                <ul className="space-y-3">
                  {[
                    'You want to keep doing what you\'ve always done',
                    'Data should justify existing decisions, not reshape them',
                    'You\'re looking for a short-term quick fix',
                    'Teaching staff is resistant to change',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm opacity-60">
                      <span className="opacity-40">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* ============================================================
              CTA
          ============================================================ */}
          <Section>
            <div className="glass-card p-10 sm:p-14 text-center space-y-8 max-w-3xl mx-auto border" style={{ borderColor: isDark ? 'rgba(13,115,119,0.3)' : 'rgba(13,115,119,0.2)' }}>
              <h2 className="headline-section">
                Ready to Join the Movement?
              </h2>
              <p className="subhead-section max-w-2xl mx-auto">
                The future of education isn't just about test scores. It's about belonging, voice, 
                and every student feeling like they matter. Let's build that together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg">Start a Conversation</Button>
                <Button variant="secondary" size="lg">Download Partnership Guide</Button>
              </div>
              <p className="text-xs opacity-40">No commitment. Just a 30-minute call to explore if we're a fit.</p>
            </div>
          </Section>

          {/* ============================================================
              FAQ
          ============================================================ */}
          <Section dark>
            <SectionHeader title="Questions?" subtitle="Everything you need to know about partnering with us" />
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqs.map((item, idx) => (
                <div key={idx} className="glass-card p-6 space-y-3 hover-lift">
                  <h4 className="font-semibold">{item.q}</h4>
                  <p className="body-small opacity-70">{item.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ============================================================
              CONTACT
          ============================================================ */}
          <Section>
            <div className="glass-card p-8 text-center space-y-4 max-w-xl mx-auto">
              <h3 className="headline-card">Let's Talk</h3>
              <p className="body-base opacity-70">
                Questions about partnership? Interested in becoming a pilot school?
                <br />
                <a href="mailto:schools@apnapan.org" className="text-brand-accent hover:opacity-80 font-semibold transition-opacity">
                  schools@apnapan.org
                </a>
              </p>
            </div>
          </Section>
        </main>

        <AppFooter />
      </div>
    </div>
  );
}