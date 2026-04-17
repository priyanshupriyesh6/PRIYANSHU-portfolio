<div align="center">

```
██████╗ ██████╗ ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗██╗   ██╗
██╔══██╗██╔══██╗██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║██║   ██║
██████╔╝██████╔╝██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║██║   ██║
██╔═══╝ ██╔══██╗██║  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║██║   ██║
██║     ██║  ██║██║   ██║   ██║  ██║██║ ╚████║███████║██║  ██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝
```

# PRIYANSHU PRIYESH — SCROLLYTELLING PORTFOLIO

**A hi-tech, hacker-themed 3D scrollytelling portfolio built with React 18, Vite, Three.js, GSAP, and Tailwind CSS.**

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
- [License](#-license)
- [Contact](#-contact)

---

## 🌐 Overview

This is the personal developer portfolio of **Priyanshu Priyesh**, a B.Tech Computer Science & Engineering student specializing in web development, cyber security, and software engineering.

The portfolio is built as a **scrollytelling experience** — meaning the background is driven by scroll position. As you scroll through the hero section, 70 pre-cached cinematic frames from a hacker visual sequence are scrubbed in sync with your scroll, creating the effect of a video playing as you move through the page. This technique is popularized by premium product websites (Apple, ddark.dev, etc.) and is implemented here using a custom React + Three.js + GSAP pipeline.

The visual theme is **black and crimson red** — inspired by hacker terminal aesthetics, with glitch text effects, scanline overlays, chromatic aberration, monospace typography, and a cinematic loading screen.

---

## ✨ Features

### Core Experience
- 🎬 **70-Frame Image Sequence** — Pre-loaded hacker frames rendered on a full-viewport Three.js `PlaneGeometry` mesh using `meshBasicMaterial`.
- 🖱️ **Scroll-Driven Animation** — GSAP `ScrollTrigger` scrubs the frame index in real-time as the user scrolls through the hero section.
- 🌟 **WebGL Post-Processing** — `@react-three/postprocessing` applies real-time `Bloom` and `ChromaticAberration` effects over the Three.js canvas.
- 🎭 **Glitch Text Effect** — Hero title uses CSS animation with `clip-path` pseudo-elements to produce a genuine RGB-channel glitch.
- 🖥️ **Cinematic Loading Screen** — A terminal-style boot sequence blocks the site until all 70 frames are 100% cached, with a red glowing progress bar.
- 🌑 **Canvas Fade-Out** — At 80% through the hero scroll, GSAP smoothly fades the Three.js canvas to `opacity: 0`, cleanly handing off to the HTML sections below.

### Interactive Elements
- 🔦 **Mouse Spotlight** — A radial red gradient follows your cursor across the page.
- 📊 **Animated Skill Bars** — Skill progress bars sweep in via `IntersectionObserver` as the About section enters the viewport.
- 🃏 **Project Cards** — Interactive glassmorphism-style cards with image zoom on hover, live status indicators, and direct links to GitHub repos and live demos.
- ⌨️ **Terminal Lines** — Hero description types in sequentially with staggered opacity transitions.
- 🏷️ **Hover Effects** — All interactive elements have micro-animations including border glow, scale, and color transitions.

### Design System
- 🎨 **Black & Crimson Red** theme throughout
- 🔤 **Dual Typography** — `Rajdhani` (display headings) + `Share Tech Mono` (terminal/code text)
- 📐 **Responsive Layout** — CSS Grid with `auto-fill` project cards, `clamp()` for fluid type scaling
- 🔲 **Corner Brackets** — Decorative CSS `border` corner accents on key containers
- ▦ **Subtle Grid Background** — Repeating linear-gradient grid lines at low opacity

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 | Component architecture, state, effects |
| **Build Tool** | Vite 8 | Dev server, HMR, production bundling |
| **3D Rendering** | Three.js + `@react-three/fiber` | WebGL canvas, texture plane |
| **3D Helpers** | `@react-three/drei` | R3F utilities |
| **Post-Processing** | `@react-three/postprocessing` | Bloom, Chromatic Aberration |
| **Animation** | GSAP + ScrollTrigger | Scroll-driven frame scrubbing, fade-outs |
| **Styling** | Tailwind CSS v4 | Utility classes via `@tailwindcss/vite` plugin |
| **Custom CSS** | Inline `<style>` + `index.css` | Glitch, scanlines, blink, glow effects |
| **Fonts** | Google Fonts | Rajdhani + Share Tech Mono |
| **Language** | JavaScript (ES Modules) | No TypeScript |

---

## 🏗️ Architecture

The most important architectural decision is the **separation between GSAP and Three.js**:

```
┌─────────────────────────────────────────────────────────┐
│                       App.jsx (React)                   │
│                                                         │
│  ┌──────────────────┐    writes to    ┌──────────────┐  │
│  │  GSAP ScrollTrig │ ─────────────► │  frameRef    │  │
│  │  (DOM layer)     │                │  (useRef)    │  │
│  └──────────────────┘                └──────┬───────┘  │
│                                             │           │
│  ┌──────────────────────────────────────────▼────────┐  │
│  │         @react-three/fiber Canvas (WebGL)         │  │
│  │                                                   │  │
│  │  TextureSequencer.useFrame() ──reads──► frameRef  │  │
│  │  ─► materialRef.current.map = textures[frame]    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Why this matters:** GSAP `ScrollTrigger` runs in the browser's DOM context and needs access to scroll events and element positions. The R3F Canvas runs in a completely isolated WebGL context. Putting GSAP inside the canvas component results in silent failures because ScrollTrigger cannot reliably attach to the DOM from within a WebGL render loop.

The solution is a **shared mutable ref** (`frameRef`) — GSAP writes a floating-point frame number to it on every scroll tick, and the Three.js `useFrame` hook reads it every animation frame to swap textures on the material.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── hacker/
│   │   ├── hacker_001.jpg          # Frame 1 of 70
│   │   ├── hacker_002.jpg
│   │   ├── ...
│   │   └── hacker_070.jpg          # Frame 70 of 70
│   ├── project_investiq.png        # AI-generated project thumbnail
│   ├── project_rift.png            # AI-generated project thumbnail
│   └── project_so_interior.png     # AI-generated project thumbnail
│
├── src/
│   ├── components/
│   │   └── TextureSequencer.jsx    # Three.js canvas: loads textures, reads frameRef
│   ├── App.jsx                     # Main app: GSAP, sections, all UI components
│   ├── index.css                   # Tailwind import + base body styles
│   └── main.jsx                    # React DOM entry point
│
├── index.html                      # Vite HTML entry
├── vite.config.js                  # Vite config with @tailwindcss/vite plugin
├── tailwind.config.js              # Tailwind content paths
├── package.json                    # Dependencies
├── LICENSE                         # Proprietary — All Rights Reserved
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9 or equivalent
- A modern browser with **WebGL support** (Chrome, Firefox, Edge, Safari 15+)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/priyanshupriyesh6/priyanshuPortfolio.git

# 2. Navigate into the project directory
cd priyanshuPortfolio

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

When `TextureSequencer` mounts, it creates a `THREE.TextureLoader` with a `LoadingManager` that reports progress (0–100%) back to `App.jsx` state. All 70 JPEG frames are fetched from `/hacker/hacker_001.jpg` → `/hacker/hacker_070.jpg` (served from the Vite `public/` directory for zero-fingerprinting URLs). The loading screen blocks the page until `loadedCount === 70`.

```js
// TextureSequencer.jsx
for (let i = 1; i <= 70; i++) {
  loader.load(`/hacker/hacker_${idx}.jpg`, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    bucket[i - 1] = tex;
    if (++done === 70) setTextures(bucket);
  });
}
```

### 2. GSAP ScrollTrigger (React Layer)

Once all 70 textures are in state, a `useEffect` in `App.jsx` sets up two GSAP ScrollTriggers scoped to `#hero-section`:

```js
// App.jsx — frame scrubber
gsap.to(obj, {
  f: 69,
  scrollTrigger: {
    trigger: '#hero-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
  },
  onUpdate: () => { frameRef.current = obj.f; },
});

// App.jsx — canvas fade-out
gsap.to(canvasRef.current, {
  opacity: 0,
  scrollTrigger: {
    trigger: '#hero-section',
    start: '80% top',
    end: 'bottom top',
    scrub: 0.5,
  },
});
```

### 3. Three.js Frame Rendering (WebGL Layer)

`TextureSequencer` uses `useFrame` (which runs every requestAnimationFrame tick at 60fps) to read `frameRef.current` and swap the material's texture map:

```js
// TextureSequencer.jsx
useFrame(() => {
  const frame = Math.min(69, Math.max(0, Math.floor(frameRef.current)));
  if (textures[frame] && materialRef.current.map !== textures[frame]) {
    materialRef.current.map = textures[frame];
    materialRef.current.needsUpdate = true;
  }
  // Cover-aspect scaling
  const imageAspect = 16 / 9;
  const vAspect = viewport.width / viewport.height;
  if (vAspect > imageAspect) {
    meshRef.current.scale.set(viewport.width, viewport.width / imageAspect, 1);
  } else {
    meshRef.current.scale.set(viewport.height * imageAspect, viewport.height, 1);
  }
});
```

### 4. Cover Aspect Ratio

The plane mesh is initialized with `args={[1, 1]}` (a unit square) and scaled every frame to ensure the frame images fill the viewport without distortion — equivalent to CSS `background-size: cover`.

---

## 📄 Sections

| # | Section | Height | Description |
|---|---|---|---|
| 1 | **Hero** | `500vh` | Full-screen intro with glitch name, terminal lines, scroll-driven 70-frame hacker sequence |
| 2 | **About Me** | `500vh` | Bio, four philosophy cards (Clean Code / UI-UX / Performance / Innovation), animated skill bars, tech stack tags |
| 3 | **Projects** | `500vh` | Six real GitHub project cards with thumbnails, tech tags, source and demo links |
| 4 | **Contact** | `500vh` | Email, GitHub, LinkedIn, phone grid + primary CTA button |

Each section is `500vh` tall with a `position: sticky` inner panel that keeps content visible during the scroll traversal. This provides the "runway" for GSAP animations without pinning entire sections.

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
| `three` | latest | 3D engine |
| `@react-three/fiber` | 8 | React renderer for Three.js |
| `@react-three/drei` | 9 | R3F helpers |
| `@react-three/postprocessing` | 2 | Bloom + ChromaticAberration |
| `gsap` | latest | ScrollTrigger animation |

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
| **Initial Load** | Loading screen blocks until 70 frames cached |
| **Frame Swap Cost** | `O(1)` — pointer reassignment only, no new allocations |
| **Scroll Overhead** | GSAP `scrub` uses `requestAnimationFrame` internally |
| **Canvas FPS** | 60fps via R3F's `useFrame` loop |
| **Texture Memory** | ~70 × ~500KB ≈ 35MB GPU VRAM (typical JPEG decode) |
| **Bundle Size** | ~1.2MB minified (Three.js + R3F dominant) |
| **Code Splitting** | Recommended for production via `rolldownOptions` |

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

</div>
