// Coin Pack — uses user-provided mockup as background.
// Overlays click zones for the Pay button + Close, plus state-specific
// copy patches over the helper text / progress region.

const COIN_PACK_W = 390;
const COIN_PACK_H = 844;

function CoinPackScreen({ state, onPay, onClose }) {
  // Pixel zones (measured against assets/coinpack.png — 390x844)
  // Helper text + progress region: y ≈ 495–580
  // Pay with Xsolla button: y ≈ 405–470, x ≈ 50–280
  // Close X button: y ≈ 765–820, x center

  let stateOverlay = null;
  if (state === 'state2') {
    stateOverlay = (
      <PatchCopy>
        <div style={{ fontSize: 13, color: '#dce8f8', textAlign: 'center', lineHeight: 1.35, padding: '0 24px' }}>
          Tap on <strong style={{ color: '#ffd84a' }}>"Pay with Xsolla"</strong><br />
          to link your account and get more bonus on Webstore
        </div>
      </PatchCopy>
    );
  } else if (state === 'state2b') {
    stateOverlay = (
      <PatchCopy>
        <div style={{ fontSize: 13, color: '#dce8f8', textAlign: 'center', lineHeight: 1.35, padding: '0 24px' }}>
          Tap on <strong style={{ color: '#ffd84a' }}>"Pay with Xsolla"</strong><br />
          to get more bonus on Webstore
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, color: 'rgba(255,212,80,0.7)', textAlign: 'center',
          padding: '0 28px', lineHeight: 1.4,
        }}>Coin attaches to webstore until checkout completes.</div>
      </PatchCopy>
    );
  }
  // State 1 + 3 use the image as-is (progress bar shown).

  return (
    <div style={{
      position: 'relative',
      width: COIN_PACK_W, height: COIN_PACK_H,
      overflow: 'hidden',
    }}>
      <img
        src="assets/coinpack.png"
        alt="Coin pack"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top center',
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {stateOverlay}

      {/* Pay with Xsolla click zone */}
      <ClickZone
        top={390} left={50} width={290} height={80}
        onClick={onPay}
        label="Pay with Xsolla"
      />

      {/* Close X click zone */}
      <ClickZone
        top={710} left={160} width={72} height={72}
        round
        onClick={onClose}
        label="Close"
      />
    </div>
  );
}

// Visible/invisible click hotspot. Shows a faint outline when hovered.
function ClickZone({ top, left, width, height, onClick, label, round }) {
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
        background: hover ? 'rgba(255,255,255,0.08)' : 'transparent',
        border: hover ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
        borderRadius: round ? '50%' : 8,
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
      }}
    />
  );
}

// Patches the helper-text + progress area on the Coin Pack image.
// Positioned to cover the existing "Just 150 more Club Coins…" + progress bar
// region so we can render alternate state copy on top.
function PatchCopy({ children }) {
  return (
    <div style={{
      position: 'absolute',
      top: 455, left: 35, right: 35, height: 95,
      // Match the inner panel's blue gradient so the patch blends.
      background:
        'linear-gradient(180deg, #0e2b56 0%, #0a2148 100%)',
      borderRadius: 6,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </div>
  );
}

window.CoinPackScreen = CoinPackScreen;
