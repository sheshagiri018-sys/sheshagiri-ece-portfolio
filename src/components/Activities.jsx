import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { activities } from '../data/portfolio'

export default function Activities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.activities-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.activities-label', start: 'top 85%', once: true } })
      gsap.from('.activities-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.activities-title', start: 'top 80%', once: true } })
      gsap.from('.activity-card', { opacity: 0, y: 50, scale: 0.96, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.activity-grid', start: 'top 75%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="activities" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#000F08 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,255,136,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="activities-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-signal/70 uppercase">Innovation Zone</span>
          <span className="h-px flex-1 max-w-24 bg-signal/20" />
        </div>

        <div className="activities-title mb-14">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(0,255,136,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Extra', 'Activities'].map((w, i) => <span key={i} className="activities-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <div className="activity-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              className="activity-card relative p-6 rounded-2xl overflow-hidden"
              style={{ background: `${a.color}07`, border: `1px solid ${a.color}20` }}
              whileHover={{ y: -6, boxShadow: `0 25px 50px ${a.color}18` }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl" style={{ color: a.color, textShadow: `0 0 15px ${a.color}` }}>{a.icon}</span>
                <span className="font-mono-ece text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${a.color}18`, color: a.color }}>{a.year}</span>
              </div>
              <div className="font-mono-ece text-[10px] tracking-widest opacity-60 mb-2" style={{ color: a.color }}>{a.category}</div>
              <h3 className="font-syne font-700 text-white text-base mb-2">{a.title}</h3>
              <p className="font-syne text-stellar/45 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Future goals strip */}
        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)' }}>
          <h3 className="font-syne font-700 text-white text-lg mb-3">Looking Ahead</h3>
          <p className="font-syne text-stellar/50 text-sm max-w-2xl mx-auto leading-relaxed">
            My goal is to deepen expertise in AI-integrated embedded systems, contribute to open-source IoT projects,
            and build solutions where electronics, communication, and intelligence genuinely overlap —
            not as buzzwords, but as engineering practice.
          </p>
        </div>
      </div>
    </section>
  )
}
