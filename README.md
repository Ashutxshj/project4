# muskara-react

Exact replica of [muskara-perfume-website.vercel.app](https://muskara-perfume-website.vercel.app/) — an artisanal Indian perfume store — built with **React + Vite**, Tailwind CSS v4, and Framer Motion.

Single-URL SPA (no router): views switch through a `page` state — home, shop, product, cart, login, register, orders, and the 5-step Scent Finder quiz. The backend is a self-contained mock in `src/api/` (local product data + localStorage for auth, cart, and orders), so the whole site runs offline with realistic loading/error states.

## How to run

```bash
npm install
npm run dev
```

Open the URL Vite prints (default **http://localhost:5173**).

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

No environment variables needed. Product images are hotlinked from Unsplash, so an internet connection is needed for images only — everything else (auth, cart, checkout, orders) works fully offline.

## Trying the mock features

- **Register/login** — any details work; the account is stored in localStorage.
- **Checkout** — has a "Simulate fail" button on the payment step to see the failure state; a successful order lands in My Orders.
- **Scent Finder** — answer the 5 questions to get three matched fragrances with rationale.
