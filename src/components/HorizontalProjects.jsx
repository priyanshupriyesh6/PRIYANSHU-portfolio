import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'InvestIQ',
    description: 'AI-powered investment platform with real-time market dashboards, AI fundamental analysis, TradingView charting, smart stock screening, and portfolio tracking.',
    tags: ['JavaScript', 'React', 'AI', 'Finance'],
    image: '/project_investiq.png',
    repoUrl: 'https://github.com/priyanshupriyesh6/investment',
    demoUrl: null,
    index: '01',
    color: '#f59e0b',
  },
  {
    title: 'RIFT 2026',
    description: 'Financial Forensic Engine — deep forensic financial analysis with Python. Deployed on Render with live financial investigations at scale.',
    tags: ['Python', 'Flask', 'Data Analysis', 'Finance'],
    image: '/project_rift.png',
    repoUrl: 'https://github.com/priyanshupriyesh6/rift2026',
    demoUrl: 'https://financail-forensic-engine.onrender.com',
    index: '02',
    color: '#3b82f6',
  },
  {
    title: 'SO Interior Portfolio',
    description: 'High-performance agency portfolio for a premium interior design studio. React + Vite, smooth GSAP animations, luxury dark aesthetic.',
    tags: ['React', 'Vite', 'Tailwind', 'GSAP'],
    image: '/project_so_interior.png',
    repoUrl: 'https://github.com/priyanshupriyesh6/SO-interior-portfilio',
    demoUrl: 'https://so-interior-portfilio.onrender.com',
    index: '03',
    color: '#8b5cf6',
  },
  {
    title: 'Investment Advisor',
    description: 'User enters investment amount, time, and plan — receives a complete personalized investment roadmap using Yahoo Finance API for real-time calculations.',
    tags: ['Python', 'Yahoo Finance', 'API'],
    image: '/project_investiq.png',
    repoUrl: 'https://github.com/priyanshupriyesh6/Investment-advisor',
    demoUrl: null,
    index: '04',
    color: '#22c55e',
  },
  {
    title: 'SO Interiors Website',
    description: 'Full-stack multi-page premium interior design website. Presents projects, founders, and design process with a dark luxury aesthetic. Live on Vercel.',
    tags: ['HTML', 'JavaScript', 'CSS', 'Full-stack'],
    image: '/project_so_interior.png',
    repoUrl: 'https://github.com/priyanshupriyesh6/sointeriorwesite',
    demoUrl: 'https://sointeriorwebsite.vercel.app',
    index: '05',
    color: '#ec4899',
  },
  {
    title: 'Portfolio v1',
    description: 'Previous developer portfolio built with TypeScript and React. Showcased front-end capabilities with interactive components on GitHub Pages.',
    tags: ['TypeScript', 'React'],
    image: '/project_rift.png',
    repoUrl: 'https://github.com/priyanshupriyesh6/priyanshuPortfolio',
    demoUrl: null,
    index: '06',
    color: 'var(--accent, #dc2626)',
  },
];

function ProjectSlide({ project }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="project-slide"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 480,
        flexShrink: 0,
        background: 'linear-gradient(160deg, rgba(10,0,0,0.95), rgba(0,0,0,0.98))',
        border: '1px solid rgba(185,28,28,0.2)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        borderColor: hov ? `${project.color}60` : 'rgba(185,28,28,0.2)',
        boxShadow: hov ? `0 0 40px ${project.color}18, 0 2px 0 ${project.color}60` : 'none',
        transform: hov ? 'translateY(-8px)' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.7s ease',
          }}
        />
        {/* Scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none', opacity: 0.5,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />

        {/* Project number */}
        <div style={{
          position: 'absolute', top: 14, left: 16,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem', color: project.color,
          letterSpacing: '0.15em',
          textShadow: `0 0 8px ${project.color}`,
        }}>
          {project.index} //
        </div>

        {/* Live badge */}
        <div style={{ position: 'absolute', top: 14, right: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', animation: 'liveBlink 1s step-end infinite' }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#22c55e', letterSpacing: '0.1em' }}>LIVE</span>
        </div>

        {/* Hover overlay: action buttons */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.3s',
          background: 'rgba(0,0,0,0.5)',
        }}>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" data-cursor="SOURCE"
              style={{
                padding: '8px 20px', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
                textDecoration: 'none', letterSpacing: '0.1em',
                transition: 'all 0.2s', background: 'rgba(0,0,0,0.6)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = project.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
            >
              SOURCE
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" data-cursor="DEMO"
              style={{
                padding: '8px 20px', background: project.color,
                color: '#000', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
                textDecoration: 'none', letterSpacing: '0.1em',
                fontWeight: 700,
              }}
            >
              DEMO →
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 26px' }}>
        <h3 style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1.4rem',
          color: '#e5e7eb', marginBottom: 10,
        }}>
          <span style={{ color: project.color, marginRight: 8, fontSize: '1rem' }}>//</span>
          {project.title}
        </h3>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#6b7280', lineHeight: 1.7, marginBottom: 16 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem',
              padding: '3px 10px', border: `1px solid ${project.color}40`,
              color: project.color, background: `${project.color}0d`,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HorizontalProjects() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current.scrollWidth - window.innerWidth + 96;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth + 200}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', background: '#000' }}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Section header */}
        <div style={{ padding: '0 60px', marginBottom: 40, flexShrink: 0 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '.3em', color: 'var(--accent, #dc2626)', textTransform: 'uppercase', marginBottom: 8 }}>
            // 02 — projects.db
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 700, margin: 0 }}>
              FEATURED <span style={{ color: 'var(--accent, #dc2626)', textShadow: '0 0 8px var(--glow, rgba(220,38,38,0.9))' }}>WORK</span>
            </h2>
            {/* Progress indicator */}
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#374151', paddingBottom: 8 }}>
              {String(Math.min(PROJECTS.length, Math.max(1, Math.ceil(progress / (100 / PROJECTS.length))))).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              <div style={{ marginTop: 6, height: 1, width: 80, background: 'rgba(185,28,28,0.15)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: 'var(--accent, #dc2626)', transition: 'width 0.1s', boxShadow: '0 0 6px var(--accent, #dc2626)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling track */}
        <div style={{ overflow: 'hidden' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 24,
              paddingLeft: 60,
              paddingRight: 60,
              alignItems: 'center',
              willChange: 'transform',
            }}
          >
            {PROJECTS.map((p) => (
              <ProjectSlide key={p.title} project={p} />
            ))}

            {/* End CTA card */}
            <div style={{
              width: 320, flexShrink: 0,
              border: '1px solid rgba(185,28,28,0.15)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 40, gap: 20, textAlign: 'center',
              background: 'rgba(4,0,0,0.5)',
              height: 400,
            }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--accent-dark, #7f1d1d)', letterSpacing: '0.3em' }}>
                // end of list
              </div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#374151' }}>
                MORE ON GITHUB
              </div>
              <a href="https://github.com/priyanshupriyesh6" target="_blank" rel="noreferrer" data-cursor="OPEN"
                style={{
                  padding: '10px 24px', border: '1px solid var(--accent-dark, #7f1d1d)',
                  color: 'var(--accent, #dc2626)', fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.65rem', letterSpacing: '0.1em', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; e.currentTarget.style.borderColor = 'var(--accent, #dc2626)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--accent-dark, #7f1d1d)'; }}
              >
                VIEW ALL →
              </a>
            </div>
          </div>
        </div>

        {/* Drag hint */}
        <div style={{ padding: '24px 60px 0', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#1f2937', letterSpacing: '0.2em' }}>
          ← SCROLL TO EXPLORE →
        </div>
      </div>

      <style>{`
        @keyframes liveBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
