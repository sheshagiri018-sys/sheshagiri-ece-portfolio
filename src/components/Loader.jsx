import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  'INITIALIZING SIGNAL...',
  'CALIBRATING FREQUENCY...',
  'SYNCING ECE PROTOCOLS...',
  'LOADING ENGINEER PROFILE...',
  'TRANSMISSION READY',
]

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const totalDuration = 2600
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 4
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, messages.length - 1))
    }, 550)
    return () => clearInterval(msgInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setVisible(false)
        setTimeout(onComplete, 700)
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div className="grid-lines" style={{ animation: 'gridPulse 3s ease-in-out infinite' }} />

          {/* Scanning line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'var(--electric)', animation: 'scan 2.5s linear infinite', boxShadow: '0 0 20px rgba(0,184,255,0.8)' }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-md">
            {/* Signal waveform icon */}
            <svg width="80" height="50" viewBox="0 0 80 50" className="mb-8">
              <motion.path
                d="M0,25 L10,25 L15,10 L22,40 L28,5 L35,45 L42,15 L48,25 L80,25"
                fill="none"
                stroke="#00B8FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,184,255,0.6))' }}
              />
            </svg>

            {/* Brand name */}
            <div className="font-orbitron text-stellar/70 text-xs tracking-[0.4em] mb-2 uppercase">
              Sheshagiri R B
            </div>
            <div className="font-mono-ece text-electric text-[10px] tracking-[0.3em] mb-10 uppercase">
              ECE Engineer Identity System
            </div>

            {/* Progress bar */}
            <div className="w-full h-px bg-white/10 relative overflow-hidden mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00B8FF, #7B2FFF, #00FFF7)',
                  boxShadow: '0 0 10px rgba(0,184,255,0.6)',
                }}
              />
            </div>

            {/* Percentage + message */}
            <div className="flex items-center justify-between w-full font-mono-ece text-[10px] tracking-widest">
              <span className="text-stellar/40">{messages[msgIndex]}</span>
              <span className="text-electric">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 font-mono-ece text-[10px] text-stellar/20 tracking-widest">
            SYS_BOOT: ECE_PORTFOLIO_v1.0
          </div>
          <div className="absolute bottom-6 right-6 font-mono-ece text-[10px] text-stellar/20 tracking-widest">
            SONA COLLEGE OF TECHNOLOGY
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
