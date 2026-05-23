// You Got — uses user-provided mockup as background.
// Whole screen is tap-to-continue.

function YouGotScreen({ onContinue, amount = 'x1000' }) {
  return (
    <div
      onClick={onContinue}
      style={{
        position: 'relative',
        width: 390, height: 844,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <img
        src="assets/yougot.png"
        alt="You got 1000 coins"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top center',
          pointerEvents: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}

window.YouGotScreen = YouGotScreen;
