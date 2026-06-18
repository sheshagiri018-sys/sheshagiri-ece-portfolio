# Sheshagiri R B — ECE Engineer Portfolio

> *"Building the bridge between hardware, software, and innovation."*

A futuristic, cinematic digital identity system for an Electronics and Communication Engineering student — built with the same visual DNA as the "A Day in 2050" storytelling experience.

🌐 **Live Site:** `https://sheshagiri018-sys.github.io/sheshagiri-ece-portfolio/` (after deployment)

---

## ✦ About

This is not a typical student portfolio. It's a scroll-driven, signal-themed digital identity system that presents Sheshagiri's academic journey, technical skills, projects, certifications, and achievements as an immersive, futuristic experience — inspired by Apple, Tesla, and SpaceX product sites.

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| 3D Graphics | Three.js (particle galaxy in Hero) |
| Scroll Animation | GSAP 3 + ScrollTrigger |
| UI Animation | Framer Motion |
| Smooth Scroll | @studio-freight/lenis |
| Deployment | GitHub Actions → GitHub Pages |

---

## ✦ Sections

| Section | Highlights |
|---------|-----------|
| **Hero** | Three.js particle galaxy, signal-wave intro, GSAP text reveal |
| **About Me** | Scroll-triggered storytelling cards |
| **Personal Information** | Holographic identity panel with hover glow |
| **Skills — Command Center** | Animated circular progress rings + soft skill bars |
| **Project Showcase — Innovation Missions** | Expandable mission cards with full project detail modals |
| **Academic Performance — Intelligence Dashboard** | CGPA progress ring, semester bar chart |
| **Signal Timeline** | Cinematic vertical timeline with glowing scroll-triggered nodes |
| **Certifications Hub** | Real certificate images with lightbox viewer (9 certificates) |
| **Extra Activities — Innovation Zone** | Hackathons, workshops, future goals |
| **Connect / Find Me** | Magnetic social link cards (GitHub, LinkedIn, LeetCode, HackerRank) |

---

## ✦ Premium Effects

- 🖱️ Custom magnetic cursor
- 🌀 "Signal Calibration" animated loading screen
- 📊 Gradient scroll progress bar
- 🌌 Three.js particle galaxy with mouse-reactive camera
- 🧬 Holographic glassmorphism panels
- 🔗 Magnetic button hover effects
- 📈 Scroll-triggered circular progress rings and bar charts
- 🖼️ Real certificate gallery with full-resolution lightbox

---

## ✦ Getting Started

```bash
npm install
npm run dev
# → http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

---

## ✦ Deployment — GitHub Actions

This repo auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

**One-time setup:**
1. Repo → **Settings** → **Pages**
2. **Source** → select **"GitHub Actions"**
3. Save

Every push to `main` will then build and deploy automatically.

---

## ✦ Project Structure

```
sheshagiri-ece-portfolio/
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   ├── resume-preview.jpg
│   └── certificates/
│       ├── sona-2026.jpg
│       ├── sona-2025.jpg
│       ├── nasscom-digital101.jpg
│       ├── nasscom-digapp.jpg
│       ├── nasscom-dataproc.jpg
│       ├── nasscom-acquiring.jpg
│       ├── enthu-iot.jpg
│       └── vit-bluetooth.jpg
├── src/
│   ├── components/
│   │   ├── Loader.jsx
│   │   ├── Navigation.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── PersonalInfo.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Academics.jsx
│   │   ├── Timeline.jsx
│   │   ├── Certifications.jsx
│   │   ├── Activities.jsx
│   │   └── Connect.jsx
│   ├── data/
│   │   └── portfolio.js       ← all personal data, projects, certs
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## ✦ Editing Your Data

Almost everything — name, skills, projects, certifications, timeline, social links — lives in one file:

```
src/data/portfolio.js
```

Edit values there and the entire site updates automatically.

---

## ✦ License

MIT — built for academic and professional showcase.

---

*Sheshagiri R B · Electronics and Communication Engineering · Sona College of Technology*
