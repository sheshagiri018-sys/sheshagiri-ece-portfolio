import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { personal, social } from '../data/portfolio'

const links = [
  { name: 'GitHub', url: social.github, icon: '⌥', color: '#FFFFFF', desc: 'Code & repositories' },
  { name: 'LinkedIn', url: social.linkedin, icon: '◈', color: '#00B8FF', desc: 'Professional network' },
  { name: 'LeetCode', url: social.leetcode, icon: '◉', color: '#FFB800', desc: 'Problem solving' },
  { name: 'HackerRank', url: social.hackerrank, icon: '⬡', color: '#00FF88', desc: 'Coding challenges' },
]

function MagneticLink({ link }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' })
  }
  const handleLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' })

  return (
    <motion.a
      ref={ref}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="connect-link relative flex flex-col items-center justify-center p-8 rounded-2xl group"
      style={{ background: `${link.color}08`, border: `1px solid ${link.color}25` }}
      whileHover={{ borderColor: `${link.color}60`, boxShadow: `0 0 40px ${link.color}25` }}
    >
      <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: link.color, textShadow: `0 0 20px ${link.color}` }}>
        {link.icon}
      </div>
      <div className="font-syne font-700 text-white text-base mb-1">{link.name}</div>
      <div className="font-mono-ece text-[10px] text-stellar/35 tracking-wide">{link.desc}</div>

      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ background: link.color, boxShadow: `0 0 8px ${link.color}`, animation: 'pulseGlow 2s infinite' }} />
    </motion.a>
  )
}

export default function Connect() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.connect-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.connect-label', start: 'top 85%', once: true } })
      gsap.from('.connect-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.connect-title', start: 'top 80%', once: true } })
      gsap.from('.connect-link', { opacity: 0, y: 50, scale: 0.9, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.connect-grid', start: 'top 75%', once: true } })
      gsap.from('.connect-contact', { opacity: 0, y: 30, duration: 1, scrollTrigger: { trigger: '.connect-contact', start: 'top 85%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="connect" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#000510 60%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,184,255,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="connect-label flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-electric/30" />
          <span className="font-mono-ece text-xs tracking-widest text-electric/70 uppercase">Network Hub</span>
          <span className="h-px w-12 bg-electric/30" />
        </div>

        <div className="connect-title mb-6">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(0,184,255,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Find', 'Me'].map((w, i) => <span key={i} className="connect-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mx-auto mb-16 leading-relaxed">
          Let's connect, collaborate, or just talk about what's next in electronics and engineering.
        </p>

        <div className="connect-grid grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {links.map((l) => <MagneticLink key={l.name} link={l} />)}
        </div>

        <div className="connect-contact flex flex-col items-center gap-4 p-8 rounded-2xl" style={{ background: 'rgba(0,184,255,0.04)', border: '1px solid rgba(0,184,255,0.15)' }}>
          <div className="font-mono-ece text-[10px] text-stellar/30 tracking-widest uppercase">Direct Channel</div>
          <a href={`mailto:${personal.email}`} data-cursor className="font-syne font-700 text-xl text-electric hover:text-plasma transition-colors">
            {personal.email}
          </a>
          <a href={`tel:${personal.phone.replace(/\s/g, '')}`} data-cursor className="font-mono-ece text-sm text-stellar/50 hover:text-white transition-colors">
            {personal.phone}
          </a>
        </div>

        <div className="mt-16 font-mono-ece text-[10px] text-stellar/20 tracking-widest">
          © 2026 SHESHAGIRI R B — ECE ENGINEER · SONA COLLEGE OF TECHNOLOGY
        </div>
      </div>
    </section>
  )
}
