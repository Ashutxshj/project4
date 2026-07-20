import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Hero from '../components/Hero'
import BannerCarousel from '../components/BannerCarousel'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, FOREST, CREAM, TERRACOTTA, BRASS, SAGE_CARD, HAIRLINE, EASE } from '../theme'

const ORIGINS = [
  {
    id: 0,
    location: 'Kannauj, U.P.',
    ingredient: 'Jasmine Absolute',
    batch: 'KJA-2024-0311',
    harvest: 'March 2024',
    desc: "The world's oldest perfume district. Our mogra is picked at 4 AM when indole concentration peaks in the flower.",
    longDesc:
      "Kannauj has been India's perfume capital for over 3,000 years. The town sits in the Gangetic plain, its climate creating conditions unique for mogra cultivation. Our jasmine cooperative involves 40 families across three villages. Harvest happens in the pre-dawn hours — flowers picked after sunrise lose 30% of their aromatic yield. Traditional deg-bhapka hydro-distillation, unchanged for centuries, takes 10–12 hours per batch.",
    img: 'https://images.unsplash.com/photo-1618510355097-77b432ca8436?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 1,
    location: 'Mysore, Karnataka',
    ingredient: 'Sandalwood Oil',
    batch: 'MSR-2023-1104',
    harvest: 'November 2023',
    desc: 'Government-certified Santalum album heartwood, 30+ years old. Direct steam distillation — no solvent — preserves the full alpha-santalol profile.',
    longDesc:
      'Mysore sandalwood (Santalum album) is protected under Karnataka Forest Act. Only heartwood from trees aged 30+ yields the full alpha-santalol concentration that defines the Mysore character. Our distillery partner operates under a Karnataka government license with no solvent extraction — direct steam only. Each batch is GC/MS verified for alpha-santalol content above 46%.',
    img: 'https://images.unsplash.com/photo-1702001145743-094b0b7ead51?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    location: 'Pampore, Kashmir',
    ingredient: 'Saffron Stigmas',
    batch: 'KSO-2024-0109',
    harvest: 'October 2023',
    desc: 'ISO Grade I saffron. Three-week harvest window, hand-picked at dawn. Cold-macerated in Hindi oud for 6 weeks. No synthetic safranal.',
    longDesc:
      'Pampore is the only place in India producing ISO Grade I saffron. The Crocus sativus flowers bloom for just three weeks in October. Each flower yields three stigmas — removed by hand within hours of blooming. Delayed extraction drops the safranal content sharply. Our process cold-macerates the dried threads directly in Hindi oud oil for six weeks, then filters. The result is a natural saffron-oud accord with no synthetic safranal whatsoever.',
    img: 'https://images.unsplash.com/photo-1615885108069-7d5bef9a7e22?w=600&h=400&fit=crop&auto=format',
  },
]

// Mood tiles — clicking one opens the shop pre-filtered.
const MOODS = [
  {
    name: 'Warm & Woody',
    filters: { family: ['Warm & Woody'] },
    bg: '#8B6F47',
    image:
      'https://images.unsplash.com/photo-1541724673942-6b2993cf1c81?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Bright & Citrus',
    filters: { family: ['Bright & Citrus'] },
    bg: '#9c7c94',
    image:
      'https://images.unsplash.com/photo-1687236918594-ead4688ed6f2?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Winter evenings',
    filters: { occasion: ['Winter evenings'] },
    bg: '#3D4F63',
    image:
      'https://images.unsplash.com/photo-1743915834254-101ee0cde447?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Special occasions',
    filters: { occasion: ['Special occasions'] },
    bg: TERRACOTTA,
    image:
      'https://images.unsplash.com/photo-1585768750637-ada36319a484?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Travel / new cities',
    filters: { occasion: ['Travel / new cities'] },
    bg: '#504235',
    image:
      'https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=800&fit=crop&auto=format',
  },
]

const moodCount = (mood) =>
  PRODUCTS.filter((p) =>
    mood.filters.family
      ? mood.filters.family.includes(p.family)
      : mood.filters.occasion.some((o) => p.goodFor.includes(o))
  ).length

// "From the ledger" — how it wore for them (8 quotes, verbatim).
const TESTIMONIALS = [
  {
    quote: 'Lasts all day in Mumbai heat, never goes sharp or sour on me.',
    name: 'Priya M.',
    context: 'Kannauj Jasmine Absolute · Humid coastal',
  },
  {
    quote: 'One spray is enough and I mean it. Extraordinary longevity in the dry-down.',
    name: 'Vikram P.',
    context: 'Kashmir Saffron Oud · Humid coastal',
  },
  {
    quote: "This is what my grandmother's garden smelled like at midnight. Exact.",
    name: 'Ananya S.',
    context: 'Raat ki Rani · Humid coastal',
  },
  {
    quote: 'Smells like the first rain on hot tar. Pure nostalgia in a bottle.',
    name: 'Deepa K.',
    context: 'Marigold & Mitti · Humid coastal',
  },
  {
    quote: 'The most honest sandalwood I have worn. No synthetic sweetness anywhere.',
    name: 'Rohan S.',
    context: 'Mysore Sandalwood Reserve · Hill station',
  },
  {
    quote:
      'Unmistakably Darjeeling. Got stopped twice on a trek to be asked what I was wearing.',
    name: 'Nandini G.',
    context: 'Darjeeling Oolong · Hill station',
  },
  {
    quote: 'Wore it to a wedding, got more compliments than I expected.',
    name: 'Meera K.',
    context: 'Kashmir Saffron Oud · Dry interior',
  },
  {
    quote: 'Winter evenings scent. The amber in the drydown is extraordinary.',
    name: 'Rahul V.',
    context: 'Amber & Cardamom · Cold winters',
  },
]

const MEMBERSHIP_BULLETS = [
  'Every sample credited toward your full bottle',
  'Batch alerts before public release',
  'Order history & easy reorder',
]

export default function HomePage({ setPage, setSelectedProduct }) {
  const [openOrigin, setOpenOrigin] = useState(null)
  const width = useViewportWidth()
  const isMobile = width < 768
  const isTablet = width < 1024

  return (
    <div>
      <Hero setPage={setPage} />
      <BannerCarousel onNavigate={setPage} />

      {/* Shop by mood */}
      <section style={{ background: CREAM, padding: isMobile ? '44px 20px' : '68px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 30,
            }}
          >
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 27,
                fontWeight: 400,
                color: INK,
                margin: 0,
              }}
            >
              Shop by mood
            </h2>
            <button
              onClick={() => setPage('shop')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: TERRACOTTA,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              All fragrances <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4 }}>
            {MOODS.map((mood, i) => (
              <motion.button
                key={mood.name}
                onClick={() => setPage('shop')}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: '0 0 230px',
                  height: 290,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '22px 20px',
                  color: CREAM,
                  textAlign: 'left',
                  background: mood.bg,
                }}
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                  initial="rest"
                  transition={{ duration: 0.45, ease: EASE }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${mood.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(34, 31, 29, 0.85) 0%, rgba(34, 31, 29, 0.4) 60%, rgba(34, 31, 29, 0.1) 100%)',
                    zIndex: 1,
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: 20,
                      fontWeight: 400,
                      marginBottom: 4,
                    }}
                  >
                    {mood.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      opacity: 0.85,
                    }}
                  >
                    {mood.count} fragrances
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: BRASS, opacity: 0.28 }} />

      {/* From the ledger — Where it comes from */}
      <section style={{ background: CREAM, padding: isMobile ? '44px 20px' : '68px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 38 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 10.5,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRASS,
              }}
            >
              From the ledger
            </span>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 30,
                fontWeight: 400,
                color: INK,
                marginTop: 8,
                marginBottom: 0,
              }}
            >
              Where it comes from
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: 22,
            }}
          >
            {ORIGINS.map((origin, i) => {
              const open = openOrigin === origin.id
              return (
                <motion.div
                  key={origin.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
                  style={{ background: SAGE_CARD, borderRadius: 4, overflow: 'hidden' }}
                >
                  <div style={{ height: 210, overflow: 'hidden', background: '#c0b9a8' }}>
                    <motion.img
                      src={origin.img}
                      alt={origin.ingredient}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '20px 22px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: 9.5,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: BRASS,
                        }}
                      >
                        {origin.location}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: 9,
                          color: INK,
                          opacity: 0.36,
                        }}
                      >
                        {origin.batch}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: 19,
                        fontWeight: 400,
                        color: INK,
                        margin: '0 0 9px',
                      }}
                    >
                      {origin.ingredient}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12.5,
                        color: INK,
                        opacity: 0.68,
                        lineHeight: 1.62,
                        margin: '0 0 12px',
                      }}
                    >
                      {open ? origin.longDesc : origin.desc}
                    </p>
                    <button
                      onClick={() => setOpenOrigin(open ? null : origin.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: TERRACOTTA,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {open ? 'Close' : 'Read origin story'}
                      <ChevronRight
                        size={12}
                        style={{
                          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured — Kashmir Saffron Oud */}
      <section
        style={{
          position: 'relative',
          height: isMobile ? 320 : 440,
          overflow: 'hidden',
          background: '#1E1812',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1585768750637-ada36319a484?w=1600&h=600&fit=crop&auto=format"
          alt="Deep red rose close-up"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 60%',
            opacity: 0.38,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '0 24px' : '0 80px',
            background: 'linear-gradient(90deg, rgba(30,24,18,0.65) 0%, rgba(30,24,18,0.08) 65%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
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
              New arrival — Batch KSO-2024-0109
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: CREAM,
                margin: '0 0 16px',
                lineHeight: 1.08,
              }}
            >
              Kashmir Saffron Oud
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14.5,
                color: 'rgba(246,241,231,0.7)',
                margin: '0 0 28px',
                lineHeight: 1.65,
                maxWidth: 380,
              }}
            >
              Pampore ISO Grade I stigmas cold-macerated for six weeks in Hindi oud. Longevity: 12+
              hrs. Nothing synthetic.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <button
                onClick={() => {
                  setSelectedProduct(PRODUCTS[2])
                  setPage('product')
                }}
                style={{
                  background: TERRACOTTA,
                  color: CREAM,
                  border: 'none',
                  borderRadius: 4,
                  padding: '13px 26px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Shop now <ArrowRight size={15} />
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(PRODUCTS[2])
                  setPage('product')
                }}
                style={{
                  background: 'transparent',
                  color: CREAM,
                  border: '1px solid rgba(246,241,231,0.35)',
                  borderRadius: 4,
                  padding: '13px 26px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                }}
              >
                ₹8,500 / 30ml
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            style={{ flexShrink: 0 }}
          >
            <div
              style={{
                width: 190,
                height: 270,
                borderRadius: 4,
                overflow: 'hidden',
                border: `1px solid ${HAIRLINE}`,
                background: '#2a2018',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1772191399367-91ed8d95664b?w=380&h=540&fit=crop&auto=format"
                alt="Kashmir Saffron Oud bottle"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder quote */}
      <section style={{ background: FOREST, padding: isMobile ? '44px 20px' : '80px 48px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{ width: 48, height: 1, background: BRASS, opacity: 0.45, margin: '0 auto 40px' }}
          />
          <blockquote
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(18px, 2.6vw, 26px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: CREAM,
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}
          >
            Every fragrance house tells you a scent smells like a Kashmiri rose garden at dusk. We
            tell you it was picked on October 14th by Ghulam Ahmed's family in Pampore,
            cold-macerated for six weeks, and that it will run 20% shorter on your skin if you live
            in Mumbai.
          </blockquote>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: TERRACOTTA,
                flexShrink: 0,
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: CREAM,
                  fontWeight: 500,
                }}
              >
                Shankar
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: BRASS,
                  opacity: 0.85,
                }}
              >
                Founder, Ittra
              </div>
            </div>
          </div>
          <div
            style={{ width: 48, height: 1, background: BRASS, opacity: 0.45, margin: '40px auto 0' }}
          />
        </div>
      </section>

      {/* New arrivals */}
      <section style={{ background: CREAM, padding: isMobile ? '44px 20px' : '68px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 36,
            }}
          >
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 27,
                fontWeight: 400,
                color: INK,
                margin: 0,
              }}
            >
              New arrivals
            </h2>
            <button
              onClick={() => setPage('shop')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: TERRACOTTA,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(2, 1fr)'
                : isTablet
                  ? 'repeat(3, 1fr)'
                  : 'repeat(4, 1fr)',
              gap: 22,
            }}
          >
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
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
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: FOREST,
          padding: isMobile ? '32px 20px' : '44px 48px',
          borderTop: '1px solid rgba(176,141,87,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: isMobile ? 16 : 0,
          }}
        >
          <div>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, color: CREAM }}>
              Ittra
            </span>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: 'rgba(246,241,231,0.45)',
                marginTop: 6,
                marginBottom: 0,
                maxWidth: 300,
                lineHeight: 1.6,
              }}
            >
              Honest Indian perfumery. Batch transparency, sourcing origins, real wear data.
            </p>
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(176,141,87,0.6)',
            }}
          >
            © 2026 Ittra
          </div>
        </div>
      </footer>
    </div>
  )
}
