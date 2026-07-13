import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { apiCreateOrder } from '../api'
import { PRODUCTS } from '../data/products'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, FOREST, CREAM, TERRACOTTA, BRASS, SAGE_CARD, HAIRLINE } from '../theme'

export default function CartPage({ cart, setCart, setPage, setSelectedProduct, session }) {
  const [step, setStep] = useState('cart')
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const isMobile = useViewportWidth() < 768
  const discoveryCredit = cart
    .filter((item) => item.isDiscovery)
    .reduce((sum, item) => sum + item.price, 0)
  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    pincode: '',
  })
  const [processing, setProcessing] = useState(false)
  const [payError, setPayError] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  const fieldKeys = {
    'Full name': 'fullName',
    'Email address': 'email',
    Phone: 'phone',
    'Address line 1': 'addressLine1',
    City: 'city',
    Pincode: 'pincode',
  }

  const proceedToShipping = () => {
    if (!session) {
      setPage('login')
      return
    }
    setStep('shipping')
  }

  const placeOrder = async (simulateFail) => {
    setPayError('')
    setProcessing(true)
    const res = await apiCreateOrder(cart, shipping, simulateFail)
    setProcessing(false)
    if (!res.ok) {
      setPayError(res.error || 'Payment failed. Please try again.')
      return
    }
    setOrderNumber(res.order?.orderNumber || '')
    setStep('confirmed')
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: SAGE_CARD,
    border: `1px solid ${HAIRLINE}`,
    borderRadius: 4,
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    color: INK,
    outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block',
    fontFamily: "'Space Grotesk', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: INK,
    opacity: 0.55,
    marginBottom: 6,
  }

  if (step === 'confirmed') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: CREAM,
          paddingTop: 98,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '116px 48px',
        }}
      >
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: FOREST,
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={22} color={CREAM} />
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 28,
              fontWeight: 400,
              color: INK,
              marginBottom: 8,
            }}
          >
            Order confirmed
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              color: INK,
              opacity: 0.6,
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            Your order has been received. A dispatch note will follow within 24 hours.
          </p>
          <div style={{ background: SAGE_CARD, borderRadius: 4, padding: '22px 24px', textAlign: 'left' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: BRASS,
                marginBottom: 14,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Ledger receipt</span>
              {orderNumber && <span style={{ opacity: 0.8 }}>{orderNumber}</span>}
            </div>
            {cart.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 11.5,
                  color: INK,
                  padding: '7px 0',
                  borderBottom: `1px solid ${HAIRLINE}`,
                }}
              >
                <span style={{ opacity: 0.75 }}>
                  {item.name} — {item.size.split('—')[0].trim()}
                </span>
                <span>₹{item.price.toLocaleString('en-IN')}</span>
              </div>
            ))}
            {discoveryCredit > 0 && (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11.5,
                  color: FOREST,
                  padding: '7px 0',
                  borderBottom: `1px solid ${HAIRLINE}`,
                }}
              >
                Discovery credit toward full bottle: ₹{discoveryCredit.toLocaleString('en-IN')}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 14,
                color: INK,
                padding: '14px 0 0',
                fontWeight: 500,
              }}
            >
              <span>Total charged</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setCart([])
              setPage('home')
              setStep('cart')
              setOrderNumber('')
              setPayError('')
            }}
            style={{
              marginTop: 24,
              background: TERRACOTTA,
              color: CREAM,
              border: 'none',
              borderRadius: 4,
              padding: '12px 30px',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
            }}
          >
            Continue shopping
          </button>
        </div>
      </div>
    )
  }

  const stepOrder = { cart: 0, shipping: 1, payment: 2, confirmed: 3 }
  const steps = [
    ['Cart', 'cart'],
    ['Shipping', 'shipping'],
    ['Payment', 'payment'],
  ]

  return (
    <div style={{ minHeight: '100vh', background: CREAM, paddingTop: 98 }}>
      <div
        style={{ maxWidth: 880, margin: '0 auto', padding: isMobile ? '28px 16px' : '44px 48px' }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 26,
            fontWeight: 400,
            color: INK,
            margin: '0 0 28px',
          }}
        >
          Your bag
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 38 }}>
          {steps.map(([label, key], i) => {
            const done = stepOrder[key] < stepOrder[step]
            const current = key === step
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: done ? FOREST : current ? TERRACOTTA : 'transparent',
                      border: `1px solid ${done ? FOREST : current ? TERRACOTTA : HAIRLINE}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 10.5,
                      color: done || current ? CREAM : INK,
                    }}
                  >
                    {done ? <Check size={12} /> : i + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: current ? INK : 'rgba(34,31,29,0.42)',
                      fontWeight: current ? 500 : 400,
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 28, height: 1, background: HAIRLINE }} />
                )}
              </div>
            )
          })}
        </div>

        {step === 'cart' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
              gap: isMobile ? 28 : 44,
            }}
          >
            <div>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '56px 0' }}>
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: 22,
                      color: INK,
                      opacity: 0.38,
                      marginBottom: 20,
                    }}
                  >
                    Your bag is empty
                  </p>
                  <button
                    onClick={() => setPage('shop')}
                    style={{
                      background: TERRACOTTA,
                      color: CREAM,
                      border: 'none',
                      borderRadius: 4,
                      padding: '12px 26px',
                      cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13.5,
                    }}
                  >
                    Browse fragrances
                  </button>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 16,
                      padding: '18px 0',
                      borderBottom: `1px solid ${HAIRLINE}`,
                    }}
                  >
                    <div
                      onClick={() => {
                        const product = PRODUCTS.find(
                          (p) => p.id === item.id || p.name === item.name
                        )
                        if (product) {
                          setSelectedProduct(product)
                          setPage('product')
                        }
                      }}
                      style={{ display: 'flex', gap: 16, cursor: 'pointer', flex: 1 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 76,
                          height: 96,
                          objectFit: 'cover',
                          borderRadius: 3,
                          background: SAGE_CARD,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: 15.5,
                            color: INK,
                            marginBottom: 4,
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Space Grotesk', monospace",
                            fontSize: 10,
                            letterSpacing: '0.07em',
                            textTransform: 'uppercase',
                            color: INK,
                            opacity: 0.45,
                            marginBottom: 9,
                          }}
                        >
                          {item.size.split('—')[0].trim()}
                        </div>
                        {item.isDiscovery && (
                          <div
                            style={{
                              display: 'inline-block',
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 11,
                              color: FOREST,
                              background: 'rgba(47,59,46,0.09)',
                              padding: '3px 9px',
                              borderRadius: 2,
                            }}
                          >
                            ₹{item.price.toLocaleString('en-IN')} credited toward full bottle
                            within 30 days
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 13.5, color: INK }}
                      >
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => setCart(cart.filter((_, idx) => idx !== i))}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: INK,
                          opacity: 0.35,
                          display: 'flex',
                        }}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div
                style={{
                  padding: '22px 24px',
                  background: SAGE_CARD,
                  borderRadius: 4,
                  height: 'fit-content',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: BRASS,
                    marginBottom: 18,
                  }}
                >
                  Order summary
                </div>
                {cart.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 11.5,
                      color: INK,
                      padding: '6px 0',
                      borderBottom: `1px solid ${HAIRLINE}`,
                    }}
                  >
                    <span style={{ opacity: 0.65 }}>
                      {item.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span>₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                {discoveryCredit > 0 && (
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11.5,
                      color: FOREST,
                      padding: '8px 0',
                      borderBottom: `1px solid ${HAIRLINE}`,
                    }}
                  >
                    Discovery credit: ₹{discoveryCredit.toLocaleString('en-IN')} → applies to full
                    bottle
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 14.5,
                    color: INK,
                    padding: '15px 0',
                    fontWeight: 500,
                  }}
                >
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={proceedToShipping}
                  style={{
                    width: '100%',
                    padding: '13px',
                    background: TERRACOTTA,
                    color: CREAM,
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                  }}
                >
                  Proceed to shipping
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'shipping' && (
          <div style={{ maxWidth: 460 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 22,
                color: INK,
                marginBottom: 26,
              }}
            >
              Shipping details
            </h2>
            {[
              ['Full name', 'text'],
              ['Email address', 'email'],
              ['Phone', 'tel'],
              ['Address line 1', 'text'],
              ['City', 'text'],
              ['Pincode', 'text'],
            ].map(([label, type]) => {
              const key = fieldKeys[label]
              return (
                <div key={label} style={{ marginBottom: 15 }}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type={type}
                    style={inputStyle}
                    value={shipping[key]}
                    onChange={(e) => setShipping((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              )
            })}
            <button
              onClick={() => setStep('payment')}
              style={{
                width: '100%',
                marginTop: 8,
                padding: '14px',
                background: TERRACOTTA,
                color: CREAM,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Continue to payment
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div style={{ maxWidth: 460 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 22,
                color: INK,
                marginBottom: 26,
              }}
            >
              Payment
            </h2>
            <div style={{ marginBottom: 15 }}>
              <label style={labelStyle}>Card number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                style={{ ...inputStyle, fontFamily: "'Space Grotesk', monospace" }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
                marginBottom: 22,
              }}
            >
              <div>
                <label style={labelStyle}>Expiry</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  style={{ ...inputStyle, fontFamily: "'Space Grotesk', monospace" }}
                />
              </div>
              <div>
                <label style={labelStyle}>CVV</label>
                <input
                  type="text"
                  placeholder="• • •"
                  style={{ ...inputStyle, fontFamily: "'Space Grotesk', monospace" }}
                />
              </div>
            </div>
            <div
              style={{
                padding: '12px 14px',
                background: 'rgba(176,141,87,0.1)',
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 4,
                marginBottom: 18,
                fontFamily: "'Inter', sans-serif",
                fontSize: 12.5,
                color: INK,
                lineHeight: 1.55,
              }}
            >
              Total charged: <strong>₹{total.toLocaleString('en-IN')}</strong>
              {discoveryCredit > 0 &&
                ` — ₹${discoveryCredit.toLocaleString('en-IN')} discovery credit shown separately in your account`}
            </div>
            {payError && (
              <div
                style={{
                  padding: '10px 14px',
                  background: 'rgba(212,24,61,0.08)',
                  border: '1px solid rgba(212,24,61,0.3)',
                  borderRadius: 4,
                  marginBottom: 18,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                  color: '#d4183d',
                }}
              >
                {payError}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                disabled={processing}
                onClick={() => placeOrder(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: TERRACOTTA,
                  color: CREAM,
                  border: 'none',
                  borderRadius: 4,
                  cursor: processing ? 'default' : 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  opacity: processing ? 0.7 : 1,
                }}
              >
                {processing ? 'Processing…' : 'Confirm order'}
              </button>
              <button
                disabled={processing}
                onClick={() => placeOrder(true)}
                style={{
                  padding: '14px 18px',
                  background: 'transparent',
                  color: INK,
                  border: `1px solid ${HAIRLINE}`,
                  borderRadius: 4,
                  cursor: processing ? 'default' : 'pointer',
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                }}
              >
                Simulate fail
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
