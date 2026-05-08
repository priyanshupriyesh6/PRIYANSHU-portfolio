import { useEffect, useRef, useState } from 'react';

/**
 * CRTOverlay — pure canvas-based CRT effect overlay.
 * Draws on top of everything via a fixed canvas:
 *  - Subtle barrel/vignette darkening at edges
 *  - Animated scanlines
 *  - Random glitch bar flashes
 *  - Chromatic aberration ghost lines
 *  - Phosphor bloom glow pulse
 */
export default function CRTOverlay() {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let frame = 0;
    let raf;
    let glitchTimer = 0;
    let glitchActive = false;
    let glitchY = 0;
    let glitchH = 0;
    let glitchOpacity = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, W, H);

      // ── 1. Vignette (edge darkening) ─────────────────────────────────────────
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Moving scanlines ──────────────────────────────────────────────────
      const scanOffset = (frame * 0.8) % 3;
      for (let y = scanOffset; y < H; y += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(0, y, W, 1);
      }

      // ── 3. Horizontal phosphor glow lines (very subtle) ──────────────────────
      if (frame % 4 === 0) {
        const glowY = Math.random() * H;
        const grd = ctx.createLinearGradient(0, glowY - 1, 0, glowY + 1);
        grd.addColorStop(0, 'rgba(220,38,38,0)');
        grd.addColorStop(0.5, 'rgba(220,38,38,0.025)');
        grd.addColorStop(1, 'rgba(220,38,38,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, glowY - 1, W, 2);
      }

      // ── 4. Random glitch bar ─────────────────────────────────────────────────
      glitchTimer++;
      if (!glitchActive && glitchTimer > 180 + Math.random() * 300) {
        glitchActive = true;
        glitchTimer = 0;
        glitchY = Math.random() * H;
        glitchH = 2 + Math.random() * 6;
        glitchOpacity = 0.06 + Math.random() * 0.08;
      }
      if (glitchActive) {
        // Red glitch bar
        ctx.fillStyle = `rgba(220,38,38,${glitchOpacity})`;
        ctx.fillRect(0, glitchY, W, glitchH);
        // Chromatic aberration ghost (cyan offset)
        ctx.fillStyle = `rgba(0,238,255,${glitchOpacity * 0.5})`;
        ctx.fillRect(3, glitchY + 1, W - 3, glitchH - 1);
        glitchOpacity -= 0.008;
        if (glitchOpacity <= 0) glitchActive = false;
      }

      // ── 5. Corner noise pixels ────────────────────────────────────────────────
      if (frame % 6 === 0) {
        for (let i = 0; i < 8; i++) {
          const px = Math.random() * W;
          const py = Math.random() * H;
          const alpha = 0.02 + Math.random() * 0.04;
          ctx.fillStyle = `rgba(220,38,38,${alpha})`;
          ctx.fillRect(px, py, 1, 1);
        }
      }

      // ── 6. Top/bottom edge burn ───────────────────────────────────────────────
      const topBurn = ctx.createLinearGradient(0, 0, 0, 60);
      topBurn.addColorStop(0, 'rgba(0,0,0,0.25)');
      topBurn.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topBurn;
      ctx.fillRect(0, 0, W, 60);

      const btmBurn = ctx.createLinearGradient(0, H - 60, 0, H);
      btmBurn.addColorStop(0, 'rgba(0,0,0,0)');
      btmBurn.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = btmBurn;
      ctx.fillRect(0, H - 60, W, 60);
    };

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  return (
    <>
      {/* CRT toggle button */}
      <button
        data-cursor="CRT"
        onClick={() => setEnabled(e => !e)}
        title={enabled ? 'Disable CRT effect' : 'Enable CRT effect'}
        style={{
          position: 'fixed',
          top: 20,
          right: 120,
          zIndex: 9000,
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.85)',
          border: `1px solid ${enabled ? 'var(--accent, #dc2626)' : 'rgba(185,28,28,0.3)'}`,
          color: enabled ? 'var(--accent, #dc2626)' : '#374151',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
          boxShadow: enabled ? '0 0 12px var(--glow-soft, rgba(220,38,38,0.15))' : 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 12px var(--glow-soft, rgba(220,38,38,0.15))'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = enabled ? '0 0 12px var(--glow-soft, rgba(220,38,38,0.15))' : 'none'}
      >
        CRT {enabled ? 'ON' : 'OFF'}
      </button>

      {/* The overlay canvas */}
      {enabled && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
}
