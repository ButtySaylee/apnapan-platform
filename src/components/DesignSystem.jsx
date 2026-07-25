import React from 'react';
import { Link } from 'react-router-dom';

/**
 * APNApan Design System Components
 * Professional institutional components inspired by UI/UX Pro Max
 * Enterprise SaaS + Bento Grid + Glassmorphism
 */

// ============================================================
// GLASS CARD
// ============================================================
export function GlassCard({ children, className = '', hover = true, padding = 'p-6 sm:p-8', ...props }) {
  return (
    <div
      className={`glass-card ${padding} ${hover ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================
// SURFACE CARD
// ============================================================
export function SurfaceCard({ children, className = '', hover = true, padding = 'p-6 sm:p-8', ...props }) {
  return (
    <div
      className={`surface-card ${padding} ${hover ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================
// BENTO GRID
// ============================================================
export function BentoGrid({ children, className = '', cols = 4, ...props }) {
  const gridClass = cols === 3 ? 'bento-grid-3' : cols === 2 ? 'bento-grid-2' : 'bento-grid';
  return (
    <div className={`${gridClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function BentoItem({ children, className = '', colSpan = 1, rowSpan = 1, ...props }) {
  const colClass = colSpan === 2 ? 'bento-col-span-2' : colSpan === 3 ? 'bento-col-span-3' : colSpan === 4 ? 'bento-full' : '';
  const rowClass = rowSpan === 2 ? 'bento-row-span-2' : '';
  return (
    <div className={`glass-card p-5 sm:p-6 ${colClass} ${rowClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

// ============================================================
// SECTION WRAPPER
// ============================================================
export function Section({ children, className = '', id, dark = false, ...props }) {
  return (
    <section
      id={id}
      className={`section-pad ${dark ? 'bg-[rgba(255,255,255,0.02)]' : ''} ${className}`}
      {...props}
    >
      <div className="container-wide">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, className = '', align = 'center' }) {
  return (
    <div className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 className="headline-section mb-4">{title}</h2>
      {subtitle && <p className="subhead-section max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

// ============================================================
// BUTTONS
// ============================================================
export function Button({ children, variant = 'primary', className = '', size = 'default', href, to, ...props }) {
  const sizeClass = size === 'sm' ? 'px-4 py-2 text-xs' : size === 'lg' ? 'px-7 py-3.5 text-base' : '';
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
  const finalClassName = `btn ${variantClass} ${sizeClass} ${className}`;
  
  // Use React Router Link for internal navigation, <a> for external links
  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={finalClassName} {...props}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={finalClassName} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}

// ============================================================
// PILL / BADGE
// ============================================================
export function Pill({ children, className = '', color = 'default', ...props }) {
  const colorClass = color === 'teal' ? 'text-brand-teal border-brand-teal/30' :
    color === 'blue' ? 'text-brand-blue border-brand-blue/30' :
    color === 'purple' ? 'text-brand-purple border-brand-purple/30' : '';
  return (
    <span className={`pill ${colorClass} ${className}`} {...props}>
      {children}
    </span>
  );
}

// ============================================================
// STAT DISPLAY
// ============================================================
export function StatDisplay({ value, label, className = '', ...props }) {
  return (
    <div className={`text-center ${className}`} {...props}>
      <div className="stat-value mb-2">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ============================================================
// PROGRESS BAR
// ============================================================
export function ProgressBar({ value = 0, max = 100, label = '', showValue = true, className = '', ...props }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && <span className="text-sm font-semibold opacity-80">{Math.round(percent)}%</span>}
        </div>
      )}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

// ============================================================
// METRIC CARD
// ============================================================
export function MetricCard({ icon, title, value, subtitle, trend, className = '', ...props }) {
  return (
    <div className={`metric-card ${className}`} {...props}>
      <div className="flex items-start justify-between mb-3">
        {icon && <span className="text-2xl">{icon}</span>}
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            trend.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div className="stat-value mb-1">{value}</div>
      <div className="font-semibold text-sm mb-1">{title}</div>
      {subtitle && <div className="text-xs opacity-60">{subtitle}</div>}
    </div>
  );
}

// ============================================================
// FEATURE CARD
// ============================================================
export function FeatureCard({ icon, title, description, className = '', ...props }) {
  return (
    <div className={`glass-card p-6 space-y-4 hover-lift ${className}`} {...props}>
      {icon && <div className="text-3xl">{icon}</div>}
      <div>
        <h3 className="headline-card mb-2">{title}</h3>
        <p className="body-base opacity-80">{description}</p>
      </div>
    </div>
  );
}

// ============================================================
// TIMELINE
// ============================================================
export function TimelineItem({ year, title, description, icon, progress = 0, className = '', ...props }) {
  return (
    <div className={`glass-card p-6 space-y-3 ${className}`} {...props}>
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <span className="pill text-brand-teal border-brand-teal/30">{year}</span>
          <h3 className="font-semibold text-base mt-1">{title}</h3>
        </div>
      </div>
      <p className="body-small opacity-80">{description}</p>
      {progress > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

// ============================================================
// COMPARISON CARD (Before/After)
// ============================================================
export function ComparisonCard({ before, after, type = 'default', className = '', ...props }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className}`} {...props}>
      <div className="glass-card p-5 space-y-2 opacity-80">
        <span className="label text-red-400/80">Before</span>
        <p className="body-base italic">"{before}"</p>
      </div>
      <div className="glass-card p-5 space-y-2 border-l-4" style={{ borderLeftColor: '#0d7377' }}>
        <span className="label text-brand-teal">After</span>
        <p className="body-base italic">"{after}"</p>
      </div>
    </div>
  );
}

// ============================================================
// HEADER (Reusable)
// ============================================================
export function AppHeader({ children, className = '', ...props }) {
  return (
    <header className={`glass-header fixed top-0 left-0 right-0 z-50 ${className}`} {...props}>
      <div className="container-wide flex items-center gap-4 h-16 sm:h-18">
        {children}
      </div>
    </header>
  );
}

// ============================================================
// FOOTER
// ============================================================
export function AppFooter({ className = '', ...props }) {
  return (
    <footer className={`border-t py-8 mt-16 ${className}`} style={{
      borderColor: 'rgba(255,255,255,0.08)',
      background: 'rgba(0,0,0,0.2)'
    }} {...props}>
      <div className="container-wide text-center">
        <p className="text-sm opacity-40">© 2026 Project Apnapan | Building schools where every child belongs</p>
      </div>
    </footer>
  );
}

// ============================================================
// LOADING SKELETON
// ============================================================
export function Skeleton({ className = '', width = '100%', height = '20px', ...props }) {
  return (
    <div
      className={`rounded-md animate-shimmer ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
        backgroundSize: '1000px 100%',
      }}
      {...props}
    />
  );
}

// ============================================================
// MODAL
// ============================================================
export function Modal({ isOpen, onClose, title, children, className = '', ...props }) {
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className={`glass-card p-6 sm:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        {...props}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 id="modal-title" className="headline-card">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl leading-none opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// INPUT
// ============================================================
export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold opacity-80">{label}</label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 ${
          error ? 'border-red-400' : ''
        } ${className}`}
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderColor: error ? '#f87171' : 'rgba(255,255,255,0.12)',
          color: '#f1f5f9',
        }}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ============================================================
// TEXTAREA
// ============================================================
export function TextArea({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold opacity-80">{label}</label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none transition-all duration-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 ${
          error ? 'border-red-400' : ''
        } ${className}`}
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderColor: error ? '#f87171' : 'rgba(255,255,255,0.12)',
          color: '#f1f5f9',
        }}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ============================================================
// ICON WRAPPER
// ============================================================
export function IconBox({ children, className = '', color = 'brand-teal', ...props }) {
  const colorClass = color === 'brand-teal' ? 'text-brand-teal bg-brand-teal/10 border-brand-teal/20' :
    color === 'brand-blue' ? 'text-brand-blue bg-brand-blue/10 border-brand-blue/20' :
    color === 'brand-purple' ? 'text-brand-purple bg-brand-purple/10 border-brand-purple/20' :
    'text-brand-accent bg-brand-accent/10 border-brand-accent/20';
  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg border ${colorClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

// ============================================================
// DIVIDER WITH TEXT
// ============================================================
export function Divider({ text, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 divider" />
      {text && <span className="text-xs font-semibold uppercase tracking-widest opacity-40 flex-shrink-0">{text}</span>}
      <div className="flex-1 divider" />
    </div>
  );
}