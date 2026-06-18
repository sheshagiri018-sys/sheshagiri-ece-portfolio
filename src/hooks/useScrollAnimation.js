import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      selector = '[data-reveal]',
      fromVars = { opacity: 0, y: 60 },
      toVars = { opacity: 1, y: 0 },
      stagger = 0.15,
      duration = 0.9,
      ease = 'power3.out',
      start = 'top 80%',
    } = options

    const targets = el.querySelectorAll(selector)
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        duration,
        stagger,
        ease,
        scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

export function useCountUp(target, duration = 2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate() { el.textContent = Math.round(obj.val).toLocaleString() },
      })
    }, el)

    return () => ctx.revert()
  }, [target, duration])

  return ref
}
