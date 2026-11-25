// ─────────────────────────────────────────────────────────────
// Garden — home / my trees / activity feed
// ─────────────────────────────────────────────────────────────

function Garden({ onOpenTree, onOpenPlant, onOpenScan, mainTreeMonth, persona }) {
  const { MAIN_TREE, OTHER_TREES, FEED } = window.NT_DATA;
  const tagged = mainTreeMonth >= 24;
  const [bowlState, setBowlState] = useState('none'); // none | owned | filled

  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto',
      paddingTop: STATUS_PAD + 6,
      paddingBottom: TAB_PAD + 20,
      background: 'var(--bg)',
    }}>
      {/* greeting */}
      <div style={{ padding: '6px 22px 14px' }}>
        <div className="label-tiny" style={{ marginBottom: 6 }}>21 may · chennai · 35° c</div>
        <div className="display" style={{ fontSize: 30, lineHeight: 1.1 }}>
          Good morning,<br/>
          <span style={{ color: 'var(--leaf)' }}>Anika</span>.
        </div>
      </div>

      {/* Hero tree — main focus */}
      <div style={{ padding: '0 18px' }}>
        <button onClick={onOpenTree} style={{
          width: '100%', textAlign: 'left',
          background: 'var(--surface)',
          borderRadius: 26, overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--line)',
          position: 'relative',
        }}>
          <div style={{ position: 'relative' }}>
            <PhotoSlot
              height={210}
              ratio={null}
              round={0}
              tone="leaf"
              scene="tree"
              month={mainTreeMonth}
              label={`tree-${mainTreeMonth.toString().padStart(2,'0')}m.jpg`}
            />
            <div style={{
              position: 'absolute', top: 14, left: 14,
              display: 'flex', gap: 6,
            }}>
              <Pill tone="leaf">
                <ICON.tree size={11} strokeWidth={2.4}/>Live
              </Pill>
              <Pill tone="default">Month {mainTreeMonth} / 24</Pill>
              {tagged && <Pill tone="mari"><ICON.award size={11} strokeWidth={2.4}/>Tagged</Pill>}
            </div>
            <div style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(255,251,241,0.92)',
              backdropFilter: 'blur(8px)',
              padding: '6px 10px', borderRadius: 999,
              fontFamily: 'var(--font-mono)', fontSize: 10.5,
              color: 'var(--ink-soft)', letterSpacing: 0.05,
            }}>
              {geohash(MAIN_TREE.lat, MAIN_TREE.lng)}
            </div>
            {/* growth progress at bottom of hero */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '38px 18px 16px',
              background: 'linear-gradient(to top, rgba(31,42,32,.78), rgba(31,42,32,0))',
              color: '#FFFBF1',
            }}>
              <div className="display" style={{ fontSize: 26, lineHeight: 1 }}>
                {tagged ? `${MAIN_TREE.dedicatedTo}'s tree` : `For ${MAIN_TREE.dedicatedTo}`}
              </div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{MAIN_TREE.species}</div>
            </div>
          </div>

          {/* growth bar */}
          <div style={{ padding: '16px 18px 18px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 12, color: 'var(--ink-mute)', marginBottom: 8,
            }}>
              <span>Planted · 21 Apr 2024</span>
              <span className="mono">{mainTreeMonth}/24 mo</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--surface-2)', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0, width: `${(mainTreeMonth/24)*100}%`,
                background: tagged
                  ? 'linear-gradient(to right, var(--leaf), var(--marigold))'
                  : 'linear-gradient(to right, var(--leaf-soft), var(--leaf))',
                borderRadius: 999,
              }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
              <ICON.sparkle size={14} stroke="var(--marigold)" strokeWidth={2}/>
              <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                {tagged ? 'Your tree name is ready · open to claim the tag' :
                  mainTreeMonth >= 22 ? `${24-mainTreeMonth} months to tag day` :
                  mainTreeMonth >= 12 ? 'First birthday cleared · 84% of cohort still standing' :
                  `Surviving · ${24-mainTreeMonth} months to go`}
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Action row */}
      <div style={{ padding: '14px 18px 0', display: 'flex', gap: 8 }}>
        <ActionTile icon={ICON.qr} label="Scan" sub="Tag QR" onClick={onOpenScan} />
        <ActionTile
          icon={ICON.drop}
          label={bowlState === 'none' ? 'Get bowl' : 'Water'}
          sub={bowlState === 'filled' ? 'Done today' : bowlState === 'owned' ? 'Fill first' : 'Own first'}
          onClick={() => {
            if (bowlState === 'none') setBowlState('owned');
            else if (bowlState === 'owned') setBowlState('filled');
          }}
        />
        <ActionTile icon={ICON.share}  label="Share"    sub="Open card" />
      </div>

      {/* Other trees in your garden */}
      <SectionLabel action="See all">your garden · 3 trees</SectionLabel>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {OTHER_TREES.map(t => <TreeRow key={t.id} tree={t} />)}
        <button onClick={onOpenPlant} style={{
          marginTop: 4,
          border: '1px dashed var(--line-strong)',
          borderRadius: 18, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          color: 'var(--ink-mute)', fontSize: 14,
          background: 'transparent',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999,
            background: 'var(--leaf-pale)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ICON.plus size={18} stroke="var(--leaf-deep)" strokeWidth={2.2}/>
          </div>
          <span>Plant another tree</span>
        </button>
      </div>

      {/* Activity feed */}
      <SectionLabel action="Filter">activity · live</SectionLabel>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FEED.map(item => <FeedRow key={item.id} item={item} />)}
      </div>

      {/* Bowls of water — companion */}
      <SectionLabel>this week · bowls of water</SectionLabel>
      <div style={{ padding: '0 18px' }}>
        <BowlsCard persona={persona} bowlState={bowlState} setBowlState={setBowlState}/>
      </div>
    </div>
  );
}

function ActionTile({ icon: Ico, label, sub, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, background: 'var(--surface)',
      borderRadius: 16, padding: '12px 10px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      border: '1px solid var(--line)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 999,
        background: 'var(--leaf-pale)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Ico size={18} stroke="var(--leaf-deep)" strokeWidth={1.9}/>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>{sub}</div>
    </button>
  );
}

function TreeRow({ tree }) {
  const t = window.tierMeta[tree.tier];
  const isMemorial = tree.dedicationKind === 'memorial';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'var(--surface)', borderRadius: 18,
      padding: '12px 14px', border: '1px solid var(--line)',
    }}>
      <PhotoSlot
        style={{ width: 56, height: 56, flexShrink: 0 }}
        ratio={null}
        height={56}
        round={14}
        tone={isMemorial ? 'dawn' : 'leaf'}
        scene={isMemorial ? 'memorial' : 'tree'}
        month={tree.monthProgress}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="display" style={{ fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {tree.monthProgress >= 24 ? `${tree.dedicatedTo}'s tree` : `For ${tree.dedicatedTo}`}
          </div>
          {isMemorial && <Pill tone="terra" style={{ padding: '2px 7px', fontSize: 10, flexShrink: 0 }}>Memorial</Pill>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {tree.species} · {tree.location}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'var(--surface-2)' }}>
            <div style={{ width: `${(tree.monthProgress/24)*100}%`, height: '100%', background: t.color, borderRadius: 4 }}/>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>{tree.monthProgress}/24</div>
        </div>
      </div>
      <ICON.chev size={14} stroke="var(--ink-faint)" />
    </div>
  );
}

function FeedRow({ item }) {
  const Ico = ICON[item.icon] || ICON.leaf;
  const toneBg = {
    leaf: 'var(--leaf-pale)', mari: 'var(--marigold-pale)',
    sky: 'var(--sky-soft)', default: 'var(--surface-2)',
  }[item.tone];
  const toneIco = {
    leaf: 'var(--leaf-deep)', mari: '#6E4F00',
    sky: '#2A4D5F', default: 'var(--ink-soft)',
  }[item.tone];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '12px 14px', background: 'var(--surface)',
      borderRadius: 16, border: '1px solid var(--line)',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 999,
        background: toneBg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Ico size={17} stroke={toneIco} strokeWidth={1.9}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.35 }}>{item.text}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }}>
          {item.tree && <>{item.tree} · </>}{item.when}
        </div>
      </div>
    </div>
  );
}

function BowlsCard({ persona, bowlState, setBowlState }) {
  const hasBowl = bowlState !== 'none';
  const filled = bowlState === 'filled';
  const streak = filled ? 1 : 0;
  const primaryCopy = !hasBowl
    ? 'Register clay bowl kit'
    : filled
      ? 'Filled today'
      : 'Fill the bowl now';
  const secondaryCopy = !hasBowl
    ? 'You need a bowl before you can log water.'
    : filled
      ? 'Next refill unlocks tomorrow morning.'
      : 'Your balcony bowl is registered. Fill it before noon.';
  return (
    <div style={{
      background: 'linear-gradient(140deg, var(--sky-soft), var(--surface))',
      borderRadius: 22, padding: 18,
      border: '1px solid var(--line)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <PhotoSlot scene="bowl" ratio={null} height={54} style={{ width: 54, flexShrink: 0 }} round={16}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{hasBowl ? 'Clay bowl, balcony' : 'No bowl registered yet'}</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>{secondaryCopy}</div>
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>{hasBowl ? `${streak}d streak` : 'step 1/2'}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
        <div style={{
          padding: '10px 12px', borderRadius: 14,
          background: hasBowl ? 'var(--surface)' : 'rgba(255,251,241,.55)',
          border: `1px solid ${hasBowl ? 'var(--leaf)' : 'var(--line)'}`,
        }}>
          <div className="mono" style={{ fontSize: 10, color: hasBowl ? 'var(--leaf)' : 'var(--ink-mute)' }}>STEP 01</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 3 }}>Own bowl</div>
        </div>
        <div style={{
          padding: '10px 12px', borderRadius: 14,
          background: filled ? 'var(--surface)' : 'rgba(255,251,241,.55)',
          border: `1px solid ${filled ? 'var(--leaf)' : 'var(--line)'}`,
          opacity: hasBowl ? 1 : .62,
        }}>
          <div className="mono" style={{ fontSize: 10, color: filled ? 'var(--leaf)' : 'var(--ink-mute)' }}>STEP 02</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 3 }}>Fill water</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 14 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 26, borderRadius: 6,
            background: i < streak ? 'var(--sky)' : 'var(--surface-2)',
            opacity: i < streak ? (0.4 + i / 28) : 1,
          }}/>
        ))}
      </div>
      <button
        onClick={() => {
          if (bowlState === 'none') setBowlState('owned');
          else if (bowlState === 'owned') setBowlState('filled');
        }}
        disabled={filled}
        style={{
          marginTop: 14, width: '100%',
          background: filled ? 'var(--surface)' : 'var(--ink)',
          color: filled ? 'var(--ink-soft)' : 'var(--bg)',
          padding: '11px 16px', borderRadius: 999,
          fontSize: 13.5, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
        {filled ? <><ICON.check size={14} strokeWidth={2.6}/> {primaryCopy}</> : primaryCopy}
      </button>
    </div>
  );
}

window.Garden = Garden;
