// Hand-drawn botanical note icons rendered as inline SVG line art.
export default function NoteIcon({ type, size = 20 }) {
  const s = size
  const h = s / 2
  const icons = {
    rose: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse
            key={r}
            cx={h}
            cy={h - s * 0.3}
            rx={s * 0.22}
            ry={s * 0.32}
            transform={`rotate(${r} ${h} ${h})`}
          />
        ))}
        <circle cx={h} cy={h} r={s * 0.12} fill="currentColor" />
      </g>
    ),
    jasmine: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse
            key={r}
            cx={h}
            cy={h - s * 0.32}
            rx={s * 0.13}
            ry={s * 0.28}
            transform={`rotate(${r} ${h} ${h})`}
          />
        ))}
        <circle cx={h} cy={h} r={s * 0.1} fill="currentColor" />
      </g>
    ),
    citrus: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <circle cx={h} cy={h} r={s * 0.4} />
        {[0, 45, 90, 135].map((r) => (
          <line
            key={r}
            x1={h}
            y1={s * 0.1}
            x2={h}
            y2={s * 0.9}
            transform={`rotate(${r} ${h} ${h})`}
          />
        ))}
        <circle cx={h} cy={h} r={s * 0.12} fill="currentColor" />
      </g>
    ),
    oud: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d={`M${h - s * 0.1} ${s * 0.12} L${s * 0.84} ${s * 0.28} L${s * 0.88} ${s * 0.78} L${h + s * 0.04} ${s * 0.9} L${s * 0.14} ${s * 0.82} L${s * 0.1} ${h} Z`}
        />
        <line x1={h - s * 0.1} y1={s * 0.12} x2={s * 0.88} y2={s * 0.78} />
      </g>
    ),
    sandalwood: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <circle cx={h} cy={h} r={s * 0.42} />
        <circle cx={h} cy={h} r={s * 0.28} />
        <circle cx={h} cy={h} r={s * 0.12} />
        <line x1={h} y1={s * 0.08} x2={h} y2={s * 0.2} />
        <line x1={h} y1={s * 0.8} x2={h} y2={s * 0.92} />
      </g>
    ),
    vetiver: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <line x1={h} y1={s * 0.08} x2={h} y2={s * 0.5} />
        <line x1={h} y1={s * 0.42} x2={h - s * 0.28} y2={s * 0.92} />
        <line x1={h} y1={s * 0.42} x2={h + s * 0.28} y2={s * 0.92} />
        <line x1={h} y1={s * 0.5} x2={h - s * 0.36} y2={s * 0.98} />
        <line x1={h} y1={s * 0.5} x2={h + s * 0.36} y2={s * 0.98} />
        <line x1={h - s * 0.14} y1={s * 0.56} x2={h - s * 0.14} y2={s * 0.95} />
        <line x1={h + s * 0.14} y1={s * 0.56} x2={h + s * 0.14} y2={s * 0.95} />
      </g>
    ),
    root: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <line x1={h} y1={s * 0.08} x2={h} y2={h} />
        <line x1={h} y1={h} x2={h - s * 0.28} y2={h + s * 0.28} />
        <line x1={h} y1={h} x2={h + s * 0.28} y2={h + s * 0.28} />
        <line x1={h - s * 0.28} y1={h + s * 0.28} x2={h - s * 0.38} y2={s * 0.92} />
        <line x1={h - s * 0.28} y1={h + s * 0.28} x2={h - s * 0.08} y2={s * 0.92} />
        <line x1={h + s * 0.28} y1={h + s * 0.28} x2={h + s * 0.38} y2={s * 0.92} />
        <line x1={h + s * 0.28} y1={h + s * 0.28} x2={h + s * 0.08} y2={s * 0.92} />
      </g>
    ),
    musk: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path
          d={`M${s * 0.1} ${h} Q${h - s * 0.1} ${h - s * 0.36} ${h} ${h} Q${h + s * 0.1} ${h + s * 0.36} ${s * 0.9} ${h}`}
        />
        <path
          d={`M${s * 0.2} ${h + s * 0.16} Q${h} ${h - s * 0.24} ${h} ${h + s * 0.08} Q${h} ${h + s * 0.4} ${s * 0.8} ${h + s * 0.16}`}
        />
      </g>
    ),
    resin: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path
          d={`M${h} ${s * 0.08} Q${s * 0.88} ${h} ${h} ${s * 0.9} Q${s * 0.12} ${h} ${h} ${s * 0.08}`}
        />
        <circle cx={h} cy={h + s * 0.12} r={s * 0.1} fill="currentColor" />
      </g>
    ),
    saffron: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <line x1={h - s * 0.22} y1={s * 0.92} x2={h - s * 0.1} y2={s * 0.2} />
        <line x1={h} y1={s * 0.92} x2={h} y2={s * 0.16} />
        <line x1={h + s * 0.22} y1={s * 0.92} x2={h + s * 0.1} y2={s * 0.2} />
        <path
          d={`M${h - s * 0.16} ${s * 0.22} Q${h - s * 0.1} ${s * 0.08} ${h - s * 0.04} ${s * 0.22}`}
        />
        <path d={`M${h - s * 0.04} ${s * 0.18} Q${h} ${s * 0.04} ${h + s * 0.04} ${s * 0.18}`} />
        <path
          d={`M${h + s * 0.04} ${s * 0.22} Q${h + s * 0.1} ${s * 0.08} ${h + s * 0.16} ${s * 0.22}`}
        />
      </g>
    ),
    spice: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {[0, 45, 90, 135].map((r) => (
          <line
            key={r}
            x1={h}
            y1={s * 0.1}
            x2={h}
            y2={s * 0.9}
            transform={`rotate(${r} ${h} ${h})`}
          />
        ))}
        <circle cx={h} cy={h} r={s * 0.18} fill="currentColor" />
      </g>
    ),
    leaf: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path
          d={`M${h} ${s * 0.9} Q${s * 0.14} ${h} ${h} ${s * 0.1} Q${s * 0.86} ${h} ${h} ${s * 0.9}`}
        />
        <line x1={h} y1={s * 0.1} x2={h} y2={s * 0.9} />
        <line x1={h} y1={h - s * 0.06} x2={h - s * 0.28} y2={h - s * 0.22} />
        <line x1={h} y1={h + s * 0.1} x2={h + s * 0.28} y2={h - s * 0.06} />
      </g>
    ),
    flower: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse
            key={r}
            cx={h}
            cy={h - s * 0.28}
            rx={s * 0.16}
            ry={s * 0.26}
            transform={`rotate(${r} ${h} ${h})`}
          />
        ))}
        <circle cx={h} cy={h} r={s * 0.14} fill="currentColor" />
      </g>
    ),
    pepper: (
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <circle cx={h - s * 0.18} cy={h - s * 0.14} r={s * 0.16} />
        <circle cx={h + s * 0.18} cy={h - s * 0.14} r={s * 0.16} />
        <circle cx={h} cy={h + s * 0.2} r={s * 0.16} />
        <circle cx={h - s * 0.18} cy={h - s * 0.14} r={s * 0.05} fill="currentColor" />
        <circle cx={h + s * 0.18} cy={h - s * 0.14} r={s * 0.05} fill="currentColor" />
        <circle cx={h} cy={h + s * 0.2} r={s * 0.05} fill="currentColor" />
      </g>
    ),
  }
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {icons[type] ?? icons.flower}
    </svg>
  )
}
