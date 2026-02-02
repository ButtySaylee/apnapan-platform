import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
            : 'linear-gradient(to bottom right, #f8fafc, #e2e8f0, #cbd5e1)',
          color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
        }}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggle}
          className="fixed top-6 right-6 z-50 p-2 rounded-full border transition-all hover:scale-110"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="text-2xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>

        {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-purple/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-brand-teal/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(52, 152, 219, .1) 25%, rgba(52, 152, 219, .1) 26%, transparent 27%, transparent 74%, rgba(52, 152, 219, .1) 75%, rgba(52, 152, 219, .1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(52, 152, 219, .1) 25%, rgba(52, 152, 219, .1) 26%, transparent 27%, transparent 74%, rgba(52, 152, 219, .1) 75%, rgba(52, 152, 219, .1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '60px 60px',
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main content */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo area with animation */}
          <div className="mb-8 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-6 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full blur-lg opacity-75 animate-pulse"></div>
              <img
                src="/images/logo.png"
                alt="Project Apnapan"
                className="relative w-full h-full rounded-full shadow-glow object-contain border-4 border-white/20 p-2"
              />
            </div>
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-blue mb-2">Project Apnapan</h1>
          </div>

          {/* Main headline with gradient and animation */}
          <div className="space-y-4 animate-fade-in-up animation-delay-200">
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="block mb-3" style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Building schools where</span>
              <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-teal bg-clip-text text-transparent animate-gradient">
                every child is seen, heard, and empowered.
              </span>
            </h2>
          </div>

          {/* Subheading */}
          <div className="animate-fade-in-up animation-delay-400 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed font-light" style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
              A humane, innovative, storytelling-driven platform for student autonomy and belonging.
            </p>
          </div>

          {/* CTA Buttons with stagger animation */}
          <div className="animate-fade-in-up animation-delay-600 flex flex-wrap gap-4 justify-center pt-8">
            <Link
              to="/community"
              className="group relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple opacity-100 group-hover:opacity-110 transition-opacity"></div>
              <div className="relative text-white flex items-center gap-2">
                Explore Community
                <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link
              to="/schools"
              className="group relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 border-2 border-brand-blue/50 hover:border-brand-blue"
            >
              <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors"></div>
              <div className="relative text-white">For School Leaders</div>
            </Link>

            <button className="group relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 border-2 border-brand-teal/50 hover:border-brand-teal">
              <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/10 transition-colors"></div>
              <div className="relative text-white">Get Involved</div>
            </button>
          </div>

          {/* Stats section with scroll indicator */}
          <div className="animate-fade-in-up animation-delay-800 pt-16">
            <p className="text-sm text-slate-400 mb-8">Impact across schools:</p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
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
              <p className="text-xs text-slate-500 uppercase tracking-widest">Scroll to explore</p>
              <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll content - The mission & vision section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20" style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
          : 'linear-gradient(to bottom right, #f8fafc, #e2e8f0, #cbd5e1)'
      }}>
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Why we exist */}
            <div className="space-y-6" data-mouse-track>
              <div className="inline-block">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-blue border border-brand-blue/30" style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 1)'
                }}>Why we exist</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>
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

            {/* Right side - The problem */}
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
                  <div key={idx} className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-4px]">
                    <div className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our approach section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Four-Pillar Approach</h2>
            <p className="text-xl text-slate-300">Creating inclusive environments through research, co-design, and adaptive implementation</p>
          </div>

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
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-brand-blue/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-blue/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-purple/0 group-hover:from-brand-blue/10 group-hover:to-brand-purple/10 transition-all duration-500"></div>
                <div className="relative z-10 space-y-4">
                  <div className="text-4xl">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-blue transition-colors">{pillar.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions section */}
      <section className="relative z-10 min-h-screen flex items-center px-4 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Solutions</h2>
            <p className="text-xl text-slate-300">Comprehensive, evidence-based tools and frameworks</p>
          </div>

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
                className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-teal/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white group-hover:text-brand-teal transition-colors">{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Ready to transform your school?
          </h2>
          <p className="text-xl text-slate-300">
            Join educators, schools, and communities building a future where every child feels they belong.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              to="/community"
              className="group relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple"></div>
              <div className="relative text-white">Join the Community</div>
            </Link>

            <button className="group relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 border-2 border-white hover:border-brand-blue inline-block">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
              <div className="relative text-white">Contact Us</div>
            </button>
          </div>

          <p className="text-sm text-slate-500 light:text-slate-500 pt-8">projectapnapan@gmail.com</p>
        </div>
      </section>
      </div>
    </>
  );
}
