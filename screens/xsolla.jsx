// Xsolla Checkout — generic payment checkout mock.
// Original design — not a recreation of Xsolla's actual checkout UI.

function XsollaCheckoutScreen({ onComplete, onBack }) {
  const [method, setMethod] = React.useState('card');
  const [cardNum, setCardNum] = React.useState('4242 4242 4242 4242');
  const [exp, setExp] = React.useState('12 / 28');
  const [cvc, setCvc] = React.useState('123');
  const [processing, setProcessing] = React.useState(false);
  const [step, setStep] = React.useState('form'); // form | processing | success

  function handlePay() {
    setProcessing(true);
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(onComplete, 700);
    }, 1600);
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0f1116', color: '#fff',
      paddingTop: 50,
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <button onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 18,
        }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace" }}>SECURE CHECKOUT · XSOLLA</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Arcane Gem Pack</div>
        </div>
        <div style={{
          width: 26, height: 26, borderRadius: 6,
          background: 'rgba(82,193,90,0.15)',
          border: '1px solid rgba(82,193,90,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#7ee08a', fontSize: 14,
        }}>🔒</div>
      </div>

      {step === 'form' && (
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '16px 18px 18px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {/* Order summary */}
          <div style={{
            background: 'linear-gradient(180deg, #1a4378 0%, #0c2548 100%)',
            borderRadius: 12,
            padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid rgba(255,212,80,0.18)',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 8,
              background: 'linear-gradient(180deg, #6e4a10 0%, #3a2408 100%)',
              border: '2px solid #c98a2e',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffd84a', fontWeight: 900, fontSize: 13,
              fontFamily: "'Cinzel', serif",
            }}>x1000</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Arcane Gem Pack</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>1000 coins + 160 bonus</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#ffd84a' }}>$599.000</div>
            </div>
          </div>

          {/* Email */}
          <Field label="Email">
            <input
              defaultValue="ydv@geargames.com"
              style={inputStyle}
            />
          </Field>

          {/* Payment method tabs */}
          <div>
            <Label>Payment method</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 6 }}>
              {[
                { id: 'card', label: 'Card', sub: 'Visa · MC' },
                { id: 'wallet', label: 'Wallet', sub: 'Apple Pay' },
                { id: 'paypal', label: 'PayPal', sub: 'Redirect' },
              ].map(m => (
                <button key={m.id} onClick={() => setMethod(m.id)} style={{
                  padding: '10px 8px',
                  borderRadius: 10,
                  background: method === m.id ? 'rgba(82,140,255,0.16)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid ' + (method === m.id ? '#5a8cff' : 'rgba(255,255,255,0.08)'),
                  color: '#fff',
                  display: 'flex', flexDirection: 'column', gap: 2,
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{m.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Card form */}
          {method === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Field label="Card number">
                <input value={cardNum} onChange={e => setCardNum(e.target.value)} style={inputStyle} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Expires">
                  <input value={exp} onChange={e => setExp(e.target.value)} style={inputStyle} />
                </Field>
                <Field label="CVC">
                  <input value={cvc} onChange={e => setCvc(e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>
          )}
          {method === 'wallet' && (
            <div style={{
              padding: 16, borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px dashed rgba(255,255,255,0.12)',
              fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center',
              lineHeight: 1.5,
            }}>Apple Pay sheet would appear here.</div>
          )}
          {method === 'paypal' && (
            <div style={{
              padding: 16, borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px dashed rgba(255,255,255,0.12)',
              fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center',
              lineHeight: 1.5,
            }}>Redirects to PayPal to authorize.</div>
          )}

          <div style={{ flex: 1 }} />

          {/* Pay button */}
          <button onClick={handlePay} style={{
            width: '100%', padding: '15px',
            background: 'linear-gradient(180deg, #4eb4f0 0%, #2a8fdb 100%)',
            color: '#fff', borderRadius: 12,
            fontWeight: 800, fontSize: 15, letterSpacing: '0.04em',
            boxShadow: '0 4px 14px rgba(42,143,219,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            Pay $599.000
            <span style={{ fontSize: 12, opacity: 0.7 }}>→</span>
          </button>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.35)',
            textAlign: 'center', letterSpacing: '0.08em',
            fontFamily: "'JetBrains Mono', monospace",
          }}>Powered by Xsolla · PCI-DSS Level 1</div>
        </div>
      )}

      {step === 'processing' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 18,
          padding: 20,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTopColor: '#4eb4f0',
            animation: 'spinSlow 0.9s linear infinite',
          }} />
          <div style={{ fontSize: 15, fontWeight: 600 }}>Processing payment…</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Don't close this window.</div>
        </div>
      )}

      {step === 'success' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 18,
          padding: 20,
          animation: 'fadeUp 0.3s ease',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(180deg, #5cc14a 0%, #2e8e22 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 32, fontWeight: 800,
            boxShadow: '0 0 0 6px rgba(92,193,74,0.15), 0 6px 20px rgba(92,193,74,0.4)',
          }}>✓</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Payment successful</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Returning to game…</div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '11px 12px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  color: '#fff', fontSize: 14, fontFamily: 'inherit',
  outline: 'none',
};

function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}
function Label({ children }) {
  return (
    <div style={{
      fontSize: 10.5, letterSpacing: '0.14em',
      color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
      fontFamily: "'JetBrains Mono', monospace",
    }}>{children}</div>
  );
}

window.XsollaCheckoutScreen = XsollaCheckoutScreen;
