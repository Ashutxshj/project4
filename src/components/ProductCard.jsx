import { motion } from 'framer-motion'
import { INK, SAGE_CARD, BRASS, EASE } from '../theme'

export default function ProductCard({ product, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.975 }}
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: '0 1px 4px rgba(34,31,29,0.06)' },
        hover: { y: -6, boxShadow: '0 16px 44px rgba(34,31,29,0.16)' },
      }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ cursor: 'pointer', background: SAGE_CARD, borderRadius: 4, overflow: 'hidden' }}
    >
      <div style={{ height: 280, background: '#c8c0b0', overflow: 'hidden' }}>
        <motion.img
          src={product.image}
          alt={product.name}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <h3
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 18,
            fontWeight: 400,
            color: INK,
            margin: '0 0 4px',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: INK,
            opacity: 0.55,
            margin: '0 0 12px',
            lineHeight: 1.4,
          }}
        >
          {product.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {product.topNotes.map((note) => (
            <span
              key={note}
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 9.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: INK,
                background: 'rgba(34,31,29,0.08)',
                padding: '3px 8px',
                borderRadius: 2,
              }}
            >
              {note}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 14, color: INK }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 9.5,
              color: BRASS,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {product.longevity}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
