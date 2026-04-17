import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextureSequencer } from './components/TextureSequencer';

gsap.registerPlugin(ScrollTrigger);

// ─── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchText({ text, className = '' }) {
  return <span className={`glitch-wrapper ${className}`} data-text={text}>{text}</span>;
}

// ─── Animated terminal line ───────────────────────────────────────────────────
function TerminalLine({ children, delay = 0 }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.4s', transitionDelay: `${delay}ms` }}
      className="flex items-start gap-2 text-xs md:text-sm font-hacker text-gray-400">
      <span className="text-red-600 mt-0.5 flex-shrink-0">▸</span>
      <span>{children}</span>
    </div>
  );
}

// ─── Skill Bar ───────────────────────────────────────────────────────────────
function SkillBar({ skill, level }) {
  const [w, setW] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(level); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1 text-xs font-hacker">
        <span className="text-gray-300">{skill}</span>
        <span className="text-red-500">{level}%</span>
      </div>
      <div className="h-px bg-gray-900 overflow-hidden">
        <div className="h-px bg-gradient-to-r from-red-900 via-red-600 to-red-400 transition-all duration-1000 ease-out"
          style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ title, description, tags, image, repoUrl, demoUrl, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="project-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="relative overflow-hidden" style={{ height: '160px' }}>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hov ? 'scale(1.07)' : 'scale(1)' }} />
        <div className="absolute inset-0 scanlines pointer-events-none opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 blink" />
          <span className="text-red-500 text-xs font-hacker">LIVE</span>
        </div>
        <div className="absolute bottom-2 left-3 text-red-700 text-xs font-hacker">
          {String(index + 1).padStart(2, '0')} //{'>'}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-white mb-2 tracking-wide">
          <span className="text-red-600 mr-1.5">//</span>{title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 font-hacker">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map(t => (
            <span key={t} className="text-xs px-1.5 py-0.5 border border-red-900/40 bg-red-950/20 text-red-400 font-hacker">{t}</span>
          ))}
        </div>
        <div className="flex gap-4 pt-3 border-t border-red-950/50">
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs font-hacker text-gray-500 hover:text-red-400 transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Source
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs font-hacker text-gray-500 hover:text-red-400 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [progress, setProgress] = useState(0);
  const [textures, setTextures] = useState([]);
  const frameRef = useRef(0);   // ← shared frame counter, driven by GSAP
  const canvasRef = useRef(null); // ← ref for fade-out
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gsapKillRef = useRef(null);

  // ── Mouse spotlight ───────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── GSAP ScrollTrigger — scoped to Hero section only ────────────────────
  useEffect(() => {
    if (textures.length < 70) return;

    const id = setTimeout(() => {
      // Reset canvas opacity in case of re-mount
      if (canvasRef.current) canvasRef.current.style.opacity = '1';

      const ctx = gsap.context(() => {
        const obj = { f: 0 };

        // Play frames 0→69 ONLY during the Hero section scroll track
        gsap.to(obj, {
          f: 69,
          ease: 'none',
          onUpdate: () => { frameRef.current = obj.f; },
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,   // faster, snappier scrub
          },
        });

        // Fade canvas out in the last 20% of the Hero scroll so it
        // disappears cleanly before About Me slides in
        if (canvasRef.current) {
          gsap.to(canvasRef.current, {
            opacity: 0,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: '#hero-section',
              start: '80% top',    // begin fade at 80% through hero
              end: 'bottom top',   // fully gone when hero bottom leaves viewport
              scrub: 0.5,
            },
          });
        }
      });
      gsapKillRef.current = ctx;
    }, 200);

    return () => {
      clearTimeout(id);
      if (gsapKillRef.current) gsapKillRef.current.revert();
    };
  }, [textures]);

  const projects = [
    {
      title: 'InvestIQ',
      description: 'AI-powered investment platform featuring real-time market dashboards, AI fundamental analysis, TradingView charting, smart stock screening, and portfolio tracking.',
      tags: ['JavaScript', 'React', 'AI', 'Finance'],
      image: '/project_investiq.png',
      repoUrl: 'https://github.com/priyanshupriyesh6/investment',
      demoUrl: null,
    },
    {
      title: 'RIFT 2026',
      description: 'Financial Forensic Engine — deep forensic financial analysis with Python. Deployed on Render with live financial investigations at scale.',
      tags: ['Python', 'Flask', 'Data Analysis', 'Finance'],
      image: '/project_rift.png',
      repoUrl: 'https://github.com/priyanshupriyesh6/rift2026',
      demoUrl: 'https://financail-forensic-engine.onrender.com',
    },
    {
      title: 'SO Interior Portfolio',
      description: 'High-performance agency portfolio for a premium interior design studio. React + Vite, smooth GSAP animations, luxury dark aesthetic.',
      tags: ['React', 'Vite', 'Tailwind', 'GSAP'],
      image: '/project_so_interior.png',
      repoUrl: 'https://github.com/priyanshupriyesh6/SO-interior-portfilio',
      demoUrl: 'https://so-interior-portfilio.onrender.com',
    },
    {
      title: 'Investment Advisor',
      description: 'User enters investment amount, time, and plan — receives a complete personalized investment roadmap using Yahoo Finance API for real-time calculations.',
      tags: ['Python', 'Yahoo Finance', 'API'],
      image: '/project_investiq.png',
      repoUrl: 'https://github.com/priyanshupriyesh6/Investment-advisor',
      demoUrl: null,
    },
    {
      title: 'SO Interiors Website',
      description: 'Full-stack multi-page premium interior design website. Presents projects, founders, and design process with a dark luxury aesthetic. Live on Vercel.',
      tags: ['HTML', 'JavaScript', 'CSS', 'Full-stack'],
      image: '/project_so_interior.png',
      repoUrl: 'https://github.com/priyanshupriyesh6/sointeriorwesite',
      demoUrl: 'https://sointeriorwebsite.vercel.app',
    },
    {
      title: 'Portfolio v1',
      description: 'Previous developer portfolio built with TypeScript and React. Showcased front-end capabilities with interactive components on GitHub Pages.',
      tags: ['TypeScript', 'React'],
      image: '/project_rift.png',
      repoUrl: 'https://github.com/priyanshupriyesh6/priyanshuPortfolio',
      demoUrl: null,
    },
  ];

  const skills = [
    { skill: 'JavaScript / React', level: 88 },
    { skill: 'Python', level: 82 },
    { skill: 'C / C++', level: 75 },
    { skill: 'HTML / CSS', level: 90 },
    { skill: 'Cloud Computing / AWS', level: 65 },
    { skill: 'Docker / Git / DevOps', level: 72 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: auto; }
        body { background: #000; overflow-x: hidden; color: #fff; }

        .font-hacker { font-family: 'Share Tech Mono', monospace !important; }
        .font-display { font-family: 'Rajdhani', sans-serif !important; }

        /* Glitch */
        .glitch-wrapper { position: relative; display: inline-block; }
        .glitch-wrapper::before, .glitch-wrapper::after {
          content: attr(data-text); position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch-wrapper::before {
          color: #ff2244; animation: gA 2.5s infinite; opacity: 0.7;
          clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
        }
        .glitch-wrapper::after {
          color: #00eeff; animation: gB 2.5s infinite; opacity: 0.7;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
        @keyframes gA {
          0%,100%{transform:translate(0)} 25%{transform:translate(-4px,1px)}
          50%{transform:translate(3px,-1px)} 75%{transform:translate(-2px,2px)}
        }
        @keyframes gB {
          0%,100%{transform:translate(0)} 25%{transform:translate(4px,-1px)}
          50%{transform:translate(-3px,1px)} 75%{transform:translate(2px,-2px)}
        }

        /* Scanlines */
        .scanlines {
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px,
            rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px);
        }

        /* Blink */
        .blink { animation: blk 1s step-end infinite; }
        @keyframes blk { 50%{opacity:0} }

        /* Cursor */
        .type-cursor::after { content:'█'; animation: blk .8s step-end infinite; color:#dc2626; margin-left: 2px; }

        /* Glow */
        .glow-red { text-shadow: 0 0 8px rgba(220,38,38,.9), 0 0 25px rgba(220,38,38,.4); }
        .border-glow { box-shadow: 0 0 15px rgba(220,38,38,.2), 0 0 1px rgba(220,38,38,.5); }

        /* Project card */
        .project-card {
          background: linear-gradient(160deg, rgba(12,0,0,.95), rgba(0,0,0,.98));
          border: 1px solid rgba(185,28,28,.25);
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .project-card:hover {
          border-color: rgba(220,38,38,.65);
          transform: translateY(-6px);
          box-shadow: 0 0 30px rgba(220,38,38,.12), 0 1px 0 rgba(220,38,38,.4);
        }

        /* Grid lines */
        .grid-bg {
          background-image:
            linear-gradient(rgba(180,28,28,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,28,28,.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Loading bar glow */
        .lb-glow { box-shadow: 0 0 10px #dc2626, 0 0 25px rgba(220,38,38,.4); }

        /* Section tag */
        .stag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: .3em;
          color: #dc2626;
          text-transform: uppercase;
        }

        /* Corner deco */
        .c-tl { border-top: 1px solid #dc2626; border-left: 1px solid #dc2626; }
        .c-br { border-bottom: 1px solid #dc2626; border-right: 1px solid #dc2626; }
      `}</style>

      {/* ── Mouse spotlight ── */}
      <div className="fixed pointer-events-none z-50" style={{
        left: mousePos.x, top: mousePos.y, width: 500, height: 500,
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(220,38,38,.05) 0%, transparent 65%)',
        transition: 'left .08s linear, top .08s linear',
      }} />

      {/* ── Loading screen ── */}
      {progress < 100 && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black scanlines">
          <div style={{ maxWidth: 420, width: '100%', padding: '0 32px' }}>
            <div className="stag" style={{ marginBottom: 6 }}>[ boot sequence ]</div>
            <h1 style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 'clamp(2rem,6vw,3.5rem)', color: '#dc2626', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 4 }}
              className="glow-red">PRIYANSHU.exe</h1>
            <div style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: '0.7rem', color: '#4b5563', marginBottom: 28 }}
              className="type-cursor">loading neural interface...</div>

            <div style={{ height: 6, background: 'rgba(30,0,0,.8)', border: '1px solid rgba(185,28,28,.4)', overflow: 'hidden', marginBottom: 6 }}>
              <div className="lb-glow" style={{
                height: '100%', background: 'linear-gradient(90deg,#7f1d1d,#dc2626)',
                width: `${progress}%`, transition: 'width .2s ease-out'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Share Tech Mono",monospace', fontSize: '0.65rem' }}>
              <span style={{ color: '#7f1d1d' }}>caching {progress < 30 ? 'textures' : progress < 70 ? 'frames' : 'shaders'}...</span>
              <span style={{ color: '#dc2626' }} className="glow-red">{progress}%</span>
            </div>

            <div style={{ marginTop: 28, fontFamily: '"Share Tech Mono",monospace', fontSize: '0.65rem', color: '#374151', lineHeight: 2 }}>
              {progress > 5  && <div><span style={{ color: '#16a34a' }}>✓</span> webgl_context.init(canvas)</div>}
              {progress > 25 && <div><span style={{ color: '#16a34a' }}>✓</span> texture_loader.cache(70 frames)</div>}
              {progress > 55 && <div><span style={{ color: '#16a34a' }}>✓</span> gsap.scrolltrigger.register()</div>}
              {progress > 80 && <div><span style={{ color: '#16a34a' }}>✓</span> portfolio.render() <span className="blink" style={{ color: '#dc2626' }}>_</span></div>}
            </div>
          </div>
        </div>
      )}

      {/* ── Fixed 3D canvas background — only visible during Hero ── */}
      <div ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', opacity: 1, transition: 'none' }}>
        <Canvas gl={{ antialias: true }}>
          <TextureSequencer
            setProgress={setProgress}
            setTextures={setTextures}
            textures={textures}
            frameRef={frameRef}
          />
        </Canvas>
      </div>

      {/* ── Scrollable content (always in DOM so GSAP has a scroll container) ── */}
      <div id="portfolio-content" style={{ position: 'relative', zIndex: 10 }}>

        {/* dark overlay so text is readable on bright frames */}
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: -1, pointerEvents: 'none' }} />

        {/* ════ HERO ════ */}
        <section id="hero-section" style={{ height: '500vh' }} className="grid-bg">
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <div style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative' }}>
              <div className="c-tl" style={{ position: 'absolute', top: -16, left: -16, width: 24, height: 24 }} />
              <div className="c-br" style={{ position: 'absolute', bottom: -16, right: -16, width: 24, height: 24 }} />

              <div className="stag" style={{ marginBottom: 16 }}>[ system online // portfolio v2.0 ]</div>

              <h1 className="font-display" style={{ fontSize: 'clamp(3.5rem,12vw,9rem)', fontWeight: 700, lineHeight: 0.9, marginBottom: 8 }}>
                <GlitchText text="PRIYANSHU" />
              </h1>
              <h2 className="font-display glow-red" style={{ fontSize: 'clamp(2rem,6vw,5rem)', fontWeight: 700, color: '#dc2626', letterSpacing: '0.15em', marginBottom: 32 }}>
                PRIYESH
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, alignItems: 'center' }}>
                <TerminalLine delay={300}>B.Tech CSE — Web Dev · Cyber Security · Software Engineering</TerminalLine>
                <TerminalLine delay={700}>building hi-tech systems &amp; animated digital experiences</TerminalLine>
                <TerminalLine delay={1100}>status: <span style={{ color: '#22c55e' }}>ONLINE</span> &nbsp;|&nbsp; location: <span style={{ color: '#dc2626' }}>India, IN</span></TerminalLine>
              </div>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <a href="#projects-section"
                  style={{ padding: '10px 28px', border: '1px solid #dc2626', color: '#dc2626', fontFamily: '"Share Tech Mono",monospace', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#dc2626'; }}>
                  VIEW_WORK
                </a>
                <a href="mailto:priyanshupriyesh@gmail.com"
                  style={{ padding: '10px 28px', background: '#dc2626', color: '#fff', fontFamily: '"Share Tech Mono",monospace', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#dc2626'; }}>
                  CONNECT
                </a>
              </div>

              {/* scroll indicator */}
              <div style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: '0.6rem', color: '#6b7280', letterSpacing: '.2em' }}>SCROLL</span>
                <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, #7f1d1d, transparent)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ════ ABOUT ════ */}
        <section style={{ height: '500vh', marginTop: 0 }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
              {/* Left */}
              <div>
                <div className="stag" style={{ marginBottom: 12 }}>// 01 — about.sys</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 700, lineHeight: 0.95, marginBottom: 24 }}>
                  ABOUT<br /><span style={{ color: '#dc2626' }} className="glow-red">ME</span>
                </h2>
                <p className="font-hacker" style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.9, marginBottom: 28 }}>
                  B.Tech CSE student with a passion for building things that matter — from real-time investment platforms to immersive 3D web experiences. I specialize in web development, cyber protection, and software engineering.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Clean Code', icon: '</>' },
                    { label: 'UI/UX Focus', icon: '◈' },
                    { label: 'Performance', icon: '⚡' },
                    { label: 'Innovation', icon: '⬡' },
                  ].map(({ label, icon }) => (
                    <div key={label} style={{
                      padding: '14px 16px', border: '1px solid rgba(185,28,28,.3)',
                      background: 'rgba(10,0,0,.6)', transition: 'all .2s', cursor: 'default',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,38,38,.6)'; e.currentTarget.style.background = 'rgba(20,0,0,.8)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,28,28,.3)'; e.currentTarget.style.background = 'rgba(10,0,0,.6)'; }}>
                      <div style={{ color: '#dc2626', fontSize: '1.1rem', marginBottom: 6 }}>{icon}</div>
                      <div className="font-hacker" style={{ color: '#d1d5db', fontSize: '0.7rem' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div>
                <div className="stag" style={{ marginBottom: 12 }}>// skills.log</div>
                <div style={{ marginBottom: 28 }}>
                  {skills.map(s => <SkillBar key={s.skill} {...s} />)}
                </div>
                <div className="stag" style={{ marginBottom: 10 }}>// stack.json</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'C++', 'C', 'Git', 'Docker', 'AWS', 'Figma', 'Webpack', 'Premiere Pro'].map(t => (
                    <span key={t} className="font-hacker" style={{
                      padding: '3px 10px', fontSize: '0.65rem',
                      border: '1px solid rgba(185,28,28,.4)', color: '#fca5a5',
                      background: 'rgba(7,0,0,.6)', cursor: 'default', transition: 'all .15s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,28,28,.4)'; e.currentTarget.style.color = '#fca5a5'; }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ PROJECTS ════ */}
        <section id="projects-section" style={{ height: '500vh' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', overflowY: 'auto' }}>
            <div style={{ maxWidth: 1200, width: '100%' }}>
              <div className="stag" style={{ textAlign: 'center', marginBottom: 8 }}>// 02 — projects.db</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>
                FEATURED <span style={{ color: '#dc2626' }} className="glow-red">PROJECTS</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
                {projects.map((p, i) => <ProjectCard key={p.title} {...p} index={i} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ════ CONTACT ════ */}
        <section style={{ height: '500vh' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
              <div className="stag" style={{ marginBottom: 8 }}>// 03 — contact.sh</div>
              <h2 className="font-display glow-red" style={{ fontSize: 'clamp(3rem,9vw,8rem)', fontWeight: 700, color: '#dc2626', marginBottom: 16 }}>
                GET IN<br />TOUCH
              </h2>
              <p className="font-hacker" style={{ color: '#6b7280', fontSize: '0.78rem', lineHeight: 1.9, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
                Have a project in mind or want to collaborate? I'm always open to discussing new opportunities, creative projects, and interesting ideas.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
                {[
                  { label: 'EMAIL', value: 'priyanshupriyesh@gmail.com', href: 'mailto:priyanshupriyesh@gmail.com' },
                  { label: 'GITHUB', value: '@priyanshupriyesh6', href: 'https://github.com/priyanshupriyesh6' },
                  { label: 'LINKEDIN', value: 'priyanshu-priyesh', href: 'https://www.linkedin.com/in/priyanshu-priyesh-82038a328' },
                  { label: 'PHONE', value: '+91 7827887719', href: 'tel:+917827887719' },
                ].map(({ label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                    display: 'block', padding: '14px 16px', border: '1px solid rgba(185,28,28,.3)',
                    background: 'rgba(8,0,0,.7)', textDecoration: 'none', textAlign: 'left', transition: 'all .2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.background = 'rgba(20,0,0,.9)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,28,28,.3)'; e.currentTarget.style.background = 'rgba(8,0,0,.7)'; }}>
                    <div className="font-hacker" style={{ fontSize: '0.6rem', color: '#7f1d1d', letterSpacing: '.2em', marginBottom: 4 }}>{label}</div>
                    <div className="font-hacker" style={{ fontSize: '0.7rem', color: '#d1d5db' }}>{value}</div>
                  </a>
                ))}
              </div>
              <a href="mailto:priyanshupriyesh@gmail.com" style={{
                display: 'inline-block', padding: '14px 48px', background: '#dc2626', color: '#fff',
                fontFamily: '"Share Tech Mono",monospace', fontSize: '0.85rem', letterSpacing: '.15em',
                textDecoration: 'none', transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.boxShadow = '0 0 30px rgba(220,38,38,.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.boxShadow = 'none'; }}>
                INITIATE_CONTACT()
              </a>
              <div className="font-hacker" style={{ marginTop: 48, fontSize: '0.6rem', color: '#374151' }}>
                © 2026 Priyanshu Priyesh — All Rights Reserved
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}