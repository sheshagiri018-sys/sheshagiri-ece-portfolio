import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { timeline } from '../data/portfolio'

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.timeline-label', start: 'top 85%', once: true } })
      gsap.from('.timeline-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.timeline-title', start: 'top 80%', once: true } })

      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, transformOrigin: 'top',
        scrollTrigger: { trigger: '.timeline-track', start: 'top 70%', end: 'bottom 60%', scrub: 1 },
      })

      gsap.from('.timeline-node-item', {
        opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline-track', start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" ref={sectionRef} className="section-base py-32 px-6 md:px-16 overflow-hidden" style={{ background: 'linear-gradient(180deg,#000000 0%,#000A14 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,184,255,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="timeline-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-electric/70 uppercase">Signal Timeline</span>
          <span className="h-px flex-1 max-w-24 bg-electric/20" />
        </div>

        <div className="timeline-title mb-16">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(0,184,255,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['My', 'Journey'].map((w, i) => <span key={i} className="timeline-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <div className="timeline-track relative">
          {/* Center line */}
          <div ref={lineRef} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ background: 'linear-gradient(180deg, transparent 0%, #00B8FF 10%, #7B2FFF 90%, transparent 100%)' }} />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} className={`timeline-node-item relative flex mb-10 md:mb-12 pl-12 md:pl-0 ${isLeft ? 'md:justify-start md:pr-[52%]' : 'md:justify-end md:pl-[52%]'}`}>
                <motion.div
                  className="relative max-w-md w-full p-5 rounded-xl"
                  style={{ background: `${item.color}07`, border: `1px solid ${item.color}25` }}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${item.color}15` }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg" style={{ color: item.color, textShadow: `0 0 12px ${item.color}` }}>{item.icon}</span>
                    <span className="font-bebas text-xl" style={{ color: item.color }}>{item.year}</span>
                  </div>
                  <h3 className="font-syne font-700 text-white text-sm mb-2">{item.title}</h3>
                  <p className="font-syne text-stellar/50 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>

                {/* Node dot on the line */}
                <div
                  className="absolute top-5 left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-10"
                  style={{ background: item.color, boxShadow: `0 0 15px ${item.color}`, animation: 'signalPulse 2.5s infinite' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
