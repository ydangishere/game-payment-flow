// Link Prompt — state 2b only.
// Reuses the Gear ID mockup but overlays a "save progress" callout
// and a Skip button so the user can bypass linking.

function LinkPromptScreen({ onLink, onSkip }) {
  const [linking, setLinking] = React.useState(false);

  function handleLink() {
    setLinking(true);
    setTimeout(() => onLink?.(), 900);
  }

  return (
    <div style={{
      position: 'relative',
      width: 390, height: 844,
      overflow: 'hidden',
    }}>
      <img
        src="assets/gearid.png"
        alt="Gear ID login"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top center',
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {/* Save-progress callout — overlays just below the top logo, above
          the big GEAR ID wordmark. */}
      <div style={{
        position: 'absolute', top: 70, left: 18, right: 18,
        padding: '12px 14px',
        background: 'rgba(0,0,0,0.32)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 12,
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(180deg, #5cf0ff, #1cd6e0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0a1d3a', fontSize: 18, fontWeight: 900,
          flexShrink: 0,
        }}>↻</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Save your progress</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', marginTop: 1, lineHeight: 1.35 }}>
            Link this purchase to a Gear ID so your coins follow you across devices.
          </div>
        </div>
        <button onClick={onSkip} style={{
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.16)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: 999,
          color: '#fff',
          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em',
          flexShrink: 0,
        }}>SKIP</button>
      </div>

      {/* LOGIN click zone → treated as "Link account" here */}
      <button
        onClick={handleLink}
        style={{
          position: 'absolute',
          top: 560, left: 35, width: 320, height: 68,
          background: 'transparent',
          border: '2px solid transparent',
          borderRadius: 6,
          cursor: 'pointer',
          transition: 'all 0.12s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(42,61,240,0.5)'; e.currentTarget.style.background = 'rgba(42,61,240,0.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}
      />

      {/* Bottom anonymous-id footer */}
      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.5)',
      }}>ANONYMOUS ID · 0x7f3a..b91d</div>

      {linking && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 14,
          color: '#fff',
          animation: 'fadeUp 0.2s ease',
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.2)',
            borderTopColor: '#fff',
            animation: 'spinSlow 0.8s linear infinite',
          }} />
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
          }}>Linking account…</div>
        </div>
      )}
    </div>
  );
}

window.LinkPromptScreen = LinkPromptScreen;
