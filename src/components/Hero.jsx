import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { CREAM, TERRACOTTA, BRASS, EASE } from '../theme'

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1769201650423-cf4329953245?w=1920&h=1080&fit=crop&auto=format',
    alt: 'A rosebud covered in water droplets',
    pos: 'center 40%',
  },
  {
    src: 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=1920&h=1080&fit=crop&auto=format',
    alt: 'Clear glass perfume bottle on black background',
    pos: 'center center',
  },
  {
    src: 'https://images.unsplash.com/photo-1687236918594-ead4688ed6f2?w=1920&h=1080&fit=crop&auto=format',
    alt: 'White jasmine flower with dew drops',
    pos: 'center 35%',
  },
]

export default function Hero({ setPage }) {
  const [index, setIndex] = useState(0)
  const isMobile = useViewportWidth() < 768

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[index]

  return (
    <section
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#2a2422' }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 6, ease: 'linear' },
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: slide.pos,
          }}
        />
      </AnimatePresence>
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 10,
        }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Hero slide ${i + 1}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <motion.div
              animate={{
                width: i === index ? 24 : 7,
                background: i === index ? CREAM : 'rgba(246,241,231,0.4)',
              }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ height: 4, borderRadius: 4 }}
            />
          </button>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(180deg,rgba(34,31,29,0.55) 0%,rgba(34,31,29,0.88) 100%)'
            : 'linear-gradient(105deg, rgba(34,31,29,0.82) 35%, rgba(34,31,29,0.08) 100%)',
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          padding: isMobile ? '0 24px 64px' : '0 8vw',
        }}
      >
        <div style={{ maxWidth: isMobile ? '100%' : 580 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 10.5,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: BRASS,
              marginBottom: 22,
            }}
          >
            Niche Indian Perfumery
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.6, ease: EASE }}
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(44px, 6.5vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.04,
              color: CREAM,
              margin: '0 0 22px',
              fontStyle: 'italic',
            }}
          >
            What is actually
            <br />
            in the bottle.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: 'rgba(246,241,231,0.78)',
              margin: '0 0 38px',
              maxWidth: 440,
            }}
          >
            Batch codes. Harvest dates. Sourcing origins. The honest truth about how a scent wears
            in humidity — not the mood-board version.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            style={{ display: 'flex', gap: 14 }}
          >
            <motion.button
              onClick={() => setPage('quiz')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: TERRACOTTA,
                color: CREAM,
                border: 'none',
                cursor: 'pointer',
                padding: '13px 26px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5,
                letterSpacing: '0.03em',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 500,
              }}
            >
              Take the Scent Finder <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={() => setPage('shop')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'transparent',
                color: CREAM,
                border: '1px solid rgba(246,241,231,0.35)',
                cursor: 'pointer',
                padding: '13px 26px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5,
                letterSpacing: '0.03em',
                borderRadius: 4,
              }}
            >
              Browse collection
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
