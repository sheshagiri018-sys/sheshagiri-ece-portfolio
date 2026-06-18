import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import PersonalInfo from './components/PersonalInfo'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Academics from './components/Academics'
import Timeline from './components/Timeline'
import Certifications from './components/Certifications'
import Activities from './components/Activities'
import Connect from './components/Connect'

export default function App() {
  const [loading, setLoading] = useState(true)
  const cursorOuter = useRef(null)
  const cursorInner = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Custom cursor
    const outerEl = cursorOuter.current
    const innerEl = cursorInner.current
    let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(innerEl, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' })
    }

    let cursorRaf
    const animateCursor = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      gsap.set(outerEl, { x: outerX, y: outerY })
      cursorRaf = requestAnimationFrame(animateCursor)
    }
    cursorRaf = requestAnimationFrame(animateCursor)

    const onEnter = () => { gsap.to(outerEl, { scale: 2.5, opacity: 0.6, duration: 0.3 }); gsap.to(innerEl, { scale: 0, duration: 0.2 }) }
    const onLeave = () => { gsap.to(outerEl, { scale: 1, opacity: 1, duration: 0.3 }); gsap.to(innerEl, { scale: 1, duration: 0.2 }) }

    window.addEventListener('mousemove', onMouseMove)
    const refreshLinks = () => document.querySelectorAll('a, button, [data-cursor]')
    let links = refreshLinks()
    links.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    // Re-bind periodically since content mounts dynamically (modals, etc.)
    const rebindInterval = setInterval(() => {
      links.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
      links = refreshLinks()
      links.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })
    }, 2000)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(cursorRaf)
      clearInterval(rebindInterval)
      window.removeEventListener('mousemove', onMouseMove)
      links.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      // Refresh ScrollTrigger after loader unmounts (layout settles)
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div ref={cursorOuter} className="cursor-outer" />
      <div ref={cursorInner} className="cursor-inner" />

      <Navigation />
      <ScrollProgress />

      <main>
        <Hero />
        <About />
        <PersonalInfo />
        <Skills />
        <Projects />
        <Academics />
        <Timeline />
        <Certifications />
        <Activities />
        <Connect />
      </main>
    </>
  )
}
