import { useEffect, useRef } from 'react';

// Generates drifting binary particles on a canvas
export default function HeroParallax() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Binary rain columns ───────────────────────────────────────────────────
    const FONT_SIZE = 11;
    const cols = Math.floor(W / (FONT_SIZE * 2.5));
    const drops = Array.from({ length: cols }, () => Math.random() * -H);
    const chars = '01アイウエオカキクケコサシスセソタチツテト'.split('');

    // ── Floating binary blobs (larger, drifting) ──────────────────────────────
    const blobs = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      char: Math.random() > 0.5 ? '0' : '1',
      size: 10 + Math.random() * 16,
      opacity: 0.03 + Math.random() * 0.07,
      changeTimer: 0,
    }));

    let frame = 0;
    let raf;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;

      // Fade trail
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(0, 0, W, H);

      // Matrix rain columns (very subtle)
      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i];
        if (y > 0 && y < H) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const alpha = Math.max(0, 1 - (y / H) * 1.5);
          ctx.fillStyle = `rgba(220,38,38,${0.04 * alpha})`;
          ctx.fillText(ch, i * (FONT_SIZE * 2.5), y);
        }
        drops[i] += FONT_SIZE * 0.6;
        if (drops[i] > H) drops[i] = Math.random() * -200;
      }

      // Large drifting blobs
      if (frame % 2 === 0) {
        for (const b of blobs) {
          b.changeTimer++;
          if (b.changeTimer > 40 + Math.random() * 60) {
            b.char = Math.random() > 0.5 ? '0' : '1';
            b.changeTimer = 0;
          }
          ctx.font = `${b.size}px 'Share Tech Mono', monospace`;
          ctx.fillStyle = `rgba(220,38,38,${b.opacity})`;
          ctx.fillText(b.char, b.x, b.y);

          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -20) b.x = W + 20;
          if (b.x > W + 20) b.x = -20;
          if (b.y < -20) b.y = H + 20;
          if (b.y > H + 20) b.y = -20;
        }
      }
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}
