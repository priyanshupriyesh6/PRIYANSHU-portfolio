import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';

// TextureSequencer only handles loading + rendering
// GSAP lives in App.jsx and writes to frameRef
export function TextureSequencer({ setProgress, setTextures, textures, frameRef }) {
  const materialRef = useRef();
  const meshRef = useRef();
  const { viewport } = useThree();

  // ── Load all 79 textures ──────────────────────────────────────────────────
  useEffect(() => {
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      setProgress(Math.floor((loaded / total) * 100));
    };

    const loader = new THREE.TextureLoader(manager);
    const bucket = new Array(70);
    let done = 0;

    for (let i = 1; i <= 70; i++) {
      const idx = i.toString().padStart(3, '0');
      loader.load(
        `/hacker/hacker_${idx}.jpg`,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          bucket[i - 1] = tex;
          done++;
          if (done === 70) setTextures(bucket);
        },
        undefined,
        (err) => console.error('Texture load error:', err)
      );
    }
  }, [setProgress, setTextures]);

  // ── Every frame: read frameRef and update texture + scale ─────────────────
  useFrame(() => {
    if (!meshRef.current || !materialRef.current || textures.length < 70) return;

    // Update texture from scroll-driven frame ref
    const frame = Math.min(69, Math.max(0, Math.floor(frameRef.current)));
    if (textures[frame]) {
      if (materialRef.current.map !== textures[frame]) {
        materialRef.current.map = textures[frame];
        materialRef.current.needsUpdate = true;
      }
    }

    // Cover aspect-ratio scaling (like background-size: cover)
    const imageAspect = 16 / 9;
    const vAspect = viewport.width / viewport.height;
    if (vAspect > imageAspect) {
      meshRef.current.scale.set(viewport.width, viewport.width / imageAspect, 1);
    } else {
      meshRef.current.scale.set(viewport.height * imageAspect, viewport.height, 1);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={materialRef} toneMapped={false} />
      </mesh>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={0.8} />
        <ChromaticAberration offset={[0.0015, 0.0015]} />
      </EffectComposer>
    </>
  );
}
