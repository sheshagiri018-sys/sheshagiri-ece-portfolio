import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { personal } from '../data/portfolio'

const semesterData = [
  { sem: 'Sem 1', gpa: 8.1 },
  { sem: 'Sem 2', gpa: 8.3 },
  { sem: 'Sem 3', gpa: 8.7 },
  { sem: 'Sem 4', gpa: 8.54 },
]

function CGPARing() {
  const ref = useRef(null)
  const circumference = 2 * Math.PI * 80
  const pct = (parseFloat(personal.cgpa) / 10) * 100

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { strokeDashoffset: circumference }, {
        strokeDashoffset: circumference - (circumference * pct) / 100,
        duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    })
    return () => ctx.revert()
  }, [circumference, pct])

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="cgpa-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="100%" stopColor="#FF6B2B" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
      <circle
        ref={ref}
        cx="100" cy="100" r="80" fill="none"
        stroke="url(#cgpa-grad)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={circumference}
        transform="rotate(-90 100 100)"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,184,0,0.5))' }}
      />
      <text x="100" y="95" textAnchor="middle" fontSize="38" fontFamily="Bebas Neue" fill="#FFB800">{personal.cgpa}</text>
      <text x="100" y="120" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="rgba(200,230,255,0.4)" letterSpacing="2">CGPA / 10</text>
    </svg>
  )
}

export default function Academics() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.academics-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.academics-label', start: 'top 85%', once: true } })
      gsap.from('.academics-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.academics-title', start: 'top 80%', once: true } })
      gsap.from('.sem-bar', { scaleY: 0, transformOrigin: 'bottom', stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.sem-chart', start: 'top 80%', once: true } })
      gsap.from('.stat-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.8, scrollTrigger: { trigger: '.stat-grid', start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const maxGpa = 10

  return (
    <section id="academics" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#0A0800 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 40%, rgba(255,184,0,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="academics-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-gold/70 uppercase">Intelligence Dashboard</span>
          <span className="h-px flex-1 max-w-24 bg-gold/20" />
        </div>

        <div className="academics-title mb-14">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(255,184,0,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Academic', 'Performance'].map((w, i) => <span key={i} className="academics-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center">
            <CGPARing />
          </div>

          <div>
            <h3 className="font-syne font-700 text-white text-lg mb-6">Semester Progress</h3>
            <div className="sem-chart flex items-end gap-4 h-48 mb-3">
              {semesterData.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                  <span className="font-mono-ece text-xs text-gold">{s.gpa}</span>
                  <div
                    className="sem-bar w-full rounded-t-md"
                    style={{
                      height: `${(s.gpa / maxGpa) * 100}%`,
                      background: 'linear-gradient(180deg, #FFB800, #FF6B2B)',
                      boxShadow: '0 0 15px rgba(255,184,0,0.3)',
                    }}
                  />
                  <span className="font-mono-ece text-[10px] text-stellar/40">{s.sem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-grid grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: 'Current CGPA', value: personal.cgpa, color: '#FFB800' },
            { label: 'Department Rank', value: 'Top 10', color: '#00FF88' },
            { label: 'Excellence Awards', value: '2', color: '#00B8FF' },
            { label: 'Academic Trend', value: '↑ Growth', color: '#7B2FFF' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="stat-card text-center p-6 rounded-xl"
              style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
              whileHover={{ y: -4, boxShadow: `0 20px 40px ${s.color}15` }}
            >
              <div className="font-bebas text-3xl mb-1" style={{ color: s.color, textShadow: `0 0 20px ${s.color}50` }}>{s.value}</div>
              <div className="font-mono-ece text-[10px] text-stellar/40 tracking-widest uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
