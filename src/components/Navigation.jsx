import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const sections = [
  { id: 'hero', label: 'Origin' },
  { id: 'about', label: 'About' },
  { id: 'identity', label: 'Identity' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Missions' },
  { id: 'academics', label: 'Academics' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'certifications', label: 'Certs' },
  { id: 'activities', label: 'Activity' },
  { id: 'connect', label: 'Connect' },
]

export default function Navigation() {
  const navRef = useRef(null)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(navRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
    }, 3000)

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.3 }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })

    return () => {
      clearTimeout(timer)
      sections.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) obs.unobserve(el)
      })
    }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0, transform: 'translateX(20px)' }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[8000] hidden md:flex flex-col items-end gap-2"
    >
      <div className="mb-3 font-orbitron text-[10px] tracking-widest text-electric opacity-70">SRB</div>
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          data-cursor
          className="group flex items-center gap-3"
          aria-label={`Go to ${s.label}`}
        >
          <span className={`font-mono-ece text-[10px] tracking-widest transition-all duration-300 ${active === s.id ? 'text-electric opacity-100' : 'text-stellar opacity-0 group-hover:opacity-60'}`}>
            {s.label}
          </span>
          <span className={`block h-px transition-all duration-300 ${active === s.id ? 'w-7 bg-electric shadow-[0_0_8px_rgba(0,184,255,0.8)]' : 'w-3 bg-stellar/30 group-hover:w-5 group-hover:bg-stellar/60'}`} />
        </button>
      ))}
    </nav>
  )
}
