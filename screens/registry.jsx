// ─────────────────────────────────────────────────────────────
// Registry — discover other people's trees · open dataset
// ─────────────────────────────────────────────────────────────

function Registry({ onOpenEntry, onOpenScan }) {
  const { REGISTRY } = window.NT_DATA;
  const [filter, setFilter] = useState('all'); // all | kid | memorial | civic | reforest
  const [q, setQ] = useState('');

  const filtered = REGISTRY.filter(r => {
    if (filter !== 'all' && r.kind !== filter && r.tier !== filter) return false;
    if (q && !(`${r.name} ${r.dedicator} ${r.city} ${r.mytreeId || ''} ${r.handle || ''}`).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const total = 47218;
  const tagged = 8124;

  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg)',
      paddingTop: STATUS_PAD + 6,
      paddingBottom: TAB_PAD + 20,
    }}>
      <div style={{ padding: '6px 22px 16px' }}>
        <div className="label-tiny" style={{ marginBottom: 6 }}>open · public · audit-friendly</div>
        <div className="display" style={{ fontSize: 30, lineHeight: 1.1 }}>
          Every named tree,<br/>in the open.
        </div>
      </div>

      {/* Big numbers */}
      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 22,
          border: '1px solid var(--line)', padding: 18,
        }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <BigStat n={total} l="trees planted" tone="leaf"/>
            <BigStat n={tagged} l="trees tagged" tone="mari"/>
            <BigStat n="78%" l="survival" tone="default" isText/>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)',
            fontSize: 12, color: 'var(--ink-mute)',
          }}>
            <ICON.ledger size={14} stroke="var(--ink-mute)" strokeWidth={1.7}/>
            <span style={{ flex: 1 }}>Audit · partner field checks · Q1 2026 published</span>
            <button style={{ fontSize: 11.5, color: 'var(--leaf)', fontWeight: 600 }}>view CSV ↗</button>
          </div>
        </div>
      </div>

      {/* search */}
      <div style={{ padding: '14px 18px 0' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 999,
          padding: '8px 10px 8px 16px', display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid var(--line)',
        }}>
          <ICON.search size={16} stroke="var(--ink-mute)" strokeWidth={1.9}/>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, @handle, or Tree ID"
            style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontSize: 14 }}
          />
          <button onClick={onOpenScan} aria-label="Scan a tree tag" style={{
            width: 34, height: 34, borderRadius: 999,
            background: 'var(--ink)', color: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ICON.qr size={15} stroke="currentColor" strokeWidth={2.2}/>
          </button>
        </div>
      </div>

      {/* filter chips */}
      <div style={{ padding: '10px 36px 0 12px', display: 'flex', gap: 6, overflowX: 'auto' }} className="scroller scroll-fade">
        {[
          { id: 'all',      label: 'All' },
          { id: 'kid',      label: '👶  Child' },
          { id: 'memorial', label: '🕊  Memorial' },
          { id: 'civic',    label: 'Civic' },
          { id: 'reforest', label: 'Reforestation' },
          { id: 'corporate',label: 'CSR' },
        ].map(opt => {
          const active = filter === opt.id;
          return (
            <button key={opt.id} onClick={() => setFilter(opt.id)} style={{
              padding: '7px 14px', borderRadius: 999, flexShrink: 0,
              background: active ? 'var(--ink)' : 'var(--surface)',
              color: active ? 'var(--bg)' : 'var(--ink-soft)',
              border: '1px solid var(--line)', fontSize: 12.5, fontWeight: 600,
            }}>{opt.label}</button>
          );
        })}
      </div>

      {/* trace card — politician's tag */}
      <SectionLabel>trace · transparency in action</SectionLabel>
      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--terra-pale), var(--surface))',
          borderRadius: 22, padding: 16,
          border: '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <PhotoSlot ratio={null} height={60} style={{ width: 60, flexShrink: 0 }} round={12} tone="dawn" scene="civic"/>
            <div style={{ flex: 1 }}>
              <Pill tone="terra">Civic landmark · ₹2L</Pill>
              <div className="display" style={{ fontSize: 18, fontWeight: 600, marginTop: 6 }}>MLA Vinod Kumar's tag</div>
              <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>Banashankari Bus Stand · Banyan</div>
            </div>
          </div>
          <div style={{
            marginTop: 12, padding: '12px 14px',
            background: 'var(--surface)', borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--leaf-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ICON.tree size={14} stroke="var(--leaf-deep)" strokeWidth={2}/>
            </div>
            <div style={{ flex: 1, fontSize: 12.5 }}>
              Funded <strong>197</strong> rural saplings in Hosakote &amp; Kanakapura
            </div>
            <ICON.chev size={12} stroke="var(--ink-faint)"/>
          </div>
        </div>
      </div>

      <SectionLabel action={`${filtered.length}`}>recent entries</SectionLabel>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(r => <RegistryRow key={r.id} entry={r} onClick={() => onOpenEntry?.(r)}/>)}
      </div>

      <div style={{ padding: '24px 22px 0', fontSize: 12, fontStyle: 'italic', color: 'var(--ink-mute)', lineHeight: 1.5 }}>
        Every named entry is permanent and non-transferable after the tree survives its 2-year care window.
      </div>
    </div>
  );
}

function BigStat({ n, l, tone, isText }) {
  const fmt = isText ? n : (typeof n === 'number' ? n.toLocaleString('en-IN') : n);
  const col = tone === 'leaf' ? 'var(--leaf)' :
              tone === 'mari' ? 'var(--marigold)' :
              'var(--ink)';
  return (
    <div style={{ flex: 1 }}>
      <div className="display" style={{ fontSize: 22, color: col, fontWeight: 600 }}>{fmt}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>{l}</div>
    </div>
  );
}

function RegistryRow({ entry, onClick }) {
  const kindMeta = {
    kid:       { ico: ICON.sprout,  tone: 'leaf',  label: 'Child' },
    memorial:  { ico: ICON.heart,   tone: 'terra', label: 'Memorial' },
    corporate: { ico: ICON.building,tone: 'mari',  label: 'CSR' },
    reforest:  { ico: ICON.tree,    tone: 'sky',   label: 'Reforestation' },
  }[entry.kind];
  const Ico = kindMeta.ico;
  const tierMeta = window.tierMeta[entry.tier];

  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'var(--surface)', borderRadius: 16,
      padding: '12px 14px', textAlign: 'left',
      border: '1px solid var(--line)', width: '100%',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: kindMeta.tone === 'leaf' ? 'var(--leaf-pale)' :
                   kindMeta.tone === 'terra' ? 'var(--terra-pale)' :
                   kindMeta.tone === 'mari' ? 'var(--marigold-pale)' :
                   'var(--sky-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Ico size={22} stroke={tierMeta.color} strokeWidth={1.8}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="display" style={{ fontSize: 16, fontWeight: 600 }}>{entry.name}</div>
          {entry.tagged && <Pill tone="mari" style={{ padding: '1px 6px', fontSize: 9.5 }}>Tagged</Pill>}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {entry.dedicator} · {entry.city}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 11, color: 'var(--ink-mute)' }}>
          <span>{entry.species}</span>
          <span className="mono">m{String(entry.month).padStart(2,'0')}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 5, fontSize: 10.5, color: 'var(--ink-mute)' }}>
          <span className="mono" style={{ color: 'var(--leaf-deep)', fontWeight: 700 }}>{entry.mytreeId}</span>
          <span>{entry.handle}</span>
        </div>
      </div>
      <ICON.chev size={14} stroke="var(--ink-faint)"/>
    </button>
  );
}

function MiniQr({ dark = 'var(--ink)', light = 'var(--surface)' }) {
  const cells = [
    1,1,1,0,1,0,1,1,1,
    1,0,1,0,0,1,1,0,1,
    1,1,1,1,0,0,1,1,1,
    0,1,0,0,1,1,0,1,0,
    1,0,0,1,1,0,1,0,1,
    0,1,1,0,0,1,0,1,0,
    1,1,1,0,1,0,1,1,1,
    1,0,1,1,0,1,1,0,1,
    1,1,1,0,1,1,1,1,0,
  ];
  return (
    <div style={{
      width: 92, height: 92, padding: 8, borderRadius: 14,
      background: light, display: 'grid',
      gridTemplateColumns: 'repeat(9, 1fr)', gap: 2,
      boxShadow: 'inset 0 0 0 1px var(--line)',
    }}>
      {cells.map((on, i) => (
        <div key={i} style={{ borderRadius: 2, background: on ? dark : 'transparent' }}/>
      ))}
    </div>
  );
}

function TagScanner({ onClose }) {
  const sample = window.NT_DATA.SCAN_SAMPLE;
  const [sent, setSent] = useState(false);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 220,
      background: 'radial-gradient(circle at 50% 28%, #293929 0%, #111812 68%, #080D09 100%)',
      color: '#FFFBF1',
      paddingTop: STATUS_PAD,
      overflow: 'hidden',
    }}>
      <HeaderBar
        onBack={onClose}
        title="Scan tag QR"
        transparent
        right={<button onClick={onClose} aria-label="Close" style={{
          width: 38, height: 38, borderRadius: 999,
          background: 'rgba(255,251,241,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,251,241,.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><ICON.close size={16}/></button>}
      />

      <div style={{
        position: 'absolute', top: STATUS_PAD + 78, left: 22, right: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 11, color: 'rgba(255,251,241,.7)',
      }}>
        <span className="mono">DEAR TREE CAMERA</span>
        <span className="mono">ID LOOKUP READY</span>
      </div>

      <div style={{
        height: 420,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 70,
      }}>
        <div style={{ position: 'relative', width: 246, height: 246 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 28,
            border: '1px solid rgba(255,251,241,.2)',
            background: 'linear-gradient(135deg, rgba(255,251,241,.08), rgba(255,251,241,.02))',
            backdropFilter: 'blur(3px)',
          }}/>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: 42, height: 42,
              borderColor: '#F2D685',
              borderStyle: 'solid',
              borderWidth: i === 0 ? '4px 0 0 4px' :
                           i === 1 ? '4px 4px 0 0' :
                           i === 2 ? '0 0 4px 4px' : '0 4px 4px 0',
              left: i === 0 || i === 2 ? -2 : 'auto',
              right: i === 1 || i === 3 ? -2 : 'auto',
              top: i === 0 || i === 1 ? -2 : 'auto',
              bottom: i === 2 || i === 3 ? -2 : 'auto',
              borderRadius: i === 0 ? '26px 0 0 0' :
                            i === 1 ? '0 26px 0 0' :
                            i === 2 ? '0 0 0 26px' : '0 0 26px 0',
            }}/>
          ))}
          <div style={{
            position: 'absolute', left: 20, right: 20, top: 116,
            height: 2, background: '#F2D685',
            boxShadow: '0 0 22px rgba(242,214,133,.8)',
          }}/>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MiniQr dark="#1F2A20" light="#F8E5B0"/>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 14, right: 14, bottom: 22,
        background: 'var(--surface)', color: 'var(--ink)',
        borderRadius: 26, padding: 18,
        border: '1px solid var(--line)',
        boxShadow: '0 18px 45px rgba(0,0,0,.35)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <MiniQr dark="var(--leaf-deep)" light="var(--leaf-pale)"/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Pill tone="leaf"><ICON.check size={11} strokeWidth={2.5}/>Tag found</Pill>
            <div className="display" style={{ fontSize: 24, lineHeight: 1.05, marginTop: 8 }}>{sample.name}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--leaf-deep)', marginTop: 5, fontWeight: 700 }}>{sample.mytreeId}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 5 }}>
              {sample.supporter} · {sample.handle}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 14, padding: '12px 14px', borderRadius: 16,
          background: 'var(--surface-2)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          fontSize: 11.5, color: 'var(--ink-soft)',
        }}>
          <div>
            <div className="label-tiny">species</div>
            <div>{sample.species}</div>
          </div>
          <div>
            <div className="label-tiny">tagged</div>
            <div>{sample.taggedOn}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="label-tiny">location</div>
            <div>{sample.location}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={() => setSent(true)} className="btn-leaf" style={{ flex: 1, justifyContent: 'center' }}>
            {sent ? <><ICON.check size={15} strokeWidth={2.6}/> Request sent</> : <><ICON.user size={15} strokeWidth={2.3}/> Add friend</>}
          </button>
          <button style={{
            flex: 1, borderRadius: 999, border: '1px solid var(--line)',
            background: 'var(--surface)', color: 'var(--ink)',
            fontSize: 13.5, fontWeight: 650,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <ICON.tree size={15} strokeWidth={2.2}/> Follow tree
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--ink-mute)', lineHeight: 1.4 }}>
          Production flow: open camera, scan the physical tag, resolve the QR to a public Dear Tree profile, then connect through the supporter handle.
        </div>
      </div>
    </div>
  );
}

window.Registry = Registry;
window.MiniQr = MiniQr;
window.TagScanner = TagScanner;
