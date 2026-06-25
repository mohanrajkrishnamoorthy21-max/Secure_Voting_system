import { useState, useEffect } from 'react';
import { BarChart, Activity, Box, BarChart2, ShieldCheck, Lock } from 'lucide-react';

export default function Results({ user }) {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'
  const [mounted, setMounted] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);

  // Interactive 3D Hologram Rotation angles
  const [rotation, setRotation] = useState({ x: 25, y: -8 });

  const auditLogs = [
    { block: 9284, hash: '0000000000000000000781a8b9f0291a13bf29fbc923deca9214731cf921d921', validator: 'Commission Validator Base', status: 'Consensus Achieved', time: '1m ago' },
    { block: 9283, hash: '00000000000000000003a2e1d74b89312d8a0c84fb2e2f3d1a8e8b21703cf841', validator: 'Distributed Node Vault 02', status: 'Signature Verified', time: '5m ago' },
    { block: 9282, hash: '00000000000000000001bc93ef7d8b9e28f3a9d20c9e01bcde9cf301931da109', validator: 'Commission Validator Base', status: 'Consensus Achieved', time: '12m ago' },
    { block: 9281, hash: '0000000000000000000098a87b1c20d9fbc38d9283ba874fba28d9c12e582e10', validator: 'Distributed Node Vault 04', status: 'Signature Verified', time: '18m ago' }
  ];

  useEffect(() => {
    fetchElectionsAndResults();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setAnimateBars(true), 150);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const fetchElectionsAndResults = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/elections/');
      const data = await response.json();
      
      // Fetch results for each election
      const electionsWithResults = await Promise.all(data.map(async (election) => {
        const resResponse = await fetch(`http://localhost:8000/api/elections/${election.id}/results/`);
        const results = await resResponse.json();
        
        return {
          ...election,
          results
        };
      }));
      
      setElections(electionsWithResults);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cryptographic results.');
      setViewMode('2d'); // Fallback to 2D
      setLoading(false);
    }
  };

  const handleFloorMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: 25 - y * 28,  // dynamically rotate up/down
      y: -8 + x * 32   // dynamically spin left/right
    });
  };

  const handleFloorMouseLeave = () => {
    setRotation({ x: 25, y: -8 });
  };

  if (loading) {
    return (
      <div className="page-fade-enter page-fade-enter-active">
        <div className="cyber-glass-panel skeleton-loader" style={{ height: '240px', marginBottom: '3rem' }} />
        <div className="cyber-glass-panel skeleton-loader" style={{ height: '350px' }} />
      </div>
    );
  }

  return (
    <div className={`page-fade-enter ${mounted ? 'page-fade-enter-active' : ''}`}>
      
      {/* Visual Security & Trust Indicators Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2rem' }}>
        <div className="hologram-capsule" style={{ color: 'var(--accent-3)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
          <Lock size={14} />
          <span>REAL-TIME AUDIT TALLIES</span>
        </div>
        <div className="hologram-capsule" style={{ color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <ShieldCheck size={14} />
          <span>CRYPTO-PROVABLE RESULTS</span>
        </div>
      </div>

      {/* Page Hero Header */}
      <div className="cyber-glass-panel scan-line-effect" style={{marginBottom: '2rem'}}>
        <div className="grid-overlay" />
        
        <div className="hero-main-content">
          <div className="hologram-capsule" style={{ color: 'var(--accent-3)', marginBottom: '1.5rem' }}>
            <Activity size={16} color="var(--accent-3)" style={{ animation: 'pulse 1.8s infinite' }} />
            <span>Live Audit tallies</span>
          </div>
          <h1 className="hero-title floating-title" style={{fontSize: '2.5rem', lineHeight: '1.2'}}>Instant Transparent <br/><span className="text-gradient">Voting Results</span></h1>
          <p className="hero-subtitle" style={{ marginTop: '0.75rem' }}>Real-time audit receipts securely retrieved from distributed election nodes.</p>
        </div>

        {/* Dynamic View mode selector */}
        <div className="view-selector-tabs" style={{ position: 'relative', zIndex: 1 }}>
          <button 
            className={`view-selector-btn ${viewMode === '2d' ? 'active' : ''}`}
            onClick={() => setViewMode('2d')}
          >
            <BarChart2 size={16} style={{marginRight: '0.35rem'}} />
            2D Classic
          </button>
          <button 
            className={`view-selector-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            <Box size={16} style={{marginRight: '0.35rem'}} />
            3D Hologram
          </button>
        </div>
      </div>

      {error && <div className="alert-modern error">{error}</div>}

      {/* Elections Results Cards */}
      {elections.map((election) => (
        <div key={election.id} className="cyber-glass-panel scan-line-effect" style={{marginBottom: '3rem'}}>
          <div className="grid-overlay" />
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
            <BarChart color="var(--accent-3)" /> {election.name} Official Audit Results
          </h2>
          
          {viewMode === '2d' ? (
            /* 2D Bar Chart Layout */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
              {election.results.map((candidate) => {
                const maxVotes = Math.max(...election.results.map(r => r.votes), 1);
                const percentage = (candidate.votes / maxVotes) * 100;
                
                return (
                  <div key={candidate.id} style={{ background: 'rgba(5, 7, 15, 0.45)', padding: '1.5rem 2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
                      <span style={{fontSize: '1.1rem', color: 'white'}}>{candidate.name}</span>
                      <span style={{color: 'var(--accent-3)', fontSize: '1.25rem'}}>{candidate.votes} Votes</span>
                    </div>
                    
                    {/* Progress Bar UI */}
                    <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: animateBars ? `${percentage}%` : '0%', 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--accent-3), var(--accent-1))',
                        transition: 'width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 3D Neon Crystal Columns Hologram Mode */
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
                HOLOGRAPHIC projection grid. Move cursor over grid to rotate perspective.
              </div>
              
              <div 
                className="hologram-grid-floor"
                onMouseMove={handleFloorMouseMove}
                onMouseLeave={handleFloorMouseLeave}
              >
                <div 
                  className="hologram-stage"
                  style={{ 
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(-40px)`,
                    transition: 'transform 0.15s ease-out'
                  }}
                >
                  {election.results.map((candidate, idx) => {
                    const maxVotes = Math.max(...election.results.map(r => r.votes), 1);
                    const heightValue = (candidate.votes / maxVotes) * 230 + 30;

                    return (
                      <div key={candidate.id} className="column-3d-wrapper">
                        {/* Neon projection pedestal rings */}
                        <div className="pedestal-ring" style={{ animationDelay: `${idx * 0.3}s` }} />
                        <div className="pedestal-ring" style={{ 
                          width: '70px', 
                          height: '70px', 
                          animationDelay: `${idx * 0.3 + 0.15}s`,
                          opacity: 0.5 
                        }} />
                        
                        <div className="column-3d" style={{ height: `${heightValue}px` }}>
                          <div className="column-face front"></div>
                          <div className="column-face back"></div>
                          <div className="column-face left"></div>
                          <div className="column-face right"></div>
                          <div className="column-face top"></div>
                          
                          {/* Floating data particles around column */}
                          {[...Array(4)].map((_, i) => (
                            <div key={i} style={{
                              position: 'absolute',
                              width: '4px',
                              height: '4px',
                              background: 'var(--accent-3)',
                              borderRadius: '50%',
                              left: `${20 + Math.cos(i * Math.PI / 2) * 25}px`,
                              top: `${Math.random() * heightValue}px`,
                              animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`,
                              boxShadow: '0 0 8px var(--accent-3)',
                              transform: 'translateZ(30px)'
                            }} />
                          ))}
                          
                          <div className="column-value-tag">{candidate.votes} Votes</div>
                        </div>
                        <div className="column-name-tag" title={candidate.name}>{candidate.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Simulated Cryptographic Audit Trail Timeline */}
      <div className="ledger-feed-panel" style={{ marginTop: '4rem' }}>
        <div className="grid-overlay" />
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem', position: 'relative', zIndex: 1 }}>
          <ShieldCheck color="var(--success)" style={{ animation: 'pulse 1.8s infinite' }} />
          Immutable Cryptographic Audit Trail
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.50rem', position: 'relative', zIndex: 1, maxWidth: '650px' }}>
          Real-time consensus sign-offs across validation authority nodes. Every vote corresponds to a uniquely verifiable hash signature.
        </p>
        
        <div className="audit-timeline-container" style={{ position: 'relative', zIndex: 1 }}>
          {auditLogs.map((log) => (
            <div key={log.block} className="audit-timeline-item">
              <div className="audit-timeline-dot success" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'white' }}>Block #{log.block} Confirmed</span>
                <code style={{ fontSize: '0.75rem', color: 'var(--accent-3)', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                  SHA-256 Hash: {log.hash}
                </code>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#6ee7b7', background: 'rgba(16, 185, 129, 0.08)', padding: '0.25rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.15)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {log.status}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{log.validator} &bull; {log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
