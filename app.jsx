// ─────────────────────────────────────────────────────────────
// Dear Tree — App shell, navigation, tweaks wiring
// ─────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "treeMonth": 14,
  "persona": "family",
  "skipOnboarding": false
}/*EDITMODE-END*/;

function App({ tweaks, setTweak }) {
  const dark = !!tweaks.dark;
  const persona = tweaks.persona || 'family';
  const setPersona = (p) => setTweak('persona', p);
  const month = Math.max(1, Math.min(24, Math.round(tweaks.treeMonth || 14)));
  const setMonth = (m) => setTweak('treeMonth', m);

  const [route, setRoute] = useState(tweaks.skipOnboarding ? 'app' : 'onboarding');
  const [tab, setTab]     = useState('garden');
  const [stack, setStack] = useState([]);       // 'tree', 'tagCeremony', 'csr', 'scanner'

  // apply theme class
  useEffect(() => {
    const el = document.getElementById('app-root');
    if (el) el.className = `app-root ${dark ? 'theme-dark' : 'theme-light'}`;
  }, [dark]);

  const push = (s) => setStack(prev => [...prev, s]);
  const pop  = ()  => setStack(prev => prev.slice(0, -1));

  let scene;
  if (route === 'onboarding') {
    scene = <Onboarding onDone={() => setRoute('app')} />;
  } else {
    if (tab === 'garden') {
      scene = <Garden
        mainTreeMonth={month}
        persona={persona}
        onOpenTree={() => push('tree')}
        onOpenPlant={() => setTab('plant')}
        onOpenScan={() => push('scanner')}
      />;
    } else if (tab === 'plant') {
      scene = <Plant
        onPlanted={() => { setTab('garden'); push('tree'); }}
        persona={persona}
        setPersona={setPersona}
      />;
    } else if (tab === 'registry') {
      scene = <Registry onOpenEntry={() => push('tree')} onOpenScan={() => push('scanner')}/>;
    } else if (tab === 'profile') {
      scene = <Profile persona={persona} setPersona={setPersona} onOpenCSR={() => push('csr')}/>;
    }
  }

  const top = stack[stack.length - 1];

  return (
    <div id="app-root" className={`app-root ${dark ? 'theme-dark' : 'theme-light'}`}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {scene}

      {route === 'app' && top !== 'csr' && top !== 'tagCeremony' && top !== 'scanner' && (
        <TabBar tab={tab} onTab={(t) => { setStack([]); setTab(t); }} dark={dark}/>
      )}

      {top === 'tree' && (
        <div style={overlayStyle}>
          <TreeDetail
            month={month}
            setMonth={setMonth}
            onBack={pop}
            onClaimTag={() => push('tagCeremony')}
          />
        </div>
      )}

      {top === 'tagCeremony' && <Dialog label="Tag ceremony" onClose={pop}><TagCeremony onClose={pop}/></Dialog>}

      {top === 'csr' && (
        <Dialog label="CSR dashboard" onClose={pop}>
          <div style={overlayStyle}>
            <CSRDashboard onClose={pop}/>
          </div>
        </Dialog>
      )}

      {top === 'scanner' && <Dialog label="Scan a tree tag" onClose={pop}><TagScanner onClose={pop}/></Dialog>}
    </div>
  );
}

const overlayStyle = {
  position: 'absolute', inset: 0, zIndex: 100,
  background: 'var(--bg)',
};

// ─────────────────────────────────────────────────────────────
// Root + Tweaks
// ─────────────────────────────────────────────────────────────
// Shareable demo states, e.g. ?dark=1&month=24&skip=1&persona=memorial
function urlTweaks() {
  const q = new URLSearchParams(location.search), t = {};
  if (q.has('dark')) t.dark = q.get('dark') !== '0';
  if (q.has('month')) t.treeMonth = Number(q.get('month')) || TWEAK_DEFAULTS.treeMonth;
  if (q.has('skip')) t.skipOnboarding = q.get('skip') !== '0';
  if (q.has('persona')) t.persona = q.get('persona');
  return t;
}

// Always-visible reminder that this is a concept, shown beside the phone on wide screens.
function DemoNote() {
  const [wide, setWide] = useState(window.innerWidth >= 700);
  useEffect(() => {
    const f = () => setWide(window.innerWidth >= 700);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  if (!wide || new URLSearchParams(location.search).has('clean')) return null;
  return (
    <div style={{
      position: 'fixed', left: 16, bottom: 16, zIndex: 2147483645, maxWidth: 260,
      padding: '9px 14px', borderRadius: 14,
      background: 'rgba(30,45,34,.88)', color: '#FFFBF1',
      font: '500 12px/1.4 "DM Sans", system-ui, sans-serif',
    }}>
      <strong>Concept prototype.</strong> Sample data. No real trees are planted and no payments are taken.
    </div>
  );
}

function Root() {
  const [tweaks, setTweak] = useTweaks({ ...TWEAK_DEFAULTS, ...urlTweaks() });
  const dark = !!tweaks.dark;

  // fit-to-viewport scale
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth, h = window.innerHeight;
      setScale(Math.min(w / 422, h / 904, 1));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: dark
        ? 'radial-gradient(circle at 30% 20%, #18221A 0%, #0A100C 80%)'
        : 'radial-gradient(circle at 30% 20%, #F0E5CC 0%, #DFD2B5 80%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      transition: 'background .4s ease',
    }}>
      <DemoNote/>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <IOSDevice width={402} height={874} dark={dark}>
          <App tweaks={tweaks} setTweak={setTweak}/>
        </IOSDevice>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakToggle label="Dark mode" value={!!tweaks.dark} onChange={(v) => setTweak('dark', v)}/>
        </TweakSection>

        <TweakSection label="Tree progress">
          <TweakSlider
            label="Main tree month"
            value={tweaks.treeMonth}
            min={1} max={24} step={1}
            unit=" / 24"
            onChange={(v) => setTweak('treeMonth', v)}
          />
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {[
              { m: 1,  l: 'planted' },
              { m: 6,  l: 'sunbird' },
              { m: 12, l: 'b-day' },
              { m: 22, l: 'almost' },
              { m: 24, l: 'tag!' },
            ].map(opt => (
              <button key={opt.m} onClick={() => setTweak('treeMonth', opt.m)} style={{
                flex: 1, padding: '7px 0', borderRadius: 8,
                background: tweaks.treeMonth === opt.m ? '#2F6A3F' : 'rgba(0,0,0,0.06)',
                color: tweaks.treeMonth === opt.m ? '#FFFBF1' : 'inherit',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600,
                border: 0, cursor: 'pointer',
              }}>
                m{opt.m}
              </button>
            ))}
          </div>
        </TweakSection>

        <TweakSection label="Persona">
          <TweakRadio
            label="Mode"
            value={tweaks.persona}
            onChange={(v) => setTweak('persona', v)}
            options={[
              { value: 'family',   label: 'Family' },
              { value: 'memorial', label: 'Memorial' },
              { value: 'csr',      label: 'CSR' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Flow">
          <TweakToggle
            label="Skip onboarding"
            value={!!tweaks.skipOnboarding}
            onChange={(v) => setTweak('skipOnboarding', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
