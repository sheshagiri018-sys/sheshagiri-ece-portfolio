import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'

function MissionCard({ project, index, onExpand }) {
  return (
    <motion.div
      className="mission-card relative overflow-hidden rounded-2xl p-7 cursor-pointer group"
      style={{ background: `${project.color}06`, border: `1px solid ${project.color}20` }}
      whileHover={{ y: -6, borderColor: `${project.color}50`, boxShadow: `0 25px 60px ${project.color}15` }}
      transition={{ duration: 0.3 }}
      onClick={() => onExpand(project)}
      data-cursor
    >
      <div className="absolute top-0 right-0 font-bebas text-7xl opacity-[0.04] pr-3 pt-1 pointer-events-none" style={{ color: project.color }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="flex items-center justify-between mb-5">
        <span className="font-mono-ece text-[10px] tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${project.color}18`, color: project.color }}>
          {project.code}
        </span>
        <span className="text-2xl" style={{ color: project.color, textShadow: `0 0 15px ${project.color}` }}>{project.icon}</span>
      </div>

      <h3 className="font-syne font-700 text-white text-xl mb-2">{project.title}</h3>
      <p className="font-syne text-stellar/45 text-sm mb-5">{project.subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.slice(0, 3).map((s, i) => (
          <span key={i} className="font-mono-ece text-[10px] px-2 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(200,230,255,0.5)' }}>{s}</span>
        ))}
        {project.stack.length > 3 && <span className="font-mono-ece text-[10px] px-2 py-1 text-stellar/30">+{project.stack.length - 3}</span>}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="font-mono-ece text-[10px]" style={{ color: project.color }}>{project.status}</span>
        <span className="font-syne text-xs text-stellar/40 group-hover:text-white transition-colors">View Mission →</span>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
    </motion.div>
  )
}

function MissionModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-8"
          style={{ background: '#050810', border: `1px solid ${project.color}30` }}
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-5 right-5 text-stellar/40 hover:text-white text-xl" data-cursor>✕</button>

          <span className="font-mono-ece text-[10px] tracking-widest px-3 py-1 rounded-full" style={{ background: `${project.color}18`, color: project.color }}>{project.code} · {project.event}</span>

          <h2 className="font-syne font-800 text-white text-2xl md:text-3xl mt-5 mb-2">{project.title}</h2>
          <p className="font-syne text-stellar/50 text-sm mb-6">{project.subtitle}</p>

          <div className="mb-6">
            <h4 className="font-mono-ece text-[10px] tracking-widest mb-2" style={{ color: project.color }}>PROBLEM STATEMENT</h4>
            <p className="font-syne text-stellar/60 text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-mono-ece text-[10px] tracking-widest mb-2" style={{ color: project.color }}>SOLUTION</h4>
            <p className="font-syne text-stellar/60 text-sm leading-relaxed">{project.solution}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-mono-ece text-[10px] tracking-widest mb-3" style={{ color: project.color }}>TECH STACK</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s, i) => (
                <span key={i} className="font-mono-ece text-xs px-3 py-1.5 rounded-full" style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-mono-ece text-[10px] tracking-widest mb-3" style={{ color: project.color }}>KEY OBJECTIVES</h4>
            <ul className="space-y-2">
              {project.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 font-syne text-stellar/55 text-sm">
                  <span style={{ color: project.color }}>▸</span> {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/10">
            <span className="font-mono-ece text-xs" style={{ color: project.color }}>{project.status}</span>
            <span className="font-mono-ece text-[10px] text-stellar/25">GitHub / Demo — coming soon</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.projects-label', start: 'top 85%', once: true } })
      gsap.from('.projects-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.projects-title', start: 'top 80%', once: true } })
      gsap.from('.mission-card', { opacity: 0, y: 60, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.mission-grid', start: 'top 75%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#0A0500 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(255,184,0,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="projects-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-gold/70 uppercase">Innovation Missions</span>
          <span className="h-px flex-1 max-w-24 bg-gold/20" />
        </div>

        <div className="projects-title mb-4">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(255,184,0,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Project', 'Showcase'].map((w, i) => <span key={i} className="projects-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-14 leading-relaxed">
          Each project is a mission — a problem identified, a solution engineered.
        </p>

        <div className="mission-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => <MissionCard key={p.id} project={p} index={i} onExpand={setSelected} />)}
        </div>
      </div>

      <MissionModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
