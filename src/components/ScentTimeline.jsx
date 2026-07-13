import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoteIcon from './NoteIcon'
import { INK, CREAM, TERRACOTTA, BRASS, SAGE_CARD, HAIRLINE, EASE } from '../theme'

export default function ScentTimeline({ product }) {
  const [pos, setPos] = useState(0.14)
  const trackRef = useRef(null)
  const draggingRef = useRef(false)
  const phase = pos < 0.33 ? 'opening' : pos < 0.66 ? 'heart' : 'drydown'
  const data = product.timeline[phase]

  const updateFromX = useCallback((clientX) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    setPos(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)))
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (draggingRef.current) updateFromX(e.clientX)
    }
    const onUp = () => {
      draggingRef.current = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [updateFromX])

  const timeLabel =
    pos < 0.33
      ? `${Math.round((pos / 0.33) * 90)} min`
      : pos < 0.66
        ? `${Math.round(90 + ((pos - 0.33) / 0.33) * 270)} min`
        : `${(5 + ((pos - 0.66) / 0.34) * 7).toFixed(1)} hrs`

  const phases = [
    { key: 'opening', label: 'Opening', time: product.timeline.opening.time, midPos: 0.165 },
    { key: 'heart', label: 'Heart', time: product.timeline.heart.time, midPos: 0.495 },
    { key: 'drydown', label: 'Dry-down', time: product.timeline.drydown.time, midPos: 0.83 },
  ]

  return (
    <div style={{ marginTop: 28, padding: '22px 24px', background: SAGE_CARD, borderRadius: 4 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 17,
            color: INK,
            letterSpacing: '-0.01em',
          }}
        >
          Scent Timeline
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: BRASS,
          }}
        >
          {timeLabel}
        </span>
      </div>
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          height: 8,
          borderRadius: 4,
          cursor: 'ew-resize',
          userSelect: 'none',
          marginBottom: 6,
        }}
        onMouseDown={(e) => {
          draggingRef.current = true
          updateFromX(e.clientX)
        }}
        onTouchStart={(e) => updateFromX(e.touches[0].clientX)}
        onTouchMove={(e) => {
          e.preventDefault()
          updateFromX(e.touches[0].clientX)
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: '33%',
            height: '100%',
            background: `${TERRACOTTA}2a`,
            borderRadius: '4px 0 0 4px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '33%',
            width: '33%',
            height: '100%',
            background: `${TERRACOTTA}55`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '66%',
            width: '34%',
            height: '100%',
            background: `${TERRACOTTA}88`,
            borderRadius: '0 4px 4px 0',
          }}
        />
        <div
          style={{ position: 'absolute', left: '33%', top: -3, width: 1, height: 14, background: HAIRLINE }}
        />
        <div
          style={{ position: 'absolute', left: '66%', top: -3, width: 1, height: 14, background: HAIRLINE }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${pos * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 22,
            height: 22,
            background: TERRACOTTA,
            borderRadius: '50%',
            border: `2.5px solid ${CREAM}`,
            boxShadow: '0 1px 6px rgba(34,31,29,0.25)',
            cursor: 'grab',
            outline: 'none',
            touchAction: 'none',
          }}
          tabIndex={0}
          role="slider"
          aria-label="Scent timeline position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos * 100)}
          aria-valuetext={timeLabel}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 0.04))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(1, p + 0.04))
            if (e.key === '1' || e.key === 'Home') setPos(0.14)
            if (e.key === '2') setPos(0.5)
            if (e.key === '3' || e.key === 'End') setPos(0.84)
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 3px ${TERRACOTTA}55, 0 1px 6px rgba(34,31,29,0.25)`
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 6px rgba(34,31,29,0.25)'
          }}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: 18 }}>
        {phases.map((p) => (
          <button
            key={p.key}
            onClick={() => setPos(p.midPos)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '5px 0',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: phase === p.key ? TERRACOTTA : INK,
                fontWeight: phase === p.key ? 500 : 400,
                opacity: phase === p.key ? 1 : 0.45,
                transition: 'all 0.2s',
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 9,
                color: BRASS,
                opacity: 0.8,
                marginTop: 1,
              }}
            >
              {p.time}
            </div>
          </button>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: 14, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
              {data.notes.map((note, i) => (
                <motion.div
                  key={note}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07, ease: EASE }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK }}
                >
                  <span style={{ color: BRASS, opacity: 0.85, display: 'flex' }}>
                    <NoteIcon type={data.icons[i]} size={17} />
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {note}
                  </span>
                </motion.div>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12.5,
                color: INK,
                opacity: 0.65,
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {data.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${HAIRLINE}`,
          display: 'flex',
          gap: 8,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ color: BRASS, fontSize: 13, lineHeight: 1, marginTop: 1 }}>⊕</span>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11.5,
            color: INK,
            opacity: 0.6,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          <span style={{ fontWeight: 500, opacity: 1, color: INK }}>Wears in humidity: </span>
          {product.humidityNote}
        </p>
      </div>
    </div>
  )
}
