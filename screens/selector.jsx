// Selector — "Select Flow to Test" main screen.
// Not part of real product; only for prototype testing.

const FLOW_OPTIONS = [
  {
    id: 'state1',
    label: 'State 1',
    title: 'Logged in + Linked',
    sub: 'Player is logged into webstore and Gear ID is already linked. Direct path to Xsolla checkout.',
    chips: ['LOGGED IN', 'LINKED'],
    steps: '3 screens',
    accent: '#5cc14a',
  },
  {
    id: 'state2',
    label: 'State 2',
    title: 'Not logged in + Not linked',
    sub: 'New player. Must log into Gear ID first, which auto-links the webstore account.',
    chips: ['NOT LOGGED IN', 'NOT LINKED'],
    steps: '4 screens',
    accent: '#ffaa3a',
  },
  {
    id: 'state3',
    label: 'State 3',
    title: 'Not logged in + Already linked',
    sub: 'Returning player. Must log in to Gear ID, then proceed straight to checkout.',
    chips: ['NOT LOGGED IN', 'LINKED'],
    steps: '4 screens',
    accent: '#3a9ee0',
  },
  {
    id: 'state2b',
    label: 'State 2b',
    title: 'Guest / Anonymous',
    sub: 'Anonymous webstore account bound to playerId. Coin attaches to webstore; can be upgraded to Gear account later.',
    chips: ['ANONYMOUS', 'WEBSTORE-ONLY'],
    steps: '5 screens',
    accent: '#c878ff',
  },
];

function SelectorScreen({ onPick }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background:
        'radial-gradient(800px 500px at 50% 0%, #1d2230 0%, #14181f 50%, #0c0e13 100%)',
      color: '#fff',
      display: 'flex', flexDirection: 'column',
      padding: '58px 20px 24px',
      overflow: 'auto',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9.5, letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        marginBottom: 6,
      }}>
        Prototype · QA build
      </div>
      <div style={{
        fontFamily: "'Cinzel', serif", fontWeight: 800,
        fontSize: 26, lineHeight: 1.05, marginBottom: 6,
        letterSpacing: '0.01em',
      }}>
        Select Flow to Test
      </div>
      <div style={{
        fontSize: 12, lineHeight: 1.4, color: 'rgba(255,255,255,0.6)',
        marginBottom: 14,
      }}>
        Pick an account state to launch the Coin Pack purchase flow with the matching navigation logic.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FLOW_OPTIONS.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => onPick(opt.id)}
            style={{
              textAlign: 'left',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 12,
              padding: '11px 13px 12px 15px',
              color: '#fff',
              transition: 'all 0.18s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 3, bottom: 0,
              background: opt.accent,
            }} />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 3 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, letterSpacing: '0.16em',
                color: opt.accent, fontWeight: 600,
              }}>{opt.label.toUpperCase()}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5, color: 'rgba(255,255,255,0.4)',
              }}>{opt.steps}</div>
            </div>
            <div style={{
              fontSize: 15, fontWeight: 600, lineHeight: 1.2,
              marginBottom: 3, letterSpacing: '-0.005em',
            }}>{opt.title}</div>
            <div style={{
              fontSize: 11.5, lineHeight: 1.35, color: 'rgba(255,255,255,0.55)',
              marginBottom: 7,
            }}>{opt.sub}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {opt.chips.map(c => (
                <span key={c} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: '0.1em',
                  padding: '3px 7px',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.72)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>{c}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div style={{
        marginTop: 14, paddingTop: 4,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center', textTransform: 'uppercase',
      }}>
        Test harness · Not shipped to players
      </div>
    </div>
  );
}

window.SelectorScreen = SelectorScreen;
window.FLOW_OPTIONS = FLOW_OPTIONS;
