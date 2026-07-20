import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Menu, ShoppingBag, User, X } from 'lucide-react'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, FOREST, CREAM, TERRACOTTA, EASE } from '../theme'

export default function Header({
  page,
  setPage,
  goBack,
  canGoBack,
  cartCount,
  session,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef(null)
  const isMobile = useViewportWidth() < 768

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [page])

  const navLink = (label, target) => (
    <button
      key={target}
      onClick={() => setPage(target)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        fontSize: isMobile ? 16 : 13,
        letterSpacing: '0.03em',
        color: page === target ? CREAM : 'rgba(246,241,231,0.65)',
        fontWeight: page === target ? 500 : 400,
        padding: isMobile ? '14px 0' : '4px 0',
        borderBottom: isMobile
          ? '1px solid rgba(176,141,87,0.12)'
          : page === target
            ? `1px solid ${TERRACOTTA}`
            : '1px solid transparent',
        width: isMobile ? '100%' : 'auto',
        textAlign: isMobile ? 'left' : 'center',
        display: 'block',
      }}
    >
      {label}
    </button>
  )

  const accountMenu = session ? (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setMenuOpen((v) => !v)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        aria-label="Account menu"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: session.avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 12,
            fontWeight: 500,
            color: CREAM,
            border: '2px solid rgba(246,241,231,0.35)',
          }}
        >
          {session.initials}
        </motion.div>
        {!isMobile && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12.5,
              color: 'rgba(246,241,231,0.82)',
              maxWidth: 90,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {session.name.split(' ')[0]}
          </span>
        )}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              background: CREAM,
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(34,31,29,0.18)',
              border: '1px solid rgba(176,141,87,0.22)',
              minWidth: 210,
              zIndex: 200,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid rgba(176,141,87,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: session.avatarColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 13,
                    fontWeight: 500,
                    color: CREAM,
                    flexShrink: 0,
                  }}
                >
                  {session.initials}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: INK,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {session.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11.5,
                      color: 'rgba(34,31,29,0.5)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {session.email}
                  </div>
                </div>
              </div>
            </div>
            {[
              {
                label: 'My Profile',
                icon: <User size={14} />,
                action: () => {
                  setMenuOpen(false)
                  setPage('login')
                },
              },
              {
                label: 'My Orders',
                icon: <ShoppingBag size={14} />,
                action: () => {
                  setMenuOpen(false)
                  setPage('orders')
                },
              },
            ].map(({ label, icon, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '11px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  color: INK,
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(176,141,87,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <span style={{ color: 'rgba(34,31,29,0.45)' }}>{icon}</span>
                {label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid rgba(176,141,87,0.18)' }}>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  onLogout()
                }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '11px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  color: '#d4183d',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,24,61,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <X size={14} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null

  return (
    <>
      <motion.nav
        initial={{ y: -98, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 36,
          left: 0,
          right: 0,
          zIndex: 100,
          background: FOREST,
          padding: isMobile ? '0 20px' : '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 62,
          borderBottom: '1px solid rgba(176,141,87,0.18)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AnimatePresence>
            {canGoBack && !isMobile && (
              <motion.button
                onClick={goBack}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: EASE }}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(246,241,231,0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 8px 4px 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                }}
                aria-label="Go back"
              >
                <ChevronLeft size={15} /> Back
              </motion.button>
            )}
          </AnimatePresence>
          {isMobile && canGoBack && (
            <button
              onClick={goBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(246,241,231,0.65)',
                display: 'flex',
                padding: 4,
              }}
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button
            onClick={() => setPage('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: isMobile ? 19 : 21,
                color: CREAM,
                letterSpacing: '-0.01em',
              }}
            >
              Ittra
            </span>
          </button>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: 32 }}>
            {navLink('Home', 'home')}
            {navLink('Shop', 'shop')}
            {navLink('The Scent Finder', 'quiz')}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 18 }}>
          <button
            onClick={() => setPage('cart')}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: CREAM,
              padding: 4,
              display: 'flex',
            }}
            aria-label={`Bag — ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -1,
                  right: -3,
                  background: TERRACOTTA,
                  color: CREAM,
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  fontSize: 9.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Space Grotesk', monospace",
                  fontWeight: 500,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          {!isMobile &&
            (session ? (
              accountMenu
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => setPage('login')}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(246,241,231,0.35)',
                    cursor: 'pointer',
                    color: 'rgba(246,241,231,0.82)',
                    padding: '6px 16px',
                    borderRadius: 5,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => setPage('register')}
                  style={{
                    background: TERRACOTTA,
                    border: 'none',
                    cursor: 'pointer',
                    color: CREAM,
                    padding: '6px 16px',
                    borderRadius: 5,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Register
                </button>
              </div>
            ))}
          {isMobile && (
            <button
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: CREAM,
                padding: 4,
                display: 'flex',
              }}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </motion.nav>
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              position: 'fixed',
              top: 98,
              left: 0,
              right: 0,
              zIndex: 99,
              background: FOREST,
              padding: '8px 24px 20px',
              borderBottom: '1px solid rgba(176,141,87,0.2)',
              boxShadow: '0 8px 32px rgba(34,31,29,0.22)',
            }}
          >
            {navLink('Home', 'home')}
            {navLink('Shop', 'shop')}
            {navLink('The Scent Finder', 'quiz')}
            <div style={{ paddingTop: 14, marginTop: 4, borderTop: '1px solid rgba(176,141,87,0.18)' }}>
              {session ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: session.avatarColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: 12,
                        fontWeight: 500,
                        color: CREAM,
                      }}
                    >
                      {session.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 14,
                          color: CREAM,
                          fontWeight: 500,
                        }}
                      >
                        {session.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: 'rgba(246,241,231,0.55)',
                        }}
                      >
                        {session.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      setPage('login')
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(246,241,231,0.75)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      padding: '10px 0',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      setPage('orders')
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(246,241,231,0.75)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      padding: '10px 0',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      onLogout()
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#f4817a',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      padding: '10px 0',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      setPage('login')
                    }}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: '1px solid rgba(246,241,231,0.35)',
                      cursor: 'pointer',
                      color: CREAM,
                      padding: '10px 0',
                      borderRadius: 5,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      setPage('register')
                    }}
                    style={{
                      flex: 1,
                      background: TERRACOTTA,
                      border: 'none',
                      cursor: 'pointer',
                      color: CREAM,
                      padding: '10px 0',
                      borderRadius: 5,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
