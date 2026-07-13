import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { CREAM, TERRACOTTA, BRASS, EASE } from '../theme'

const BANNERS = [
  {
    id: 'discovery',
    label: 'Discovery Programme',
    headline: 'Try before\nyou commit.',
    body: 'Every fragrance ships as a 5ml Discovery first. The cost is credited in full toward your first full bottle within 30 days.',
    cta: 'Explore discovery kits',
    ctaStyle: 'outline',
    page: 'shop',
    bg: '#2C1F18',
    overlay: 'linear-gradient(105deg, rgba(34,31,29,0.88) 38%, rgba(34,31,29,0.28) 100%)',
    image:
      'https://images.unsplash.com/photo-1541724673942-6b2993cf1c81?w=1400&h=600&fit=crop&auto=format',
    imageAlt: 'Rose petals',
    imagePos: 'right center',
  },
  {
    id: 'quiz',
    label: 'Scent Finder',
    headline: 'Five questions.\nThree fragrances.',
    body: 'Answer five questions about climate, occasion, and texture. We match you to the three fragrances most likely to work on your skin.',
    cta: 'Take the quiz',
    ctaStyle: 'filled',
    page: 'quiz',
    bg: '#2F3B2E',
    overlay: 'linear-gradient(105deg, rgba(47,59,46,0.92) 40%, rgba(47,59,46,0.25) 100%)',
    image:
      'https://images.unsplash.com/photo-1743915834254-101ee0cde447?w=1400&h=600&fit=crop&auto=format',
    imageAlt: 'Perfume bottle in dim light',
    imagePos: 'center center',
  },
  {
    id: 'new',
    label: 'New Arrival — Batch 2025-IV',
    headline: 'Raat ki Rani,\nbottled.',
    body: 'Named for the Queen of the Night tuberose, this limited batch of 240 bottles was distilled on a single October evening in Kannauj.',
    cta: 'Shop new arrivals',
    ctaStyle: 'filled',
    page: 'shop',
    bg: '#1A1020',
    overlay: 'linear-gradient(105deg, rgba(26,16,32,0.92) 42%, rgba(26,16,32,0.22) 100%)',
    image:
      'https://images.unsplash.com/photo-1605463967516-b73a52062ab0?w=1400&h=600&fit=crop&auto=format',
    imageAlt: 'Gold perfume bottle',
    imagePos: 'center 30%',
  },
]

export default function BannerCarousel({ onNavigate }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef(null)
  const isMobile = useViewportWidth() < 768

  const go = useCallback((next, dir) => {
    setDirection(dir)
    setIndex(next)
  }, [])

  const advance = useCallback(() => {
    go((index + 1) % BANNERS.length, 1)
  }, [index, go])

  useEffect(() => {
    timerRef.current = setInterval(advance, 2500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [advance])

  const jumpTo = (next, dir) => {
    if (timerRef.current) clearInterval(timerRef.current)
    go(next, dir)
    timerRef.current = setInterval(() => {
      setIndex((i) => {
        setDirection(1)
        return (i + 1) % BANNERS.length
      })
    }, 2500)
  }

  const banner = BANNERS[index]
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }
  const textVariants = {
    enter: { opacity: 0, y: 24 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  }

  return (
    <section
      style={{ position: 'relative', height: isMobile ? 320 : 480, overflow: 'hidden' }}
      onMouseEnter={() => {
        if (timerRef.current) clearInterval(timerRef.current)
      }}
      onMouseLeave={() => {
        timerRef.current = setInterval(() => {
          setIndex((i) => {
            setDirection(1)
            return (i + 1) % BANNERS.length
          })
        }, 2500)
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={banner.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.72, ease: EASE }}
          style={{ position: 'absolute', inset: 0, background: banner.bg }}
        >
          <motion.img
            src={banner.image}
            alt={banner.imageAlt}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: banner.imagePos,
              opacity: 0.38,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: banner.overlay }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: isMobile ? '0 24px' : '0 80px',
              maxWidth: 680,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={banner.id + '-text'}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: BRASS,
                    marginBottom: 16,
                  }}
                >
                  {banner.label}
                </div>
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 'clamp(28px, 3.6vw, 52px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: CREAM,
                    margin: '0 0 18px',
                    lineHeight: 1.1,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {banner.headline}
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14.5,
                    color: 'rgba(246,241,231,0.75)',
                    margin: '0 0 28px',
                    lineHeight: 1.65,
                    maxWidth: 400,
                  }}
                >
                  {banner.body}
                </p>
                <motion.button
                  onClick={() => onNavigate(banner.page)}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: banner.ctaStyle === 'filled' ? TERRACOTTA : 'none',
                    border:
                      banner.ctaStyle === 'filled' ? 'none' : '1px solid rgba(246,241,231,0.5)',
                    color: CREAM,
                    borderRadius: 4,
                    padding: '13px 26px',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    alignSelf: 'flex-start',
                    letterSpacing: '0.01em',
                  }}
                >
                  {banner.cta} <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: isMobile ? 24 : 80,
          display: 'flex',
          gap: 10,
          zIndex: 10,
        }}
      >
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            onClick={() => jumpTo(i, i > index ? 1 : -1)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label={`Go to banner ${i + 1}`}
          >
            <motion.div
              animate={{
                width: i === index ? 28 : 8,
                background: i === index ? CREAM : 'rgba(246,241,231,0.35)',
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ height: 4, borderRadius: 4 }}
            />
          </button>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'rgba(246,241,231,0.1)',
          zIndex: 10,
        }}
      >
        <motion.div
          key={index}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'linear' }}
          style={{ height: '100%', background: BRASS }}
        />
      </div>
    </section>
  )
}
