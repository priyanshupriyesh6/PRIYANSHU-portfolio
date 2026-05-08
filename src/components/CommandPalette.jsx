import { useEffect, useState, useRef, useCallback } from 'react';

// ─── Konami Code Easter Egg ──────────────────────────────────────────────────
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonamiCode(callback) {
  const progress = useRef(0);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === KONAMI[progress.current]) {
        progress.current++;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          callback();
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [callback]);
}

// ─── Command Palette ─────────────────────────────────────────────────────────
const COMMANDS = [
  { id: 'hero',     label: 'Go to — Hero',         icon: '⬡', section: 'hero-section' },
  { id: 'about',    label: 'Go to — About Me',      icon: '◈', section: 'about-section' },
  { id: 'projects', label: 'Go to — Projects',      icon: '</>', section: 'projects-section' },
  { id: 'timeline', label: 'Go to — Timeline',      icon: '◎', section: 'timeline-section' },
  { id: 'stats',    label: 'Go to — GitHub Stats',  icon: '⬢', section: 'stats-section' },
  { id: 'contact',  label: 'Go to — Contact',       icon: '▸', section: 'contact-section' },
  { id: 'github',   label: 'Open — GitHub Profile', icon: '⟁', url: 'https://github.com/priyanshupriyesh6' },
  { id: 'linkedin', label: 'Open — LinkedIn',       icon: '⬡', url: 'https://www.linkedin.com/in/priyanshu-priyesh-82038a328' },
  { id: 'email',    label: 'Action — Send Email',   icon: '▷', url: 'mailto:priyanshupriyesh@gmail.com' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [rootMode, setRootMode] = useState(false);
  const inputRef = useRef(null);

  // Open on "/" key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !open && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        setOpen(true);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Konami code → root mode
  useKonamiCode(useCallback(() => {
    setRootMode(true);
    setTimeout(() => setRootMode(false), 8000);
  }, []));

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = (cmd) => {
    if (cmd.section) {
      const el = document.getElementById(cmd.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.url) {
      window.open(cmd.url, '_blank');
    }
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected]);
  };

  return (
    <>
      {/* Root mode overlay */}
      {rootMode && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99998,
          background: 'rgba(0,180,0,0.04)',
          pointerEvents: 'none',
          animation: 'rootPulse 0.5s ease',
        }}>
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            fontFamily: "'Share Tech Mono', monospace",
            color: '#00ff88',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            textAlign: 'center',
            textShadow: '0 0 20px #00ff88',
            animation: 'rootFade 8s ease forwards',
          }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: 12, opacity: 0.7 }}>[ ROOT ACCESS GRANTED ]</div>
            <div style={{ fontSize: '0.6rem', color: '#22c55e', lineHeight: 2 }}>
              <div>✓ sudo su — success</div>
              <div>✓ portfolio.unlock(secrets=True)</div>
              <div style={{ color: '#00ff88' }}>▸ Welcome, root user.</div>
            </div>
          </div>
          <div style={{
            position: 'fixed', bottom: 80, left: 20,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem', color: '#00ff88', opacity: 0.6,
            lineHeight: 2,
          }}>
            <div>// SYSTEM: root mode active</div>
            <div>// All restrictions lifted</div>
            <div>// Session expires in 8s</div>
          </div>
        </div>
      )}

      {/* Konami hint (bottom right corner) */}
      <div style={{
        position: 'fixed', bottom: 20, right: 20,
        zIndex: 8000,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.52rem',
        color: '#1f2937',
        letterSpacing: '0.1em',
        transition: 'color 0.3s',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
        onMouseEnter={e => e.currentTarget.style.color = '#374151'}
      >
        Press / for commands
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99990,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Palette panel */}
      {open && (
        <div style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99991,
          width: 'min(560px, 90vw)',
          background: 'rgba(4,0,0,0.97)',
          border: '1px solid var(--accent-dark, #7f1d1d)',
          boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 30px var(--glow-soft, rgba(220,38,38,0.08))`,
          animation: 'paletteIn 0.15s ease',
          fontFamily: "'Share Tech Mono', monospace",
          overflow: 'hidden',
        }}>
          {/* Search input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            borderBottom: '1px solid rgba(185,28,28,0.2)',
            background: 'rgba(185,28,28,0.04)',
          }}>
            <span style={{ color: 'var(--accent, #dc2626)', fontSize: '0.7rem' }}>▸</span>
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(0); }}
              onKeyDown={onKeyDown}
              placeholder="Type a command..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e5e7eb',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.78rem',
                letterSpacing: '0.05em',
              }}
            />
            <span style={{ color: '#374151', fontSize: '0.55rem' }}>ESC to close</span>
          </div>

          {/* Results */}
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '20px 16px', color: '#374151', fontSize: '0.65rem' }}>
                // No commands found
              </div>
            ) : (
              filtered.map((cmd, i) => (
                <div
                  key={cmd.id}
                  data-cursor="RUN"
                  onClick={() => execute(cmd)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 16px',
                    background: i === selected ? 'rgba(185,28,28,0.12)' : 'transparent',
                    borderLeft: i === selected ? '2px solid var(--accent, #dc2626)' : '2px solid transparent',
                    transition: 'all 0.1s',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span style={{ color: 'var(--accent, #dc2626)', fontSize: '0.7rem', minWidth: 16 }}>{cmd.icon}</span>
                  <span style={{ color: i === selected ? '#e5e7eb' : '#6b7280', fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                    {cmd.label}
                  </span>
                  {i === selected && (
                    <span style={{ marginLeft: 'auto', color: '#374151', fontSize: '0.55rem' }}>↵ ENTER</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '6px 16px',
            borderTop: '1px solid rgba(185,28,28,0.1)',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            gap: 16,
            color: '#1f2937',
            fontSize: '0.52rem',
            letterSpacing: '0.1em',
          }}>
            <span>↑↓ navigate</span>
            <span>↵ execute</span>
            <span>/ open</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes paletteIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes rootPulse {
          0%   { background: rgba(0,255,136,0.12); }
          100% { background: rgba(0,180,0,0.04); }
        }
        @keyframes rootFade {
          0%,80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
