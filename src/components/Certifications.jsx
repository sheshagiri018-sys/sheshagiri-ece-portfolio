import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { certifications } from '../data/portfolio'

function CertCard({ cert, onView }) {
  return (
    <motion.div
      className="cert-card relative overflow-hidden rounded-2xl group"
      style={{ background: `${cert.color}06`, border: `1px solid ${cert.color}22` }}
      whileHover={{ y: -6, borderColor: `${cert.color}55`, boxShadow: `0 25px 60px ${cert.color}18` }}
      transition={{ duration: 0.3 }}
    >
      {/* Image preview */}
      {cert.image ? (
        <div
          className="relative h-44 overflow-hidden cursor-pointer"
          onClick={() => onView(cert)}
          data-cursor
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full font-mono-ece text-[10px] backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)', color: cert.color, border: `1px solid ${cert.color}40` }}>
            View Full ↗
          </div>
        </div>
      ) : (
        <div className="h-44 flex items-center justify-center" style={{ background: `${cert.color}08` }}>
          <div className="text-center px-4">
            <div className="text-3xl mb-2" style={{ color: cert.color, opacity: 0.6 }}>◈</div>
            <div className="font-mono-ece text-[10px] text-stellar/30 tracking-widest">CERTIFICATE PENDING UPLOAD</div>
          </div>
        </div>
      )}

      {/* Badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono-ece text-[9px] tracking-widest backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.55)', color: cert.color, border: `1px solid ${cert.color}40` }}>
        {cert.badge}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="font-mono-ece text-[10px] tracking-widest mb-1 opacity-60" style={{ color: cert.color }}>{cert.tag}</div>
        <h3 className="font-syne font-700 text-white text-sm mb-1 leading-snug">{cert.title}</h3>
        <p className="font-syne text-stellar/40 text-xs mb-3">{cert.subtitle}</p>
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="font-mono-ece text-[10px] text-stellar/30">{cert.issuer}</span>
          <span className="font-mono-ece text-[10px]" style={{ color: cert.color }}>{cert.date}</span>
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ cert, onClose }) {
  if (!cert) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9500] flex items-center justify-center p-4 md:p-10"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full"
          initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute -top-12 right-0 text-stellar/60 hover:text-white text-2xl" data-cursor>✕ Close</button>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cert.color}40`, boxShadow: `0 0 60px ${cert.color}20` }}>
            <img src={cert.image} alt={cert.title} className="w-full h-auto" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-syne font-700 text-white text-lg">{cert.title}</h3>
            <p className="font-mono-ece text-xs text-stellar/40 mt-1">{cert.issuer} · {cert.date} {cert.refno && `· ${cert.refno}`}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Certifications() {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.certs-label', { opacity: 0, x: -30, duration: 0.8, scrollTrigger: { trigger: '.certs-label', start: 'top 85%', once: true } })
      gsap.from('.certs-title-word', { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.certs-title', start: 'top 80%', once: true } })
      gsap.from('.cert-card', { opacity: 0, y: 50, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.cert-grid', start: 'top 75%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="certifications" ref={sectionRef} className="section-base py-32 px-6 md:px-16" style={{ background: 'linear-gradient(180deg,#000000 0%,#080014 50%,#000000 100%)' }}>
      <div className="grid-lines" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(123,47,255,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="certs-label flex items-center gap-4 mb-8">
          <span className="font-mono-ece text-xs tracking-widest text-aurora/70 uppercase">Certifications Hub</span>
          <span className="h-px flex-1 max-w-24 bg-aurora/20" />
        </div>

        <div className="certs-title mb-4">
          <h2 className="section-title" style={{ background: 'linear-gradient(135deg,#ffffff,rgba(123,47,255,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {['Certifications', '&', 'Workshops'].map((w, i) => <span key={i} className="certs-title-word inline-block mr-4">{w}</span>)}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-14 leading-relaxed">
          {certifications.length} verified credentials — click any certificate to view full resolution.
        </p>

        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((c) => <CertCard key={c.id} cert={c} onView={setSelected} />)}
        </div>
      </div>

      <Lightbox cert={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
