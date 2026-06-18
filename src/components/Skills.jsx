import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { technicalSkills, softSkills } from '../data/portfolio'

function SkillRing({ skill }) {
  const circumference = 2 * Math.PI * 32
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, {
        strokeDashoffset: circumference,
      }, {
        strokeDashoffset: circumference - (circumference * skill.level) / 100,
        duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    })
    return () => ctx.revert()
  }, [skill.level, circumference])

  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-xl"
      whileHover={{ y: -4, background: `${skill.color}08` }}
      transition={{ duration: 0.25 }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle
          ref={ref}
          cx="40" cy="40" r="32" fill="none"
          stroke={skill.color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 40 40)"
          style={{ filter: `drop-shadow(0 0 6px ${skill.color}80)` }}
        />
        <text x="40" y="45" textAnchor="middle" fontSize="14" fontFamily="JetBrains Mono" fill={skill.color} fontWeight="600">
          {skill.level}
        </text>
      </svg>
      <div className="font-syne font-600 text-white text-xs text-center mt-2">{skill.name}</div>
      <div className="font-mono-ece text-[9px] text-stellar/30 tracking-wide mt-0.5">{skill.category}</div>
    </motion.div>
  )
}

function SoftSkillNode({ skill, index }) {
  return (
    <motion.div
      className="relative flex items-center gap-3 p-4 rounded-xl group"
      style={{ background: 'rgba(0,184,255,0.04)', border: '1px solid rgba(0,184,255,0.12)' }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(0,184,255,0.4)', boxShadow: '0 0 25px rgba(0,184,255,0.15)' }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-electric text-base" style={{ background: 'rgba(0,184,255,0.1)', border: '1px solid rgba(0,184,255,0.2)' }}>
        {skill.icon}
      </div>
      <div className="flex-1">
        <div className="font-syne font-600 text-white text-sm mb-1">{skill.name}</div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-electric"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
            style={{ boxShadow: '0 0 8px rgba(0,184,255,0.5)' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(technicalSkills.map(s => s.category))]
  const filtered = filter === 'All' ? technicalSkills : technicalSkills.filter(s => s.category === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.skills-label', start: 'top 85%', once: true } })
      gsap.from('.skills-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.skills-title', start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#001018 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,247,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="skills-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-plasma/70 uppercase">ECE Command Center</span>
          <span className="h-px flex-1 max-w-24 bg-plasma/20" />
        </div>

        <div className="skills-title mb-4">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(0,255,247,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Skills', '&', 'Knowledge'].map((w, i) => <span key={i} className="skills-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-12 leading-relaxed">
          A growing toolkit spanning hardware, software, and the systems that connect them.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-cursor
              className={`px-4 py-1.5 rounded-full font-mono-ece text-xs tracking-wide transition-all duration-300 ${
                filter === c ? 'bg-electric text-black' : 'text-stellar/50 border border-white/10 hover:border-electric/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Technical skill rings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-20">
          {filtered.map((s, i) => <SkillRing key={s.name} skill={s} />)}
        </div>

        {/* Soft skills */}
        <h3 className="font-syne font-700 text-white text-xl mb-6">Soft Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {softSkills.map((s, i) => <SoftSkillNode key={s.name} skill={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
