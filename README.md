<div align="center">

```
██████╗ ██████╗ ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗██╗   ██╗
██╔══██╗██╔══██╗██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║██║   ██║
██████╔╝██████╔╝██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║██║   ██║
██╔═══╝ ██╔══██╗██║  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║██║   ██║
██║     ██║  ██║██║   ██║   ██║  ██║██║ ╚████║███████║██║  ██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝
```

# PRIYANSHU PRIYESH — SCROLLYTELLING PORTFOLIO v2.0

**A hi-tech, hacker-themed 3D scrollytelling portfolio built with React 18, Vite, Three.js, GSAP, and Tailwind CSS.**  
**Now featuring 22+ advanced upgrades — magnetic cursor, CRT overlay, 3D wireframe tunnel, live GitHub stats, horizontal scroll, and more.**

[![Built with React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-latest-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](./LICENSE)

---

[Live Demo](#) · [GitHub Profile](https://github.com/priyanshupriyesh6) · [LinkedIn](https://www.linkedin.com/in/priyanshu-priyesh-82038a328) · [Contact](mailto:priyanshupriyesh@gmail.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Sections](#-sections)
- [Featured Projects](#-featured-projects)
- [Performance](#-performance)
- [Keyboard Shortcuts & Easter Eggs](#-keyboard-shortcuts--easter-eggs)
- [License](#-license)
- [Contact](#-contact)

---

## 🌐 Overview

This is the personal developer portfolio of **Priyanshu Priyesh**, a B.Tech Computer Science & Engineering student specializing in web development, cyber security, and software engineering.

The portfolio is built as a **scrollytelling experience v2.0** — as you scroll, 70 pre-cached cinematic frames from a hacker visual sequence scrub in real-time via a Three.js + GSAP pipeline. The portfolio has since been massively upgraded with 22+ advanced features across 3 phases: interactive UI systems, new content sections, and advanced WebGL visual effects.

The visual theme is **black and crimson red** (switchable via a 4-theme system) — inspired by hacker terminal aesthetics, with glitch text, CRT scanlines, chromatic aberration, a 3D wireframe tunnel, and a cinematic loading screen.

---

## ✨ Features

### 🎬 Core Scrollytelling Experience
- **70-Frame Image Sequence** — Pre-loaded hacker frames rendered on a full-viewport Three.js `PlaneGeometry` mesh.
- **Scroll-Driven Animation** — GSAP `ScrollTrigger` scrubs the frame index in real-time as the user scrolls through the hero section.
- **WebGL Post-Processing** — `@react-three/postprocessing` applies real-time `Bloom` and `ChromaticAberration` effects over the Three.js canvas.
- **Glitch Text Effect** — Hero title uses CSS `clip-path` pseudo-elements for a genuine RGB-channel glitch effect.
- **Cinematic Loading Screen** — Terminal-style boot sequence with a red glowing progress bar, blocking until all 70 frames are fully cached.
- **Canvas Fade-Out** — At 80% through the hero scroll, the Three.js canvas smoothly fades out.

### 🖱️ Interactive Systems (New in v2)
- **Magnetic Cursor** — Dual-ring custom cursor: inner dot snaps instantly, outer ring lerp-follows at 9% speed. Morphs larger and shows contextual labels (`OPEN`, `VIEW`, `SEND`, `DEMO`) on hover. Default system cursor hidden globally.
- **Command Palette** — Press `/` anywhere to open a VS Code-style command palette with keyboard navigation (↑↓ arrows, `Enter` to execute). Navigate to any section or open external links instantly.
- **Theme Switcher** — Fixed top-right dropdown to switch between 4 color themes: **Crimson**, **Neon**, **Cobalt**, and **Gold**. All accents are CSS variables (`--accent`, `--glow`, etc.), persisted to `localStorage`.
- **System Status Widget** — Fixed bottom-left HUD showing animated fake CPU/RAM/NET meters, uptime, project count, and mood indicator. Collapsible with a dismiss button.
- **CRT Overlay** — Toggleable canvas overlay applying animated scanlines, vignette edge-darkening, random glitch bars, chromatic aberration ghost lines, phosphor glow pulses, and corner noise. Toggled via a top-bar `CRT ON/OFF` button.

### 🌟 Visual Effects (New in v2)
- **Binary Rain Parallax** — Fixed canvas layer behind the hero with matrix-style falling `0`/`1` characters and large drifting binary blobs at varying opacities for depth.
- **3D Wireframe Tunnel** — A dedicated Three.js scene renders a scroll-driven camera fly-through of a `CatmullRomCurve3` wireframe tube with glowing accent rings and floating particles. Fades in/out via GSAP ScrollTrigger at section boundaries.
- **Typewriter Section Titles** — Each major section heading types itself out character-by-character via GSAP `TextPlugin` when scrolled into view (`IntersectionObserver` + ScrollTrigger).
- **Section Dividers** — Elegant gradient horizontal rules between every section using CSS linear gradients.
- **Custom Scrollbar** — 4px accent-colored scrollbar matching the active theme.

### 📄 New Sections (New in v2)
- **Horizontal Projects Scroll** — GSAP-pinned horizontal scroll: 6 project cards slide sideways while the page scrolls vertically. Per-project accent colors, animated progress indicator, hover-reveal demo/source buttons, and an end-of-list CTA card.
- **Journey Timeline** — Alternating left/right vertical timeline with 8 milestones. GSAP `scaleY` scroll animation draws the connecting line progressively. Status badges: `COMPLETED`, `CURRENT`, `LOADING`.
- **Live GitHub Stats** — Fetches real data from the GitHub API: profile stats (repos, followers, stars), language distribution bar with color-coded segments, and a top-6 repo grid with star/fork counts and last-updated timestamps.
- **Wireframe Tunnel Transition** — A `400vh` section between About and Projects where the camera flies through the 3D tunnel, with a ghost-text label overlay.

### 🥚 Easter Eggs
- **Konami Code** — Enter `↑↑↓↓←→←→BA` to trigger **Root Mode**: a green system-breach overlay with fake terminal output, lasting 8 seconds.
- **Press `/` hint** — Shown in the contact section footer as a subtle developer nudge.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 | Component architecture, state, effects |
| **Build Tool** | Vite 8 | Dev server, HMR, production bundling |
| **3D Rendering** | Three.js + `@react-three/fiber` | WebGL canvas, texture plane, wireframe tunnel |
| **3D Helpers** | `@react-three/drei` | R3F utilities |
| **Post-Processing** | `@react-three/postprocessing` | Bloom, Chromatic Aberration |
| **Animation** | GSAP + ScrollTrigger + TextPlugin | Scroll scrubbing, typewriter, horizontal scroll, timeline |
| **Styling** | Tailwind CSS v4 | Utility classes via `@tailwindcss/vite` plugin |
| **Custom CSS** | CSS variables + Inline `<style>` | 4-theme system, glitch, scanlines, glow |
| **Canvas API** | Native 2D Canvas | CRT overlay, binary rain parallax |
| **GitHub API** | REST v3 (public) | Live profile + repo stats |
| **Fonts** | Google Fonts | Rajdhani + Share Tech Mono |
| **Language** | JavaScript ES Modules | No TypeScript |

---

## 🏗️ Architecture

### Core Scrollytelling — GSAP ↔ Three.js Separation

The most important architectural decision is keeping GSAP in the DOM layer and Three.js in the WebGL layer, bridged by a shared mutable ref:

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.jsx (React)                         │
│                                                                 │
│  ┌───────────────────┐    writes to    ┌─────────────────────┐  │
│  │  GSAP ScrollTrig  │ ─────────────► │  frameRef (useRef)  │  │
│  │  (DOM layer)      │                └──────────┬──────────┘  │
│  └───────────────────┘                           │             │
│                                                  ▼             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              @react-three/fiber Canvas (WebGL)            │  │
│  │  TextureSequencer.useFrame() ──reads──► frameRef          │  │
│  │  → materialRef.current.map = textures[frame]              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Theme System — CSS Variables

All color values are driven by CSS custom properties set on `:root`, so every component automatically respects theme changes without re-rendering:

```css
:root {
  --accent:       #dc2626;   /* primary red */
  --accent-dark:  #7f1d1d;   /* darker shade */
  --accent-light: #ef4444;   /* lighter shade */
  --glow:         rgba(220,38,38,0.4);
  --glow-soft:    rgba(220,38,38,0.08);
}
```

### Component Map

```
App.jsx
 ├── MagneticCursor       — custom cursor (lerp-smoothed)
 ├── ThemeSwitcher        — 4-theme CSS variable injector
 ├── SystemStatus         — animated HUD widget
 ├── CommandPalette       — / key palette + Konami easter egg
 ├── CRTOverlay           — canvas scanline/glitch effect
 ├── HeroParallax         — canvas binary rain layer
 ├── TextureSequencer     — R3F: 70-frame image sequence
 ├── About                — Three.js asteroid/missile scene
 ├── WireframeTunnel      — Three.js CatmullRomCurve3 flythrough
 ├── HorizontalProjects   — GSAP-pinned horizontal project scroll
 ├── Timeline             — Scroll-drawn alternating timeline
 └── GitHubStats          — Live GitHub API data + repo grid
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── hacker/
│   │   ├── hacker_000.jpg          # Frame 1 of 80
│   │   ├── hacker_001.jpg
│   │   ├── ...
│   │   └── hacker_079.jpg          # Frame 80 of 80
│   ├── earth.png                   # Three.js sprite (About scene)
│   ├── astroid.png                 # Three.js sprite (About scene)
│   ├── missile.png                 # Three.js sprite (About scene)
│   ├── project_investiq.png        # Project thumbnail
│   ├── project_rift.png            # Project thumbnail
│   └── project_so_interior.png     # Project thumbnail
│
├── src/
│   ├── components/
│   │   ├── TextureSequencer.jsx    # R3F: loads 70 textures, reads frameRef
│   │   ├── About.jsx               # Three.js asteroid/missile explosion scene
│   │   ├── MagneticCursor.jsx      # ★ Magnetic dual-ring custom cursor
│   │   ├── ThemeSwitcher.jsx       # ★ 4-theme CSS variable switcher
│   │   ├── SystemStatus.jsx        # ★ Animated system HUD widget
│   │   ├── CommandPalette.jsx      # ★ / key command palette + Konami code
│   │   ├── CRTOverlay.jsx          # ★ Canvas CRT scanline/glitch overlay
│   │   ├── HeroParallax.jsx        # ★ Canvas binary rain parallax layer
│   │   ├── WireframeTunnel.jsx     # ★ Three.js scroll-driven tunnel flythrough
│   │   ├── HorizontalProjects.jsx  # ★ GSAP-pinned horizontal project scroll
│   │   ├── Timeline.jsx            # ★ Alternating scroll-drawn timeline
│   │   └── GitHubStats.jsx         # ★ Live GitHub API stats + repo grid
│   ├── App.jsx                     # Main app: sections, routing, all wiring
│   ├── index.css                   # Tailwind import + base body styles
│   └── main.jsx                    # React DOM entry point
│
├── index.html                      # Vite HTML entry
├── vite.config.js                  # Vite config with React + Tailwind plugins
├── package.json                    # Dependencies
├── LICENSE                         # Proprietary — All Rights Reserved
└── README.md                       # This file

★ = Added in v2.0
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9
- A modern browser with **WebGL support** (Chrome, Firefox, Edge, Safari 15+)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/priyanshupriyesh6/PRIYANSHU-portfolio.git

# 2. Navigate into the project directory
cd PRIYANSHU-portfolio

# 3. Install all dependencies
npm install
```

### Development

```bash
# Start the local Vite dev server with Hot Module Replacement
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The initial page load will show a loading screen while all 70 hacker frames are downloaded and cached by the browser. On first load over a fast connection this takes 3–6 seconds. On subsequent visits the browser cache makes it near-instant.

### Production Build

```bash
# Generate optimised production bundle in /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## ⚙️ How It Works

### 1. Texture Pre-loading

When `TextureSequencer` mounts, it creates a `THREE.TextureLoader` with a `LoadingManager` that reports progress (0–100%) back to `App.jsx` state. All 70 JPEG frames are fetched from `/hacker/hacker_000.jpg` onwards. The loading screen blocks the page until `loadedCount === 70`.

### 2. GSAP ScrollTrigger (Frame Scrubbing)

Once all 70 textures are in state, a `useEffect` in `App.jsx` sets up two GSAP ScrollTriggers scoped to `#hero-section`:

```js
// Frame scrubber
gsap.to(obj, {
  f: 69,
  scrollTrigger: { trigger: '#hero-section', start: 'top top', end: 'bottom bottom', scrub: 0.5 },
  onUpdate: () => { frameRef.current = obj.f; },
});

// Canvas fade-out at 80% through hero
gsap.to(canvasRef.current, {
  opacity: 0,
  scrollTrigger: { trigger: '#hero-section', start: '80% top', end: 'bottom top', scrub: 0.5 },
});
```

### 3. Horizontal Project Scroll (GSAP Pin)

`HorizontalProjects.jsx` measures the total track width and pins the section container, translating the card track by `-totalWidth` as scroll progresses:

```js
gsap.to(trackRef.current, {
  x: -totalWidth,
  ease: 'none',
  scrollTrigger: { trigger: containerRef.current, start: 'top top', end: () => `+=${totalWidth + 200}`, pin: true, scrub: 0.8 },
});
```

### 4. Theme System

The `ThemeSwitcher` writes CSS custom properties to `document.documentElement.style`:

```js
document.documentElement.style.setProperty('--accent', theme.accent);
document.documentElement.style.setProperty('--glow', theme.glow);
// etc.
```

Every component uses `var(--accent, #dc2626)` as fallback, making the entire portfolio re-theme instantly without a re-render.

### 5. 3D Wireframe Tunnel

`WireframeTunnel.jsx` builds a `CatmullRomCurve3` spline with 200 points, extrudes it into a `TubeGeometry`, wraps it in `WireframeGeometry`, and positions the camera along `curve.getPointAt(scrollProgress)` every frame:

```js
const camPos = curve.getPointAt(t);
const lookPos = curve.getPointAt(Math.min(0.999, t + 0.002));
camera.position.copy(camPos);
camera.lookAt(lookPos);
```

### 6. Live GitHub Stats

`GitHubStats.jsx` fetches from the public GitHub REST API v3 on mount:

```js
Promise.all([
  fetch('https://api.github.com/users/priyanshupriyesh6'),
  fetch('https://api.github.com/users/priyanshupriyesh6/repos?sort=updated&per_page=100'),
]).then(([profile, repos]) => /* render */);
```

Data is displayed in stat cards, a language distribution bar, and a repo grid — all with skeleton loading states.

---

## 📄 Sections

| # | Section | Trigger ID | Height | Description |
|---|---|---|---|---|
| 1 | **Hero** | `#hero-section` | `500vh` | Full-screen intro, glitch name, terminal lines, 70-frame hacker sequence, binary rain parallax |
| 2 | **About Me** | `#about-section` | `500vh` | Bio, philosophy cards, skill bars, tech stack tags, Three.js asteroid/missile explosion |
| 3 | **Tunnel** | `#tunnel-section` | `400vh` | 3D wireframe camera flythrough transition between sections |
| 4 | **Projects** | `#projects-section` | pinned | GSAP horizontal scroll with 6 project cards + per-project accent colors |
| 5 | **Timeline** | `#timeline-section` | `600vh` | 8-milestone alternating journey timeline, scroll-drawn connecting line |
| 6 | **GitHub Stats** | `#stats-section` | `500vh` | Live GitHub API — profile stats, language bar, top repos |
| 7 | **Contact** | `#contact-section` | `500vh` | Email/GitHub/LinkedIn/Phone grid, primary CTA button, keyboard shortcut hint |

---

## 💼 Featured Projects

| Project | Language | Description | Links |
|---|---|---|---|
| **InvestIQ** | JavaScript / React | AI-powered investment platform with real-time market data, TradingView charts, AI fundamental analysis | [Source](https://github.com/priyanshupriyesh6/investment) |
| **RIFT 2026** | Python / Flask | Financial forensic analysis engine, deployed on Render | [Source](https://github.com/priyanshupriyesh6/rift2026) · [Demo](https://financail-forensic-engine.onrender.com) |
| **SO Interior Portfolio** | React / Vite / Tailwind | Premium interior design studio portfolio | [Source](https://github.com/priyanshupriyesh6/SO-interior-portfilio) · [Demo](https://so-interior-portfilio.onrender.com) |
| **Investment Advisor** | Python | Yahoo Finance API investment planner | [Source](https://github.com/priyanshupriyesh6/Investment-advisor) |
| **SO Interiors Website** | HTML / JS / CSS | Full-stack multi-page luxury interior design site | [Source](https://github.com/priyanshupriyesh6/sointeriorwesite) · [Demo](https://sointeriorwebsite.vercel.app) |
| **Portfolio v1** | TypeScript / React | Previous portfolio, hosted on GitHub Pages | [Source](https://github.com/priyanshupriyesh6/priyanshuPortfolio) |

---

## 📦 Dependencies

### Runtime
| Package | Version | Role |
|---|---|---|
| `react` | 18 | UI framework |
| `react-dom` | 18 | DOM renderer |
| `three` | 0.184+ | 3D engine (texture plane, wireframe tunnel, About scene) |
| `@react-three/fiber` | 8 | React renderer for Three.js |
| `@react-three/drei` | 9 | R3F helpers |
| `@react-three/postprocessing` | 2 | Bloom + ChromaticAberration on hero canvas |
| `gsap` | 3.15+ | ScrollTrigger, TextPlugin, horizontal scroll, timeline |

### Dev / Build
| Package | Version | Role |
|---|---|---|
| `vite` | 8 | Build tool & dev server |
| `@vitejs/plugin-react` | latest | React Fast Refresh |
| `tailwindcss` | 4 | CSS utility framework |
| `@tailwindcss/vite` | latest | Tailwind v4 Vite plugin |
| `autoprefixer` | latest | PostCSS vendor prefixing |

---

## ⚡ Performance

| Metric | Detail |
|---|---|
| **Initial Load** | Loading screen blocks until all 70 frames cached |
| **Frame Swap Cost** | `O(1)` — pointer reassignment only, no new allocations |
| **Scroll Overhead** | GSAP `scrub` uses `requestAnimationFrame` internally |
| **Canvas FPS** | 60fps via R3F's `useFrame` loop |
| **Texture Memory** | ~70 × ~500KB ≈ 35MB GPU VRAM |
| **Bundle Size** | ~1.26MB minified (Three.js + R3F dominant) |
| **CRT / Parallax** | Separate `requestAnimationFrame` loops on native 2D canvas — no WebGL overhead |
| **GitHub API** | Single mount fetch with `AbortController` for cleanup |
| **Theme Switching** | Zero re-renders — pure CSS variable mutation on `:root` |
| **Code Splitting** | Recommended for production via `rolldownOptions.output.codeSplitting` |

---

## ⌨️ Keyboard Shortcuts & Easter Eggs

| Action | Shortcut / Trigger | Effect |
|---|---|---|
| **Command Palette** | Press `/` | Opens VS Code-style navigation palette |
| **Navigate sections** | `↑` / `↓` in palette, then `Enter` | Jump to any section |
| **Root Mode** | Konami Code: `↑↑↓↓←→←→BA` | 8-second "system breach" green overlay |
| **Toggle CRT** | Click `CRT ON/OFF` button (top bar) | Enable / disable CRT scanline overlay |
| **Change Theme** | Click `THEME` button (top right) | Cycle Crimson → Neon → Cobalt → Gold |
| **Collapse HUD** | Click `SYS_STATUS` header | Collapse / expand system status widget |
| **Dismiss HUD** | Click `✕` in widget | Permanently hide the widget |

---

## 📜 License

```
Copyright (c) 2026 Priyanshu Priyesh. All Rights Reserved.

PROPRIETARY — Unauthorized copying, distribution, modification,
or use of this software is strictly prohibited.
```

See [LICENSE](./LICENSE) for the full proprietary license text.

---

## 📬 Contact

<div align="center">

| Channel | Details |
|---|---|
| **Email** | priyanshupriyesh@gmail.com |
| **GitHub** | [@priyanshupriyesh6](https://github.com/priyanshupriyesh6) |
| **LinkedIn** | [priyanshu-priyesh-82038a328](https://www.linkedin.com/in/priyanshu-priyesh-82038a328) |
| **Phone** | +91 7827887719 |

</div>

---

<div align="center">

**© 2026 Priyanshu Priyesh — All Rights Reserved**

*Built with precision. Styled with intent. Animated with purpose.*

*v2.0 — 22+ upgrades: magnetic cursor · CRT overlay · 3D tunnel · horizontal scroll · timeline · live GitHub stats · 4-theme system · command palette · Konami easter egg*

</div>
