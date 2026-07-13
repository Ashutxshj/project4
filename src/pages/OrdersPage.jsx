import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, PackageOpen, RotateCcw } from 'lucide-react'
import { apiGetMyOrders } from '../api'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, FOREST, CREAM, TERRACOTTA, BRASS, SAGE_CARD, HAIRLINE, EASE } from '../theme'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function OrdersPage({ setPage, session, cart, setCart, showToast }) {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [orders, setOrders] = useState([])
  const isMobile = useViewportWidth() < 768

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      const res = await apiGetMyOrders()
      if (!res.ok) {
        setStatus('error')
        return
      }
      setOrders(res.orders)
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    if (session) load()
  }, [session, load])

  const reorder = (order) => {
    setCart([...cart, ...order.items])
    showToast(
      `${order.items.length} ${order.items.length === 1 ? 'item' : 'items'} added back to your bag.`
    )
    setPage('cart')
  }

  const centered = (children) => (
    <div style={{ textAlign: 'center', padding: '72px 0' }}>{children}</div>
  )

  let body
  if (!session) {
    body = centered(
      <>
        <p
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22,
            color: INK,
            opacity: 0.45,
            margin: '0 0 10px',
          }}
        >
          Sign in to view your orders
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: INK,
            opacity: 0.55,
            margin: '0 0 24px',
          }}
        >
          Your order history lives in your Muskara account.
        </p>
        <button
          onClick={() => setPage('login')}
          style={{
            background: TERRACOTTA,
            color: CREAM,
            border: 'none',
            borderRadius: 4,
            padding: '12px 28px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          Sign in
        </button>
      </>
    )
  } else if (status === 'loading') {
    body = centered(
      <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: `2px solid ${HAIRLINE}`,
            borderTopColor: TERRACOTTA,
            margin: '0 auto 18px',
          }}
        />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            color: INK,
            opacity: 0.55,
            margin: 0,
          }}
        >
          Loading your orders...
        </p>
      </>
    )
  } else if (status === 'error') {
    body = centered(
      <>
        <AlertCircle size={34} style={{ color: '#d4183d', opacity: 0.8, marginBottom: 14 }} />
        <p
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22,
            color: INK,
            margin: '0 0 8px',
          }}
        >
          Could not load orders
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: INK,
            opacity: 0.55,
            margin: '0 0 24px',
          }}
        >
          Could not reach the server. Please check your connection.
        </p>
        <button
          onClick={load}
          style={{
            background: 'transparent',
            color: INK,
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 4,
            padding: '11px 26px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
          }}
        >
          Try again
        </button>
      </>
    )
  } else if (orders.length === 0) {
    body = centered(
      <>
        <PackageOpen size={36} style={{ color: BRASS, opacity: 0.7, marginBottom: 14 }} />
        <p
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22,
            color: INK,
            margin: '0 0 8px',
          }}
        >
          No orders yet
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: INK,
            opacity: 0.55,
            margin: '0 0 24px',
            lineHeight: 1.6,
          }}
        >
          Start exploring our collection and place your first order
        </p>
        <button
          onClick={() => setPage('shop')}
          style={{
            background: TERRACOTTA,
            color: CREAM,
            border: 'none',
            borderRadius: 4,
            padding: '12px 28px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          Start shopping
        </button>
      </>
    )
  } else {
    body = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {orders.map((order, i) => (
          <motion.div
            key={order.orderNumber}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
            style={{
              background: SAGE_CARD,
              borderRadius: 6,
              border: `1px solid ${HAIRLINE}`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
                padding: '14px 20px',
                borderBottom: `1px solid ${HAIRLINE}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    color: INK,
                    fontWeight: 500,
                  }}
                >
                  {order.orderNumber}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11.5,
                    color: INK,
                    opacity: 0.5,
                  }}
                >
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 9.5,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: CREAM,
                  background: FOREST,
                  padding: '4px 11px',
                  borderRadius: 3,
                }}
              >
                {order.status}
              </span>
            </div>
            <div style={{ padding: '6px 20px' }}>
              {order.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '11px 0',
                    borderBottom:
                      j < order.items.length - 1 ? `1px solid ${HAIRLINE}` : 'none',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 42,
                      height: 54,
                      objectFit: 'cover',
                      borderRadius: 3,
                      background: '#c8c0b0',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: 14,
                        color: INK,
                        lineHeight: 1.25,
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: 9.5,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: INK,
                        opacity: 0.45,
                        marginTop: 2,
                      }}
                    >
                      {item.size ? item.size.split('—')[0].trim() : ''}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: 12.5,
                      color: INK,
                      flexShrink: 0,
                    }}
                  >
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10,
                padding: '13px 20px 16px',
                borderTop: `1px solid ${HAIRLINE}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 13.5,
                  color: INK,
                  fontWeight: 500,
                }}
              >
                Total ₹{order.total.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => reorder(order)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'transparent',
                  color: TERRACOTTA,
                  border: `1px solid ${TERRACOTTA}`,
                  borderRadius: 4,
                  padding: '8px 18px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                }}
              >
                <RotateCcw size={13} /> Reorder
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: CREAM, paddingTop: 98 }}>
      <div
        style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '28px 16px 64px' : '44px 24px 88px' }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 28,
            fontWeight: 400,
            color: INK,
            margin: '0 0 6px',
          }}
        >
          My Orders
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            color: INK,
            opacity: 0.55,
            margin: '0 0 34px',
          }}
        >
          Track your purchases and delivery status
        </p>
        {body}
      </div>
    </div>
  )
}
