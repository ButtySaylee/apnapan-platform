import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DropAnimation, SlideAnimation, ScaleAnimation, StaggerAnimation, BlurAnimation } from '../components/ScrollAnimations';

function useTheme() {
  const prefersDark = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    []
  );
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

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

export default function Landing() {
  const { theme, toggle } = useTheme();
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };

      // Update gradient position
      const elements = containerRef.current.querySelectorAll('[data-mouse-track]');
      elements.forEach((el) => {
        const x = mousePos.current.x * 100;
        const y = mousePos.current.y * 100;
        el.style.setProperty('--mouse-x', `${x}%`);
        el.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="min-h-screen overflow-hidden"
        ref={containerRef}
        style={{
          background: theme === 'dark' ? '#0d1117' : '#ffffff',
          color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
        }}
      >
        {/* Top-left logo header */}
        <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center" style={{
          backgroundColor: theme === 'dark' ? 'rgba(13,17,23,0.97)' : 'rgba(255,255,255,0.97)',
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          backdropFilter: 'blur(8px)'
        }}>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/images/logo.png"
              alt="Project Apnapan"
              className="h-9 w-9 rounded-xl object-contain border border-white/20 light:border-slate-300 bg-white/5 p-1"
            />
            <span className="text-base font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>
              Project Apnapan
            </span>
          </Link>
        </header>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          className="fixed top-4 right-6 z-50 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)',
            color: theme === 'dark' ? '#cbd5e1' : '#334155'
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀ Light' : '☽ Dark'}
        </button>


      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 md:py-28">
        {/* Main content */}
        <div className="max-w-5xl mx-auto text-center space-y-10">

          {/* Main headline */}
          <DropAnimation delay={0} distance={50}>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                <span className="block mb-2" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Building schools where</span>
                <span style={{ color: theme === 'dark' ? '#7eb8d4' : '#1a3558' }}>
                  every child is seen, heard, and empowered.
                </span>
              </h2>
            </div>
          </DropAnimation>

          {/* Subheading */}
          <BlurAnimation delay={0.4} duration={0.9}>
            <div className="animate-fade-in-up animation-delay-400 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl leading-relaxed font-light" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                A humane, innovative, storytelling-driven platform for student autonomy and belonging.
              </p>
            </div>
          </BlurAnimation>

          {/* CTA Buttons */}
          <StaggerAnimation delay={0.3} staggerDelay={0.1} direction="up">
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Link
                to="/community"
                className="px-6 py-3 rounded-lg bg-brand-blue text-white text-base font-semibold hover:opacity-90 transition-all shadow-sm flex items-center gap-2"
              >
                Explore Community <span>→</span>
              </Link>
              <Link
                to="/calculator"
                className="px-6 py-3 rounded-lg text-base font-semibold transition-all border flex items-center gap-2"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                  color: theme === 'dark' ? '#f1f5f9' : '#1a3558'
                }}
              >
                Try Calculator <span>→</span>
              </Link>
              <Link
                to="/schools"
                className="px-6 py-3 rounded-lg text-base font-semibold transition-all border flex items-center gap-2"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
                  color: theme === 'dark' ? '#f1f5f9' : '#1a3558'
                }}
              >
                For School Leaders <span>→</span>
              </Link>
            </div>
          </StaggerAnimation>

          {/* Stats section with scroll indicator */}
          <div className="animate-fade-in-up animation-delay-800 pt-20">
            <p className="text-sm mb-10" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Impact across schools:</p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-20">
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-brand-blue group-hover:text-brand-purple transition-colors">78%</div>
                <p className="text-sm mt-2" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Students feel seen</p>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-brand-teal group-hover:text-brand-blue transition-colors">320+</div>
                <p className="text-sm mt-2" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Peer mentoring pairs</p>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-brand-purple group-hover:text-brand-teal transition-colors">12+</div>
                <p className="text-sm mt-2" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Schools partnering</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <p className="text-xs uppercase tracking-widest" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Scroll to explore</p>
              <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll content - The mission & vision section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20" style={{
        background: theme === 'dark' ? '#111827' : '#f8fafc',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
      }}>
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Why we exist */}
            <SlideAnimation direction="left" delay={0}>
              <div className="space-y-6" data-mouse-track>
                <div className="inline-block">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-brand-blue border border-brand-blue/30" style={{
                    backgroundColor: theme === 'dark' ? 'rgba(26,53,88,0.3)' : 'rgba(226, 232, 240, 1)'
                  }}>Why we exist</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>
                  Think back to your school days
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                  Was there ever a moment when you felt truly <span className="text-brand-blue font-semibold\">valued</span>, <span className="text-brand-purple font-semibold\">heard</span>, <span className="text-brand-teal font-semibold\">safe</span>, or <span className="text-brand-blue font-semibold\">connected</span>?
                </p>
                <p className="leading-relaxed" style={{ color: theme === 'dark' ? '#94a3b8' : '#475569' }}>
                  Maybe it was a teacher who noticed your effort, a friend who supported you, or just knowing you had a place where you belonged.
                </p>
                <p className="text-lg italic pt-4 border-l-4 border-brand-blue pl-4" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                  "Now imagine the opposite—feeling invisible, unheard, or unsafe. That's the difference between a student who thrives and one who disengages."
                </p>
              </div>
            </SlideAnimation>

            {/* Right side - The problem */}
            <SlideAnimation direction="right" delay={0.1}>
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: '📉',
                      title: 'Academic Decline',
                      desc: 'Disconnected students engage less, lose motivation, and struggle academically.',
                    },
                    {
                      icon: '⚠️',
                      title: 'Behavioral Problems',
                      desc: 'Students without belonging are more likely to disengage, act out, or skip school.',
                    },
                    {
                      icon: '💔',
                      title: 'Emotional Distress',
                      desc: 'Loneliness, anxiety, and depression increase when students feel they don\'t belong.',
                    },
                    {
                      icon: '⬇️',
                      title: 'Lower Self-Esteem',
                      desc: 'Exclusion shapes a student\'s confidence and self-worth for years to come.',
                    },
                  ].map((item, idx) => (
                    <DropAnimation key={idx} delay={0.1 + idx * 0.1} distance={30}>
                      <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-4px]">
                        <div className="flex gap-3">
                          <span className="text-2xl flex-shrink-0">{item.icon}</span>
                          <div>
                            <h4 className="font-bold text-base text-white mb-1">{item.title}</h4>
                            <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#475569' }}>{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </DropAnimation>
                  ))}
                </div>
              </div>
            </SlideAnimation>
          </div>
        </div>
      </section>

      {/* Our approach section */}
      <section className="relative z-10 flex items-center px-4 py-24" style={{
        backgroundColor: theme === 'dark' ? '#0d1117' : '#ffffff',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
      }}>
        <div className="max-w-5xl mx-auto w-full">
          <BlurAnimation delay={0} duration={0.8}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Our Four-Pillar Approach</h2>
              <p className="text-base" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Creating inclusive environments through research, co-design, and adaptive implementation</p>
            </div>
          </BlurAnimation>

          <StaggerAnimation delay={0.2} staggerDelay={0.15} direction="up">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🔍',
                  title: 'Collective Inquiry',
                  desc: 'Build shared understanding through data-driven inquiry and stakeholder reflections.',
                },
                {
                  icon: '🎨',
                  title: 'Co-Design Solutions',
                  desc: 'Work with schools, teachers, and leaders to design contextually relevant interventions.',
                },
                {
                  icon: '📊',
                  title: 'Action Research',
                  desc: 'Conduct research with students, teachers, and administrators to understand belonging barriers.',
                },
                {
                  icon: '⚡',
                  title: 'Adaptive Implementation',
                  desc: 'Implement low-resource, creative solutions to reduce barriers and enhance belonging.',
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-7 border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#ffffff',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                    boxShadow: theme === 'dark' ? 'none' : '0 1px 4px rgba(0,0,0,0.06)'
                  }}
                >
                  <div className="space-y-3">
                    <div className="text-3xl">{pillar.icon}</div>
                    <h3 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>{pillar.title}</h3>
                    <p className="leading-relaxed text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#475569' }}>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Solutions section */}
      <section className="relative z-10 flex items-center px-4 py-24" style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f8fafc',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
      }}>
        <div className="max-w-5xl mx-auto w-full">
          <BlurAnimation delay={0} duration={0.8}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>Our Solutions</h2>
              <p className="text-base" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Comprehensive, evidence-based tools and frameworks</p>
            </div>
          </BlurAnimation>

          <StaggerAnimation delay={0.2} staggerDelay={0.1} direction="left">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Digital & ethical AI-based K-12 Solutions',
                'Local Innovations rooted in global K-12 research',
                'The power of data & Educational Analytics',
                'Teacher Professional Development & Support',
                'Belonging-centered Curriculum Frameworks',
                'Research-backed Implementation Tools',
              ].map((solution, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-lg border transition-all duration-200"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#ffffff',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                    boxShadow: theme === 'dark' ? 'none' : '0 1px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm border border-brand-blue/20">
                    {idx + 1}
                  </div>
                  <p className="font-medium text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>{solution}</p>
                </div>
              ))}
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative z-10 flex items-center justify-center px-4 py-28" style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f0f4f8',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
      }}>
        <BlurAnimation delay={0} duration={1}>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>
              Ready to transform your school?
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: theme === 'dark' ? '#94a3b8' : '#475569' }}>
              Join educators, schools, and communities building a future where every child feels they belong.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link
                to="/community"
                className="px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:opacity-90 transition-all shadow-sm"
              >
                Join the Community
              </Link>
              <a
                href="mailto:projectapnapan@gmail.com"
                className="px-6 py-3 rounded-lg font-semibold border transition-all"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#cbd5e1',
                  color: theme === 'dark' ? '#f1f5f9' : '#334155'
                }}
              >
                Contact Us
              </a>
            </div>

            <p className="text-sm pt-4" style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}>projectapnapan@gmail.com</p>
          </div>
        </BlurAnimation>
      </section>
      </div>
    </>
  );
}
