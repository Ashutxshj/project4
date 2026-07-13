// Self-contained mock backend.
// Exposes the exact same surface as the original REST client
// (auth/register, auth/login, products, orders, orders/mine) but is
// implemented against local JSON product data + localStorage, with
// simulated network latency so every loading state still renders.
import { PRODUCTS } from '../data/products'

const TOKEN_KEY = 'auth' // bearer-token store
const SESSION_KEY = 'rosebud_session' // session object (same key as original)
const USERS_KEY = 'muskara_users' // registered accounts store
const ORDERS_KEY = 'muskara_orders' // orders store, keyed by email

const AVATAR_COLORS = ['#B8695C', '#2F3B2E', '#B08D57', '#7C9571', '#6B4E3D']

const delay = (ms = 550) => new Promise((res) => setTimeout(res, ms))

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

function makeToken(email) {
  return btoa(`${email}:${Date.now()}:${Math.random().toString(36).slice(2)}`)
}

function initialsOf(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function avatarColorOf(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return AVATAR_COLORS[h % AVATAR_COLORS.length]
}

function sessionFor(user) {
  return {
    name: user.name,
    email: user.email,
    initials: initialsOf(user.name),
    avatarColor: avatarColorOf(user.name),
  }
}

function currentEmail() {
  const token = getToken()
  if (!token) return null
  try {
    return atob(token).split(':')[0] || null
  } catch {
    return null
  }
}

export async function apiRegister(name, email, phone, password) {
  await delay(700)
  const users = readJSON(USERS_KEY, [])
  const key = email.trim().toLowerCase()
  if (users.some((u) => u.email === key)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  users.push({ name: name.trim(), email: key, phone: phone || '', password })
  writeJSON(USERS_KEY, users)
  return { ok: true }
}

export async function apiLogin(email, password) {
  await delay(650)
  const users = readJSON(USERS_KEY, [])
  const user = users.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  )
  if (!user) {
    return { ok: false, error: 'Invalid email or password.' }
  }
  const token = makeToken(user.email)
  setToken(token)
  return { ok: true, token, session: sessionFor(user) }
}

export function apiLogout() {
  clearToken()
}

export async function apiGetProducts() {
  await delay(400)
  return { ok: true, products: PRODUCTS }
}

export async function apiCreateOrder(items, shipping, simulateFail = false) {
  await delay(900)
  const email = currentEmail()
  if (!email) {
    return { ok: false, error: 'Please sign in to place an order.' }
  }
  if (simulateFail) {
    return { ok: false, error: 'Payment failed. Please try again.' }
  }
  const all = readJSON(ORDERS_KEY, {})
  const mine = all[email] || []
  const order = {
    orderNumber: `MSK-${String(Date.now()).slice(-8)}`,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    items,
    shipping,
    total: items.reduce((sum, it) => sum + it.price, 0),
  }
  all[email] = [order, ...mine]
  writeJSON(ORDERS_KEY, all)
  return { ok: true, order }
}

export async function apiGetMyOrders() {
  await delay(600)
  const email = currentEmail()
  if (!email) {
    return { ok: false, error: 'Could not load orders' }
  }
  const all = readJSON(ORDERS_KEY, {})
  return { ok: true, orders: all[email] || [] }
}

// Session-facing auth service (same shape the original app used).
export const authService = {
  async register(name, email, phone, password) {
    return await apiRegister(name, email, phone, password)
  },
  async login(email, password) {
    const res = await apiLogin(email, password)
    if (res.ok && res.session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(res.session))
    }
    return res
  },
  getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
  logout() {
    apiLogout()
    localStorage.removeItem(SESSION_KEY)
  },
}
