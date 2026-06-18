import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { personal, languages } from '../data/portfolio'

const identityFields = [
  { label: 'Full Name', value: personal.name, icon: '◈', color: '#00B8FF' },
  { label: 'Phone', value: personal.phone, icon: '◉', color: '#00FF88' },
  { label: 'Email', value: personal.email, icon: '◎', color: '#7B2FFF' },
  { label: 'Location', value: personal.location, icon: '⬡', color: '#FFB800' },
  { label: 'Admission No.', value: personal.admissionNo, icon: '⬟', color: '#00FFF7' },
  { label: 'Address', value: personal.address, icon: '◇', color: '#FF6B2B' },
]

export default function PersonalInfo() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.identity-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.identity-label', start: 'top 85%', once: true },
      })
      gsap.from('.identity-title-word', {
        opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.identity-title', start: 'top 80%', once: true },
      })
      gsap.from('.identity-card', {
        opacity: 0, y: 40, stagger: 0.08, duration: 0.7,
        scrollTrigger: { trigger: '.identity-grid', start: 'top 75%', once: true },
      })
      gsap.from('.lang-bar', {
        scaleX: 0, transformOrigin: 'left', stagger: 0.15, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.lang-section', start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="identity" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#050018 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 40%, rgba(123,47,255,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="identity-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-aurora/70 uppercase">Digital Identity Panel</span>
          <span className="h-px flex-1 max-w-24 bg-aurora/20" />
        </div>

        <div className="identity-title mb-16">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(123,47,255,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Personal', 'Information'].map((w, i) => <span key={i} className="identity-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Identity cards */}
          <div className="identity-grid lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {identityFields.map((f, i) => (
              <motion.div
                key={i}
                className="identity-card holo relative overflow-hidden p-5 rounded-xl"
                style={{ background: `${f.color}06`, border: `1px solid ${f.color}20` }}
                whileHover={{ scale: 1.02, borderColor: `${f.color}50`, boxShadow: `0 0 30px ${f.color}15` }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: f.color }}>{f.icon}</span>
                  <span className="font-mono-ece text-[10px] tracking-widest opacity-50" style={{ color: f.color }}>{f.label}</span>
                </div>
                <div className="font-syne font-600 text-white text-sm break-words">{f.value}</div>

                {/* corner brackets */}
                <div className="absolute top-2 right-2 w-2.5 h-2.5" style={{ borderTop: `1px solid ${f.color}50`, borderRight: `1px solid ${f.color}50` }} />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5" style={{ borderBottom: `1px solid ${f.color}50`, borderLeft: `1px solid ${f.color}50` }} />
              </motion.div>
            ))}
          </div>

          {/* Languages panel */}
          <div className="lang-section p-6 rounded-2xl" style={{ background: 'rgba(0,184,255,0.04)', border: '1px solid rgba(0,184,255,0.15)' }}>
            <h3 className="font-syne font-700 text-white text-base mb-6 flex items-center gap-2">
              <span className="text-electric">◷</span> Languages
            </h3>
            <div className="space-y-5">
              {languages.map((l, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-syne font-600 text-stellar text-sm">{l.lang}</span>
                    <span className="font-mono-ece text-[10px] text-stellar/40">{l.level}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="lang-bar h-full rounded-full"
                      style={{ width: `${l.percent}%`, background: 'linear-gradient(90deg,#00B8FF,#7B2FFF)', boxShadow: '0 0 10px rgba(0,184,255,0.4)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="font-mono-ece text-[10px] text-stellar/30 tracking-widest mb-1">STATUS</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse-glow" style={{ boxShadow: '0 0 10px #00FF88' }} />
                <span className="font-syne text-signal text-sm">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
