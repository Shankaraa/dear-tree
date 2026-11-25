// ─────────────────────────────────────────────────────────────
// Plant — map · spot detail · pricing · naming ceremony
// ─────────────────────────────────────────────────────────────

function Plant({ onPlanted, persona, setPersona }) {
  const [stage, setStage] = useState('map'); // map | spot | tiers | ceremony | confirm
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [dedication, setDedication] = useState({
    name: '',
    kind: 'kid',
    line: '',
    species: '',
  });

  const goTo = (s) => { window.scrollTo?.(0, 0); setStage(s); };

  if (stage === 'tiers')    return <Tiers onBack={() => goTo('map')} />;
  if (stage === 'spot')     return <SpotDetail spot={selectedSpot} onBack={() => goTo('map')} onPick={() => goTo('ceremony')} onSeeTiers={() => goTo('tiers')} />;
  if (stage === 'ceremony') return <Ceremony spot={selectedSpot} value={dedication} onChange={setDedication} onBack={() => goTo('spot')} onPlanted={() => goTo('confirm')} persona={persona} setPersona={setPersona} />;
  if (stage === 'confirm')  return <ConfirmPlanted spot={selectedSpot} dedication={dedication} onDone={onPlanted} />;

  return <PlantMap onPick={(s) => { setSelectedSpot(s); goTo('spot'); }} onSeeTiers={() => goTo('tiers')} />;
}

// ─────────────────────────────────────────────────────────────
// MAP — pick a location
// ─────────────────────────────────────────────────────────────
const MAP_REGIONS = {
  tn: {
    label: 'Tamil Nadu',
    caption: 'launch state',
    centerLat: 11.25,
    centerLng: 78.75,
    zoom: 7,
    minZoom: 7,
    maxZoom: 14,
    bounds: { minLat: 8.0, maxLat: 13.7, minLng: 76.0, maxLng: 80.7 },
    labels: [
      { label: 'CHENNAI', lat: 13.0827, lng: 80.2707, tone: 'var(--leaf-deep)' },
      { label: 'COIMBATORE', lat: 11.0168, lng: 76.9558 },
      { label: 'MADURAI', lat: 9.9252, lng: 78.1198 },
      { label: 'TIRUCHIRAPPALLI', lat: 10.7905, lng: 78.7047 },
      { label: 'THANJAVUR', lat: 10.7867, lng: 79.1378, tone: 'var(--leaf-deep)' },
      { label: 'NILGIRIS', lat: 11.4064, lng: 76.6932, tone: 'var(--leaf-deep)' },
    ],
  },
  blr: {
    label: 'Bengaluru',
    caption: 'expansion demo',
    centerLat: 12.985,
    centerLng: 77.675,
    zoom: 11,
    minZoom: 10,
    maxZoom: 15,
    bounds: { minLat: 12.86, maxLat: 13.12, minLng: 77.50, maxLng: 77.86 },
    labels: [
      { label: 'LALBAGH', lat: 12.9507, lng: 77.5848, tone: 'var(--leaf-deep)' },
      { label: 'MAJESTIC', lat: 12.9774, lng: 77.5717 },
      { label: 'CUBBON PARK', lat: 12.9763, lng: 77.5929, tone: 'var(--leaf-deep)' },
      { label: 'KORAMANGALA', lat: 12.9352, lng: 77.6245 },
      { label: 'INDIRANAGAR', lat: 12.9719, lng: 77.6412 },
      { label: 'HOSAKOTE', lat: 13.0712, lng: 77.7973, tone: 'var(--leaf-deep)' },
    ],
  },
};

function regionView(regionId) {
  const region = MAP_REGIONS[regionId];
  return {
    region: regionId,
    centerLat: region.centerLat,
    centerLng: region.centerLng,
    zoom: region.zoom,
    width: 402,
    height: 874,
    tileSize: 256,
  };
}

const MAP_VIEW = regionView('tn');

function lngToTileX(lng, zoom) {
  return ((lng + 180) / 360) * Math.pow(2, zoom);
}

function latToTileY(lat, zoom) {
  const rad = lat * Math.PI / 180;
  return (1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * Math.pow(2, zoom);
}

function tileXToLng(x, zoom) {
  return x / Math.pow(2, zoom) * 360 - 180;
}

function tileYToLat(y, zoom) {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

function clampMapCenter(lat, lng, regionId = 'tn') {
  const bounds = MAP_REGIONS[regionId]?.bounds || MAP_REGIONS.tn.bounds;
  return {
    centerLat: Math.max(bounds.minLat, Math.min(bounds.maxLat, lat)),
    centerLng: Math.max(bounds.minLng, Math.min(bounds.maxLng, lng)),
  };
}

function geoToPixel(lat, lng, view = MAP_VIEW) {
  const { centerLat, centerLng, zoom, width, height, tileSize } = view;
  const centerX = lngToTileX(centerLng, zoom) * tileSize;
  const centerY = latToTileY(centerLat, zoom) * tileSize;
  const x = lngToTileX(lng, zoom) * tileSize - centerX + width / 2;
  const y = latToTileY(lat, zoom) * tileSize - centerY + height / 2;
  return { x, y };
}

function pixelDeltaToCenter(view, dx, dy) {
  const { centerLat, centerLng, zoom, tileSize } = view;
  const centerX = lngToTileX(centerLng, zoom) * tileSize - dx;
  const centerY = latToTileY(centerLat, zoom) * tileSize - dy;
  return clampMapCenter(
    tileYToLat(centerY / tileSize, zoom),
    tileXToLng(centerX / tileSize, zoom),
    view.region
  );
}

function mapTiles(view = MAP_VIEW) {
  const { centerLat, centerLng, zoom, width, height, tileSize } = view;
  const centerX = lngToTileX(centerLng, zoom) * tileSize;
  const centerY = latToTileY(centerLat, zoom) * tileSize;
  const minTileX = Math.floor((centerX - width / 2) / tileSize) - 1;
  const maxTileX = Math.floor((centerX + width / 2) / tileSize) + 1;
  const minTileY = Math.floor((centerY - height / 2) / tileSize) - 1;
  const maxTileY = Math.floor((centerY + height / 2) / tileSize) + 1;
  const tiles = [];
  for (let x = minTileX; x <= maxTileX; x++) {
    for (let y = minTileY; y <= maxTileY; y++) {
      tiles.push({
        key: `${zoom}-${x}-${y}`,
        url: `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`,
        left: x * tileSize - centerX + width / 2,
        top: y * tileSize - centerY + height / 2,
      });
    }
  }
  return tiles;
}

function MapLabel({ children, lat, lng, view, tone = 'var(--ink-faint)' }) {
  const pos = geoToPixel(lat, lng, view);
  return (
    <div className="mono" style={{
      position: 'absolute',
      left: pos.x,
      top: pos.y,
      fontSize: 9,
      color: tone,
      opacity: .72,
      transform: 'translate(-50%, -50%)',
      whiteSpace: 'nowrap',
      letterSpacing: .08,
    }}>
      {children}
    </div>
  );
}

function MapControl({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: 999,
      background: 'var(--surface)', border: '1px solid var(--line)',
      boxShadow: 'var(--shadow-sm)',
      fontSize: 20, fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      lineHeight: 1,
    }}>
      {label}
    </button>
  );
}

function PlantMap({ onPick, onSeeTiers }) {
  const { SPOTS } = window.NT_DATA;
  const [region, setRegion] = useState('tn');
  const [filter, setFilter] = useState('all'); // all | civic | hivis | standard | rural
  const [view, setView] = useState(MAP_VIEW);
  const dragRef = useRef(null);
  const regionSpots = SPOTS.filter(s => (s.region || 'blr') === region);
  const filtered = filter === 'all' ? regionSpots : regionSpots.filter(s => s.tier === filter);
  const featuredSpot = filtered[0] || SPOTS[0];
  const featuredMeta = window.tierMeta[featuredSpot.tier];
  const tiles = useMemo(() => mapTiles(view), [view.centerLat, view.centerLng, view.zoom]);
  const activeRegion = MAP_REGIONS[region];

  const focusSpot = (spot) => {
    setView(v => ({
      ...v,
      region,
      ...clampMapCenter(spot.lat, spot.lng, region),
      zoom: Math.max(v.zoom, spot.tier === 'rural' ? activeRegion.minZoom : Math.min(activeRegion.maxZoom, activeRegion.zoom + 2)),
    }));
  };

  const switchRegion = (nextRegion) => {
    setRegion(nextRegion);
    setFilter('all');
    setView(regionView(nextRegion));
  };

  const onMapPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      view,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onMapPointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    const nextCenter = pixelDeltaToCenter(dragRef.current.view, dx, dy);
    setView(v => ({ ...v, ...nextCenter }));
  };

  const onMapPointerUp = (e) => {
    dragRef.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const zoomBy = (delta) => {
    setView(v => ({
      ...v,
      zoom: Math.max(MAP_REGIONS[v.region].minZoom, Math.min(MAP_REGIONS[v.region].maxZoom, v.zoom + delta)),
    }));
  };

  return (
    <div style={{ height: '100%', position: 'relative', background: 'var(--bg)' }}>
      {/* Map canvas */}
      <div
        onPointerDown={onMapPointerDown}
        onPointerMove={onMapPointerMove}
        onPointerUp={onMapPointerUp}
        onPointerCancel={onMapPointerUp}
        style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(rgba(255,251,241,.22), rgba(255,251,241,.22)),
          repeating-linear-gradient(45deg, var(--surface-2) 0 10px, var(--surface) 10px 20px)
        `,
        overflow: 'hidden',
        touchAction: 'none',
        cursor: dragRef.current ? 'grabbing' : 'grab',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .96 }}>
          {tiles.map(tile => (
            <img
              key={tile.key}
              src={tile.url}
              alt=""
              draggable="false"
              style={{
                position: 'absolute',
                left: tile.left,
                top: tile.top,
                width: view.tileSize,
                height: view.tileSize,
                userSelect: 'none',
                WebkitUserDrag: 'none',
              }}
            />
          ))}
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(to bottom, rgba(246,239,224,.18), rgba(246,239,224,.04) 40%, rgba(246,239,224,.24)),
            radial-gradient(circle at 70% 10%, rgba(47,106,63,.08), transparent 36%)
          `,
          pointerEvents: 'none',
        }}/>

        {/* tiny labels */}
        {activeRegion.labels.map(label => (
          <MapLabel
            key={label.label}
            view={view}
            lat={label.lat}
            lng={label.lng}
            tone={label.tone}
          >
            {label.label}
          </MapLabel>
        ))}

        <div className="mono" style={{
          position: 'absolute', left: 12, right: 12, bottom: TAB_PAD + 156,
          padding: '6px 9px', borderRadius: 999,
          background: 'rgba(255,251,241,.82)', backdropFilter: 'blur(6px)',
          border: '1px solid var(--line)',
          fontSize: 9.5, color: 'var(--ink-mute)', zIndex: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>© OpenStreetMap tiles</span>
          <span>prod: Mappls/MapmyIndia</span>
        </div>

        {/* spot pins */}
        {filtered.map(spot => <SpotPin key={spot.id} spot={spot} view={view} onFocus={() => focusSpot(spot)} onClick={() => onPick(spot)} />)}
      </div>

      <div style={{
        position: 'absolute', right: 12, top: STATUS_PAD + 138,
        zIndex: 11, display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <MapControl label="+" onClick={() => zoomBy(1)} />
        <MapControl label="-" onClick={() => zoomBy(-1)} />
        <button onClick={() => setView(regionView(region))} style={{
          width: 38, height: 38, borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ICON.pin size={15} stroke="var(--leaf)" strokeWidth={2.2}/>
        </button>
      </div>

      {/* top — search */}
      <div style={{ position: 'absolute', top: STATUS_PAD - 4, left: 12, right: 12, zIndex: 10, display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, background: 'var(--surface)', borderRadius: 999,
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: 'var(--shadow-md)', border: '1px solid var(--line)',
        }}>
          <ICON.search size={16} stroke="var(--ink-mute)" strokeWidth={1.9}/>
          <input placeholder={`Search ${activeRegion.label} place or Tree ID`} style={{
            flex: 1, border: 0, outline: 0, background: 'transparent',
            fontSize: 14,
          }}/>
          <ICON.pin size={16} stroke="var(--leaf)" strokeWidth={1.9}/>
        </div>
      </div>

      {/* tier filter chips */}
      <div style={{
        position: 'absolute', top: STATUS_PAD + 50, left: 0, right: 0,
        padding: '0 12px', display: 'flex', gap: 6, overflowX: 'auto', zIndex: 10,
      }} className="scroller">
        {[
          { id: 'all', label: 'All' },
          { id: 'civic', label: 'Civic' },
          { id: 'hivis', label: 'High-vis' },
          { id: 'standard', label: 'Standard' },
          { id: 'rural', label: 'Rural' },
        ].map(opt => {
          const active = filter === opt.id;
          const col = opt.id === 'all' ? 'var(--ink)' : window.tierMeta[opt.id]?.color;
          return (
            <button key={opt.id} onClick={() => {
              const nextFiltered = opt.id === 'all' ? regionSpots : regionSpots.filter(s => s.tier === opt.id);
              setFilter(opt.id);
              if (nextFiltered[0]) focusSpot(nextFiltered[0]);
            }} style={{
              padding: '7px 14px', borderRadius: 999, flexShrink: 0,
              background: active ? col : 'var(--surface)',
              color: active ? '#FFFBF1' : 'var(--ink-soft)',
              border: '1px solid var(--line)', fontSize: 12.5, fontWeight: 600,
              boxShadow: 'var(--shadow-sm)',
            }}>{opt.label}</button>
          );
        })}
        <button onClick={onSeeTiers} style={{
          padding: '7px 14px', borderRadius: 999, flexShrink: 0,
          background: 'var(--surface)', color: 'var(--ink-mute)',
          border: '1px solid var(--line)', fontSize: 12.5,
          fontFamily: 'var(--font-mono)', letterSpacing: 0.05,
        }}>tiers ↗</button>
      </div>

      <div style={{
        position: 'absolute', top: STATUS_PAD + 88, left: 12, right: 56,
        zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 6, padding: 4, borderRadius: 999,
        background: 'rgba(255,251,241,.86)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)',
      }}>
        {Object.entries(MAP_REGIONS).map(([id, meta]) => {
          const active = region === id;
          return (
            <button key={id} onClick={() => switchRegion(id)} style={{
              padding: '8px 10px', borderRadius: 999,
              background: active ? 'var(--leaf)' : 'transparent',
              color: active ? '#FFFBF1' : 'var(--ink-soft)',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>{meta.label}</div>
              <div className="mono" style={{ fontSize: 8.5, opacity: .72 }}>{meta.caption}</div>
            </button>
          );
        })}
      </div>

      {/* bottom sheet — featured spot */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: TAB_PAD + 4, zIndex: 10,
        background: 'var(--surface)', borderRadius: 22,
        padding: 14, boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--line)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <PhotoSlot
            ratio={null}
            height={72}
            style={{ width: 72, flexShrink: 0 }}
            round={14}
            tone="leaf"
            scene="site"
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Pill tone={featuredMeta.chip}>{featuredMeta.label}</Pill>
              <Pill tone="default">{featuredSpot.available} open</Pill>
            </div>
            <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>{featuredSpot.label}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>
              {featuredSpot.mytreePrefix} · {featuredSpot.lat.toFixed(4)}, {featuredSpot.lng.toFixed(4)}
            </div>
          </div>
        </div>
        <button onClick={() => onPick(featuredSpot)} className="btn-leaf"
          style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
          See this spot
        </button>
      </div>
    </div>
  );
}

function SpotPin({ spot, view, onFocus, onClick }) {
  const meta = window.tierMeta[spot.tier];
  const pos = geoToPixel(spot.lat, spot.lng, view);
  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={() => { onFocus?.(); onClick?.(); }}
      style={{
      position: 'absolute', left: pos.x, top: pos.y,
      transform: 'translate(-50%, -100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      zIndex: 7,
    }}>
      <div style={{
        background: meta.color,
        color: '#FFFBF1',
        borderRadius: 10,
        padding: '5px 9px',
        fontSize: 9.5, fontWeight: 700,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex', alignItems: 'center', gap: 4,
        whiteSpace: 'nowrap',
      }}>
        <ICON.tree size={10} stroke="#FFFBF1" strokeWidth={2.4}/>
        {spot.mytreePrefix}
      </div>
      <div style={{
        width: 0, height: 0, marginTop: -1,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `7px solid ${meta.color}`,
      }}/>
      <div style={{
        width: 6, height: 6, borderRadius: 999,
        background: meta.color, marginTop: 1,
        boxShadow: '0 0 0 3px rgba(255,251,241,.6)',
      }}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// SPOT DETAIL
// ─────────────────────────────────────────────────────────────
function SpotDetail({ spot, onBack, onPick, onSeeTiers }) {
  const meta = window.tierMeta[spot.tier];
  const [species, setSpecies] = useState(spot.species[0]);

  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg)',
      paddingBottom: TAB_PAD + 20,
    }}>
      <HeaderBar onBack={onBack} title="Spot detail"
        right={<button aria-label="Share this spot" style={{
          width: 38, height: 38, borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><ICON.share size={16}/></button>}/>

      <PhotoSlot
        height={240}
        ratio={null}
        round={0}
        tone="leaf"
        scene={spot.tier === 'rural' ? 'rural' : spot.tier === 'civic' ? 'civic' : 'site'}
        label={`${spot.id}-frontage.jpg`}
        style={{ marginTop: STATUS_PAD + 50 }}
      />

      <div style={{ padding: '20px 18px 0' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <Pill tone={meta.chip}><ICON.pin size={11} strokeWidth={2.4}/>{meta.label}</Pill>
          <Pill tone="default">Footfall · {spot.footfall}</Pill>
        </div>
        <div className="display" style={{ fontSize: 28, lineHeight: 1.1 }}>{spot.label}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 6, letterSpacing: 0.05 }}>
          {spot.mytreePrefix} · {spot.lat.toFixed(4)}, {spot.lng.toFixed(4)} · {geohash(spot.lat, spot.lng)}
        </div>

        {/* Price band */}
        <div style={{
          marginTop: 18, padding: 16,
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div className="label-tiny">price band</div>
              <div className="display" style={{ fontSize: 22 }}>{formatINR(meta.priceLo)} – {formatINR(meta.priceHi)}</div>
            </div>
            <button onClick={onSeeTiers} style={{
              fontSize: 11.5, color: 'var(--leaf)', fontWeight: 600,
              fontFamily: 'var(--font-mono)', letterSpacing: 0.05,
            }}>what funds what ↗</button>
          </div>
          {/* breakdown */}
          {[
            { l: 'Planting + 2-yr care', v: '₹8K' },
            { l: 'Naming/tag after survival', v: 'month 24' },
            { l: 'Extra settling-in care', v: '1 year' },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0', borderTop: i > 0 ? '1px solid var(--line)' : 0,
              fontSize: 13,
            }}>
              <span style={{ color: 'var(--ink-soft)' }}>{r.l}</span>
              <span className="mono" style={{ color: 'var(--ink)', fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* Species picker */}
        <div style={{ marginTop: 18 }}>
          <div className="label-tiny" style={{ marginBottom: 8 }}>species at this spot</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {spot.species.map(sp => (
              <button key={sp} onClick={() => setSpecies(sp)} style={{
                padding: '10px 14px', borderRadius: 14,
                background: species === sp ? 'var(--leaf-pale)' : 'var(--surface)',
                border: `1.5px solid ${species === sp ? 'var(--leaf)' : 'var(--line)'}`,
                fontSize: 13, fontWeight: 600,
                color: species === sp ? 'var(--leaf-deep)' : 'var(--ink-soft)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <ICON.leaf size={14} stroke={species === sp ? 'var(--leaf-deep)' : 'var(--ink-mute)'}/>
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Survival panel */}
        <div style={{
          marginTop: 18, padding: 16,
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)',
        }}>
          <div className="label-tiny" style={{ marginBottom: 12 }}>survival math · honest</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            {[ 
              { v: '78%', l: 'survive 2 yrs' },
              { v: '14d', l: 'replant SLA' },
              { v: '+1yr', l: 'post-tag care' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 22, color: 'var(--leaf)' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 10, lineHeight: 1.4 }}>
            Your supported sapling is not named on day one. If it survives the 2-year care window, it receives the public name/tag and one more year of settling-in maintenance.
          </div>
          <div className="mono" style={{
            marginTop: 12, padding: '8px 10px', borderRadius: 10,
            background: 'var(--surface-2)', fontSize: 10.5, color: 'var(--ink-soft)',
          }}>
            TAG QR WILL RESOLVE TO {spot.mytreePrefix}-####
          </div>
        </div>

        {/* Steward */}
        <div style={{
          marginTop: 18, padding: 16,
          background: 'var(--surface)', borderRadius: 18,
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--marigold-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ICON.user size={22} stroke="var(--marigold)" strokeWidth={1.7}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Karthik · Steward Collective</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>187 trees · 84% survival · 5 yrs</div>
          </div>
          <Pill tone="leaf">Verified</Pill>
        </div>

      </div>

      {/* sticky CTA */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'linear-gradient(to top, var(--bg) 70%, rgba(0,0,0,0))',
        padding: '20px 18px 110px',
        marginTop: 24,
      }}>
        <button onClick={onPick} className="btn-leaf" style={{ width: '100%', justifyContent: 'center', padding: '18px 22px', fontSize: 16 }}>
          Reserve this spot · {formatINR(meta.priceLo)}
          <ICON.chev size={16} strokeWidth={2.4}/>
        </button>
        <div style={{ fontSize: 11, color: 'var(--ink-mute)', textAlign: 'center', marginTop: 8 }}>
          You won't be charged until you confirm the dedication
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TIERS — pricing overview
// ─────────────────────────────────────────────────────────────
function Tiers({ onBack }) {
  const order = ['civic', 'hivis', 'standard', 'rural'];
  return (
    <div className="scroller" style={{
      height: '100%', overflowY: 'auto', background: 'var(--bg)',
      paddingTop: STATUS_PAD + 50, paddingBottom: TAB_PAD + 20,
    }}>
      <HeaderBar onBack={onBack} title="Tiers"/>
      <div style={{ padding: '0 22px' }}>
        <div className="label-tiny" style={{ marginBottom: 8 }}>pricing structure</div>
        <div className="display" style={{ fontSize: 28, lineHeight: 1.1 }}>
          Visibility sets the price.<br/>
          <span style={{ color: 'var(--leaf)' }}>Premium funds reforestation.</span>
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.5 }}>
          Like billboard ads or domain names — foot-traffic and frontage set the rate. 60% of every premium tag funds a stack of rural restoration trees, traceable in the open registry.
        </div>
      </div>

      <div style={{ padding: '24px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {order.map(id => {
          const m = window.tierMeta[id];
          return (
            <div key={id} style={{
              background: 'var(--surface)', borderRadius: 22,
              padding: 18, border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: 6, background: m.color,
              }}/>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="display" style={{ fontSize: 19 }}>{m.label}</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: m.color }}>
                  {formatINR(m.priceLo)} – {formatINR(m.priceHi)}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                {id === 'civic' && 'Bus stations, major intersections, civic frontage. Bought by politicians, celebrities, large corporates as visible legacy.'}
                {id === 'hivis' && 'Main parks, school gates, market frontage. Mid-corporates, well-off families, memorials.'}
                {id === 'standard' && 'Colony parks, residential streets. The kid-tree core market.'}
                {id === 'rural' && 'Native restoration zones. Subsidised by tiers above. Where the mass scale lives.'}
              </div>
              {id === 'civic' && (
                <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--leaf-pale)', borderRadius: 12, fontSize: 12, color: 'var(--leaf-deep)' }}>
                  <strong>1 civic tag</strong> = <strong>~200 rural restoration trees</strong> in cross-subsidy
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ padding: '24px 22px 0', fontSize: 12, color: 'var(--ink-mute)', fontStyle: 'italic', lineHeight: 1.5 }}>
        "One politician's vanity tag = 200 actual reforestation trees + the platform's bills paid. Cynical, elegant, works."
      </div>
    </div>
  );
}

window.Plant = Plant;
