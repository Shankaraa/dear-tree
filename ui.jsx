// ─────────────────────────────────────────────────────────────
// Named Trees — UI primitives + shared bits
// ─────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useMemo, useCallback } = React;

function SceneArt({ scene = 'tree', month = 12 }) {
  const growth = Math.max(0.25, Math.min(1, month / 24));
  const treeTop = 76 - growth * 18;
  const crown = 14 + growth * 18;

  if (scene === 'bowl') {
    return (
      <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="bowlSky" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--sky-soft)" />
            <stop offset="1" stopColor="var(--surface)" />
          </linearGradient>
        </defs>
        <rect width="200" height="140" fill="url(#bowlSky)" />
        <path d="M0 100 C42 86 74 92 112 81 C145 72 170 78 200 62 V140 H0Z" fill="var(--leaf-pale)" opacity=".75" />
        <path d="M18 92 H182" stroke="rgba(31,42,32,.18)" strokeWidth="3" />
        <path d="M45 96 Q100 126 155 96 Z" fill="var(--terra)" opacity=".86" />
        <ellipse cx="100" cy="96" rx="55" ry="15" fill="var(--terra-soft)" />
        <ellipse cx="100" cy="94" rx="43" ry="9" fill="var(--sky)" opacity=".78" />
        <path d="M142 57 c13 -14 29 -9 33 4 c-13 0 -24 6 -33 -4z" fill="var(--leaf-deep)" opacity=".75" />
        <circle cx="157" cy="58" r="2" fill="var(--ink)" opacity=".55" />
        <path d="M150 67 l-7 10 M158 67 l4 10" stroke="var(--ink-soft)" strokeWidth="2" opacity=".55" />
      </svg>
    );
  }

  if (scene === 'site' || scene === 'civic') {
    return (
      <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="200" height="140" fill="var(--surface-2)" />
        <path d="M0 52 C42 46 72 58 104 48 C142 36 168 44 200 34" stroke="var(--surface)" strokeWidth="22" fill="none" />
        <path d="M0 104 C35 92 64 102 98 92 C132 82 160 86 200 76" stroke="var(--line-strong)" strokeWidth="12" fill="none" opacity=".45" />
        <rect x="14" y="12" width="50" height="32" rx="5" fill={scene === 'civic' ? 'var(--terra-pale)' : 'var(--leaf-pale)'} />
        <rect x="124" y="12" width="56" height="46" rx="6" fill="var(--marigold-pale)" opacity=".8" />
        <rect x="32" y="86" width="58" height="36" rx="6" fill="var(--leaf-pale)" />
        {[28, 44, 70, 118, 152, 172].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={76 + (i % 2) * 18} r="8" fill="var(--leaf)" opacity=".8" />
            <rect x={x - 1} y={82 + (i % 2) * 18} width="2" height="12" fill="var(--leaf-deep)" opacity=".65" />
          </g>
        ))}
        <g transform="translate(103 61)">
          <path d="M0 -24 C14 -18 20 -6 18 7 C15 25 -15 25 -18 7 C-20 -6 -14 -18 0 -24Z" fill="var(--leaf)" />
          <circle cx="0" cy="0" r="8" fill="#FFFBF1" opacity=".9" />
        </g>
      </svg>
    );
  }

  if (scene === 'rural' || scene === 'proof') {
    return (
      <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="200" height="140" fill="var(--leaf-pale)" />
        <path d="M0 42 C55 24 112 58 200 32 V140 H0Z" fill="var(--surface-2)" opacity=".7" />
        <path d="M0 101 C44 86 82 98 122 82 C152 70 174 74 200 62 V140 H0Z" fill="var(--leaf-soft)" opacity=".75" />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 14 + (i % 8) * 23;
          const y = 58 + Math.floor(i / 8) * 25 + (i % 2) * 4;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={scene === 'proof' ? 4 : 7} fill={i % 5 === 0 ? 'var(--marigold)' : 'var(--leaf)'} opacity=".82" />
              <circle cx={x + 5} cy={y + 3} r={scene === 'proof' ? 3 : 5} fill="var(--leaf-deep)" opacity=".66" />
            </g>
          );
        })}
      </svg>
    );
  }

  if (scene === 'memorial') {
    return (
      <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="200" height="140" fill="var(--terra-pale)" />
        <circle cx="152" cy="38" r="34" fill="var(--marigold-soft)" opacity=".9" />
        <path d="M0 102 C38 76 76 92 112 74 C148 56 172 66 200 50 V140 H0Z" fill="var(--surface)" opacity=".72" />
        <path d="M32 96 C72 76 102 58 158 42" stroke="var(--leaf-deep)" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".75" />
        {[54, 83, 112, 139].map((x, i) => (
          <path key={i} d={`M${x} ${82 - i * 8} c10 -14 24 -13 31 -3 c-12 3 -22 9 -31 3z`} fill="var(--leaf)" opacity=".76" />
        ))}
      </svg>
    );
  }

  if (scene === 'tag') {
    return (
      <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="200" height="140" fill="var(--leaf-pale)" />
        <path d="M0 112 C48 88 94 110 132 84 C160 66 180 68 200 55 V140 H0Z" fill="var(--leaf-soft)" opacity=".75" />
        <g transform="translate(100 68) rotate(-8)">
          <ellipse cx="0" cy="0" rx="54" ry="38" fill="var(--marigold)" />
          <ellipse cx="-8" cy="-8" rx="44" ry="29" fill="var(--marigold-soft)" opacity=".76" />
          <text x="0" y="-2" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="#2A1F08">ARKA</text>
          <text x="0" y="17" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#2A1F08" opacity=".72">21 APR 2024 - #AF3C9B</text>
        </g>
      </svg>
    );
  }

  if (scene === 'avatar') {
    return (
      <svg viewBox="0 0 120 120" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="120" height="120" fill="var(--leaf-pale)" />
        <circle cx="86" cy="26" r="24" fill="var(--marigold-pale)" />
        <circle cx="60" cy="47" r="20" fill="var(--leaf)" opacity=".85" />
        <path d="M20 115 C28 78 92 78 100 115Z" fill="var(--leaf-deep)" opacity=".78" />
        <path d="M14 92 C40 80 64 84 104 64" stroke="#FFFBF1" strokeWidth="4" opacity=".45" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <rect width="200" height="140" fill="var(--leaf-pale)" />
      <circle cx="160" cy="28" r="30" fill="var(--marigold-soft)" opacity=".85" />
      <path d="M0 102 C42 80 82 95 118 78 C150 63 172 67 200 50 V140 H0Z" fill="var(--surface-2)" opacity=".86" />
      <path d="M96 126 V84" stroke="#3D2A18" strokeWidth={6 + growth * 4} strokeLinecap="round" />
      <path d={`M98 92 Q76 74 58 75 M100 88 Q124 67 146 63`} stroke="#3D2A18" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity={growth > .45 ? .72 : .25} />
      <circle cx="100" cy={treeTop} r={crown} fill="var(--leaf)" opacity=".9" />
      <circle cx={78 - growth * 4} cy={treeTop + 10} r={crown * .72} fill="var(--leaf-deep)" opacity=".8" />
      <circle cx={122 + growth * 5} cy={treeTop + 8} r={crown * .78} fill="var(--leaf)" opacity=".82" />
      <circle cx="100" cy={treeTop - 17} r={crown * .55} fill="var(--leaf-soft)" opacity=".9" />
      {month >= 6 && <path d="M34 50 c12 -13 24 -8 28 3 c-12 0 -20 5 -28 -3z" fill="var(--ink-soft)" opacity=".42" />}
    </svg>
  );
}

// Photo placeholder slot - can render high-fidelity prototype scenes.
function PhotoSlot({ children, ratio, label, style = {}, height, round = 18, tone = 'default', scene, month = 12 }) {
  const aspectStyle = ratio ? { aspectRatio: ratio } : (height ? { height } : { aspectRatio: '4/3' });
  const toneStyle = tone === 'leaf' ? { background: 'repeating-linear-gradient(-45deg, var(--leaf-pale) 0 12px, var(--surface-2) 12px 24px)' }
                  : tone === 'dawn' ? { background: 'repeating-linear-gradient(-45deg, var(--terra-pale) 0 12px, var(--marigold-pale) 12px 24px)' }
                  : {};
  return (
    <div className="photo-slot" style={{ borderRadius: round, ...aspectStyle, ...toneStyle, ...style }}>
      {scene && <SceneArt scene={scene} month={month} />}
      {children}
      {label && <div className="label" style={{ position: 'relative', zIndex: 2 }}>{label}</div>}
    </div>
  );
}

// little leaf glyph for branding moments
function LeafMark({ size = 18, color = 'var(--leaf)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 19c0-7 5-13 14-14-.5 9-6.5 14-14 14z" fill={color} opacity=".85"/>
      <path d="M4 19c3-3 6-5 9-7" stroke="#FFFBF1" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// Status-bar safe top spacer (iOS frame status bar = ~62px)
const STATUS_PAD = 58;
const TAB_PAD    = 90;

// "Tier" color helper
const tierMeta = {
  civic:    { label: 'Civic Landmark', color: 'var(--terra)',   chip: 'terra', priceLo: 50000,  priceHi: 500000 },
  hivis:    { label: 'High-Visibility', color: 'var(--marigold)', chip: 'mari',  priceLo: 15000,  priceHi: 50000 },
  standard: { label: 'Standard Urban', color: 'var(--leaf)',     chip: 'leaf',  priceLo: 3000,   priceHi: 15000 },
  rural:    { label: 'Rural Reforestation', color: 'var(--sky)',  chip: 'sky',   priceLo: 500,    priceHi: 2000 },
};

const formatINR = (n) => {
  if (n >= 100000) return `₹${(n/100000).toFixed(n%100000===0?0:1)}L`;
  if (n >= 1000)   return `₹${(n/1000).toFixed(n%1000===0?0:1)}K`;
  return `₹${n}`;
};

// fake hashed geocode
const geohash = (lat, lng) => `${lat.toFixed(3)},${lng.toFixed(3)} · #${(Math.abs(lat*lng*9999)|0).toString(16).slice(0,6)}`;

// Bottom tab bar
function TabBar({ tab, onTab, dark }) {
  const tabs = [
    { id: 'garden',   label: 'Garden',   icon: ICON.tree },
    { id: 'plant',    label: 'Plant',    icon: ICON.pin },
    { id: 'registry', label: 'Registry', icon: ICON.registry },
    { id: 'profile',  label: 'You',      icon: ICON.user },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40,
      paddingBottom: 28, paddingTop: 10,
      background: dark
        ? 'linear-gradient(to top, rgba(19,28,22,0.96) 60%, rgba(19,28,22,0))'
        : 'linear-gradient(to top, rgba(246,239,224,0.96) 60%, rgba(246,239,224,0))',
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        margin: '0 14px',
        background: 'var(--surface)',
        borderRadius: 28,
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--line)',
        padding: '8px 6px',
        pointerEvents: 'auto',
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => onTab(t.id)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '6px 4px',
              color: active ? 'var(--leaf)' : 'var(--ink-mute)',
            }}>
              <t.icon size={22} strokeWidth={active ? 2 : 1.6} />
              <span style={{ fontSize: 10.5, fontWeight: active ? 600 : 500, letterSpacing: 0.2 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Header pill with back button
function HeaderBar({ onBack, title, right, transparent }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
      paddingTop: STATUS_PAD, paddingLeft: 12, paddingRight: 12,
      paddingBottom: 12,
      display: 'flex', alignItems: 'center', gap: 8,
      background: transparent ? 'transparent'
                : 'linear-gradient(to bottom, var(--bg) 70%, rgba(0,0,0,0))',
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 999,
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <ICON.back size={18} stroke="var(--ink)" />
        </button>
      )}
      {title && <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 16 }}>{title}</div>}
      {right || (onBack && <div style={{ width: 38 }} />)}
    </div>
  );
}

// Section header
function SectionLabel({ children, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '0 18px', marginBottom: 10, marginTop: 24,
    }}>
      <div className="label-tiny">{children}</div>
      {action && <button style={{ fontSize: 12, color: 'var(--ink-mute)', fontWeight: 500 }}>{action}</button>}
    </div>
  );
}

// Soft pill
function Pill({ children, tone = 'default', style = {} }) {
  const tones = {
    default: { bg: 'var(--surface-2)',  col: 'var(--ink-soft)' },
    leaf:    { bg: 'var(--leaf-pale)',   col: 'var(--leaf-deep)' },
    terra:   { bg: 'var(--terra-pale)',  col: '#6A2E1A' },
    mari:    { bg: 'var(--marigold-pale)',col: '#6E4F00' },
    sky:     { bg: 'var(--sky-soft)',    col: '#2A4D5F' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      fontSize: 11.5, fontWeight: 600,
      background: t.bg, color: t.col,
      letterSpacing: 0.1,
      ...style,
    }}>{children}</span>
  );
}

Object.assign(window, {
  SceneArt, PhotoSlot, LeafMark, TabBar, HeaderBar, SectionLabel, Pill,
  STATUS_PAD, TAB_PAD, tierMeta, formatINR, geohash,
});
