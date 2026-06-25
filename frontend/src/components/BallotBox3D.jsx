import { useState, useEffect, useRef } from 'react';
import { ShieldAlert, CheckCircle2, ShieldCheck, X, Cpu, Server, Lock } from 'lucide-react';

export default function BallotBox3D({ candidate, election, user, onConfirm, onClose }) {
  const [status, setStatus] = useState('idle'); // idle, animating, completed, error
  const [errorMsg, setErrorMsg] = useState('');
  const [txHash, setTxHash] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([]);
  
  const boxRef = useRef(null);
  const containerRef = useRef(null);
  const sparksCanvasRef = useRef(null);
  const animationRef = useRef(null);

  // Mouse tilt offsets
  const [rotation, setRotation] = useState({ x: 18, y: -22 });

  const handleMouseMove = (e) => {
    if (status === 'animating') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotation({
      x: 18 - y * 32,
      y: -22 + x * 42
    });
  };

  const addConsoleLog = (msg) => {
    setConsoleLogs((prev) => [...prev.slice(-3), msg]);
  };

  // Spark particle explosion generator
  const triggerSparks = () => {
    const canvas = sparksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const count = 35;
    
    // Slit midpoint relative to canvas coordinates
    const startX = canvas.width / 2;
    const startY = canvas.height / 2 + 45; // Approximating slit Y coordinates

    class Spark {
      constructor() {
        this.x = startX;
        this.y = startY;
        // Shoot upwards and outwards
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
        const speed = Math.random() * 5 + 3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.12;
        this.radius = Math.random() * 2.5 + 1.5;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.color = Math.random() > 0.4 ? '#06b6d4' : '#10b981'; // cyan or emerald spark
      }

      update() {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Spark());
    }

    const animateSparks = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let alive = false;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha > 0) {
          p.update();
          p.draw();
          alive = true;
        }
      }

      if (alive) {
        animationRef.current = requestAnimationFrame(animateSparks);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animateSparks();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const startVotingAnimation = async () => {
    setStatus('animating');
    setConsoleLogs([]);
    
    // Simulate tech sequences
    setTimeout(() => addConsoleLog("AUTH_KEY: Signature verified via secure token"), 200);
    setTimeout(() => addConsoleLog("ENCRYPT: Packaging ballot into SHA-256 block..."), 550);
    setTimeout(() => addConsoleLog("NETWORK: Distributing vote packets to verification nodes"), 900);
    
    // Trigger spark explosion exactly as ballot drops into slot (1000ms)
    setTimeout(() => {
      triggerSparks();
      addConsoleLog("LEDGER: Committing cryptographic hash block...");
    }, 1000);

    setTimeout(async () => {
      try {
        const success = await onConfirm();
        if (success) {
          const characters = '0123456789ABCDEF';
          let hash = '0x';
          for (let i = 0; i < 40; i++) {
            hash += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          setTxHash(hash);
          setStatus('completed');
        } else {
          setStatus('error');
          setErrorMsg('Duplicate voter identity detected. Transaction aborted.');
        }
      } catch (err) {
        setStatus('error');
        setErrorMsg(err.message || 'Node connection lost.');
      }
    }, 1800);
  };

  return (
    <div className="ballot-modal-overlay">
      <div className="ballot-modal-content">
        
        {/* Header */}
        <div className="ballot-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Cpu size={22} color="var(--accent-3)" style={{ animation: 'spinQuantum 4s linear infinite' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ledger Verification Core
            </h3>
          </div>
          {status !== 'animating' && (
            <button className="btn-close" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* 3D Scene Viewport */}
        <div 
          ref={containerRef}
          className="scene-3d-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setRotation({ x: 18, y: -22 })}
        >
          {status === 'idle' && (
            <div className="scene-instruction">
              Move cursor to inspect 3D chamber. Submit to slot.
            </div>
          )}

          {/* Sparks overlay canvas */}
          <canvas ref={sparksCanvasRef} className="spark-particles-canvas" />

          {/* Laser Scanner Line */}
          {status === 'animating' && <div className="laser-scanner" />}

          <div 
            className="scene-3d" 
            style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: status === 'animating' ? 'transform 1.8s ease-in-out' : 'transform 0.15s ease-out'
            }}
          >
            {/* Holographic light beam */}
            <div className="holo-beam" />

            {/* Smart Cryptographic Ballot Paper */}
            <div className={`ballot-ticket-3d ${status}`}>
              <div className="ballot-ticket-glow" />
              <div className="cyber-corners" />
              
              <div className="ballot-header">
                <span style={{ color: 'var(--accent-3)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Lock size={10} /> SMART BALLOT
                </span>
                <span className="secure-badge">E2E ENCRYPTED</span>
              </div>
              
              <div className="ballot-body">
                <div className="ballot-row">
                  <label>POLL</label>
                  <span>{election.name}</span>
                </div>
                <div className="ballot-row">
                  <label>VOTE</label>
                  <span className="highlight-text">{candidate.name}</span>
                </div>
                <div className="ballot-row">
                  <label>IDENT_KEY</label>
                  <code style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)' }}>
                    {user.username.toUpperCase().slice(0, 12)}
                  </code>
                </div>
              </div>
              
              <div className="ballot-footer">
                <div className="barcode-simulation">
                  {[...Array(24)].map((_, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        width: `${(idx % 3 === 0 ? 3 : 1)}px`, 
                        height: '100%', 
                        background: 'rgba(6, 182, 212, 0.65)', 
                        marginRight: '2px' 
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3D Ballot Vault Cube */}
            <div ref={boxRef} className={`ballot-box-3d ${status}`}>
              <div className="box-face front cyber-corners">
                <div className="glass-pattern" />
                <span className="box-label" style={{ fontSize: '0.55rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <Server size={14} color="rgba(6, 182, 212, 0.4)" />
                  VAULT NODE
                </span>
              </div>
              <div className="box-face back">
                <div className="glass-pattern" />
              </div>
              <div className="box-face left">
                <div className="glass-pattern" />
              </div>
              <div className="box-face right">
                <div className="glass-pattern" />
              </div>
              <div className="box-face top">
                <div className="ballot-slit">
                  <div className="slit-glow" />
                </div>
              </div>
              <div className="box-face bottom"></div>

              {/* Glowing Core */}
              <div className="box-core" />
            </div>
          </div>

          {/* Floating console log details during animation */}
          {status === 'animating' && consoleLogs.length > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.5rem',
              right: '1.5rem',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '0.75rem 1.25rem',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: 'var(--accent-3)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              zIndex: 30
            }}>
              {consoleLogs.map((log, index) => (
                <div key={index} style={{ opacity: index === consoleLogs.length - 1 ? 1 : 0.55 }}>
                  &gt; {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="ballot-modal-footer">
          {status === 'idle' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Double-sign and deposit vote for <strong style={{ color: 'white' }}>{candidate.name}</strong> to the commission ledger.
              </p>
              <button className="btn-premium" style={{ width: '100%' }} onClick={startVotingAnimation}>
                Cast Certified Ballot
              </button>
            </div>
          )}

          {status === 'animating' && (
            <div style={{ width: '100%', textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <div className="spinner-quantum" />
                <div style={{ position: 'absolute', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(6,182,212,0.2)', border: '2px solid var(--accent-3)', animation: 'pulse 1s infinite' }} />
              </div>
              <p style={{ color: 'var(--accent-3)', fontWeight: '800', marginTop: '1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                SYNCHRONIZING SECURE NODE CONSENSUS...
              </p>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'monospace', marginTop: '0.50rem' }}>
                Establishing multi-party secure connection
              </div>
            </div>
          )}

          {status === 'completed' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div style={{ position: 'relative', overflow: 'hidden', padding: '0.5rem 0' }}>
                <div className="wax-seal-container">
                  <span>SECURE<br/>SEALED</span>
                </div>
                
                <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '1.15rem 1.5rem', borderRadius: '18px', marginBottom: '1.5rem', alignItems: 'center', gap: '0.85rem', width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
                  <CheckCircle2 color="var(--success)" size={34} style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: 'white', fontWeight: '850', fontSize: '1.1rem' }}>Ballot Sealed Successfully</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cryptographic ledger transaction confirmed.</p>
                  </div>
                </div>
              </div>
              
              <div className="tx-receipt">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                  <span>TRANSACTION RECEIPT</span>
                  <span style={{ color: 'var(--success)' }}>VERIFIED</span>
                </div>
                <code style={{ fontSize: '0.8rem', wordBreak: 'break-all', color: 'var(--accent-3)', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  {txHash}
                </code>
              </div>
              <button className="btn-premium" style={{ width: '100%', background: 'var(--success)' }} onClick={onClose}>
                Confirm & Exit
              </button>
            </div>
          )}

          {status === 'error' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '1rem 1.5rem', borderRadius: '18px', marginBottom: '1.5rem', alignItems: 'center', gap: '0.85rem' }}>
                <ShieldAlert color="var(--error)" size={34} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1rem' }}>Audit Check Failed</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{errorMsg}</p>
                </div>
              </div>
              <button className="btn-premium" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', color: 'white' }} onClick={onClose}>
                Dismiss
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
