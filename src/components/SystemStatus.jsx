import { useEffect, useState, useRef } from 'react';

// Fake but animated system metrics
function useFakeMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 62, ram: 41, net: 87, uptime: 847, mood: 'BUILDING',
  });

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics(m => ({
        cpu: Math.max(20, Math.min(95, m.cpu + (Math.random() - 0.48) * 6)),
        ram: Math.max(25, Math.min(80, m.ram + (Math.random() - 0.5) * 3)),
        net: Math.max(60, Math.min(99, m.net + (Math.random() - 0.5) * 4)),
        uptime: m.uptime,
        mood: m.mood,
      }));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return metrics;
}

function BarMeter({ value, color = 'var(--accent, #dc2626)', max = 100 }) {
  const pct = Math.round((value / max) * 10);
  const filled = '█'.repeat(pct);
  const empty = '░'.repeat(10 - pct);
  return (
    <span style={{ color, letterSpacing: '0.05em' }}>
      {filled}
      <span style={{ color: '#1f2937' }}>{empty}</span>
    </span>
  );
}

export default function SystemStatus() {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);
  const metrics = useFakeMetrics();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 8000,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        background: 'rgba(0,0,0,0.88)',
        border: '1px solid rgba(185,28,28,0.35)',
        backdropFilter: 'blur(10px)',
        minWidth: collapsed ? 'auto' : 210,
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        data-cursor="TOGGLE"
        onClick={() => setCollapsed(c => !c)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          borderBottom: collapsed ? 'none' : '1px solid rgba(185,28,28,0.2)',
          background: 'rgba(185,28,28,0.08)',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent, #dc2626)',
            display: 'inline-block',
            boxShadow: '0 0 6px var(--accent, #dc2626)',
            animation: 'sysBlink 1.2s step-end infinite',
          }} />
          <span style={{ color: 'var(--accent, #dc2626)', letterSpacing: '0.2em' }}>SYS_STATUS</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span
            data-cursor="CLOSE"
            onClick={(e) => { e.stopPropagation(); setVisible(false); }}
            style={{ color: '#374151', fontSize: '0.55rem', padding: '0 2px' }}
            onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={e => e.currentTarget.style.color = '#374151'}
          >✕</span>
          <span style={{ color: '#374151', fontSize: '0.55rem' }}>{collapsed ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div style={{ padding: '10px 10px 12px' }}>
          {/* CPU */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#6b7280', letterSpacing: '0.15em' }}>CPU</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarMeter value={metrics.cpu} />
              <span style={{ color: metrics.cpu > 75 ? '#ef4444' : 'var(--accent, #dc2626)', minWidth: 28, textAlign: 'right' }}>
                {Math.round(metrics.cpu)}%
              </span>
            </div>
          </div>

          {/* RAM */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#6b7280', letterSpacing: '0.15em' }}>RAM</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarMeter value={metrics.ram} />
              <span style={{ color: 'var(--accent, #dc2626)', minWidth: 28, textAlign: 'right' }}>
                {Math.round(metrics.ram)}%
              </span>
            </div>
          </div>

          {/* NET */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#6b7280', letterSpacing: '0.15em' }}>NET</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarMeter value={metrics.net} color="#22c55e" />
              <span style={{ color: '#22c55e', minWidth: 28, textAlign: 'right' }}>
                {Math.round(metrics.net)}%
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 8, lineHeight: 1.9 }}>
            <div style={{ color: '#374151' }}>
              UPTIME: <span style={{ color: '#6b7280' }}>{metrics.uptime}d</span>
            </div>
            <div style={{ color: '#374151' }}>
              PROJECTS: <span style={{ color: '#22c55e' }}>6 active</span>
            </div>
            <div style={{ color: '#374151' }}>
              MOOD: <span style={{ color: 'var(--accent, #dc2626)' }}>[{metrics.mood}]</span>
              <span style={{ color: 'var(--accent, #dc2626)', opacity: tick % 2 === 0 ? 1 : 0 }}>_</span>
            </div>
            <div style={{ color: '#374151' }}>
              STATUS: <span style={{ color: '#22c55e' }}>ONLINE</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sysBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
