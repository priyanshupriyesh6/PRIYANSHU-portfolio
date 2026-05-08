import { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const labelRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const outer = useRef({ x: -200, y: -200 });
  const [label, setLabel] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Instantly snap inner dot
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }

      // Detect hover on interactive elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const nearest = el.closest('a, button, [data-cursor]');
        if (nearest) {
          setIsHover(true);
          const cursorLabel = nearest.dataset.cursor || (nearest.tagName === 'A' ? 'OPEN' : 'CLICK');
          setLabel(cursorLabel);
        } else {
          setIsHover(false);
          setLabel('');
        }
      }
    };

    const onDown = () => setIsClick(true);
    const onUp = () => setIsClick(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Lerp outer ring to follow mouse
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      outer.current.x = lerp(outer.current.x, mouse.current.x, 0.09);
      outer.current.y = lerp(outer.current.y, mouse.current.y, 0.09);

      if (outerRef.current) {
        outerRef.current.style.left = `${outer.current.x}px`;
        outerRef.current.style.top = `${outer.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const outerSize = isHover ? 64 : isClick ? 18 : 40;
  const outerBorder = isHover ? 'rgba(220,38,38,0.9)' : 'rgba(220,38,38,0.5)';
  const outerBg = isHover ? 'rgba(220,38,38,0.08)' : 'transparent';

  return (
    <>
      {/* Outer lagging ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          width: outerSize,
          height: outerSize,
          border: `1px solid ${outerBorder}`,
          borderRadius: '50%',
          background: outerBg,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease',
          backdropFilter: isHover ? 'blur(2px)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {label && (
          <span
            ref={labelRef}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.5rem',
              color: '#dc2626',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              opacity: isHover ? 1 : 0,
              transition: 'opacity 0.2s',
              userSelect: 'none',
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Inner sharp dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          width: isClick ? 3 : 5,
          height: isClick ? 3 : 5,
          background: '#dc2626',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s',
          boxShadow: '0 0 8px rgba(220,38,38,0.8)',
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>
    </>
  );
}
