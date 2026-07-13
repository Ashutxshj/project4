import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Ticker from './components/Ticker'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import QuizPage from './pages/QuizPage'
import CartPage from './pages/CartPage'
import AuthPage from './pages/AuthPage'
import OrdersPage from './pages/OrdersPage'
import { authService } from './api'
import { CREAM, FOREST, EASE } from './theme'

const CART_KEY = 'cart'

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function App() {
  // page ∈ home | shop | product | cart | login | register | orders | quiz
  // ('auth' is kept as an alias for login so older internal links keep working)
  const [page, setPageState] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [shopFilters, setShopFilters] = useState(null)
  const [session, setSession] = useState(() => authService.getSession())
  const [cart, setCartState] = useState(readCart)
  const [toast, setToast] = useState(null)
  const historyRef = useRef([])
  const toastTimer = useRef(null)

  const setCart = useCallback((next) => {
    setCartState(next)
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [])

  const showToast = useCallback((message, tone = 'default') => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ message, tone, key: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])

  useEffect(() => () => toastTimer.current && clearTimeout(toastTimer.current), [])

  const setPage = useCallback((next) => {
    setPageState((prev) => {
      if (next !== prev) historyRef.current = [...historyRef.current, prev].slice(-24)
      return next
    })
    // Plain navigation to the shop always starts unfiltered;
    // openShop() below re-applies filters in the same render batch.
    setShopFilters(null)
    window.scrollTo(0, 0)
  }, [])

  // Mood tiles on the home page open the shop pre-filtered.
  const openShop = useCallback(
    (filters = null) => {
      setPage('shop')
      setShopFilters(filters)
    },
    [setPage]
  )

  const goBack = useCallback(() => {
    const stack = historyRef.current
    if (stack.length === 0) return
    const prev = stack[stack.length - 1]
    historyRef.current = stack.slice(0, -1)
    setPageState(prev)
    setShopFilters(null)
    window.scrollTo(0, 0)
  }, [])

  const handleAuthed = useCallback(
    (nextSession) => {
      setSession(nextSession)
    },
    []
  )

  const handleLogout = useCallback(() => {
    authService.logout()
    setSession(null)
    showToast('Signed out. Your bag is saved for next time.')
    setPage('home')
  }, [setPage, showToast])

  const view = page === 'auth' ? 'login' : page

  let content
  switch (view) {
    case 'shop':
      content = (
        <ShopPage
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          initialFilters={shopFilters}
        />
      )
      break
    case 'product':
      content = selectedProduct ? (
        <ProductPage
          product={selectedProduct}
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          cart={cart}
          setCart={setCart}
        />
      ) : (
        <ShopPage setPage={setPage} setSelectedProduct={setSelectedProduct} />
      )
      break
    case 'cart':
      content = (
        <CartPage
          cart={cart}
          setCart={setCart}
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          session={session}
        />
      )
      break
    case 'quiz':
      content = <QuizPage setPage={setPage} setSelectedProduct={setSelectedProduct} />
      break
    case 'login':
      content = (
        <AuthPage
          key="login"
          mode="login"
          setPage={setPage}
          session={session}
          onAuthed={handleAuthed}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )
      break
    case 'register':
      content = (
        <AuthPage
          key="register"
          mode="register"
          setPage={setPage}
          session={session}
          onAuthed={handleAuthed}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )
      break
    case 'orders':
      content = (
        <OrdersPage
          setPage={setPage}
          session={session}
          cart={cart}
          setCart={setCart}
          showToast={showToast}
        />
      )
      break
    default:
      content = (
        <HomePage
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          openShop={openShop}
        />
      )
  }

  const viewKey = view === 'product' && selectedProduct ? `product-${selectedProduct.id}` : view

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <Ticker />
      <Header
        page={view}
        setPage={setPage}
        goBack={goBack}
        canGoBack={historyRef.current.length > 0 && view !== 'home'}
        cartCount={cart.length}
        session={session}
        onLogout={handleLogout}
      />
      <AnimatePresence mode="wait">
        <motion.main
          key={viewKey}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {content}
        </motion.main>
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            initial={{ opacity: 0, y: 24, x: '-50%', scale: 0.96 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 16, x: '-50%', scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{
              position: 'fixed',
              bottom: 28,
              left: '50%',
              zIndex: 400,
              background: toast.tone === 'error' ? '#d4183d' : FOREST,
              color: CREAM,
              padding: '12px 22px',
              borderRadius: 6,
              boxShadow: '0 10px 34px rgba(34,31,29,0.3)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              maxWidth: 'calc(100vw - 40px)',
              textAlign: 'center',
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
