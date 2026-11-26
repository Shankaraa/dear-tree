// ─────────────────────────────────────────────────────────────
// Onboarding — 4 panels
// ─────────────────────────────────────────────────────────────

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);

  const panels = [
    {
      eyebrow: 'Dear Tree',
      title: <>Support a tree.<br/>Name it.</>,
      body: 'You don\'t own the land or the tree. You support a native Indian sapling and its care. If it survives two years, it gets named and tagged for your person.',
      art: <HeroArt variant="planting" />,
      cta: 'Begin',
    },
    {
      eyebrow: '24 months · survival first',
      title: <>The wait is the point.</>,
      body: 'Dead saplings never get named. Every tagged tree is a real, surviving tree. After month 24, the named tree gets one additional year of care while it settles in.',
      art: <HeroArt variant="growth" />,
      cta: 'Next',
    },
    {
      eyebrow: 'Follow along',
      title: <>Slow tree.<br/>Fast updates.</>,
      body: 'Growth photos, steward notes, height milestones, and field sightings from volunteers. The tree is slow; the care record keeps the supporter connected.',
      art: <HeroArt variant="feed" />,
      cta: 'Next',
    },
    {
      eyebrow: 'Open by design',
      title: <>Every named tree,<br/>in the open.</>,
      body: 'Each named tree gets a public registry entry, so anyone can see who it is for and how it did. Support for trees in busy places could also help fund native restoration elsewhere.',
      art: <HeroArt variant="tag" />,
      cta: 'Plant my first tree',
    },
  ];

  const p = panels[step];
  const DEMO_LINE = 'Concept prototype · sample data · no real trees or payments yet';

  return (
    <div style={{
      height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      paddingTop: STATUS_PAD, paddingBottom: 28,
    }}>
      {/* skip / progress */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 18px 0' }}>
        <div style={{ display: 'flex', gap: 6, flex: 1 }}>
          {panels.map((_, i) => (
            <div key={i} style={{
              flex: i === step ? 2.5 : 1, height: 4, borderRadius: 4,
              background: i <= step ? 'var(--leaf)' : 'var(--surface-2)',
              transition: 'all .35s ease',
            }} />
          ))}
        </div>
        <button onClick={onDone} style={{
          marginLeft: 16, fontSize: 13, color: 'var(--ink-mute)', fontWeight: 500,
        }}>Skip</button>
      </div>

      {/* art */}
      <div style={{ flex: 1, padding: '20px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {p.art}
      </div>

      {/* copy */}
      <div style={{ padding: '0 22px 6px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em',
          textTransform: 'uppercase', color: 'var(--leaf)', marginBottom: 14,
        }}>{p.eyebrow}</div>
        <div className="display" style={{ fontSize: 34, lineHeight: 1.05, marginBottom: 16, color: 'var(--ink)' }}>
          {p.title}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: 340 }}>
          {p.body}
        </div>
      </div>

      {/* cta */}
      <div style={{ padding: '24px 22px 0', display: 'flex', gap: 10 }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="btn-ghost">Back</button>
        )}
        <button onClick={() => step === panels.length - 1 ? onDone() : setStep(s => s + 1)}
          className="btn-leaf" style={{ flex: 1, justifyContent: 'center' }}>
          {p.cta}
          <ICON.chev size={16} stroke="currentColor" strokeWidth={2.4} />
        </button>
      </div>
      <div style={{ padding: '14px 22px 0', textAlign: 'center', fontSize: 11, color: 'var(--ink-mute)' }}>{DEMO_LINE}</div>
    </div>
  );
}

// ── Hero art for each onboarding panel ─────────────────────────
function HeroArt({ variant }) {
  if (variant === 'planting') {
    return (
      <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '1/1' }}>
        {/* Sun arc */}
        <svg viewBox="0 0 320 320" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="160" cy="120" r="64" fill="var(--marigold-pale)" />
          <circle cx="160" cy="120" r="46" fill="var(--marigold)" opacity=".88"/>
        </svg>
        {/* ground */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%',
          background: 'linear-gradient(to bottom, var(--terra-pale), var(--terra-soft))',
          borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
        }}/>
        {/* sapling */}
        <svg viewBox="0 0 320 320" style={{ position: 'absolute', inset: 0 }}>
          <path d="M160 250 V190" stroke="var(--leaf-deep)" strokeWidth="6" strokeLinecap="round"/>
          <path d="M160 210 C130 205, 120 180, 130 165 C148 170, 160 188, 160 210z" fill="var(--leaf)"/>
          <path d="M160 200 C190 195, 200 170, 190 155 C172 160, 160 178, 160 200z" fill="var(--leaf-deep)"/>
          <path d="M160 190 C150 185, 152 170, 160 168 C168 170, 170 185, 160 190z" fill="var(--leaf)"/>
        </svg>
        {/* hands placeholder */}
        <div style={{
          position: 'absolute', left: '50%', bottom: '14%',
          transform: 'translateX(-50%)',
          width: 140, height: 22, borderRadius: 999,
          background: 'var(--terra)', opacity: .25,
        }}/>
      </div>
    );
  }

  if (variant === 'growth') {
    return (
      <div style={{ width: '100%', maxWidth: 340 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: '0 4px' }}>
          {[1, 6, 12, 18, 24].map((m, i) => {
            const h = 40 + (m / 24) * 130;
            return (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 40 200" width="100%" height={h}>
                  <path d={`M20 200 V${200 - h * 0.7}`} stroke="var(--leaf-deep)" strokeWidth="3.5" strokeLinecap="round"/>
                  <circle cx="20" cy={200 - h * 0.7} r={6 + i * 3} fill="var(--leaf)" />
                  {i > 1 && <circle cx={20 - (4 + i)} cy={200 - h * 0.55} r={4 + i * 1.5} fill="var(--leaf-deep)" opacity=".85"/>}
                  {i > 2 && <circle cx={20 + (4 + i)} cy={200 - h * 0.5} r={3 + i * 1.5} fill="var(--leaf)" opacity=".95"/>}
                </svg>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>M{String(m).padStart(2,'0')}</div>
              </div>
            );
          })}
        </div>
        <div style={{
          marginTop: 14, padding: '8px 12px',
          background: 'var(--surface)', borderRadius: 12,
          fontSize: 11.5, color: 'var(--ink-mute)',
          fontFamily: 'var(--font-mono)', display: 'flex', justifyContent: 'space-between',
        }}>
          <span>survival.filter</span>
          <span>month 24 → tag</span>
        </div>
      </div>
    );
  }

  if (variant === 'feed') {
    return (
      <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { ico: 'bird', text: 'Purple sunbird visited', tone: 'leaf', t: '06:42' },
          { ico: 'ruler', text: '1 metre tall today',  tone: 'mari', t: 'Mon' },
          { ico: 'camera', text: '14 new growth photos', tone: 'default', t: 'Sun' },
        ].map((row, i) => {
          const Ico = ICON[row.ico];
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', background: 'var(--surface)',
              borderRadius: 16, boxShadow: 'var(--shadow-sm)',
              transform: `translateX(${i * 14}px)`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: row.tone === 'leaf' ? 'var(--leaf-pale)' :
                           row.tone === 'mari' ? 'var(--marigold-pale)' : 'var(--surface-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ico size={18} stroke={row.tone === 'leaf' ? 'var(--leaf-deep)' : row.tone === 'mari' ? '#6E4F00' : 'var(--ink-soft)'} />
              </div>
              <div style={{ fontSize: 13.5, flex: 1 }}>{row.text}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{row.t}</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'tag') {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        {/* brass medallion */}
        <div style={{
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 25%, #F2D685 0%, #E0A02B 38%, #9B6B1F 100%)',
          boxShadow: 'inset 0 -8px 14px rgba(0,0,0,.25), 0 8px 24px rgba(0,0,0,.18)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#2A1F08',
          padding: 28, textAlign: 'center',
        }}>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '.18em', opacity: .8, marginBottom: 4 }}>DEAR TREE · TAGGED</div>
          <div className="display" style={{ fontSize: 32, fontWeight: 700 }}>AARAV</div>
          <div className="mono" style={{ fontSize: 9.5, marginTop: 6, opacity: .85 }}>21 · APR · 2024</div>
          <div className="mono" style={{ fontSize: 9, opacity: .7, marginTop: 4 }}>12.976, 77.593 · #af3c9b</div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '.1em' }}>
          NAMED AFTER 24 MONTHS · +1YR CARE
        </div>
      </div>
    );
  }
  return null;
}

window.Onboarding = Onboarding;
