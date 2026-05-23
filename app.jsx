// App — state machine + iOS frame + tweaks panel.

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showFlowMeta": true,
  "showStateSwitcher": true
}/*EDITMODE-END*/;

// Per-state navigation maps
const FLOW_PATHS = {
  state1: ['coinpack', 'xsolla', 'yougot'],
  state2: ['coinpack', 'gearid', 'xsolla', 'yougot'],
  state3: ['coinpack', 'gearid', 'xsolla', 'yougot'],
  state2b: ['coinpack', 'xsolla', 'yougot', 'linkprompt'],
};

function App({ tweaks }) {
  const [state, setState] = useState(null);
  const [screenIdx, setScreenIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  function pickFlow(id) {
    setState(id);
    setScreenIdx(0);
  }
  function nextScreen() {
    if (!state) return;
    const path = FLOW_PATHS[state];
    if (screenIdx + 1 >= path.length) {
      reset();
    } else {
      setTransitioning(true);
      setTimeout(() => {
        setScreenIdx(screenIdx + 1);
        setTransitioning(false);
      }, 200);
    }
  }
  function reset() {
    setTransitioning(true);
    setTimeout(() => {
      setState(null);
      setScreenIdx(0);
      setTransitioning(false);
    }, 200);
  }
  function jumpToFlow(id) {
    setTransitioning(true);
    setTimeout(() => {
      setState(id);
      setScreenIdx(0);
      setTransitioning(false);
    }, 150);
  }

  const currentScreen = state ? FLOW_PATHS[state][screenIdx] : 'selector';

  let body = null;
  if (!state) {
    body = <SelectorScreen onPick={pickFlow} />;
  } else if (currentScreen === 'coinpack') {
    body = <CoinPackScreen state={state} onPay={nextScreen} onClose={reset} />;
  } else if (currentScreen === 'gearid') {
    body = <GearIDScreen onLogin={nextScreen} />;
  } else if (currentScreen === 'xsolla') {
    body = <XsollaCheckoutScreen onComplete={nextScreen} onBack={reset} />;
  } else if (currentScreen === 'yougot') {
    body = <YouGotScreen onContinue={nextScreen} amount="x1000" />;
  } else if (currentScreen === 'linkprompt') {
    body = <LinkPromptScreen onLink={nextScreen} onSkip={nextScreen} />;
  }

  const path = state ? FLOW_PATHS[state] : null;
  const stepLabel = path ? `${screenIdx + 1} / ${path.length}` : null;
  const flowLabel = state ? FLOW_OPTIONS.find(o => o.id === state) : null;

  return (
    <div className="stage">
      {tweaks.showFlowMeta && (
        <div className="stage-meta" data-screen-label="Flow meta">
          {state ? (
            <>
              <span className="dot"></span>
              <span>{flowLabel?.label} · {flowLabel?.title}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{currentScreen.toUpperCase()}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{stepLabel}</span>
              <button onClick={reset} className="reset-btn" style={{ marginLeft: 8 }}>Exit flow</button>
            </>
          ) : (
            <>
              <span style={{ opacity: 0.6 }}>QA harness · idle · awaiting selection</span>
            </>
          )}
        </div>
      )}

      <div
        data-screen-label={state ? `${state}-${currentScreen}` : 'selector'}
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        <PhoneShell useIOS={!state}>
          {body}
        </PhoneShell>
      </div>

      {state && tweaks.showStateSwitcher && (
        <div style={{
          display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center',
          maxWidth: 480,
        }}>
          {FLOW_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => jumpToFlow(opt.id)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '6px 10px',
                borderRadius: 6,
                background: state === opt.id ? opt.accent : 'rgba(255,255,255,0.06)',
                color: state === opt.id ? '#0c0e13' : 'rgba(255,255,255,0.65)',
                border: '1px solid ' + (state === opt.id ? opt.accent : 'rgba(255,255,255,0.1)'),
                fontWeight: 600, cursor: 'pointer',
              }}
            >{opt.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function Root() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <App tweaks={tweaks} />
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Test harness">
          <window.TweakToggle
            label="Flow meta strip"
            value={tweaks.showFlowMeta}
            onChange={(v) => setTweak('showFlowMeta', v)}
          />
          <window.TweakToggle
            label="State switcher buttons"
            value={tweaks.showStateSwitcher}
            onChange={(v) => setTweak('showStateSwitcher', v)}
          />
        </window.TweakSection>
        <window.TweakSection label="About">
          <div style={{
            fontSize: 11.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.65)',
            padding: '4px 2px',
          }}>
            QA harness for the Xsolla in-game purchase flow. The selector screen is for testing only — it is not part of the shipped product.
          </div>
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

// ── PhoneShell ───────────────────────────────────────────────────────────
// 390×844 rounded rect with shadow, dynamic island, and home indicator.
// The mockup images include their own status bars, so we don't draw one.
// For the selector (no image), we add a thin top-padding inset and a fake
// status bar.
function PhoneShell({ children, useIOS = false }) {
  return (
    <div style={{
      width: 390, height: 844,
      borderRadius: 48, overflow: 'hidden',
      position: 'relative',
      background: '#000',
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      {children}
      {/* Dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 122, height: 35, borderRadius: 24, background: '#000', zIndex: 50,
        pointerEvents: 'none',
      }} />
      {/* iOS status bar — only shown when content doesn't include one */}
      {useIOS && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 50, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 30px', color: '#fff',
          pointerEvents: 'none',
        }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>9:41</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
            <span>●●●●</span>
            <span>📶</span>
            <span style={{
              width: 24, height: 11, border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: 3, padding: 1, display: 'inline-flex',
            }}><span style={{ background: '#fff', flex: 1, borderRadius: 1 }} /></span>
          </span>
        </div>
      )}
      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 134, height: 5, borderRadius: 100,
        background: 'rgba(255,255,255,0.7)', zIndex: 60,
        pointerEvents: 'none',
      }} />
    </div>
  );
}
