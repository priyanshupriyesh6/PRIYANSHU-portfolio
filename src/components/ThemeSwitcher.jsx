import { useEffect, useState, useRef } from 'react';

const THEMES = {
  CRIMSON: {
    name: 'CRIMSON',
    accent: '#dc2626',
    accentDark: '#7f1d1d',
    accentLight: '#ef4444',
    glow: 'rgba(220,38,38,0.4)',
    glowSoft: 'rgba(220,38,38,0.08)',
  },
  NEON: {
    name: 'NEON',
    accent: '#00ff88',
    accentDark: '#004422',
    accentLight: '#22ffaa',
    glow: 'rgba(0,255,136,0.4)',
    glowSoft: 'rgba(0,255,136,0.08)',
  },
  COBALT: {
    name: 'COBALT',
    accent: '#3b82f6',
    accentDark: '#1e3a8a',
    accentLight: '#60a5fa',
    glow: 'rgba(59,130,246,0.4)',
    glowSoft: 'rgba(59,130,246,0.08)',
  },
  GOLD: {
    name: 'GOLD',
    accent: '#f59e0b',
    accentDark: '#78350f',
    accentLight: '#fbbf24',
    glow: 'rgba(245,158,11,0.4)',
    glowSoft: 'rgba(245,158,11,0.08)',
  },
};

// Export so other components can read current theme
export let currentTheme = THEMES.CRIMSON;

export function getTheme() { return currentTheme; }

export default function ThemeSwitcher({ onThemeChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved && THEMES[saved]) ? saved : 'CRIMSON';
  });

  const apply = (key) => {
    const t = THEMES[key];
    currentTheme = t;
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--accent-dark', t.accentDark);
    document.documentElement.style.setProperty('--accent-light', t.accentLight);
    document.documentElement.style.setProperty('--glow', t.glow);
    document.documentElement.style.setProperty('--glow-soft', t.glowSoft);
    localStorage.setItem('portfolio-theme', key);
    setActive(key);
    setOpen(false);
    if (onThemeChange) onThemeChange(t);
  };

  // Apply saved theme on mount
  useEffect(() => {
    apply(active);
  }, []); // eslint-disable-line

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9000,
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        {/* Toggle button */}
        <button
          data-cursor="THEME"
          onClick={() => setOpen(o => !o)}
          style={{
            padding: '6px 12px',
            background: 'rgba(0,0,0,0.85)',
            border: `1px solid var(--accent, #dc2626)`,
            color: 'var(--accent, #dc2626)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backdropFilter: 'blur(8px)',
            transition: 'box-shadow 0.2s',
            boxShadow: open ? `0 0 16px var(--glow, rgba(220,38,38,0.4))` : 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 16px var(--glow, rgba(220,38,38,0.4))`}
          onMouseLeave={e => !open && (e.currentTarget.style.boxShadow = 'none')}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: THEMES[active].accent,
            boxShadow: `0 0 6px ${THEMES[active].glow}`,
            display: 'inline-block',
          }} />
          THEME
          <span style={{ opacity: 0.5, fontSize: '0.5rem' }}>{open ? '▲' : '▼'}</span>
        </button>

        {/* Dropdown */}
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 4,
          background: 'rgba(0,0,0,0.95)',
          border: `1px solid var(--accent-dark, #7f1d1d)`,
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
          maxHeight: open ? 300 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s',
          minWidth: 140,
        }}>
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              data-cursor="PICK"
              onClick={() => apply(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                background: active === key ? `rgba(0,0,0,0.6)` : 'transparent',
                border: 'none',
                borderBottom: `1px solid rgba(255,255,255,0.04)`,
                color: active === key ? t.accent : '#6b7280',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                textAlign: 'left',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = active === key ? 'rgba(0,0,0,0.6)' : 'transparent'; e.currentTarget.style.color = active === key ? t.accent : '#6b7280'; }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: t.accent,
                boxShadow: `0 0 6px ${t.glow}`,
                flexShrink: 0,
              }} />
              {t.name}
              {active === key && <span style={{ marginLeft: 'auto', fontSize: '0.5rem' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* CSS variable injection */}
      <style>{`
        :root {
          --accent: #dc2626;
          --accent-dark: #7f1d1d;
          --accent-light: #ef4444;
          --glow: rgba(220,38,38,0.4);
          --glow-soft: rgba(220,38,38,0.08);
        }
      `}</style>
    </>
  );
}
