import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ── Skill Bar ──────────────────────────────────────────────────────────────────
function SkillBar({ skill, level }) {
  const [w, setW] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setW(level); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem" }}>
        <span style={{ color: "#d1d5db" }}>{skill}</span>
        <span style={{ color: "#dc2626" }}>{level}%</span>
      </div>
      <div style={{ height: 1, background: "rgba(30,0,0,0.8)", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #7f1d1d, #dc2626, #ef4444)",
          width: `${w}%`,
          transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 0 8px rgba(220,38,38,0.6)",
        }} />
      </div>
    </div>
  );
}

const SKILLS = [
  { skill: "JavaScript / React", level: 88 },
  { skill: "Python", level: 82 },
  { skill: "C / C++", level: 75 },
  { skill: "HTML / CSS", level: 90 },
  { skill: "Cloud Computing / AWS", level: 65 },
  { skill: "Docker / Git / DevOps", level: 72 },
];

const STACK = [
  "HTML", "CSS", "JavaScript", "React", "Python",
  "C++", "C", "Git", "Docker", "AWS", "Figma", "Webpack", "Premiere Pro",
];

const TRAITS = [
  { icon: "</>", label: "Clean Code" },
  { icon: "◈",   label: "UI/UX Focus" },
  { icon: "⚡",   label: "Performance" },
  { icon: "⬡",   label: "Innovation" },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function About() {
  const canvasWrapRef = useRef(); // fixed canvas div
  const [isMobile]   = useState(() => /Mobi|Android/i.test(navigator.userAgent));

  useEffect(() => {
    if (isMobile || !canvasWrapRef.current) return;

    // ── The scroll trigger uses the parent <section id="about-section"> ──────
    const section = document.getElementById("about-section");
    if (!section) return;

    // ── THREE SETUP ──────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    canvasWrapRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // ✨ STARS
    const starPos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.45 }));
    scene.add(stars);

    // ── SPRITE FACTORY ───────────────────────────────────────────────────────
    const makeSprite = (src, sx, sy, threshold = 0.01) => {
      const mat = new THREE.SpriteMaterial({ map: loader.load(src), transparent: true, depthWrite: false, alphaTest: threshold });
      const sp  = new THREE.Sprite(mat);
      sp.scale.set(sx, sy, 1);
      return sp;
    };

    // 🌍 EARTH — lower right, large and prominent
    const earth    = makeSprite("/earth.png",   3.2, 3.2, 0.05);
    earth.position.set(3.0, -1.2, -1);
    scene.add(earth);

    // ☄️ ASTEROID — upper left
    const asteroid = makeSprite("/astroid.png",  1.8, 1.8);
    asteroid.position.set(-6.5, 2.8, 0);
    scene.add(asteroid);

    // 🚀 MISSILE — centre-left, angled toward asteroid
    const missile  = makeSprite("/missile.png",  2.8, 1.1);
    missile.position.set(-2.8, -1.8, 0);
    scene.add(missile);

    // 🎯 TRAJECTORY LINE
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.8, -1.8, 0),
      new THREE.Vector3(-6.5, 2.8, 0),
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.35 });
    const line    = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    // 💥 EXPLOSION PARTICLES
    const COUNT   = 350;
    const partGeo  = new THREE.BufferGeometry();
    const partPos  = new Float32Array(COUNT * 3);
    const partVel  = new Float32Array(COUNT * 3);
    const partCols = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 0.24;
      partVel[i * 3]     = (Math.random() - 0.5) * r;
      partVel[i * 3 + 1] = (Math.random() - 0.5) * r;
      partVel[i * 3 + 2] = (Math.random() - 0.5) * r;
      partCols[i * 3]     = 1;
      partCols[i * 3 + 1] = Math.random() * 0.5;
      partCols[i * 3 + 2] = 0;
    }
    partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
    partGeo.setAttribute("color",    new THREE.BufferAttribute(partCols, 3));
    const partMat = new THREE.PointsMaterial({
      vertexColors: true, size: 0.1, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const explosionPts = new THREE.Points(partGeo, partMat);
    scene.add(explosionPts);

    // 🌊 SHOCKWAVE RINGS
    const makeRing = (inner, outer, col) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(inner, outer, 64),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      scene.add(m);
      return m;
    };
    const ring1 = makeRing(0.05, 0.14, 0xff2200);
    const ring2 = makeRing(0.05, 0.09, 0xff8800);

    // ── CANVAS VISIBILITY tied to about-section scroll entry/exit ─────────────
    const wrap = canvasWrapRef.current;
    gsap.set(wrap, { opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 90%",        // start fading in just before section enters
      end: "bottom 10%",       // start fading out just before section leaves
      onEnter:      () => gsap.to(wrap, { opacity: 1, duration: 0.5 }),
      onLeave:      () => gsap.to(wrap, { opacity: 0, duration: 0.5 }),
      onEnterBack:  () => gsap.to(wrap, { opacity: 1, duration: 0.5 }),
      onLeaveBack:  () => gsap.to(wrap, { opacity: 0, duration: 0.5 }),
    });

    // ── SCROLL ANIMATION ─────────────────────────────────────────────────────
    const intercept = { x: 0.8, y: -0.3 };
    let exploded = false;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "+=1500",
        scrub: 1.2,
      },
    });

    tl.to(asteroid.position, { x: intercept.x, y: intercept.y, z: 0, duration: 3, ease: "power1.in" });
    tl.to(missile.position,  { x: intercept.x, y: intercept.y, z: 0, duration: 2, ease: "power2.in" }, "-=2.5");

    tl.add(() => {
      if (exploded) return;
      exploded = true;
      explosionPts.position.set(intercept.x, intercept.y, 0);
      ring1.position.set(intercept.x, intercept.y, 0);
      ring2.position.set(intercept.x, intercept.y, 0);
      partMat.opacity = 0.95;

      const flash = document.querySelector(".about-flash");
      if (flash) gsap.fromTo(flash, { opacity: 0 }, { opacity: 0.75, duration: 0.07, yoyo: true, repeat: 3, ease: "none" });

      gsap.fromTo(ring1.scale, { x: 1, y: 1 }, { x: 16, y: 16, duration: 1.0, ease: "power2.out" });
      gsap.to(ring1.material, { opacity: 0, duration: 1.0, ease: "power2.in" });
      gsap.fromTo(ring2.scale, { x: 1, y: 1 }, { x: 10, y: 10, duration: 0.7, delay: 0.2, ease: "power2.out" });
      gsap.to(ring2.material, { opacity: 0, duration: 0.7, delay: 0.2, ease: "power2.in" });
    });

    tl.to(asteroid.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.15 });
    tl.to(missile.scale,  { x: 0.001, y: 0.001, z: 0.001, duration: 0.15 }, "<");

    tl.to(camera.position, {
      x: "+=0.3", y: "-=0.3", repeat: 14, yoyo: true, duration: 0.04,
      onUpdate: () => {
        camera.position.x += (Math.random() - 0.5) * 0.1;
        camera.position.y += (Math.random() - 0.5) * 0.1;
      },
    });

    tl.to(partMat, { opacity: 0, duration: 1.2 });

    // ── RENDER LOOP ───────────────────────────────────────────────────────────
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      stars.rotation.y += 0.00005;
      earth.rotation.z  += 0.001;

      // Rotate missile sprite to face asteroid
      const dx = asteroid.position.x - missile.position.x;
      const dy = asteroid.position.y - missile.position.y;
      missile.material.rotation = Math.atan2(dy, dx);

      // Update trajectory line
      const arr = line.geometry.attributes.position.array;
      arr[0] = missile.position.x;  arr[1] = missile.position.y;  arr[2] = missile.position.z;
      arr[3] = asteroid.position.x; arr[4] = asteroid.position.y; arr[5] = asteroid.position.z;
      line.geometry.attributes.position.needsUpdate = true;

      // Particles
      if (partMat.opacity > 0.01) {
        const p = partGeo.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
          p[i * 3]     += partVel[i * 3];
          p[i * 3 + 1] += partVel[i * 3 + 1];
          p[i * 3 + 2] += partVel[i * 3 + 2];
          partVel[i * 3 + 1] -= 0.0004;
        }
        partGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── RESIZE ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars?.trigger === section) st.kill();
      });
      renderer.dispose();
      scene.clear();
      if (canvasWrapRef.current && renderer.domElement.parentNode === canvasWrapRef.current) {
        canvasWrapRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  return (
    <>
      {/* 
        Canvas wrapper: FIXED so it fills the viewport during About scroll.
        Starts at opacity:0 — GSAP ScrollTrigger fades it in/out as About enters/exits.
      */}
      {!isMobile && (
        <div
          ref={canvasWrapRef}
          style={{
            position: "fixed", inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0,
            transition: "none",  // GSAP handles transitions
          }}
        />
      )}

      {/* 💥 Flash overlay (fixed, shown only during explosion) */}
      <div className="about-flash" style={{
        position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(circle at 55% 45%, rgba(255,100,0,0.95), rgba(255,30,0,0.5) 35%, transparent 65%)",
        opacity: 0,
      }} />

      {/* Mobile fallback */}
      {isMobile && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100vh",
          fontFamily: "'Share Tech Mono', monospace", color: "#dc2626", fontSize: "0.75rem", opacity: 0.4,
        }}>
          // INTERACTIVE MODE DISABLED ON MOBILE
        </div>
      )}

      {/* ── Sticky glass card (always in DOM, z above canvas) ─────────────── */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 24px", zIndex: 10,
      }}>
        <div
          className="about-title"
          style={{
            maxWidth: 1100, width: "100%",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start",
            background: "rgba(0,0,0,0.15)",
            border: "1px solid rgba(185,28,28,0.28)",
            padding: "40px 48px",
            boxShadow: "0 0 80px rgba(220,38,38,0.05)",
          }}
        >
          {/* ── LEFT: Bio ── */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: ".3em", color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>
              // 01 — about.sys
            </div>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 700, lineHeight: 0.95, marginBottom: 20 }}>
              ABOUT<br />
              <span style={{ color: "#dc2626", textShadow: "0 0 8px rgba(220,38,38,0.9), 0 0 25px rgba(220,38,38,0.4)" }}>ME</span>
            </h2>
            <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#9ca3af", fontSize: "0.78rem", lineHeight: 1.9, marginBottom: 28 }}>
              B.Tech CSE student with a passion for building things that matter — from real-time investment platforms to immersive 3D web experiences. I specialize in web development, cyber protection, and software engineering.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {TRAITS.map(({ icon, label }) => (
                <div key={label}
                  style={{ padding: "12px 14px", border: "1px solid rgba(185,28,28,0.3)", background: "transparent", transition: "all 0.2s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.6)"; e.currentTarget.style.background = "rgba(220,38,38,0.08)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(220,38,38,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(185,28,28,0.3)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ color: "#dc2626", fontSize: "1rem", marginBottom: 5 }}>{icon}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#d1d5db", fontSize: "0.68rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Skills ── */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: ".3em", color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>
              // skills.log
            </div>
            <div style={{ marginBottom: 28 }}>
              {SKILLS.map(s => <SkillBar key={s.skill} {...s} />)}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: ".3em", color: "#dc2626", textTransform: "uppercase", marginBottom: 10 }}>
              // stack.json
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
              {STACK.map(t => (
                <span key={t}
                  style={{ fontFamily: "'Share Tech Mono', monospace", padding: "3px 10px", fontSize: "0.63rem", border: "1px solid rgba(185,28,28,0.4)", color: "#fca5a5", background: "transparent", cursor: "default", transition: "all .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.boxShadow = "0 0 8px rgba(220,38,38,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(185,28,28,0.4)"; e.currentTarget.style.color = "#fca5a5"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Terminal status log */}
            <div style={{
              padding: "12px 14px",
              border: "1px solid rgba(185,28,28,0.2)",
              background: "transparent",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.62rem", color: "#374151", lineHeight: 2,
            }}>
              <span style={{ color: "#16a34a" }}>✓</span> threat_neutralised: asteroid_impact<br />
              <span style={{ color: "#16a34a" }}>✓</span> earth.status = <span style={{ color: "#22c55e" }}>PROTECTED</span><br />
              <span style={{ color: "#dc2626" }}>▸</span>{" "}
              <span style={{ color: "#6b7280" }}>interceptor.launch(target="opportunity")</span>
              <span style={{ display: "inline-block", width: 8, height: "1em", background: "#dc2626", marginLeft: 2, animation: "aboutBlink 0.8s step-end infinite", verticalAlign: "middle" }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aboutBlink { 50% { opacity: 0; } }
        @media (max-width: 768px) {
          .about-title { grid-template-columns: 1fr !important; gap: 32px !important; padding: 24px !important; }
        }
      `}</style>
    </>
  );
}
