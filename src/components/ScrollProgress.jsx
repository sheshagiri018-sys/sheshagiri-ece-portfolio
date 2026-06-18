import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0 },
    })
    return () => tween.kill()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[8500] h-px">
      <div className="absolute inset-0 bg-white/5" />
      <div
        ref={barRef}
        className="absolute inset-0 origin-left"
        style={{ background: 'linear-gradient(90deg,#00B8FF,#7B2FFF,#00FFF7)', transform: 'scaleX(0)', boxShadow: '0 0 10px rgba(0,184,255,0.6)' }}
      />
    </div>
  )
}
