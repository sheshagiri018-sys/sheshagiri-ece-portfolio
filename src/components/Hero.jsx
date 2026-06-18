import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { personal } from '../data/portfolio'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const roleRef = useRef(null)
  const taglineRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const W = window.innerWidth
    const H = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1500)
    camera.position.z = 120

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Particle galaxy (signal network style) ──────────
    const TOTAL = 9000
    const BRANCHES = 5
    const SPIN = 1.6
    const RANDOMNESS = 0.4
    const RAND_POWER = 3
    const INNER = new THREE.Color('#00B8FF')
    const OUTER = new THREE.Color('#7B2FFF')

    const positions = new Float32Array(TOTAL * 3)
    const colors = new Float32Array(TOTAL * 3)

    for (let i = 0; i < TOTAL; i++) {
      const i3 = i * 3
      const radius = Math.random() * 200
      const spinAngle = radius * SPIN
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2

      const rx = Math.pow(Math.random(), RAND_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius
      const ry = Math.pow(Math.random(), RAND_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius * 0.3
      const rz = Math.pow(Math.random(), RAND_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius

      positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz

      const mixed = INNER.clone().lerp(OUTER, radius / 200)
      colors[i3] = mixed.r; colors[i3+1] = mixed.g; colors[i3+2] = mixed.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: 0.45, sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0,
    })
    const galaxy = new THREE.Points(geometry, material)
    scene.add(galaxy)

    // ── Background stars ──────────────────────────────────
    const STARS = 2500
    const sPos = new Float32Array(STARS * 3)
    const sCol = new Float32Array(STARS * 3)
    for (let i = 0; i < STARS; i++) {
      const i3 = i * 3
      sPos[i3]   = (Math.random() - 0.5) * 1000
      sPos[i3+1] = (Math.random() - 0.5) * 600
      sPos[i3+2] = (Math.random() - 0.5) * 600 - 200
      const b = 0.6 + Math.random() * 0.4
      sCol[i3] = b; sCol[i3+1] = b; sCol[i3+2] = b + 0.2
    }
    const starGeom = new THREE.BufferGeometry()
    starGeom.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    starGeom.setAttribute('color', new THREE.BufferAttribute(sCol, 3))
    const starMat = new THREE.PointsMaterial({ size: 0.25, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0 })
    const stars = new THREE.Points(starGeom, starMat)
    scene.add(stars)

    // ── Floating circuit nodes (small glowing icosahedrons) ──
    const nodeGroup = new THREE.Group()
    const nodePositions = []
    for (let i = 0; i < 14; i++) {
      const geo = new THREE.IcosahedronGeometry(1.2 + Math.random() * 1, 0)
      const mat = new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0x00FFF7 : i % 3 === 1 ? 0x7B2FFF : 0x00B8FF, transparent: true, opacity: 0 })
      const node = new THREE.Mesh(geo, mat)
      const angle = Math.random() * Math.PI * 2
      const r = 40 + Math.random() * 60
      node.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 40, Math.sin(angle) * r - 20)
      nodeGroup.add(node)
      nodePositions.push({ node, baseY: node.position.y, speed: 0.3 + Math.random() * 0.5, offset: Math.random() * 10 })
    }
    scene.add(nodeGroup)

    // ── Mouse tracking ───────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let rafId
    const clock = new THREE.Clock()
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      galaxy.rotation.y = t * 0.035
      galaxy.rotation.x = Math.sin(t * 0.08) * 0.05
      stars.rotation.y = t * 0.005

      nodePositions.forEach(({ node, baseY, speed, offset }) => {
        node.position.y = baseY + Math.sin(t * speed + offset) * 3
        node.rotation.x = t * speed * 0.5
        node.rotation.y = t * speed * 0.3
      })

      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.025
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.025
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // ── Intro timeline ────────────────────────────────────
    const nameLetters = titleRef.current.querySelectorAll('.letter')
    gsap.set(nameLetters, { opacity: 0, y: 80, rotationX: -45 })
    gsap.set([roleRef.current, taglineRef.current], { opacity: 0, y: 20 })
    gsap.set(ctaRef.current, { opacity: 0, y: 20 })
    gsap.set(scrollRef.current, { opacity: 0 })
    gsap.set(badgeRef.current, { opacity: 0, y: -10 })

    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(starMat, { opacity: 0.8, duration: 2.2, ease: 'power2.out' })
      .to(material, { opacity: 0.9, duration: 2.2, ease: 'power2.out' }, '-=1.8')
      .to(nodePositions.map(n => n.node.material), { opacity: 0.85, duration: 1.5, stagger: 0.05 }, '-=1.5')
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=1')
      .to(nameLetters, { opacity: 1, y: 0, rotationX: 0, duration: 0.9, stagger: 0.04, ease: 'back.out(1.3)' }, '-=0.4')
      .to(roleRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.2')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(scrollRef.current, { opacity: 1, duration: 0.8 }, '-=0.2')

    gsap.to(containerRef.current, {
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      y: -120, opacity: 0.3,
    })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose(); material.dispose()
      starGeom.dispose(); starMat.dispose()
    }
  }, [])

  const splitText = (text) =>
    text.split('').map((c, i) => (
      <span key={i} className="letter inline-block" style={{ perspective: '400px' }}>
        {c === ' ' ? '\u00A0' : c}
      </span>
    ))

  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-void">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <div ref={badgeRef} className="flex items-center gap-3 mb-7">
          <span className="h-px w-10 bg-electric/50" />
          <span className="font-mono-ece text-[11px] tracking-[0.35em] text-electric uppercase">Transmission: ECE Journey</span>
          <span className="h-px w-10 bg-electric/50" />
        </div>

        <h1 ref={titleRef} className="font-bebas text-white leading-none mb-3" style={{ fontSize: 'clamp(3.2rem, 11vw, 9rem)', letterSpacing: '-0.01em', textShadow: '0 0 60px rgba(0,184,255,0.18)' }}>
          {splitText(personal.name)}
        </h1>

        <p ref={roleRef} className="font-syne text-stellar/70 text-lg md:text-2xl mb-5 tracking-wide">
          {personal.title}
        </p>

        <p ref={taglineRef} className="font-syne text-stellar/45 text-base md:text-lg max-w-xl leading-relaxed mb-10 italic">
          "{personal.tagline}"
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={scrollToAbout} data-cursor className="px-7 py-3 rounded-full font-syne font-700 text-sm text-black bg-electric hover:bg-plasma transition-colors duration-300" style={{ boxShadow: '0 0 30px rgba(0,184,255,0.4)' }}>
            Explore Journey
          </button>
          <a href="/resume-preview.jpg" target="_blank" rel="noopener noreferrer" data-cursor className="px-7 py-3 rounded-full font-syne font-700 text-sm text-electric border border-electric/40 hover:border-electric transition-colors duration-300">
            View Resume
          </a>
          <a href="#connect" data-cursor onClick={(e) => { e.preventDefault(); document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }) }} className="px-7 py-3 rounded-full font-syne font-700 text-sm text-stellar/70 border border-white/15 hover:border-white/40 transition-colors duration-300">
            Contact Me
          </a>
        </div>

        <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono-ece text-[10px] tracking-widest text-stellar/40 uppercase">Scroll</span>
          <div className="relative w-px h-14 bg-stellar/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full" style={{ height: '40%', background: 'var(--electric)', animation: 'scan 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(0,184,255,0.8)' }} />
          </div>
        </div>
      </div>

      <div className="absolute top-6 left-6 z-10 hidden md:block">
        <div className="font-mono-ece text-[10px] text-electric/40 tracking-widest">LOC: SALEM, TAMIL NADU, IN</div>
        <div className="font-mono-ece text-[10px] text-stellar/20 tracking-widest mt-1">SYS: SIGNAL_PROTOCOL_ENGAGED</div>
      </div>
      <div className="absolute top-6 right-6 md:right-16 z-10 text-right hidden md:block">
        <div className="font-mono-ece text-[10px] text-stellar/20 tracking-widest">⬡ ECE · {personal.collegeshort}</div>
      </div>
    </section>
  )
}
