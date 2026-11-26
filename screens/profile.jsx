// ─────────────────────────────────────────────────────────────
// Profile + CSR Dashboard
// ─────────────────────────────────────────────────────────────

function Profile({ persona, setPersona, onOpenCSR }) {
  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg)',
      paddingTop: STATUS_PAD + 6,
      paddingBottom: TAB_PAD + 20,
    }}>
      {/* avatar */}
      <div style={{ padding: '12px 22px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <PhotoSlot ratio={null} height={56} style={{ width: 56 }} round={999} tone="leaf" scene="avatar"/>
        <div style={{ flex: 1 }}>
          <div className="display" style={{ fontSize: 22 }}>Anika Rao</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-mute)' }}>Chennai · joined Mar 2024</div>
        </div>
        <button style={{
          padding: '8px 12px', borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)',
          fontSize: 12, fontWeight: 600,
        }}>Edit</button>
      </div>

      {/* impact */}
      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--leaf-pale), var(--marigold-pale))',
          borderRadius: 22, padding: 18,
          border: '1px solid var(--line)',
        }}>
          <div className="label-tiny" style={{ marginBottom: 8 }}>your ledger</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <ProfileStat n="3" l="named trees"/>
            <ProfileStat n="14" l="reforest funded"/>
            <ProfileStat n="62 kg" l="co₂ / yr est."/>
          </div>
          <div style={{
            marginTop: 14, padding: '10px 12px', background: 'var(--surface)',
            borderRadius: 12, fontSize: 12, color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <ICON.tree size={14} stroke="var(--leaf-deep)" strokeWidth={1.9}/>
            <span style={{ flex: 1 }}>Receipt published in <span className="mono">/anika-rao</span> · public</span>
            <ICON.chev size={12} stroke="var(--ink-faint)"/>
          </div>
        </div>
      </div>

      {/* persona switcher */}
      <SectionLabel>switch context</SectionLabel>
      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)', overflow: 'hidden',
        }}>
          {[
            { id: 'family',    label: 'Family',     sub: 'Kid-tree, memorial, gift',  ico: ICON.user },
            { id: 'memorial',  label: 'Memorial',   sub: 'Quieter palette, no fanfare', ico: ICON.heart },
            { id: 'csr',       label: 'CSR dashboard', sub: 'Manage a fleet of trees', ico: ICON.building, action: onOpenCSR },
          ].map((row, i, arr) => {
            const Ico = row.ico;
            const active = persona === row.id;
            return (
              <button key={row.id}
                onClick={() => { setPersona(row.id); row.action?.(); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', textAlign: 'left',
                  borderTop: i > 0 ? '1px solid var(--line)' : 0,
                  background: active ? 'var(--surface-2)' : 'transparent',
                }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: active ? 'var(--leaf-pale)' : 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ico size={18} stroke={active ? 'var(--leaf-deep)' : 'var(--ink-soft)'} strokeWidth={1.8}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{row.label}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>{row.sub}</div>
                </div>
                {active ? <ICON.check size={18} stroke="var(--leaf-deep)" strokeWidth={2.2}/> : <ICON.chev size={14} stroke="var(--ink-faint)"/>}
              </button>
            );
          })}
        </div>
      </div>

      {/* settings */}
      <SectionLabel>settings</SectionLabel>
      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)', overflow: 'hidden',
        }}>
          {[
            { ico: ICON.bell,    l: 'Growth alerts',        v: 'On · weekly' },
            { ico: ICON.bird,    l: 'Field sightings',      v: 'On · weekly' },
            { ico: ICON.drop,    l: 'Bowl streak reminder', v: 'Off' },
            { ico: ICON.ledger,  l: 'Public ledger handle', v: '@anika-rao' },
            { ico: ICON.download,l: 'Download my data',     v: '· · ·' },
          ].map((row, i) => {
            const Ico = row.ico;
            return (
              <button key={i} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', textAlign: 'left',
                borderTop: i > 0 ? '1px solid var(--line)' : 0,
                background: 'transparent',
              }}>
                <Ico size={18} stroke="var(--ink-soft)" strokeWidth={1.7}/>
                <span style={{ flex: 1, fontSize: 14 }}>{row.l}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{row.v}</span>
                <ICON.chev size={12} stroke="var(--ink-faint)"/>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '32px 22px 0', fontSize: 11, color: 'var(--ink-faint)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
        Dear Tree · v0.1 · open source
      </div>
    </div>
  );
}

function ProfileStat({ n, l }) {
  return (
    <div style={{ flex: 1 }}>
      <div className="display" style={{ fontSize: 22, fontWeight: 600 }}>{n}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{l}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CSR Dashboard — fleet view for a company
// ─────────────────────────────────────────────────────────────
function CSRDashboard({ onClose }) {
  const [period, setPeriod] = useState('Q1');

  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg-deep)',
      paddingBottom: 28,
      color: 'var(--ink)',
    }}>
      {/* compact header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--bg-deep)',
        padding: `${STATUS_PAD}px 16px 12px`,
        borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={onClose} aria-label="Back to profile" style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--surface)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ICON.back size={16}/>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '.1em' }}>CSR DASHBOARD · SAMPLE DATA</div>
          <div className="display" style={{ fontSize: 17, fontWeight: 600 }}>Northwind Tech · CSR/2026/IND</div>
        </div>
        <Pill tone="leaf">Sample</Pill>
      </div>

      {/* compliance hero */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)', padding: 16,
        }}>
          <div className="label-tiny" style={{ marginBottom: 8 }}>2% csr · fy 25-26 commitment</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div className="display" style={{ fontSize: 26, fontWeight: 600 }}>₹4.2 Cr</div>
            <div style={{ fontSize: 12, color: 'var(--leaf)', fontWeight: 600 }}>
              <ICON.check size={11} strokeWidth={2.6}/> on track
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 6, background: 'var(--surface-2)', marginTop: 10, overflow: 'hidden' }}>
            <div style={{ width: '64%', height: '100%', background: 'linear-gradient(to right, var(--leaf), var(--marigold))', borderRadius: 6 }}/>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 6, fontSize: 11, color: 'var(--ink-mute)',
          }}>
            <span>₹2.7 Cr · committed</span>
            <span>₹1.5 Cr remaining</span>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ padding: '12px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <KpiTile n="1,247" l="trees committed" delta="+182 this Q" tone="leaf"/>
        <KpiTile n="843"   l="planted & live"  delta="68% planted" tone="default"/>
        <KpiTile n="—"     l="survival rate"   delta="measured, not assumed" tone="leaf"/>
        <KpiTile n="218"   l="animal sightings" delta="22 species"  tone="mari"/>
      </div>

      {/* Proof map */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)', overflow: 'hidden',
        }}>
          <div style={{ position: 'relative' }}>
            <PhotoSlot scene="proof" ratio={null} height={142} round={0} />
            <div style={{
              position: 'absolute', top: 12, left: 12,
              display: 'flex', gap: 6,
            }}>
              <Pill tone="leaf">843 live</Pill>
              <Pill tone="mari">field checked</Pill>
            </div>
            <div style={{
              position: 'absolute', right: 12, bottom: 12,
              background: 'rgba(255,251,241,.9)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--line)', borderRadius: 12,
              padding: '8px 10px',
            }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>PUBLIC RECORD</div>
              <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)' }}>CSR/2026/Q1</div>
            </div>
          </div>
          <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              ['GPS rows', '843'],
              ['Photo sets', '4'],
              ['Open CSV', 'Q1'],
            ].map((r, i) => (
              <div key={i} style={{ padding: '8px 10px', borderRadius: 12, background: 'var(--surface-2)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{r[0]}</div>
                <div className="display" style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>{r[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Period switcher */}
      <div style={{ padding: '14px 16px 0', display: 'flex', gap: 6 }}>
        {['Q1', 'Q2', 'Q3', 'Q4', 'YTD'].map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{
            flex: 1, padding: '7px 0', borderRadius: 10,
            background: period === p ? 'var(--ink)' : 'var(--surface)',
            color: period === p ? 'var(--bg)' : 'var(--ink-soft)',
            border: '1px solid var(--line)',
            fontSize: 12, fontWeight: 600,
            fontFamily: 'var(--font-mono)',
          }}>{p}</button>
        ))}
      </div>

      {/* Planting velocity chart */}
      <SectionLabel>planting velocity</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)', padding: '14px 16px',
        }}>
          {/* simple bar chart */}
          <svg viewBox="0 0 320 120" style={{ width: '100%', height: 120 }}>
            {[
              { m: 'Jan', v: 80 }, { m: 'Feb', v: 110 }, { m: 'Mar', v: 95 },
              { m: 'Apr', v: 60 }, { m: 'May', v: 140 }, { m: 'Jun', v: 175 },
              { m: 'Jul', v: 90 }, { m: 'Aug', v: 105 }, { m: 'Sep', v: 130 },
              { m: 'Oct', v: 165 }, { m: 'Nov', v: 200 }, { m: 'Dec', v: 220 },
            ].map((b, i) => {
              const x = 12 + i * 25;
              const h = (b.v / 240) * 90;
              return (
                <g key={i}>
                  <rect x={x} y={110 - h} width={16} height={h} rx={3}
                    fill={i === 5 ? 'var(--leaf)' : 'var(--leaf-soft)'}/>
                  <text x={x + 8} y={119} textAnchor="middle" fontSize="8" fill="var(--ink-mute)" fontFamily="var(--font-mono)">{b.m}</text>
                </g>
              );
            })}
            {/* avg line */}
            <line x1="0" y1="68" x2="320" y2="68" stroke="var(--marigold)" strokeWidth="1.5" strokeDasharray="4 4"/>
            <text x="312" y="64" fontSize="8" fill="var(--marigold)" fontFamily="var(--font-mono)" textAnchor="end">target</text>
          </svg>
        </div>
      </div>

      {/* Project list */}
      <SectionLabel action="Map view">active projects · 6</SectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { name: 'Project Greenways · Chennai', loc: 'OMR corridor', trees: 120, status: 'planting', survival: 84, color: 'var(--leaf)' },
          { name: 'Chennai River Walk CSR',       loc: 'Adyar + Mylapore',  trees: 240, status: 'tagged', survival: 91, color: 'var(--marigold)' },
          { name: 'Thanjavur Delta Restoration',  loc: 'Kaveri Block 2',    trees: 480, status: 'planting', survival: 76, color: 'var(--leaf)' },
          { name: 'Madurai School Memorial',      loc: 'Vandiyur',          trees: 80,  status: 'tagged', survival: 88, color: 'var(--terra)' },
        ].map((p, i) => (
          <div key={i} style={{
            background: 'var(--surface)', borderRadius: 14,
            border: '1px solid var(--line)', padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: p.color }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{p.loc} · {p.trees} trees</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--leaf)' }}>{p.status === 'tagged' ? 'tagged' : 'in care'}</div>
              <div style={{ fontSize: 9.5, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '.1em' }}>sample</div>
            </div>
          </div>
        ))}
      </div>

      {/* Receipts */}
      <SectionLabel>reports · concept</SectionLabel>
      <div style={{ padding: '0 16px 6px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)',
          overflow: 'hidden',
        }}>
          {[
            { l: 'GPS-tagged planting log',  v: '843 entries · csv' },
            { l: 'Partner photo evidence',    v: 'Q1 · folder' },
            { l: 'Field check report',        v: 'Mar 2026 · PDF' },
            { l: 'Public registry export',    v: 'Q1 · CSV' },
          ].map((r, i) => (
            <button key={i} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', textAlign: 'left',
              borderTop: i > 0 ? '1px solid var(--line)' : 0,
              background: 'transparent',
            }}>
              <ICON.ledger size={16} stroke="var(--ink-soft)"/>
              <span style={{ flex: 1, fontSize: 13 }}>{r.l}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{r.v}</span>
              <ICON.download size={14} stroke="var(--leaf)"/>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 18px 0', fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
        sample data · not a compliance tool
      </div>
    </div>
  );
}

function KpiTile({ n, l, delta, tone }) {
  const col = tone === 'leaf' ? 'var(--leaf)' :
              tone === 'mari' ? 'var(--marigold)' :
              'var(--ink)';
  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 14,
      border: '1px solid var(--line)', padding: 12,
    }}>
      <div className="display" style={{ fontSize: 22, color: col, fontWeight: 600 }}>{n}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 1 }}>{l}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{delta}</div>
    </div>
  );
}

window.Profile = Profile;
window.CSRDashboard = CSRDashboard;
