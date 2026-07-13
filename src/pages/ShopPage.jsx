import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, CREAM, TERRACOTTA, BRASS, HAIRLINE, EASE } from '../theme'

const FAMILIES = ['Soft Floral', 'Warm & Woody', 'Deep Amber', 'Bright & Citrus']
const INTENSITIES = ['Light', 'Moderate', 'Rich', 'Bold']
const OCCASIONS = [
  'Daily wear',
  'Special occasions',
  'Monsoon',
  'Winter evenings',
  'Travel / new cities',
  'Gift',
]
const SORTS = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Sort by longevity']

export default function ShopPage({ setPage, setSelectedProduct, initialFilters }) {
  const [filters, setFilters] = useState(() => ({
    family: [],
    intensity: [],
    occasion: [],
    ...(initialFilters || {}),
  }))
  const [sort, setSort] = useState('Featured')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const width = useViewportWidth()
  const isMobile = width < 768
  const isTablet = width < 1024

  const toggle = (group, value) => {
    setFilters((prev) => {
      const list = prev[group] || []
      return {
        ...prev,
        [group]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      }
    })
  }

  const results = [
    ...PRODUCTS.filter(
      (p) =>
        !(
          (filters.family.length && !filters.family.includes(p.family)) ||
          (filters.intensity.length && !filters.intensity.includes(p.intensity)) ||
          (filters.occasion.length && !filters.occasion.some((o) => p.goodFor.includes(o)))
        )
    ),
  ].sort((a, b) => {
    if (sort === 'Price: Low–High') return a.price - b.price
    if (sort === 'Price: High–Low') return b.price - a.price
    if (sort === 'Sort by longevity') {
      const hours = (p) => parseInt((p.longevity.split('–').pop() ?? '0').replace('+', ''))
      return hours(b) - hours(a)
    }
    return 0
  })

  const chipStyle = (active) => ({
    padding: '5px 11px',
    borderRadius: 3,
    fontFamily: "'Space Grotesk', monospace",
    fontSize: 10,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: `1px solid ${active ? TERRACOTTA : HAIRLINE}`,
    background: active ? TERRACOTTA : 'transparent',
    color: active ? CREAM : INK,
    transition: 'all 0.15s',
  })

  const activeCount = filters.family.length + filters.intensity.length + filters.occasion.length

  const filtersPanel = (
    <>
      <div
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: BRASS,
          marginBottom: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Filters</span>
        {isMobile && (
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <X size={18} color={INK} />
          </button>
        )}
      </div>
      <div style={{ marginBottom: 26 }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: INK,
            marginBottom: 12,
            opacity: 0.75,
          }}
        >
          Fragrance family
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {FAMILIES.map((f) => (
            <button
              key={f}
              onClick={() => toggle('family', f)}
              style={chipStyle(filters.family.includes(f))}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 26, paddingTop: 18, borderTop: `1px solid ${HAIRLINE}` }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: INK,
            marginBottom: 12,
            opacity: 0.75,
          }}
        >
          Intensity
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {INTENSITIES.map((i) => (
            <button
              key={i}
              onClick={() => toggle('intensity', i)}
              style={chipStyle(filters.intensity.includes(i))}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      <div style={{ paddingTop: 18, borderTop: `1px solid ${HAIRLINE}` }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: INK,
            marginBottom: 12,
            opacity: 0.75,
          }}
        >
          Good for
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {OCCASIONS.map((occ) => {
            const active = filters.occasion.includes(occ)
            return (
              <button
                key={occ}
                onClick={() => toggle('occasion', occ)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '7px 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                  color: active ? TERRACOTTA : INK,
                  opacity: active ? 1 : 0.65,
                  borderBottom: `1px solid ${HAIRLINE}`,
                  fontWeight: active ? 500 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'color 0.15s',
                }}
              >
                {occ}
                {active && <span style={{ fontSize: 14, lineHeight: 1 }}>✓</span>}
              </button>
            )
          })}
        </div>
      </div>
      {activeCount > 0 && (
        <button
          onClick={() => setFilters({ family: [], intensity: [], occasion: [] })}
          style={{
            marginTop: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: TERRACOTTA,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            padding: 0,
          }}
        >
          Clear all filters
        </button>
      )}
    </>
  )

  return (
    <div style={{ paddingTop: 98, minHeight: '100vh', background: CREAM }}>
      <AnimatePresence>
        {isMobile && drawerOpen && (
          <motion.div
            key="filter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(34,31,29,0.45)',
              zIndex: 200,
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobile && drawerOpen && (
          <motion.div
            key="filter-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 280,
              background: CREAM,
              zIndex: 201,
              padding: '28px 24px',
              overflowY: 'auto',
            }}
          >
            {filtersPanel}
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: 'flex' }}>
        {!isMobile && (
          <aside
            style={{
              width: 232,
              flexShrink: 0,
              padding: '36px 28px',
              borderRight: `1px solid ${HAIRLINE}`,
              position: 'sticky',
              top: 98,
              height: 'calc(100vh - 98px)',
              overflowY: 'auto',
            }}
          >
            {filtersPanel}
          </aside>
        )}
        <main style={{ flex: 1, padding: isMobile ? '20px 16px' : '36px 40px' }}>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: isMobile ? 24 : 30,
              fontWeight: 400,
              color: INK,
              margin: '0 0 20px',
            }}
          >
            All fragrances
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isMobile && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 13px',
                    border: `1px solid ${HAIRLINE}`,
                    borderRadius: 3,
                    background: activeCount > 0 ? TERRACOTTA : 'transparent',
                    color: activeCount > 0 ? CREAM : INK,
                    cursor: 'pointer',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Filters {activeCount > 0 && `(${activeCount})`}
                </button>
              )}
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 10.5,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: INK,
                  opacity: 0.5,
                }}
              >
                {results.length} {results.length === 1 ? 'fragrance' : 'fragrances'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {SORTS.map((s) => (
                <button key={s} onClick={() => setSort(s)} style={chipStyle(sort === s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                isMobile || isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(252px, 1fr))',
              gap: isMobile ? 12 : 22,
            }}
          >
            {results.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              >
                <ProductCard
                  product={product}
                  onClick={() => {
                    setSelectedProduct(product)
                    setPage('product')
                  }}
                />
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
