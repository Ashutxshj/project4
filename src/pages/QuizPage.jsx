import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ_QUESTIONS } from '../data/quiz'
import { PRODUCTS } from '../data/products'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { FOREST, CREAM, TERRACOTTA, BRASS, HAIRLINE, EASE } from '../theme'

const STEP_BACKGROUNDS = [FOREST, '#4A5F42', '#6B4E3D', '#3D4F63', '#504235']

const RATIONALES = [
  'Your answers suggest a scent that opens fresh and settles into warmth — this moves exactly that way.',
  "The longevity and intensity you described align precisely with this fragrance's dry-down character.",
  'Based on your climate and wear-style preferences, this is the most practical fit of the three.',
]

// Maps each answer to product attributes (family, occasion, longevity,
// intensity, climate behaviour) and returns the three highest scorers.
function scoreProducts(answers) {
  const scores = new Map(PRODUCTS.map((p) => [p.id, 0]))
  const addWhere = (pred, pts) => {
    for (const p of PRODUCTS) if (pred(p)) scores.set(p.id, scores.get(p.id) + pts)
  }
  const maxHours = (p) => parseInt((p.longevity.split('–').pop() ?? '0').replace('+', '')) || 0
  const [occasion, landscape, longevity, texture, climate] = answers

  // Q1 — occasion
  if (occasion === 0) addWhere((p) => p.goodFor.includes('Daily wear'), 2)
  if (occasion === 1) addWhere((p) => p.goodFor.includes('Special occasions'), 2)
  if (occasion === 2) addWhere((p) => p.intensity === 'Light' || p.intensity === 'Moderate', 2)
  if (occasion === 3) addWhere((p) => p.goodFor.includes('Travel / new cities'), 2)

  // Q2 — landscape
  if (landscape === 0) addWhere((p) => p.family === 'Soft Floral', 2)
  if (landscape === 1) addWhere((p) => [4, 5, 6].includes(p.id), 2) // wet earth, vetiver, mitti
  if (landscape === 2) addWhere((p) => p.family === 'Deep Amber', 2)
  if (landscape === 3) addWhere((p) => p.family === 'Warm & Woody', 2)

  // Q3 — longevity
  if (longevity === 0) addWhere((p) => maxHours(p) >= 10, 2)
  if (longevity === 1) addWhere((p) => maxHours(p) <= 8, 1)
  if (longevity === 2) addWhere((p) => maxHours(p) >= 6 && maxHours(p) <= 9, 2)
  if (longevity === 3) addWhere((p) => p.intensity === 'Light', 2)

  // Q4 — texture
  if (texture === 0) addWhere((p) => p.family === 'Deep Amber', 2)
  if (texture === 1) addWhere((p) => p.family === 'Bright & Citrus', 2)
  if (texture === 2) addWhere((p) => p.family === 'Soft Floral', 2)
  if (texture === 3) addWhere((p) => p.id === 3 || p.family === 'Warm & Woody', 2)

  // Q5 — climate (mirrors each product's humidity note)
  if (climate === 0) addWhere((p) => [1, 4, 6].includes(p.id), 2) // built for humidity/monsoon
  if (climate === 1) addWhere((p) => [2, 5].includes(p.id), 2) // dry-climate performers
  if (climate === 2) addWhere((p) => [7, 4].includes(p.id), 2) // hill-station friendly
  if (climate === 3) addWhere((p) => [3, 8].includes(p.id), 2) // winter-evening scents

  return [...PRODUCTS].sort((a, b) => scores.get(b.id) - scores.get(a.id)).slice(0, 3)
}

export default function QuizPage({ setPage, setSelectedProduct }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)
  const width = useViewportWidth()

  const answer = (optionIndex) => {
    const next = [...answers, optionIndex]
    setAnswers(next)
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setResults(scoreProducts(next))
    }
  }

  if (results) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: FOREST,
          paddingTop: 98,
          padding: '136px 20px 72px',
        }}
      >
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 10.5,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRASS,
                marginBottom: 14,
              }}
            >
              Your matches
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 34,
                fontWeight: 300,
                fontStyle: 'italic',
                color: CREAM,
                margin: 0,
              }}
            >
              Three fragrances chosen for you
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                width < 640 ? '1fr' : width < 900 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: 20,
              marginBottom: 40,
            }}
          >
            {results.map((product, i) => (
              <div
                key={product.id}
                style={{
                  background: 'rgba(246,241,231,0.07)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `1px solid ${HAIRLINE}`,
                }}
              >
                <div style={{ height: 200, background: '#3a4a39', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82 }}
                  />
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 9.5,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: BRASS,
                      marginBottom: 6,
                    }}
                  >
                    {product.family}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: 18,
                      fontWeight: 400,
                      color: CREAM,
                      margin: '0 0 9px',
                      lineHeight: 1.2,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: 'rgba(246,241,231,0.58)',
                      lineHeight: 1.62,
                      margin: '0 0 16px',
                    }}
                  >
                    {RATIONALES[i]}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => {
                        setSelectedProduct(product)
                        setPage('product')
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: TERRACOTTA,
                        color: CREAM,
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12.5,
                      }}
                    >
                      View fragrance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setStep(0)
                setAnswers([])
                setResults(null)
              }}
              style={{
                background: 'none',
                border: `1px solid ${HAIRLINE}`,
                color: CREAM,
                padding: '11px 26px',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
              }}
            >
              Retake the quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = QUIZ_QUESTIONS[step]
  const bg = STEP_BACKGROUNDS[step % STEP_BACKGROUNDS.length]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        paddingTop: 98,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: width < 768 ? '136px 20px 60px' : '136px 48px 72px',
        transition: 'background 0.5s ease',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 114,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 5,
        }}
      >
        {QUIZ_QUESTIONS.map((q, i) => (
          <div
            key={i}
            style={{
              width: i < step ? 26 : 8,
              height: 4,
              borderRadius: 2,
              background: i < step ? TERRACOTTA : i === step ? CREAM : 'rgba(246,241,231,0.28)',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 10.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: BRASS,
            marginBottom: 22,
          }}
        >
          {step + 1} of {QUIZ_QUESTIONS.length}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(26px, 4vw, 40px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: CREAM,
                margin: '0 0 44px',
                lineHeight: 1.22,
              }}
            >
              {question.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {question.options.map((option, i) => (
                <motion.button
                  key={option}
                  onClick={() => answer(i)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: i * 0.06, ease: EASE }}
                  whileHover={{
                    background: 'rgba(246,241,231,0.18)',
                    borderColor: 'rgba(246,241,231,0.45)',
                    x: 4,
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '17px 22px',
                    background: 'rgba(246,241,231,0.09)',
                    border: '1px solid rgba(246,241,231,0.18)',
                    color: CREAM,
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14.5,
                    textAlign: 'left',
                  }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
