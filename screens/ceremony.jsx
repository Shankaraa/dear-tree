// ─────────────────────────────────────────────────────────────
// Ceremony — naming + dedication (incl memorial variant)
// ─────────────────────────────────────────────────────────────

function Ceremony({ spot, value, onChange, onBack, onPlanted, persona, setPersona }) {
  const meta = window.tierMeta[spot.tier];
  const [step, setStep] = useState(1); // 1: dedication type, 2: name + line, 3: review

  const setKind = (k) => onChange({ ...value, kind: k });
  const setName = (n) => onChange({ ...value, name: n });
  const setLine = (l) => onChange({ ...value, line: l });

  // visual tone shifts for memorial
  const isMemorial = value.kind === 'memorial';
  const accentBg = isMemorial ? 'var(--terra-pale)' : 'var(--leaf-pale)';
  const accent   = isMemorial ? 'var(--terra)' : 'var(--leaf)';

  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg)',
      paddingBottom: TAB_PAD + 20,
    }}>
      <HeaderBar onBack={step === 1 ? onBack : () => setStep(step - 1)} title="Dedication"
        right={<div style={{ width: 38 }} />}/>

      {/* progress */}
      <div style={{ padding: `${STATUS_PAD + 56}px 22px 0` }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 3,
              background: i <= step ? accent : 'var(--surface-2)',
            }}/>
          ))}
        </div>
      </div>

      {step === 1 && (
        <DedicationKind value={value.kind} onPick={(k) => { setKind(k); setPersona(k === 'memorial' ? 'memorial' : 'family'); }} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <DedicationCopy value={value} onChange={onChange} onNext={() => setStep(3)} isMemorial={isMemorial} accent={accent} accentBg={accentBg} />
      )}
      {step === 3 && (
        <Review spot={spot} value={value} onPlanted={onPlanted} accent={accent} accentBg={accentBg} isMemorial={isMemorial} />
      )}
    </div>
  );
}

function DedicationKind({ value, onPick, onNext }) {
  const kinds = [
    { id: 'kid',       label: 'For a child',   sub: 'Born this year or last. Generational handoff.', icon: 'sprout',  tone: 'leaf' },
    { id: 'memorial',  label: 'In memory',     sub: 'A parent, partner, mentor. Quiet ceremony.',     icon: 'heart',   tone: 'terra' },
    { id: 'gift',      label: 'A gift',        sub: 'Wedding, retirement, milestone gesture.',         icon: 'bouquet', tone: 'mari' },
    { id: 'self',      label: 'For myself',    sub: 'A vow, a year, a beginning.',                     icon: 'leaf',    tone: 'leaf' },
  ];
  return (
    <div style={{ padding: '0 18px' }}>
      <div className="display" style={{ fontSize: 28, padding: '0 4px 16px', lineHeight: 1.1 }}>
        What kind of tree<br/>is this?
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {kinds.map(k => {
          const Ico = ICON[k.icon];
          const active = value === k.id;
          const colors = {
            leaf:  { bg: 'var(--leaf-pale)',  fg: 'var(--leaf-deep)' },
            terra: { bg: 'var(--terra-pale)', fg: '#6A2E1A' },
            mari:  { bg: 'var(--marigold-pale)', fg: '#6E4F00' },
          }[k.tone];
          return (
            <button key={k.id} onClick={() => onPick(k.id)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', textAlign: 'left',
              background: active ? colors.bg : 'var(--surface)',
              border: `1.5px solid ${active ? colors.fg : 'var(--line)'}`,
              borderRadius: 18,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: active ? 'var(--surface)' : colors.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ico size={22} stroke={colors.fg} strokeWidth={1.8}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: active ? colors.fg : 'var(--ink)' }}>{k.label}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginTop: 2 }}>{k.sub}</div>
              </div>
              {active && <ICON.check size={20} stroke={colors.fg} strokeWidth={2.4}/>}
            </button>
          );
        })}
      </div>
      <button onClick={onNext} disabled={!value} className="btn-leaf"
        style={{ marginTop: 28, width: '100%', justifyContent: 'center', opacity: value ? 1 : 0.5, padding: '16px 22px' }}>
        Continue <ICON.chev size={16} strokeWidth={2.4}/>
      </button>
    </div>
  );
}

function DedicationCopy({ value, onChange, onNext, isMemorial, accent, accentBg }) {
  const nameRef = useRef(null);
  useEffect(() => { setTimeout(() => nameRef.current?.focus(), 60); }, []);
  const valid = (value.name || '').trim().length >= 1;
  return (
    <div style={{ padding: '0 18px' }}>
      <div className="display" style={{ fontSize: 28, padding: '0 4px 6px', lineHeight: 1.1 }}>
        {isMemorial ? 'Whose memory?' : 'What is their name?'}
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-mute)', padding: '0 4px 18px' }}>
        This is what will be engraved. It can{'’'}t change later.
      </div>

      {/* Name input */}
      <div style={{
        background: 'var(--surface)', borderRadius: 18,
        border: `1.5px solid ${value.name ? accent : 'var(--line)'}`,
        padding: '16px 18px',
      }}>
        <div className="label-tiny" style={{ marginBottom: 6 }}>name</div>
        <input
          ref={nameRef}
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder={isMemorial ? 'Lakshmi Rao' : 'Arka'}
          style={{
            width: '100%', border: 0, outline: 0, background: 'transparent',
            fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600,
            color: 'var(--ink)', letterSpacing: '-0.02em',
          }}/>
      </div>

      {/* Dedication line */}
      <div style={{
        marginTop: 12,
        background: 'var(--surface)', borderRadius: 18,
        border: '1.5px solid var(--line)',
        padding: '16px 18px',
      }}>
        <div className="label-tiny" style={{ marginBottom: 6 }}>line (optional)</div>
        <textarea
          value={value.line}
          onChange={(e) => onChange({ ...value, line: e.target.value })}
          placeholder={isMemorial ? '1948 – 2022 · who taught us to plant things' : 'Born 14 March 2024'}
          rows={2}
          style={{
            width: '100%', border: 0, outline: 0, background: 'transparent',
            fontSize: 14.5, color: 'var(--ink-soft)',
            resize: 'none', fontFamily: 'inherit',
          }}/>
      </div>

      {/* Tag preview */}
      <div style={{ marginTop: 22 }}>
        <div className="label-tiny" style={{ marginBottom: 10 }}>future tag preview · month 24</div>
        <TagPreview name={value.name || (isMemorial ? 'Lakshmi Rao' : 'Arka')} line={value.line} isMemorial={isMemorial} />
      </div>

      <button onClick={onNext} disabled={!valid} className="btn-leaf"
        style={{ marginTop: 28, width: '100%', justifyContent: 'center', opacity: valid ? 1 : 0.5, padding: '16px 22px',
          background: accent, color: '#FFFBF1' }}>
        Review <ICON.chev size={16} strokeWidth={2.4}/>
      </button>
    </div>
  );
}

function TagPreview({ name, line, isMemorial }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: 240, height: 144, borderRadius: 14,
        background: isMemorial
          ? 'linear-gradient(135deg, #B4B4B4 0%, #6E6E6E 60%, #3D3D3D 100%)'
          : 'linear-gradient(135deg, #F2D685 0%, #E0A02B 60%, #9B6B1F 100%)',
        boxShadow: 'inset 0 -6px 12px rgba(0,0,0,.25), 0 8px 20px rgba(0,0,0,.18)',
        color: isMemorial ? '#1A1A1A' : '#2A1F08',
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: '.18em', opacity: .8 }}>
          TAG PREVIEW · AFTER SURVIVAL
        </div>
        <div>
          <div className="display" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, textTransform: 'uppercase' }}>
            {(name || '·').slice(0, 18)}
          </div>
          {line && <div className="mono" style={{ fontSize: 9, marginTop: 4, opacity: .8 }}>{line.slice(0, 38)}</div>}
        </div>
        <div className="mono" style={{ fontSize: 8.5, opacity: .7, letterSpacing: '.04em' }}>
          12.976, 77.593 · #af3c9b
        </div>
      </div>
    </div>
  );
}

function Review({ spot, value, onPlanted, accent, accentBg, isMemorial }) {
  const meta = window.tierMeta[spot.tier];
  const [agreed, setAgreed] = useState(false);
  return (
    <div style={{ padding: '0 18px' }}>
      <div className="display" style={{ fontSize: 28, padding: '0 4px 18px', lineHeight: 1.1 }}>
        One last look.
      </div>

      {/* summary card */}
      <div style={{
        background: 'var(--surface)', borderRadius: 22, overflow: 'hidden',
        border: '1px solid var(--line)',
      }}>
        <PhotoSlot height={160} ratio={null} round={0} tone={isMemorial ? 'dawn' : 'leaf'} scene={isMemorial ? 'memorial' : 'site'} label="planting day" />
        <div style={{ padding: 16 }}>
          <div className="display" style={{ fontSize: 22 }}>{value.name}'s tree</div>
          {value.line && <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{value.line}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            <Pill tone={meta.chip}>{meta.label}</Pill>
            <Pill tone={isMemorial ? 'terra' : 'leaf'}>{isMemorial ? 'Memorial' : 'Family · child'}</Pill>
            <Pill tone="default">{spot.label}</Pill>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {[
            ['Planting + 2-yr care', formatINR(8000)],
            ['Post-tag care (1 year)', formatINR(2500)],
            ['Cross-subsidy → rural', formatINR(meta.priceLo - 10500)],
            ['Total', formatINR(meta.priceLo), true],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '12px 16px',
              borderTop: i > 0 ? '1px solid var(--line)' : 0,
              fontSize: row[2] ? 16 : 13,
              fontWeight: row[2] ? 700 : 500,
              color: row[2] ? 'var(--ink)' : 'var(--ink-soft)',
              background: row[2] ? 'var(--surface-2)' : 'transparent',
            }}>
              <span>{row[0]}</span>
              <span className={row[2] ? 'mono' : 'mono'}>{row[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* honest assessment */}
      <div style={{
        marginTop: 16, padding: '14px 16px',
        background: accentBg, borderRadius: 18,
        border: `1px solid ${accent}`,
      }}>
        <div className="label-tiny" style={{ marginBottom: 6, color: accent }}>honest</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5 }}>
          ~22% of saplings die in year 1–2. We replant up to twice. The tree is named only after it survives 24 months. The wait is the filter.
        </div>
      </div>

      {/* checkbox */}
      <button onClick={() => setAgreed(!agreed)} style={{
        marginTop: 16, display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 6px', textAlign: 'left', width: '100%',
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 7,
          background: agreed ? accent : 'transparent',
          border: `2px solid ${agreed ? accent : 'var(--line-strong)'}`,
          flexShrink: 0, marginTop: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {agreed && <ICON.check size={14} stroke="#FFFBF1" strokeWidth={3}/>}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45 }}>
          I understand this is support, not legal ownership. The public name/tag appears only if the tree survives the 2-year care window.
        </div>
      </button>

      <button
        onClick={agreed ? onPlanted : undefined}
        disabled={!agreed}
        className="btn-leaf"
        style={{
          marginTop: 12, width: '100%', justifyContent: 'center',
          opacity: agreed ? 1 : 0.5, padding: '18px 22px', fontSize: 16,
          background: accent, color: '#FFFBF1',
        }}>
        Support this sapling
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONFIRMATION — planting day animation
// ─────────────────────────────────────────────────────────────
function ConfirmPlanted({ spot, dedication, onDone }) {
  const isMemorial = dedication.kind === 'memorial';
  const accent = isMemorial ? 'var(--terra)' : 'var(--leaf)';

  return (
    <div style={{
      height: '100%', background: 'var(--bg)',
      paddingTop: STATUS_PAD + 30, paddingBottom: TAB_PAD,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div className="label-tiny" style={{ color: accent }}>day · 00 · 00</div>
      <div className="display" style={{ fontSize: 32, marginTop: 16, textAlign: 'center', padding: '0 24px', lineHeight: 1.1 }}>
        Your supported sapling<br/>is in the ground.
      </div>
      <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 12, textAlign: 'center', maxWidth: 320, padding: '0 18px' }}>
        Karthik will care for it through the 2-year survival window. You{'’'}ll get the first growth update by Sunday.
      </div>

      {/* animated sapling */}
      <div style={{ marginTop: 30, position: 'relative' }}>
        <PhotoSlot height={220} ratio="1/1" round={140} style={{ width: 220 }} tone={isMemorial ? 'dawn' : 'leaf'} scene={isMemorial ? 'memorial' : 'tree'} month={2} label="planting.jpg"/>
        <div style={{
          position: 'absolute', bottom: -10, left: '50%',
          transform: 'translateX(-50%)',
          background: accent, color: '#FFFBF1',
          padding: '6px 14px', borderRadius: 999,
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
          letterSpacing: 0.1, whiteSpace: 'nowrap',
        }}>
          {geohash(spot.lat, spot.lng)}
        </div>
      </div>

      {/* timeline preview */}
      <div style={{ marginTop: 38, padding: '0 22px', width: '100%' }}>
        <div className="label-tiny" style={{ marginBottom: 10 }}>what comes next</div>
        {[
          { d: 'This week', t: 'First photo & soil check-in' },
          { d: 'Month 6',   t: 'First animal sighting alert' },
          { d: 'Month 12',  t: 'First birthday milestone' },
          { d: 'Month 24',  t: 'Naming + tag ceremony — if it survives' },
          { d: 'Month 25–36', t: 'One extra year of settling-in care' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: 12 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', minWidth: 72 }}>{row.d}</div>
            <div style={{ fontSize: 13.5, flex: 1 }}>{row.t}</div>
          </div>
        ))}
      </div>

      <button onClick={onDone} className="btn-leaf"
        style={{ marginTop: 'auto', marginBottom: 10,
          width: 'calc(100% - 36px)', justifyContent: 'center', padding: '16px 22px',
          background: accent, color: '#FFFBF1' }}>
        Go to {dedication.name}{'’'}s tree
      </button>
    </div>
  );
}

window.Ceremony = Ceremony;
window.ConfirmPlanted = ConfirmPlanted;
