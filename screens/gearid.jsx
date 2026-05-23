// Gear ID — uses user-provided login mockup as background.
// Click zone on the LOGIN button advances the flow.

function GearIDScreen({ onLogin }) {
  const [loggingIn, setLoggingIn] = React.useState(false);

  function handleLogin() {
    setLoggingIn(true);
    setTimeout(() => onLogin?.({ email: 'ydv@geargames.com' }), 900);
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

      {/* LOGIN click zone (coords measured on assets/gearid.png) */}
      <ClickZoneG
        top={560} left={35} width={320} height={68}
        onClick={handleLogin}
        label="Login"
        round={false}
      />

      {loggingIn && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
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
          }}>Signing in…</div>
        </div>
      )}
    </div>
  );
}

function ClickZoneG({ top, left, width, height, onClick, label, round }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
      style={{
        position: 'absolute',
        top, left, width, height,
        background: hover ? 'rgba(42,61,240,0.08)' : 'transparent',
        border: hover ? '2px solid rgba(42,61,240,0.5)' : '2px solid transparent',
        borderRadius: round ? '50%' : 6,
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
      }}
    />
  );
}

window.GearIDScreen = GearIDScreen;
