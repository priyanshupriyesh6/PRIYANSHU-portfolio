import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { TextureSequencer } from './components/TextureSequencer';
import About from './components/About';
import MagneticCursor from './components/MagneticCursor';
import ThemeSwitcher from './components/ThemeSwitcher';
import SystemStatus from './components/SystemStatus';
import CommandPalette from './components/CommandPalette';
import Timeline from './components/Timeline';
import GitHubStats from './components/GitHubStats';
import HorizontalProjects from './components/HorizontalProjects';
import HeroParallax from './components/HeroParallax';
import CRTOverlay from './components/CRTOverlay';
import WireframeTunnel from './components/WireframeTunnel';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

// ─── Section Title with Typewriter ────────────────────────────────────────────
function SectionTitle({ tag, line1, line2, accentLine2 = true, id }) {
  const titleRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;
          const spans = titleRef.current.querySelectorAll('[data-typewrite]');
          spans.forEach((el, i) => {
            const full = el.dataset.typewrite;
            el.textContent = '';
            gsap.to(el, {
              text: { value: full, delimiter: '' },
              duration: full.length * 0.045,
              delay: i * 0.4,
              ease: 'none',
            });
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} id={id} style={{ textAlign: 'center', marginBottom: 48 }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '.3em', color: 'var(--accent, #dc2626)', textTransform: 'uppercase', marginBottom: 8 }}>
        {tag}
      </div>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 700, margin: 0, lineHeight: 1 }}>
        <span data-typewrite={line1}>{line1}</span>
        {line2 && (
          <>
            {' '}
            <span
              data-typewrite={line2}
              style={accentLine2 ? { color: 'var(--accent, #dc2626)', textShadow: '0 0 8px var(--glow, rgba(220,38,38,0.9))' } : {}}
            >{line2}</span>
          </>
        )}
      </h2>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [progress, setProgress] = useState(0);
  const [textures, setTextures] = useState([]);
  const [siteReady, setSiteReady] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const frameRef = useRef(0);
  const canvasRef = useRef(null);
  const gsapKillRef = useRef(null);

  // When all 70 textures loaded → wait → fade loader → reveal site
  useEffect(() => {
    if (progress < 100) return;
    const t1 = setTimeout(() => setLoadingVisible(false), 600);
    const t2 = setTimeout(() => setSiteReady(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [progress]);

  // ── GSAP ScrollTrigger — hero image sequence ────────────────────────────────
  useEffect(() => {
    if (textures.length < 70) return;
    const id = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
      const ctx = gsap.context(() => {
        const obj = { f: 0 };
        gsap.to(obj, {
          f: 69,
          ease: 'none',
          onUpdate: () => { frameRef.current = obj.f; },
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
        if (canvasRef.current) {
          gsap.to(canvasRef.current, {
            opacity: 0,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: '#hero-section',
              start: '80% top',
              end: 'bottom top',
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

  return (
    <>
      {/* ════ Global Styles ════ */}
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
          color: var(--accent, #ff2244); animation: gA 2.5s infinite; opacity: 0.7;
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
        .type-cursor::after { content:'█'; animation: blk .8s step-end infinite; color:var(--accent, #dc2626); margin-left: 2px; }

        /* Glow */
        .glow-red { text-shadow: 0 0 8px var(--glow, rgba(220,38,38,.9)), 0 0 25px var(--glow-soft, rgba(220,38,38,.4)); }
        .border-glow { box-shadow: 0 0 15px var(--glow-soft, rgba(220,38,38,.2)), 0 0 1px var(--glow, rgba(220,38,38,.5)); }

        /* Grid lines */
        .grid-bg {
          background-image:
            linear-gradient(var(--glow-soft, rgba(180,28,28,.04)) 1px, transparent 1px),
            linear-gradient(90deg, var(--glow-soft, rgba(180,28,28,.04)) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Loading bar glow */
        .lb-glow { box-shadow: 0 0 10px var(--accent, #dc2626), 0 0 25px var(--glow, rgba(220,38,38,.4)); }

        /* Section tag */
        .stag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: .3em;
          color: var(--accent, #dc2626);
          text-transform: uppercase;
        }

        /* Corner deco */
        .c-tl { border-top: 1px solid var(--accent, #dc2626); border-left: 1px solid var(--accent, #dc2626); }
        .c-br { border-bottom: 1px solid var(--accent, #dc2626); border-right: 1px solid var(--accent, #dc2626); }

        /* Scroll bar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: var(--accent-dark, #7f1d1d); }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent, #dc2626); }

        /* Section divider */
        .sec-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-dark, #7f1d1d), transparent);
        }
      `}</style>

      {/* ── Always-on components ── */}
      <MagneticCursor />
      <ThemeSwitcher />
      <SystemStatus />
      <CommandPalette />
      <CRTOverlay />
      {siteReady && <HeroParallax />}

      {/* ── Loading screen ── */}
      {!siteReady && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#000',
            opacity: loadingVisible ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: loadingVisible ? 'all' : 'none',
          }}
          className="scanlines"
        >
          <div style={{ maxWidth: 420, width: '100%', padding: '0 32px' }}>
            <div className="stag" style={{ marginBottom: 6 }}>[ boot sequence ]</div>
            <h1 style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 'clamp(2rem,6vw,3.5rem)', color: 'var(--accent, #dc2626)', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 4 }}
              className="glow-red">PRIYANSHU.exe</h1>
            <div style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: '0.7rem', color: '#4b5563', marginBottom: 28 }}
              className="type-cursor">loading neural interface...</div>

            <div style={{ height: 6, background: 'rgba(30,0,0,.8)', border: '1px solid rgba(185,28,28,.4)', overflow: 'hidden', marginBottom: 6 }}>
              <div className="lb-glow" style={{
                height: '100%', background: 'linear-gradient(90deg, var(--accent-dark, #7f1d1d), var(--accent, #dc2626))',
                width: `${progress}%`, transition: 'width .2s ease-out'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Share Tech Mono",monospace', fontSize: '0.65rem' }}>
              <span style={{ color: '#7f1d1d' }}>caching {progress < 30 ? 'textures' : progress < 70 ? 'frames' : 'shaders'}...</span>
              <span style={{ color: 'var(--accent, #dc2626)' }} className="glow-red">{progress}%</span>
            </div>

            <div style={{ marginTop: 28, fontFamily: '"Share Tech Mono",monospace', fontSize: '0.65rem', color: '#374151', lineHeight: 2 }}>
              {progress > 5  && <div><span style={{ color: '#16a34a' }}>✓</span> webgl_context.init(canvas)</div>}
              {progress > 25 && <div><span style={{ color: '#16a34a' }}>✓</span> texture_loader.cache(70 frames)</div>}
              {progress > 55 && <div><span style={{ color: '#16a34a' }}>✓</span> gsap.scrolltrigger.register()</div>}
              {progress > 80 && <div><span style={{ color: '#16a34a' }}>✓</span> portfolio.render() <span className="blink" style={{ color: 'var(--accent, #dc2626)' }}>_</span></div>}
            </div>
          </div>
        </div>
      )}

      {/* ── Three.js hero canvas (fixed, behind everything) ── */}
      <div ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', opacity: 1 }}>
        <Canvas gl={{ antialias: true }}>
          <TextureSequencer
            setProgress={setProgress}
            setTextures={setTextures}
            textures={textures}
            frameRef={frameRef}
          />
        </Canvas>
      </div>

      {/* ── Main portfolio content ── */}
      <div
        id="portfolio-content"
        style={{
          position: 'relative', zIndex: 10,
          opacity: siteReady ? 1 : 0,
          transition: siteReady ? 'opacity 0.8s ease' : 'none',
          overflow: siteReady ? 'visible' : 'hidden',
          pointerEvents: siteReady ? 'auto' : 'none',
        }}
      >

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
              <h2 className="font-display glow-red" style={{ fontSize: 'clamp(2rem,6vw,5rem)', fontWeight: 700, color: 'var(--accent, #dc2626)', letterSpacing: '0.15em', marginBottom: 32 }}>
                PRIYESH
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, alignItems: 'center' }}>
                <TerminalLine delay={300}>B.Tech CSE — Web Dev · Cyber Security · Software Engineering</TerminalLine>
                <TerminalLine delay={700}>building hi-tech systems &amp; animated digital experiences</TerminalLine>
                <TerminalLine delay={1100}>status: <span style={{ color: '#22c55e' }}>ONLINE</span> &nbsp;|&nbsp; location: <span style={{ color: 'var(--accent, #dc2626)' }}>India, IN</span></TerminalLine>
              </div>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#projects-section" data-cursor="VIEW"
                  style={{ padding: '10px 28px', border: '1px solid var(--accent, #dc2626)', color: 'var(--accent, #dc2626)', fontFamily: '"Share Tech Mono",monospace', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent, #dc2626)'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent, #dc2626)'; }}>
                  VIEW_WORK
                </a>
                <a href="mailto:priyanshupriyesh@gmail.com" data-cursor="MAIL"
                  style={{ padding: '10px 28px', background: 'var(--accent, #dc2626)', color: '#fff', fontFamily: '"Share Tech Mono",monospace', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light, #ef4444)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent, #dc2626)'; }}>
                  CONNECT
                </a>
              </div>

              {/* Scroll indicator */}
              <div style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: '0.6rem', color: '#6b7280', letterSpacing: '.2em' }}>SCROLL</span>
                <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--accent-dark, #7f1d1d), transparent)' }} />
              </div>
            </div>
          </div>
        </section>

        <div className="sec-divider" />

        {/* ════ ABOUT ════ */}
        <section id="about-section" style={{ height: '500vh', marginTop: 0 }}>
          <About />
        </section>

        <div className="sec-divider" />

        {/* ════ WIREFRAME TUNNEL ════ */}
        <section id="tunnel-section" style={{ height: '400vh', position: 'relative' }}>
          <WireframeTunnel />
          {/* Sticky label during tunnel scroll */}
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--accent, #dc2626)', marginBottom: 12 }}>// entering_cyberspace</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(1.5rem,4vw,3rem)', fontWeight: 700, color: 'rgba(255,255,255,0.08)', letterSpacing: '0.2em' }}>SKILLS &amp; PROJECTS</div>
            </div>
          </div>
        </section>

        <div className="sec-divider" />

        {/* ════ PROJECTS (Horizontal Scroll) ════ */}
        <section id="projects-section">
          <HorizontalProjects />
        </section>

        <div className="sec-divider" />

        {/* ════ TIMELINE ════ */}
        <section id="timeline-section" style={{ height: '600vh' }}>
          <Timeline />
        </section>

        <div className="sec-divider" />

        {/* ════ GITHUB STATS ════ */}
        <section id="stats-section" style={{ height: '500vh' }}>
          <GitHubStats />
        </section>

        <div className="sec-divider" />

        {/* ════ CONTACT ════ */}
        <section id="contact-section" style={{ height: '500vh' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
              <div className="stag" style={{ marginBottom: 8 }}>// 06 — contact.sh</div>
              <h2 className="font-display glow-red" style={{ fontSize: 'clamp(3rem,9vw,8rem)', fontWeight: 700, color: 'var(--accent, #dc2626)', marginBottom: 16 }}>
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
                  <a key={label} href={href} target="_blank" rel="noreferrer" data-cursor="OPEN"
                    style={{
                      display: 'block', padding: '14px 16px', border: '1px solid rgba(185,28,28,.3)',
                      background: 'rgba(8,0,0,.7)', textDecoration: 'none', textAlign: 'left', transition: 'all .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent, #dc2626)'; e.currentTarget.style.background = 'rgba(20,0,0,.9)'; e.currentTarget.style.boxShadow = '0 0 16px var(--glow-soft, rgba(220,38,38,0.08))'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(185,28,28,.3)'; e.currentTarget.style.background = 'rgba(8,0,0,.7)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div className="font-hacker" style={{ fontSize: '0.6rem', color: 'var(--accent-dark, #7f1d1d)', letterSpacing: '.2em', marginBottom: 4 }}>{label}</div>
                    <div className="font-hacker" style={{ fontSize: '0.7rem', color: '#d1d5db' }}>{value}</div>
                  </a>
                ))}
              </div>
              <a href="mailto:priyanshupriyesh@gmail.com" data-cursor="SEND"
                style={{
                  display: 'inline-block', padding: '14px 48px', background: 'var(--accent, #dc2626)', color: '#fff',
                  fontFamily: '"Share Tech Mono",monospace', fontSize: '0.85rem', letterSpacing: '.15em',
                  textDecoration: 'none', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light, #ef4444)'; e.currentTarget.style.boxShadow = '0 0 30px var(--glow, rgba(220,38,38,.5))'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent, #dc2626)'; e.currentTarget.style.boxShadow = 'none'; }}>
                INITIATE_CONTACT()
              </a>
              <div className="font-hacker" style={{ marginTop: 48, fontSize: '0.6rem', color: '#374151' }}>
                © 2026 Priyanshu Priyesh — All Rights Reserved
              </div>

              {/* Press hint */}
              <div style={{ marginTop: 20, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: '#1f2937', letterSpacing: '0.15em' }}>
                Press <span style={{ color: '#374151', border: '1px solid #1f2937', padding: '1px 5px' }}>/</span> for commands &nbsp;·&nbsp; Try Konami Code
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}