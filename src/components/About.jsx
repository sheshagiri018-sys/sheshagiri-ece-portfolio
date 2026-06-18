import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { personal } from '../data/portfolio'

const storyCards = [
  {
    phase: 'The Spark',
    title: 'Where Curiosity Began',
    body: 'Long before I knew the term "Electronics and Communication Engineering," I was the kid who took apart radios just to see how the sound got inside. That curiosity never left — it just found better tools.',
    icon: '◈',
    color: '#00B8FF',
  },
  {
    phase: 'The Foundation',
    title: 'Joining Sona College of Technology',
    body: `In 2024, I enrolled in the ECE program at ${personal.college}. What started as coursework in circuits and signals quickly became a genuine passion for how information travels — from a single transistor to a satellite link.`,
    icon: '⬡',
    color: '#7B2FFF',
  },
  {
    phase: 'The Proof',
    title: `CGPA ${personal.cgpa} — Consistency Over Hype`,
    body: 'Grades were never the goal — understanding was. But consistency showed up anyway: a CGPA of 8.54 and back-to-back Academic Excellence Awards in my department.',
    icon: '★',
    color: '#FFB800',
  },
  {
    phase: 'The Vision',
    title: 'IoT, Embedded Systems & What Comes Next',
    body: 'My focus now is the intersection of hardware and intelligence — IoT systems, embedded design, and signal communication. I want to build things that don\'t just compute, but sense, respond, and connect.',
    icon: '◉',
    color: '#00FFF7',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.about-label', start: 'top 85%', once: true },
      })
      gsap.from('.about-title-word', {
        opacity: 0, y: 50, rotationX: -30, stagger: 0.08, duration: 0.9, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.about-title', start: 'top 80%', once: true },
      })
      gsap.from('.about-card', {
        opacity: 0, y: 60, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 75%', once: true },
      })
      gsap.from('.about-line', {
        scaleX: 0, transformOrigin: 'left', duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-line', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#000814 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,184,255,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="about-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-electric/70 uppercase">Signal // About</span>
          <span className="h-px flex-1 max-w-24 bg-electric/20" />
        </div>

        <div className="about-title mb-4">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(0,184,255,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['My', 'Story'].map((w, i) => <span key={i} className="about-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <div className="about-line h-px w-32 bg-electric/40 mb-16" />

        <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {storyCards.map((card, i) => (
            <motion.div
              key={i}
              className="about-card relative overflow-hidden rounded-2xl p-7"
              style={{ background: `${card.color}07`, border: `1px solid ${card.color}20` }}
              whileHover={{ y: -5, borderColor: `${card.color}45`, boxShadow: `0 20px 50px ${card.color}12` }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono-ece text-[10px] tracking-widest opacity-60" style={{ color: card.color }}>{card.phase}</span>
                <span className="text-xl" style={{ color: card.color, textShadow: `0 0 15px ${card.color}` }}>{card.icon}</span>
              </div>
              <h3 className="font-syne font-700 text-white text-lg mb-3">{card.title}</h3>
              <p className="font-syne text-stellar/55 text-sm leading-relaxed">{card.body}</p>

              <div className="absolute bottom-0 left-0 h-px w-full" style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Quick fact strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {[
            { label: 'CGPA', value: personal.cgpa, color: '#FFB800' },
            { label: 'Degree Period', value: '2024–28', color: '#00B8FF' },
            { label: 'Department', value: 'ECE', color: '#7B2FFF' },
            { label: 'Awards', value: '2× Excellence', color: '#00FF88' },
          ].map((f, i) => (
            <div key={i} className="text-center p-4 rounded-xl" style={{ background: `${f.color}08`, border: `1px solid ${f.color}18` }}>
              <div className="font-bebas text-2xl mb-1" style={{ color: f.color }}>{f.value}</div>
              <div className="font-mono-ece text-[10px] text-stellar/40 tracking-widest uppercase">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
