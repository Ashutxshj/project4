import { INK, BRASS } from '../theme'

const ANNOUNCEMENTS = [
  'Free shipping on orders above ₹2,000',
  'Discovery 5ml kits ship within 24 hours',
  'New: Kashmir Saffron Oud — Batch KSO-2024-0109',
  'Kannauj jasmine harvest 2024 now in stock',
  'Every sample credited toward your full bottle',
  'Mysore sandalwood — GC/MS verified, alpha-santalol 46%+',
]

export default function Ticker() {
  const line = ANNOUNCEMENTS.join('   ·   ')
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 102,
        height: 36,
        background: INK,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: ticker 40s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="ticker-track">
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: BRASS,
              paddingRight: 80,
            }}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
