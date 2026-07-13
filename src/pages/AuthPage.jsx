import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { authService } from '../api'
import { useViewportWidth } from '../hooks/useViewportWidth'
import { INK, CREAM, TERRACOTTA, BRASS, SAGE_CARD, HAIRLINE, EASE } from '../theme'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  background: '#EDE8DC',
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

const errorTextStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 11.5,
  color: '#d4183d',
  marginTop: 5,
}

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

export default function AuthPage({ mode, setPage, session, onAuthed, onLogout, showToast }) {
  const isLogin = mode === 'login'
  const isMobile = useViewportWidth() < 768
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setApiError('')
  }

  const validate = () => {
    const next = {}
    if (!isLogin && !form.fullName.trim()) next.fullName = 'Full name is required'
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address'
    if (!form.password) {
      next.password = 'Password is required'
    } else if (!isLogin && form.password.length < 6) {
      next.password = 'Password must be at least 6 characters'
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setApiError('')
    if (isLogin) {
      const res = await authService.login(form.email, form.password)
      setSubmitting(false)
      if (!res.ok) {
        setApiError(res.error || 'Invalid email or password.')
        return
      }
      onAuthed(res.session)
      showToast(`Welcome back, ${res.session.name.split(' ')[0]}.`)
      setPage('home')
    } else {
      const reg = await authService.register(form.fullName, form.email, '', form.password)
      if (!reg.ok) {
        setSubmitting(false)
        setApiError(reg.error || 'Could not create your account. Please try again.')
        return
      }
      const res = await authService.login(form.email, form.password)
      setSubmitting(false)
      showToast('Account created!')
      if (res.ok) {
        onAuthed(res.session)
        setPage('home')
      } else {
        setPage('login')
      }
    }
  }

  const pageShell = (children) => (
    <div
      style={{
        minHeight: '100vh',
        background: CREAM,
        paddingTop: 98,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          width: '100%',
          maxWidth: 420,
          margin: isMobile ? '28px 16px 60px' : '56px 24px 80px',
        }}
      >
        {children}
      </motion.div>
    </div>
  )

  // Signed-in visitors landing on "My Profile" / login see their account card instead.
  if (session) {
    return pageShell(
      <div
        style={{
          background: SAGE_CARD,
          borderRadius: 6,
          border: `1px solid ${HAIRLINE}`,
          padding: '34px 30px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: '50%',
            background: session.avatarColor,
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 20,
            fontWeight: 500,
            color: CREAM,
          }}
        >
          {session.initials}
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 24,
            fontWeight: 400,
            color: INK,
            margin: '0 0 4px',
          }}
        >
          {session.name}
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: INK,
            opacity: 0.55,
            margin: '0 0 26px',
          }}
        >
          {session.email}
        </p>
        <button
          onClick={() => setPage('orders')}
          style={{
            width: '100%',
            padding: '13px',
            background: TERRACOTTA,
            color: CREAM,
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <ShoppingBag size={15} /> My Orders
        </button>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '13px',
            background: 'transparent',
            color: '#d4183d',
            border: '1px solid rgba(212,24,61,0.35)',
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <X size={15} /> Logout
        </button>
      </div>
    )
  }

  const field = (label, key, type, placeholder) => (
    <div style={{ marginBottom: 15 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: errors[key] ? 'rgba(212,24,61,0.55)' : undefined,
        }}
      />
      {errors[key] && <div style={errorTextStyle}>{errors[key]}</div>}
    </div>
  )

  return pageShell(
    <>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 10.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: BRASS,
            marginBottom: 12,
          }}
        >
          Muskara Perfumes
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: INK,
            margin: '0 0 8px',
          }}
        >
          {isLogin ? 'Welcome back' : 'Join Muskara'}
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            color: INK,
            opacity: 0.58,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {isLogin
            ? 'Sign in to your account to continue.'
            : 'Save your scent journal, track discovery credits, and get early access to limited batches.'}
        </p>
      </div>

      <form
        onSubmit={submit}
        noValidate
        style={{
          background: SAGE_CARD,
          borderRadius: 6,
          border: `1px solid ${HAIRLINE}`,
          padding: isMobile ? '26px 20px' : '30px 28px',
        }}
      >
        {!isLogin && field('Full name', 'fullName', 'text', 'Asha Verma')}
        {field('Email', 'email', 'email', 'you@example.com')}
        <div style={{ marginBottom: isLogin ? 8 : 15 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={labelStyle}>Password</label>
            {isLogin && (
              <button
                type="button"
                onClick={() =>
                  showToast('Password reset is not available in this replica — try registering.')
                }
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11.5,
                  color: TERRACOTTA,
                }}
              >
                Forgot password?
              </button>
            )}
          </div>
          <input
            type="password"
            value={form.password}
            onChange={set('password')}
            placeholder="••••••••"
            style={{
              ...inputStyle,
              borderColor: errors.password ? 'rgba(212,24,61,0.55)' : undefined,
            }}
          />
          {errors.password && <div style={errorTextStyle}>{errors.password}</div>}
        </div>
        {!isLogin && field('Confirm password', 'confirmPassword', 'password', '••••••••')}

        {apiError && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(212,24,61,0.08)',
              border: '1px solid rgba(212,24,61,0.3)',
              borderRadius: 4,
              margin: '4px 0 14px',
              fontFamily: "'Inter', sans-serif",
              fontSize: 12.5,
              color: '#d4183d',
            }}
          >
            {apiError}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            marginTop: 8,
            padding: '14px',
            background: TERRACOTTA,
            color: CREAM,
            border: 'none',
            borderRadius: 4,
            cursor: submitting ? 'default' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting
            ? isLogin
              ? 'Signing in…'
              : 'Creating account…'
            : isLogin
              ? 'Sign in'
              : 'Create account'}
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, background: HAIRLINE }} />
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: INK,
              opacity: 0.45,
            }}
          >
            or
          </span>
          <div style={{ flex: 1, height: 1, background: HAIRLINE }} />
        </div>

        <button
          type="button"
          onClick={() => showToast('Google sign-in is not wired up in this replica.')}
          style={{
            width: '100%',
            padding: '13px',
            background: CREAM,
            color: INK,
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <GoogleIcon /> Continue with Google
        </button>

        {!isLogin && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11.5,
              color: INK,
              opacity: 0.5,
              textAlign: 'center',
              lineHeight: 1.6,
              margin: '16px 0 0',
            }}
          >
            By creating an account you agree to our{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        )}
      </form>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: INK,
          opacity: 0.62,
          textAlign: 'center',
          marginTop: 22,
        }}
      >
        {isLogin ? 'New to Muskara?' : 'Already have an account?'}{' '}
        <button
          onClick={() => setPage(isLogin ? 'register' : 'login')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: TERRACOTTA,
            fontWeight: 500,
          }}
        >
          {isLogin ? 'Create an account' : 'Sign in'}
        </button>
      </p>
    </>
  )
}
