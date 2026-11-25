// ─────────────────────────────────────────────────────────────
// Tree Detail — growth photos, milestones, animal sightings
// Also hosts the Month 24 Tag Ceremony as a takeover overlay
// ─────────────────────────────────────────────────────────────

function TreeDetail({ month, setMonth, onBack, onClaimTag }) {
  const { MAIN_TREE, MILESTONES, SIGHTINGS } = window.NT_DATA;
  const [tab, setTab] = useState('growth'); // growth | sightings | log
  const tagged = month >= 24;

  const monthlyPhotos = useMemo(() => Array.from({ length: month }, (_, i) => i + 1), [month]);
  const visibleMilestones = MILESTONES.filter(m => m.month <= month);
  const upcomingMilestones = MILESTONES.filter(m => m.month > month);

  // approximate height: starts 40cm, grows to 3.5m by month 24
  const heightCm = (40 + (month / 24) * 310).toFixed(0);

  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg)',
      paddingBottom: TAB_PAD + 80,
    }}>
      {/* Hero photo */}
      {/* clip top/sides only, so the info card can hang below the photo */}
      <div style={{ position: 'relative', height: 380, clipPath: 'inset(0 0 -200px 0)', zIndex: 1,
        background: 'linear-gradient(180deg, #C9DEC6 0%, #DFCFA5 55%, #BFA77F 100%)' }}>
        {/* sun */}
        <div style={{
          position: 'absolute', top: 78, right: 50,
          width: 90, height: 90, borderRadius: '50%',
          background: 'radial-gradient(circle, #F8E5B0 0%, #E0A02B 60%, transparent 78%)',
          opacity: 0.85,
        }}/>
        {/* horizon stripes */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18,
          background: 'repeating-linear-gradient(-45deg, transparent 0 14px, rgba(31,42,32,.4) 14px 15px)',
        }}/>
        <HeaderBar onBack={onBack} transparent
          right={<div style={{ display: 'flex', gap: 8 }}>
            <button style={iconBtnBlur}><ICON.share size={16}/></button>
            <button style={iconBtnBlur}><ICON.more size={16}/></button>
          </div>}/>

        {/* small caption */}
        <div style={{
          position: 'absolute', top: STATUS_PAD + 60, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '.1em',
          color: 'var(--ink-soft)',
          background: 'rgba(255,251,241,0.7)', backdropFilter: 'blur(6px)',
          padding: '4px 10px', borderRadius: 999,
        }}>tree-month-{String(month).padStart(2,'0')}.jpg</div>

        {/* big growing tree */}
        <TreeSilhouette month={month} />

        {/* bottom info card */}
        <div style={{
          position: 'absolute', left: 14, right: 14, bottom: -32,
          background: 'var(--surface)', borderRadius: 22,
          padding: 18, border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <Pill tone="leaf"><ICON.tree size={11} strokeWidth={2.4}/>Live</Pill>
            <Pill tone="default">Month {month} / 24</Pill>
            {tagged && <Pill tone="mari"><ICON.award size={11} strokeWidth={2.4}/>Tagged</Pill>}
          </div>
          <div className="display" style={{ fontSize: 26, lineHeight: 1.1 }}>
            {tagged ? `${MAIN_TREE.dedicatedTo}'s tree` : `For ${MAIN_TREE.dedicatedTo}`}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 4 }}>
            {MAIN_TREE.dedicationLine}
          </div>

          {/* stat row */}
          <div style={{ display: 'flex', marginTop: 16, gap: 0 }}>
            <Stat v={`${heightCm} cm`} l="height"/>
            <Stat v={`${(monthlyPhotos.length * 7)} `} l="photos"/>
            <Stat v={visibleMilestones.filter(m => m.kind === 'animal').length} l="visitors"/>
            <Stat v={`${month}`} l="months" last/>
          </div>
        </div>
      </div>

      {/* spacer for floating card */}
      <div style={{ height: 90 }} />

      {/* tab switcher */}
      <div style={{ padding: '12px 18px 0' }}>
        <div style={{
          display: 'flex', gap: 4, background: 'var(--surface-2)',
          padding: 4, borderRadius: 999,
        }}>
          {[
            { id: 'growth',    label: 'Growth' },
            { id: 'sightings', label: 'Visitors' },
            { id: 'log',       label: 'Log' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '9px 0', borderRadius: 999,
              background: tab === t.id ? 'var(--surface)' : 'transparent',
              fontSize: 13, fontWeight: 600,
              color: tab === t.id ? 'var(--ink)' : 'var(--ink-mute)',
              boxShadow: tab === t.id ? 'var(--shadow-sm)' : 'none',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'growth' && (
        <>
          <SectionLabel action={`${monthlyPhotos.length} of 24`}>monthly growth · photos</SectionLabel>
          <div style={{ padding: '0 14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {monthlyPhotos.slice().reverse().map((m) => (
                <div key={m} style={{ position: 'relative' }}>
                  <PhotoSlot
                    height={null}
                    ratio="1/1"
                    round={12}
                    tone="leaf"
                    scene="tree"
                    month={m}
                    label={`m${String(m).padStart(2,'0')}`}
                  />
                  {m === month && (
                    <div style={{
                      position: 'absolute', top: 6, right: 6,
                      background: 'var(--leaf)', color: '#FFFBF1',
                      borderRadius: 999, padding: '2px 7px',
                      fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                    }}>NEW</div>
                  )}
                </div>
              ))}
              {/* future blanks */}
              {Array.from({ length: 24 - monthlyPhotos.length }).slice(0, 3).map((_, i) => (
                <div key={`f${i}`} style={{
                  aspectRatio: '1/1', borderRadius: 12,
                  border: '1.5px dashed var(--line-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                    m{String(monthlyPhotos.length + i + 1).padStart(2,'0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* care window */}
          <SectionLabel action="Care plan">maintenance window</SectionLabel>
          <div style={{ padding: '0 18px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--leaf-pale), var(--marigold-pale))',
              borderRadius: 18, padding: 16,
              display: 'flex', alignItems: 'center', gap: 14,
              border: '1px solid var(--line)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 999,
                background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M3 2v12l11-6z" fill="var(--bg)"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>2 years before naming</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>
                  Then one extra year of settling-in care after the tag ceremony.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'sightings' && (
        <Sightings sightings={SIGHTINGS} month={month}/>
      )}

      {tab === 'log' && (
        <TreeLog milestones={visibleMilestones} upcoming={upcomingMilestones} />
      )}

      {/* Tag ceremony banner — when month >= 22 */}
      {month >= 22 && (
        <div style={{ padding: '24px 18px 0' }}>
          {tagged ? (
            <TagBanner onClaim={onClaimTag} />
          ) : (
            <div style={{
              padding: '16px 18px',
              background: 'linear-gradient(135deg, var(--marigold-pale), var(--surface))',
              borderRadius: 22,
              border: '1px solid var(--marigold)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                background: 'var(--marigold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ICON.award size={22} stroke="#FFFBF1" strokeWidth={2}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{24 - month} months to tag day</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>
                  Your tree has survived the filter. Cohort: 84% still standing.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* tree details */}
      <SectionLabel>about this tree</SectionLabel>
      <div style={{ padding: '0 18px' }}>
        <div style={{ background: 'var(--surface)', borderRadius: 18, border: '1px solid var(--line)', overflow: 'hidden' }}>
          {[
            ['Species', MAIN_TREE.species],
            ['Planted', MAIN_TREE.planted],
            ['Location', MAIN_TREE.location],
            ['Tree ID', MAIN_TREE.mytreeId],
            ['Geocode', geohash(MAIN_TREE.lat, MAIN_TREE.lng)],
            ['Guardian', MAIN_TREE.guardian],
            ['Steward', MAIN_TREE.steward],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '12px 16px',
              borderTop: i > 0 ? '1px solid var(--line)' : 0,
              fontSize: 13.5,
            }}>
              <span style={{ color: 'var(--ink-mute)' }}>{row[0]}</span>
              <span className={row[0] === 'Geocode' ? 'mono' : ''} style={{ color: 'var(--ink)', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>
                {row[1]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const iconBtnBlur = {
  width: 38, height: 38, borderRadius: 999,
  background: 'rgba(255,251,241,0.85)',
  backdropFilter: 'blur(8px)',
  border: '1px solid var(--line)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

function Stat({ v, l, last }) {
  return (
    <div style={{ flex: 1, paddingRight: last ? 0 : 8, marginRight: last ? 0 : 8, borderRight: last ? 0 : '1px solid var(--line)' }}>
      <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>{v}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 1 }}>{l}</div>
    </div>
  );
}

function TreeSilhouette({ month }) {
  const scale = 0.55 + (month / 24) * 0.6;
  const fullness = Math.min(1, month / 24);
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 90, bottom: 60,
      display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
      pointerEvents: 'none',
    }}>
      <svg viewBox="0 0 240 280" width={260} height={260}
        style={{ filter: 'drop-shadow(0 10px 18px rgba(31,42,32,.30))', overflow: 'visible' }}>
        <g style={{ transform: `scale(${scale})`, transformOrigin: '120px 280px', transition: 'transform .4s ease' }}>
          <ellipse cx="120" cy="276" rx={70 * fullness + 30} ry="6" fill="#3D2A18" opacity=".18"/>
          <path d={`M120 280 V${280 - 90 - fullness * 35}`} stroke="#3D2A18" strokeWidth="13" strokeLinecap="round"/>
          {month >= 12 && (
            <>
              <path d="M120 210 Q98 180 80 170" stroke="#3D2A18" strokeWidth="5" fill="none" strokeLinecap="round"/>
              <path d="M120 205 Q142 180 165 165" stroke="#3D2A18" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </>
          )}
          <circle cx="120" cy={170 - fullness * 16} r={50 + 26 * fullness} fill="#2F6A3F"/>
          <circle cx={92 - fullness * 6} cy={180 - fullness * 8} r={32 + 18 * fullness} fill="#3F7A4D" opacity=".95"/>
          <circle cx={150 + fullness * 8} cy={175 - fullness * 4} r={34 + 18 * fullness} fill="#1F4A2C" opacity=".95"/>
          <circle cx="120" cy={140 - fullness * 14} r={26 + 14 * fullness} fill="#4F8C5D" opacity=".9"/>
          {month >= 6 && <circle cx={96} cy={158 - fullness * 8} r="5" fill="#F8E5B0" opacity=".5"/>}
          {month >= 18 && <circle cx={148} cy={156 - fullness * 12} r="5" fill="#F8E5B0" opacity=".5"/>}
          {month >= 22 && <circle cx={120} cy={130 - fullness * 14} r="4" fill="#F8E5B0" opacity=".55"/>}
        </g>
      </svg>
    </div>
  );
}

function Sightings({ sightings, month }) {
  const counts = { sunbird: 12, squirrel: 47, myna: 6, koel: 4 };
  return (
    <>
      <SectionLabel action="All">recent visitors</SectionLabel>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sightings.map(s => {
          const Ico = ICON[s.icon];
          return (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', background: 'var(--surface)',
              borderRadius: 16, border: '1px solid var(--line)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 999,
                background: 'var(--leaf-pale)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ico size={22} stroke="var(--leaf-deep)" strokeWidth={1.7}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{s.animal}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>{s.when}</div>
              </div>
              {s.first && <Pill tone="mari">First!</Pill>}
            </div>
          );
        })}
      </div>

      <SectionLabel>2-yr tally</SectionLabel>
      <div style={{ padding: '0 18px' }}>
        <div style={{
          padding: 16, background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)',
        }}>
          {[
            { l: 'Indian palm squirrel', n: counts.squirrel, max: 60 },
            { l: 'Purple sunbird',       n: counts.sunbird, max: 60 },
            { l: 'Common myna',          n: counts.myna,    max: 60 },
            { l: 'Asian koel',           n: counts.koel,    max: 60 },
          ].map((r, i) => (
            <div key={i} style={{ padding: '10px 0', borderTop: i > 0 ? '1px solid var(--line)' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12.5 }}>
                <span>{r.l}</span>
                <span className="mono" style={{ color: 'var(--ink-mute)' }}>{r.n} visits</span>
              </div>
              <div style={{ height: 5, borderRadius: 5, background: 'var(--surface-2)', overflow: 'hidden' }}>
                <div style={{ width: `${(r.n/r.max)*100}%`, height: '100%', background: 'var(--leaf)' }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TreeLog({ milestones, upcoming }) {
  const dot = (kind) => ({
    plant:  { ico: ICON.sprout,  bg: 'var(--leaf-pale)',     fg: 'var(--leaf-deep)' },
    photo:  { ico: ICON.camera,  bg: 'var(--surface-2)',     fg: 'var(--ink-soft)' },
    water:  { ico: ICON.drop,    bg: 'var(--sky-soft)',      fg: 'var(--sky)' },
    animal: { ico: ICON.bird,    bg: 'var(--marigold-pale)', fg: '#6E4F00' },
    height: { ico: ICON.ruler,   bg: 'var(--leaf-pale)',     fg: 'var(--leaf-deep)' },
    cake:   { ico: ICON.sparkle, bg: 'var(--marigold-pale)', fg: 'var(--marigold)' },
    tag:    { ico: ICON.award,   bg: 'var(--marigold)',      fg: '#FFFBF1' },
  }[kind] || { ico: ICON.leaf, bg: 'var(--surface-2)', fg: 'var(--ink-mute)' });

  return (
    <>
      <SectionLabel>timeline</SectionLabel>
      <div style={{ padding: '0 18px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 36,
          width: 2, background: 'var(--surface-2)',
        }}/>
        {[...milestones.slice().reverse(), ...upcoming.slice(0, 2)].map((m, i) => {
          const d = dot(m.kind);
          const Ico = d.ico;
          const isUpcoming = !milestones.includes(m);
          return (
            <div key={i} style={{
              display: 'flex', gap: 14, paddingBottom: 16,
              opacity: isUpcoming ? 0.5 : 1,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 999,
                background: d.bg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--bg)',
                zIndex: 1,
              }}>
                <Ico size={18} stroke={d.fg} strokeWidth={1.9}/>
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{m.label}</span>
                  <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>m{String(m.month).padStart(2,'0')}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginTop: 2 }}>{m.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function TagBanner({ onClaim }) {
  return (
    <button onClick={onClaim} style={{
      width: '100%', padding: 18,
      background: 'linear-gradient(135deg, var(--marigold), #C48015)',
      color: '#2A1F08',
      borderRadius: 22, textAlign: 'left',
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 8px 24px rgba(224,160,43,.4)',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #F8E5B0, #C28015)',
        boxShadow: 'inset 0 -3px 6px rgba(0,0,0,.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ICON.award size={26} stroke="#2A1F08" strokeWidth={2}/>
      </div>
      <div style={{ flex: 1 }}>
        <div className="display" style={{ fontSize: 19, fontWeight: 700 }}>Your tree name is ready</div>
        <div style={{ fontSize: 12.5, opacity: .8, marginTop: 2 }}>Month 24 cleared. Open the ceremony.</div>
      </div>
      <ICON.chev size={20} stroke="#2A1F08" strokeWidth={2.4}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// TAG CEREMONY — full-screen takeover at month 24
// ─────────────────────────────────────────────────────────────
function TagCeremony({ onClose }) {
  const { MAIN_TREE } = window.NT_DATA;
  const [step, setStep] = useState(0); // 0 intro, 1 reveal, 2 details

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1400),
      setTimeout(() => setStep(2), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'radial-gradient(circle at 50% 30%, #2C1F0A 0%, #0A0805 80%)',
      color: '#F2D685',
      display: 'flex', flexDirection: 'column',
      paddingTop: STATUS_PAD,
      overflow: 'hidden',
    }}>
      {/* close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: STATUS_PAD - 4, right: 14, zIndex: 5,
        width: 38, height: 38, borderRadius: 999,
        background: 'rgba(255,255,255,.08)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ICON.close size={16} stroke="#F2D685"/>
      </button>

      {/* sparkles bg */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: '#F2D685',
            borderRadius: '50%',
            opacity: 0.2 + (i % 5) * 0.15,
            transform: `scale(${step >= 1 ? 1 : 0.3})`,
            transition: `transform .8s ease ${i * 30}ms`,
          }}/>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', position: 'relative' }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '.2em', opacity: .65, marginBottom: 20 }}>
          24 · MONTHS · 21 · APR · 2026
        </div>
        <div className="display" style={{
          fontSize: 38, lineHeight: 1.05, textAlign: 'center', color: '#F8E5B0',
          opacity: step >= 0 ? 1 : 0,
          transition: 'opacity .8s ease',
        }}>
          Arka's tree<br/>is ready to be named.
        </div>

        {/* big medallion — appears at step 1 */}
        <div style={{
          marginTop: 36, position: 'relative',
          transform: `scale(${step >= 1 ? 1 : 0.6}) rotate(${step >= 1 ? 0 : -12}deg)`,
          opacity: step >= 1 ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(.2,.8,.2,1)',
        }}>
          <div style={{
            width: 230, height: 230, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 25%, #F8E5B0 0%, #E0A02B 38%, #7E5615 100%)',
            boxShadow: 'inset 0 -10px 18px rgba(0,0,0,.35), 0 14px 40px rgba(224,160,43,.4)',
            color: '#2A1F08',
            padding: 28, textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '.2em', opacity: .8 }}>DEAR TREE · TAGGED</div>
            <div className="display" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, margin: '8px 0 4px' }}>ARKA</div>
            <div className="mono" style={{ fontSize: 8.5, opacity: .8 }}>{MAIN_TREE.mytreeId}</div>
            <div className="mono" style={{ fontSize: 9.5, opacity: .85 }}>21 · APR · 2024</div>
            <div className="mono" style={{ fontSize: 8.5, opacity: .7, marginTop: 4 }}>
              {MAIN_TREE.lat.toFixed(3)}, {MAIN_TREE.lng.toFixed(3)} · {geohash(MAIN_TREE.lat, MAIN_TREE.lng)}
            </div>
            <div style={{ height: 34, marginTop: 4, transform: 'scale(.38)', transformOrigin: 'top center' }}>
              <MiniQr dark="#2A1F08" light="rgba(248,229,176,.7)"/>
            </div>
            <div style={{ marginTop: 12, padding: '3px 8px', background: 'rgba(0,0,0,.15)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 8 }}>
              +1YR · CARE
            </div>
          </div>
        </div>

        {step >= 2 && (
          <div style={{ marginTop: 28, textAlign: 'center', maxWidth: 320 }}>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#E5D2A3', opacity: .9 }}>
              We'll mount the tag at the base on <strong style={{ color: '#F8E5B0' }}>Sunday, 25 April</strong>.
              You're invited. Bring Arka.
            </div>
          </div>
        )}
      </div>

      {step >= 2 && (
        <div style={{ padding: '0 22px 38px', display: 'flex', gap: 10 }}>
          <button onClick={onClose} className="btn-leaf" style={{
            flex: 1, justifyContent: 'center', padding: '16px 22px',
            background: '#F2D685', color: '#2A1F08',
          }}>
            <ICON.cal size={16} strokeWidth={2.4}/> RSVP to ceremony
          </button>
          <button style={{
            width: 50, height: 50, borderRadius: 999,
            background: 'rgba(255,255,255,.08)', color: '#F2D685',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ICON.share size={18}/>
          </button>
        </div>
      )}
    </div>
  );
}

window.TreeDetail = TreeDetail;
window.TagCeremony = TagCeremony;
