import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: '2022',
    title: 'Started B.Tech CSE',
    description: 'Enrolled in Computer Science at university. First steps into programming — C, C++, data structures.',
    tags: ['C', 'C++', 'DSA'],
    icon: '◈',
    status: 'COMPLETED',
  },
  {
    year: '2023',
    title: 'First React Project',
    description: 'Built Portfolio v1 in TypeScript + React. Deployed to GitHub Pages. Fell in love with frontend engineering.',
    tags: ['TypeScript', 'React', 'GitHub Pages'],
    icon: '</>' ,
    status: 'COMPLETED',
  },
  {
    year: '2023',
    title: 'InvestIQ — AI Finance Platform',
    description: 'Launched an AI-powered investment platform with real-time market dashboards, TradingView charts, and smart stock screening.',
    tags: ['React', 'AI', 'Finance API'],
    icon: '⬡',
    status: 'COMPLETED',
  },
  {
    year: '2024',
    title: 'RIFT 2026 — Financial Forensics',
    description: 'Python Flask engine for deep forensic financial analysis. Deployed live on Render. Learned backend at scale.',
    tags: ['Python', 'Flask', 'Render'],
    icon: '▷',
    status: 'COMPLETED',
  },
  {
    year: '2024',
    title: 'Cloud & DevOps Deep Dive',
    description: 'AWS Cloud Practitioner path, Docker containerization, Git workflows, CI/CD pipelines. Systems thinking unlocked.',
    tags: ['AWS', 'Docker', 'DevOps'],
    icon: '⚡',
    status: 'COMPLETED',
  },
  {
    year: '2025',
    title: 'SO Interiors — Premium Agency Site',
    description: 'Full-stack luxury interior design studio website. Smooth GSAP animations, dark aesthetic. Live on Vercel.',
    tags: ['GSAP', 'Vite', 'Full-stack'],
    icon: '◎',
    status: 'COMPLETED',
  },
  {
    year: '2026',
    title: 'This Portfolio — 3D Scrollytelling',
    description: 'Built the most ambitious portfolio: Three.js, GSAP ScrollTrigger, 80-frame image sequence, WebGL shaders. Currently seeking opportunities.',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    icon: '⬢',
    status: 'CURRENT',
  },
  {
    year: '????',
    title: 'NEXT MISSION',
    description: 'Next chapter loading... Building something extraordinary. Stay tuned.',
    tags: ['???'],
    icon: '▸',
    status: 'LOADING',
  },
];

function TimelineCard({ milestone, index, isLeft }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const statusColor = milestone.status === 'CURRENT' ? '#22c55e'
    : milestone.status === 'LOADING' ? '#6b7280' : 'var(--accent, #dc2626)';

  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        alignItems: 'center',
        marginBottom: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateX(${isLeft ? -30 : 30}px)`,
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Left side */}
      <div style={{ padding: '0 24px 0 0', textAlign: 'right' }}>
        {isLeft ? (
          <CardContent milestone={milestone} statusColor={statusColor} align="right" />
        ) : (
          <div style={{ color: '#1f2937', fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace" }}>
            {milestone.year}
          </div>
        )}
      </div>

      {/* Center spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Dot */}
        <div style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: milestone.status === 'LOADING' ? 'transparent' : statusColor,
          border: `2px solid ${statusColor}`,
          boxShadow: milestone.status !== 'LOADING' ? `0 0 12px ${statusColor}` : 'none',
          flexShrink: 0,
          animation: milestone.status === 'CURRENT' ? 'dotPulse 2s ease infinite' : 'none',
        }} />
      </div>

      {/* Right side */}
      <div style={{ padding: '0 0 0 24px' }}>
        {!isLeft ? (
          <CardContent milestone={milestone} statusColor={statusColor} align="left" />
        ) : (
          <div style={{ color: '#1f2937', fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace" }}>
            {milestone.year}
          </div>
        )}
      </div>
    </div>
  );
}

function CardContent({ milestone, statusColor, align }) {
  return (
    <div style={{
      padding: '16px 18px',
      background: 'rgba(4,0,0,0.85)',
      border: `1px solid ${milestone.status === 'CURRENT' ? 'rgba(34,197,94,0.3)' : 'rgba(185,28,28,0.2)'}`,
      backdropFilter: 'blur(8px)',
      textAlign: align,
      boxShadow: milestone.status === 'CURRENT' ? '0 0 20px rgba(34,197,94,0.08)' : 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${statusColor}60`;
        e.currentTarget.style.boxShadow = `0 0 20px ${statusColor}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = milestone.status === 'CURRENT' ? 'rgba(34,197,94,0.3)' : 'rgba(185,28,28,0.2)';
        e.currentTarget.style.boxShadow = milestone.status === 'CURRENT' ? '0 0 20px rgba(34,197,94,0.08)' : 'none';
      }}
    >
      {/* Year + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: align === 'right' ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: statusColor, letterSpacing: '0.2em' }}>
          {milestone.year}
        </span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: statusColor, letterSpacing: '0.15em', opacity: 0.7 }}>
          [{milestone.status}]
        </span>
      </div>

      {/* Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: align === 'right' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
        <span style={{ color: statusColor, fontSize: '0.9rem' }}>{milestone.icon}</span>
        <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#e5e7eb', margin: 0 }}>
          {milestone.title}
        </h3>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#6b7280', lineHeight: 1.7, marginBottom: 10 }}>
        {milestone.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {milestone.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.52rem', padding: '2px 8px',
            border: `1px solid ${statusColor}40`,
            color: statusColor,
            background: `${statusColor}08`,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#timeline-section',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', overflowY: 'auto' }}>
      <div style={{ maxWidth: 900, width: '100%', padding: '60px 0' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '.3em', color: 'var(--accent, #dc2626)', textTransform: 'uppercase', marginBottom: 8 }}>
            // 04 — journey.log
          </div>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 700, margin: 0 }}>
            MY <span style={{ color: 'var(--accent, #dc2626)', textShadow: '0 0 8px var(--glow, rgba(220,38,38,0.9))' }}>JOURNEY</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)', background: 'rgba(185,28,28,0.15)' }}>
            <div
              ref={lineRef}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, var(--accent, #dc2626), var(--accent-dark, #7f1d1d))',
                boxShadow: '0 0 6px var(--accent, #dc2626)',
              }}
            />
          </div>

          {MILESTONES.map((m, i) => (
            <TimelineCard key={m.title} milestone={m} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 8px #22c55e; }
          50%       { box-shadow: 0 0 20px #22c55e, 0 0 40px rgba(34,197,94,0.4); }
        }
      `}</style>
    </div>
  );
}
