import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * WireframeTunnel — renders a scroll-driven 3D wireframe tube tunnel.
 * The camera flies through a CatmullRomCurve3 spline as the
 * #tunnel-section scrolls. Fades in/out at section boundaries.
 */
export default function WireframeTunnel() {
  const mountRef = useRef(null);

  useEffect(() => {
    const section = document.getElementById('tunnel-section');
    if (!mountRef.current || !section) return;

    // ── THREE SETUP ──────────────────────────────────────────────────────────
    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    const camera = new THREE.PerspectiveCamera(80, W / H, 0.01, 100);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // ── SPLINE CURVE ─────────────────────────────────────────────────────────
    const points = [];
    const turns = 6;
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const angle = t * Math.PI * 2 * turns;
      const radius = 2.5 + Math.sin(t * Math.PI * 4) * 0.5;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius * 0.3,
        t * 30 - 0.5,
        Math.sin(angle) * radius * 0.3,
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);

    // ── TUBE GEOMETRY ─────────────────────────────────────────────────────────
    const tubeGeo = new THREE.TubeGeometry(curve, 300, 0.8, 8, false);
    const wireframeGeo = new THREE.WireframeGeometry(tubeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('var(--accent, #dc2626)').set(0xdc2626),
      transparent: true,
      opacity: 0.25,
    });
    const tubeMesh = new THREE.LineSegments(wireframeGeo, wireMat);
    scene.add(tubeMesh);

    // ── INNER ACCENT RINGS ────────────────────────────────────────────────────
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      const pos = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);

      const ringGeo = new THREE.RingGeometry(0.5, 0.55, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 10 === 0 ? 0xff2222 : 0x3b0000,
        transparent: true,
        opacity: i % 10 === 0 ? 0.6 : 0.15,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().add(tangent));
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    // ── FLOATING PARTICLES ────────────────────────────────────────────────────
    const partCount = 400;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount; i++) {
      const t = Math.random();
      const p = curve.getPointAt(t);
      const spread = 0.6;
      partPos[i * 3]     = p.x + (Math.random() - 0.5) * spread;
      partPos[i * 3 + 1] = p.y + (Math.random() - 0.5) * spread;
      partPos[i * 3 + 2] = p.z + (Math.random() - 0.5) * spread;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(partGeo, partMat));

    // ── SCROLL → CAMERA POSITION ─────────────────────────────────────────────
    const scrollObj = { t: 0 };
    const lookAhead = 0.002;

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onEnter:     () => gsap.to(mountRef.current, { opacity: 1, duration: 0.6 }),
      onLeave:     () => gsap.to(mountRef.current, { opacity: 0, duration: 0.6 }),
      onEnterBack: () => gsap.to(mountRef.current, { opacity: 1, duration: 0.6 }),
      onLeaveBack: () => gsap.to(mountRef.current, { opacity: 0, duration: 0.6 }),
    });

    gsap.to(scrollObj, {
      t: 0.92,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // ── RENDER LOOP ───────────────────────────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Move camera along the spline
      const t = Math.min(0.99, scrollObj.t);
      const camPos = curve.getPointAt(t);
      const lookPos = curve.getPointAt(Math.min(0.999, t + lookAhead));

      camera.position.copy(camPos);
      camera.lookAt(lookPos);

      // Subtle camera shake
      camera.position.x += Math.sin(elapsed * 1.7) * 0.005;
      camera.position.z += Math.cos(elapsed * 1.3) * 0.005;

      // Slowly rotate tube
      tubeMesh.rotation.y = elapsed * 0.05;

      // Pulse wire opacity
      wireMat.opacity = 0.15 + Math.sin(elapsed * 0.8) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // ── RESIZE ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(st => { if (st.vars?.trigger === section) st.kill(); });
      renderer.dispose();
      scene.clear();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'none',
      }}
    />
  );
}
