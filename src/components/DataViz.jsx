import React, { useRef, useEffect, useState, useMemo } from 'react';

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

/**
 * BarChart Component - Animated bar visualization for data comparison
 * @param {Array} data - Array of {label, value, color?, targetValue?}
 * @param {string} title - Chart title
 * @param {boolean} animated - Whether to animate on mount/scroll
 */
export function BarChart({ data, title, animated = true }) {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const maxValue = Math.max(...data.map((d) => d.value || 0));

  return (
    <div ref={containerRef} className="space-y-4">
      {title && <h3 className="text-lg font-bold">{title}</h3>}
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{item.label}</span>
              <span className="font-bold text-white light:text-slate-900">
                {item.value}
                {item.unit && item.unit}
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 light:bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  item.color || 'bg-gradient-to-r from-brand-blue to-brand-purple'
                } transition-all duration-700 ease-out`}
                style={{
                  width: isVisible ? `${(item.value / maxValue) * 100}%` : '0%',
                  transitionDelay: `${idx * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * MetricCard Component - Card with animated metric display
 * @param {Object} props - Component props
 */
export function MetricCard({
  icon,
  label,
  value,
  delta,
  description,
  color = 'from-brand-blue to-brand-purple',
  animated = true,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={ref}
      className={`glass p-6 rounded-lg space-y-3 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl">{icon}</span>
        {delta && <span className="badge-tile text-brand-teal bg-brand-teal/20">{delta}</span>}
      </div>
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {isVisible ? value : '—'}
        </p>
      </div>
      {description && <p className="text-xs text-muted leading-relaxed">{description}</p>}
    </div>
  );
}

/**
 * Timeline Component - Vertical or horizontal step timeline
 * @param {Array} steps - Array of {title, description, status?, icon?}
 * @param {string} direction - 'vertical' or 'horizontal'
 */
export function Timeline({ steps, direction = 'vertical' }) {
  const ref = useRef(null);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        steps.forEach((_, idx) => {
          setTimeout(() => {
            setCompletedSteps((prev) => Math.min(prev + 1, steps.length));
          }, idx * 200);
        });
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [steps.length]);

  const isVertical = direction === 'vertical';

  return (
    <div
      ref={ref}
      className={`${isVertical ? 'space-y-6' : 'flex overflow-x-auto pb-4'}`}
    >
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`flex-shrink-0 relative ${!isVertical && 'min-w-max'}`}
          style={{
            opacity: idx < completedSteps ? 1 : 0.5,
            transition: 'opacity 0.5s ease',
            transitionDelay: `${idx * 100}ms`,
          }}
        >
          <div className={`flex ${isVertical ? 'flex-col' : 'flex-col'} gap-3`}>
            <div className={`flex items-center gap-3 ${!isVertical && 'flex-col'}`}>
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  idx < completedSteps
                    ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white'
                    : 'bg-white/10 light:bg-slate-200 text-muted'
                }`}
              >
                {step.icon || idx + 1}
              </div>
              {isVertical && (
                <div className="flex-1">
                  <p className="font-bold text-white light:text-slate-900">{step.title}</p>
                  <p className="text-sm text-muted mt-1">{step.description}</p>
                </div>
              )}
            </div>
            {!isVertical && (
              <div className="min-w-[120px] text-center">
                <p className="text-sm font-bold">{step.title}</p>
                <p className="text-xs text-muted mt-1">{step.description}</p>
              </div>
            )}
          </div>
          {isVertical && idx < steps.length - 1 && (
            <div className="absolute left-5 top-14 w-0.5 h-8 bg-white/10 light:bg-slate-200" />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * ComparisonSlider Component - Before/After comparison with slider
 * @param {Object} props - {before, after, label, animated}
 */
export function ComparisonSlider({ before, after, label, animated = true }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animated);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className={`space-y-3 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {label && <p className="text-sm font-semibold text-muted">{label}</p>}
      <div className="relative h-32 glass rounded-lg overflow-hidden cursor-col-resize">
        <div className="absolute inset-0 flex">
          <div className="flex-1 p-4 bg-slate-600/20 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Before</p>
            <p className="text-2xl font-bold text-white mt-2">{before}</p>
          </div>
          <div
            className="absolute inset-y-0 bg-white/5 border-r border-brand-teal transition-all"
            style={{ left: `${sliderPosition}%` }}
          />
        </div>
        <div
          className="absolute inset-0 flex pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="flex-1 p-4 bg-gradient-to-r from-brand-teal/30 to-brand-blue/30 flex flex-col justify-center">
            <p className="text-xs text-brand-teal font-semibold uppercase">After</p>
            <p className="text-2xl font-bold text-brand-teal mt-2">{after}</p>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
          aria-label="Comparison slider"
        />
      </div>
    </div>
  );
}

/**
 * ProgressRing Component - SVG circular progress indicator
 * @param {Object} props - {percent, label, animated}
 */
export function ProgressRing({ percent = 65, label, animated = true, size = 120 }) {
  const ref = useRef(null);
  const [displayPercent, setDisplayPercent] = useState(animated ? 0 : percent);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const interval = setInterval(() => {
          setDisplayPercent((prev) => (prev < percent ? prev + 1 : percent));
        }, 20);
        return () => clearInterval(interval);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent, animated]);

  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-white/10 light:text-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-brand-teal transition-all duration-300"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center">
        <p className="text-2xl font-bold text-brand-teal">{displayPercent}%</p>
        {label && <p className="text-xs text-muted mt-1">{label}</p>}
      </div>
    </div>
  );
}

/**
 * ScrollReveal Component - Wrapper for scroll-triggered reveal animations
 * @param {Object} props - {children, delay, direction}
 */
export function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionMap = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${isVisible ? 'translate-y-0 translate-x-0' : directionMap[direction]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
