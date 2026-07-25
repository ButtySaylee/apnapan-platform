import React, { useEffect, useRef } from 'react';

// ============================================================
// PARTICLE STARFIELD BACKGROUND
// Enhanced animated particles for the hero section
// ============================================================
export function ParticleField({ count = 80, color = 'rgba(13, 115, 119, 0.25)', speed = 0.5, className = '' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create particles with more variety
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed - 0.15, // slight upward drift
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2, // phase offset for pulsing
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02; // slowly pulse

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Pulsing opacity
        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('0.25', String(pulseOpacity));
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('0.25', String(pulseOpacity * 0.15));
        ctx.fill();

        // Draw connections for nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color.replace('0.25', String(opacity));
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [count, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.8 }}
    />
  );
}

// ============================================================
// MORPHING BLOB
// Organic animated shapes for background decoration
// ============================================================
export function MorphBlob({ size = 500, color = 'rgba(13, 115, 119, 0.1)', left = '10%', top = '20%', speed = 12, className = '' }) {
  return (
    <div
      className={`absolute rounded-full animate-morph-blob pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left,
        top,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        filter: 'blur(80px)',
        animationDuration: `${speed}s`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

// ============================================================
// ANIMATED GRADIENT MESH
// Smooth gradient mesh background with more presence
// ============================================================
export function GradientMesh({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute w-[700px] h-[700px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(13,115,119,0.12) 0%, transparent 70%)',
          top: '5%',
          left: '15%',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          bottom: '15%',
          right: '10%',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(74,111,165,0.08) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}

// ============================================================
// SCAN LINE OVERLAY
// More visible horizontal scanning line
// ============================================================
export function ScanLine({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div
        className="w-full h-[2px] absolute animate-scan-line"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(13,115,119,0.2), rgba(59,130,246,0.15), rgba(13,115,119,0.2), transparent)',
          top: 0,
          boxShadow: '0 0 15px rgba(13,115,119,0.1), 0 0 30px rgba(13,115,119,0.05)',
        }}
      />
    </div>
  );
}

// ============================================================
// ORBITING RINGS
// More visible decorative orbiting elements
// ============================================================
export function OrbitingRings({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Outer ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '600px', height: '600px' }}
      >
        <div
          className="w-full h-full rounded-full border animate-orbit"
          style={{ borderColor: 'rgba(13,115,119,0.12)', borderWidth: '1.5px' }}
        />
      </div>
      {/* Middle ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '450px', height: '450px' }}
      >
        <div
          className="w-full h-full rounded-full border animate-orbit-reverse"
          style={{ borderColor: 'rgba(59,130,246,0.1)', borderWidth: '1px' }}
        />
      </div>
      {/* Inner ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '300px', height: '300px' }}
      >
        <div
          className="w-full h-full rounded-full border animate-orbit"
          style={{ borderColor: 'rgba(13,115,119,0.08)', borderWidth: '1px', animationDuration: '10s' }}
        />
      </div>
      {/* Orbiting dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', height: '600px' }}>
        <div
          className="absolute w-3 h-3 rounded-full animate-orbit"
          style={{
            background: 'rgba(13,115,119,0.4)',
            top: '50%',
            left: '50%',
            marginLeft: -6,
            marginTop: -6,
            boxShadow: '0 0 15px rgba(13,115,119,0.3), 0 0 30px rgba(13,115,119,0.1)',
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '450px', height: '450px' }}>
        <div
          className="absolute w-2 h-2 rounded-full animate-orbit-reverse"
          style={{
            background: 'rgba(59,130,246,0.4)',
            top: '50%',
            left: '50%',
            marginLeft: -4,
            marginTop: -4,
            boxShadow: '0 0 12px rgba(59,130,246,0.3), 0 0 24px rgba(59,130,246,0.1)',
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '300px', height: '300px' }}>
        <div
          className="absolute w-1.5 h-1.5 rounded-full animate-orbit"
          style={{
            background: 'rgba(13,115,119,0.5)',
            top: '50%',
            left: '50%',
            marginLeft: -3,
            marginTop: -3,
            boxShadow: '0 0 10px rgba(13,115,119,0.3)',
            animationDuration: '10s',
          }}
        />
      </div>
    </div>
  );
}

// ============================================================
// DATA STREAM
// More visible vertical data flow animation lines
// ============================================================
export function DataStream({ lines = 8, className = '' }) {
  const streamRef = useRef(null);

  useEffect(() => {
    const el = streamRef.current;
    if (!el) return;

    const bars = el.querySelectorAll('.data-bar');
    bars.forEach((bar) => {
      const delay = Math.random() * 4;
      const duration = Math.random() * 3 + 2;
      const height = Math.random() * 50 + 20;
      bar.style.animationDelay = `${delay}s`;
      bar.style.animationDuration = `${duration}s`;
      bar.style.height = `${height}px`;
    });
  }, []);

  return (
    <div ref={streamRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="data-bar absolute bottom-0 w-[1.5px] animate-data-flow"
          style={{
            left: `${(i / lines) * 100}%`,
            background: 'linear-gradient(to top, transparent, rgba(13,115,119,0.12), rgba(59,130,246,0.08), transparent)',
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}