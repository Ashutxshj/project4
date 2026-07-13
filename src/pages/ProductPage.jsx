import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight, MapPin } from 'lucide-react'
import ScentTimeline from '../components/ScentTimeline'
import { PRODUCTS } from '../data/products'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, FOREST, CREAM, TERRACOTTA, BRASS, SAGE_CARD, HAIRLINE } from '../theme'

export default function ProductPage({ product, setPage, setSelectedProduct, cart, setCart }) {
  const [sizeIndex, setSizeIndex] = useState(1)
  const [storyOpen, setStoryOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const isMobile = useViewportWidth() < 768
  const paired = PRODUCTS.filter((p) => product.pairedWith.includes(p.id))

  const addToBag = () => {
    const item = {
      id: product.id,
      name: product.name,
      size: product.sizes[sizeIndex],
      price: product.sizePrice[sizeIndex],
      image: product.image,
      isDiscovery: sizeIndex === 0,
    }
    setCart([...cart, item])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ paddingTop: 98, background: CREAM, minHeight: '100vh' }}>
      <div
        style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px' : '44px 48px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 24,
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 10.5,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <button
            onClick={() => setPage('shop')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: INK,
              opacity: 0.45,
              fontFamily: 'inherit',
              fontSize: 'inherit',
              letterSpacing: 'inherit',
              textTransform: 'inherit',
              padding: 0,
            }}
          >
            Shop
          </button>
          <span style={{ opacity: 0.3, color: INK }}>›</span>
          <span style={{ color: INK, opacity: 0.85 }}>{product.name}</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 28 : 60,
          }}
        >
          <div>
            <div
              style={{
                position: 'relative',
                background: SAGE_CARD,
                borderRadius: 4,
                overflow: 'hidden',
                paddingTop: '120%',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 14,
                padding: '14px 18px',
                background: SAGE_CARD,
                borderRadius: 4,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {[
                ['Batch', product.batchCode],
                ['Harvest', product.harvestDate],
                ['Origin', product.origin],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 9,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: BRASS,
                      marginBottom: 3,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 11, color: INK }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 10.5,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: BRASS,
                marginBottom: 11,
              }}
            >
              {product.family}
            </div>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 34,
                fontWeight: 400,
                color: INK,
                margin: '0 0 7px',
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: INK,
                opacity: 0.58,
                margin: '0 0 22px',
                lineHeight: 1.5,
              }}
            >
              {product.tagline}
            </p>
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 23,
                color: INK,
                marginBottom: 22,
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
              <span style={{ fontSize: 11, opacity: 0.45, marginLeft: 8 }}>/ 30ml</span>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: INK,
                  opacity: 0.55,
                  marginBottom: 10,
                }}
              >
                Size
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map((size, i) => (
                  <button
                    key={size}
                    onClick={() => setSizeIndex(i)}
                    style={{
                      padding: '10px 13px',
                      border: `1px solid ${sizeIndex === i ? TERRACOTTA : HAIRLINE}`,
                      background: sizeIndex === i ? TERRACOTTA : 'transparent',
                      color: sizeIndex === i ? CREAM : INK,
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 10.5,
                      letterSpacing: '0.04em',
                      transition: 'all 0.15s',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {sizeIndex === 0 && (
              <div
                style={{
                  marginBottom: 18,
                  padding: '10px 14px',
                  background: 'rgba(176,141,87,0.1)',
                  border: `1px solid ${HAIRLINE}`,
                  borderRadius: 4,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: INK,
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Discovery credit:</span> ₹
                  {product.sizePrice[0].toLocaleString('en-IN')} is credited toward a full bottle
                  within 30 days of purchase.
                </p>
              </div>
            )}
            <motion.button
              onClick={addToBag}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.015 }}
              style={{
                width: '100%',
                padding: '15px',
                background: added ? FOREST : TERRACOTTA,
                color: CREAM,
                border: 'none',
                borderRadius: 4,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14.5,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.28s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 28,
              }}
            >
              {added ? (
                <>
                  <Check size={17} /> Added to bag
                </>
              ) : (
                'Add to bag'
              )}
            </motion.button>
            <ScentTimeline product={product} />
            <div
              style={{
                marginTop: 18,
                display: 'flex',
                gap: 28,
                padding: '14px 0',
                borderTop: `1px solid ${HAIRLINE}`,
                borderBottom: `1px solid ${HAIRLINE}`,
              }}
            >
              {[
                ['Longevity', product.longevity],
                ['Intensity', product.intensity],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 9,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: BRASS,
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 12.5, color: INK }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {paired.length > 0 && (
          <div style={{ marginTop: 68 }}>
            <div style={{ height: 1, background: BRASS, opacity: 0.28, marginBottom: 36 }} />
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 22,
                fontWeight: 400,
                color: INK,
                marginBottom: 20,
              }}
            >
              Pairs well with
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: 14,
              }}
            >
              {paired.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p)
                    window.scrollTo(0, 0)
                  }}
                  style={{
                    display: 'flex',
                    gap: 13,
                    alignItems: 'center',
                    padding: '12px 15px',
                    background: SAGE_CARD,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    flex: 1,
                    textAlign: 'left',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 3px 14px rgba(34,31,29,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: 46,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 2,
                      background: '#c8c0b0',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: 14,
                        color: INK,
                        marginBottom: 3,
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: 10,
                        letterSpacing: '0.06em',
                        color: BRASS,
                      }}
                    >
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 52 }}>
          <button
            onClick={() => setStoryOpen(!storyOpen)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderTop: `1px solid ${HAIRLINE}`,
            }}
          >
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 19, color: INK }}>
              Ingredient &amp; sourcing story
            </span>
            <ChevronRight
              size={17}
              style={{
                color: BRASS,
                transform: storyOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.22s',
              }}
            />
          </button>
          {storyOpen && (
            <div style={{ paddingBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 13 }}>
                <MapPin size={15} style={{ color: BRASS }} />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 10.5,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: BRASS,
                  }}
                >
                  {product.origin}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  color: INK,
                  opacity: 0.72,
                  lineHeight: 1.78,
                  margin: 0,
                }}
              >
                {product.provenance}
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 36, borderTop: `1px solid ${HAIRLINE}`, paddingTop: 30 }}>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 22,
              fontWeight: 400,
              color: INK,
              marginBottom: 22,
            }}
          >
            How it wore for them
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {product.reviews.map((review, i) => (
              <div key={i} style={{ padding: '18px 22px', background: SAGE_CARD, borderRadius: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 11,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: INK,
                      }}
                    >
                      {review.name}
                    </div>
                    <div style={{ display: 'flex', gap: 7, marginTop: 6 }}>
                      {[review.climate, review.skin].map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "'Space Grotesk', monospace",
                            fontSize: 9.5,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: INK,
                            background: 'rgba(176,141,87,0.14)',
                            padding: '2px 8px',
                            borderRadius: 2,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 13,
                      color: BRASS,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: INK,
                    opacity: 0.72,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  "{review.note}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
