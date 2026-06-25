import { useState, useEffect } from 'react';
import { ShieldCheck, Target, Vote, Cpu, Activity, Clock, ShieldAlert, Lock, Info } from 'lucide-react';
import BallotBox3D from '../components/BallotBox3D';
import CryptoGlobe3D from '../components/CryptoGlobe3D';

export default function Dashboard({ user }) {
  const [elections, setElections] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  // Selection states: key = election.id, value = candidate.id
  const [selectedCandidates, setSelectedCandidates] = useState({});

  // 3D Ballot modal state
  const [activeBallot, setActiveBallot] = useState(null); // { candidate, election }

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 23, minutes: 59, seconds: 59 });

  // Live Ledger Audit Feed state
  const [ledgerLogs, setLedgerLogs] = useState([
    { id: 1, key: '0xBD49...A120', action: 'Authorized credential token', node: 'VAULT_04', time: '1s ago' },
    { id: 2, key: '0x88F0...C409', action: 'Vote committed to block #9281', node: 'VAULT_02', time: '5s ago' },
    { id: 3, key: '0x217E...7781', action: 'SHA-256 validation complete', node: 'CORE_VALIDATOR', time: '9s ago' }
  ]);

  useEffect(() => {
    fetchData();
    
    // Countdown Timer interval
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days in the future
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    // Live Ledger Feed generator interval
    let logCounter = 4;
    const ledgerGenerator = setInterval(() => {
      const characters = '0123456789ABCDEF';
      let key = '0x';
      for (let i = 0; i < 4; i++) key += characters.charAt(Math.floor(Math.random() * characters.length));
      key += '...';
      for (let i = 0; i < 4; i++) key += characters.charAt(Math.floor(Math.random() * characters.length));

      const actions = [
        'Audit key verified',
        'Cryptographic ticket signed',
        'Synced with validation consensus',
        'Authorized credential token',
        'Vote committed to block #' + Math.floor(Math.random() * 8000 + 1000)
      ];

      const nodes = ['VAULT_01', 'VAULT_02', 'VAULT_03', 'VAULT_04', 'CORE_VALIDATOR'];

      const newLog = {
        id: logCounter++,
        key,
        action: actions[Math.floor(Math.random() * actions.length)],
        node: nodes[Math.floor(Math.random() * nodes.length)],
        time: 'Just now'
      };

      setLedgerLogs((prev) => {
        // Map old logs to change times to 'Xs ago'
        const updatedPrev = prev.map((log, index) => ({
          ...log,
          time: index === prev.length - 1 ? '4s ago' : index === prev.length - 2 ? '8s ago' : '12s ago'
        }));
        return [...updatedPrev.slice(-2), newLog];
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(ledgerGenerator);
    };
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchElections(), fetchUserVotes()]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Connection to secure servers failed.');
      setLoading(false);
    }
  };

  const fetchElections = async () => {
    const response = await fetch('http://localhost:8000/api/elections/');
    if (!response.ok) throw new Error('Failed to load elections.');
    const data = await response.json();
    setElections(data);
  };

  const fetchUserVotes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/votes/');
      if (response.ok) {
        const data = await response.json();
        // Filter votes corresponding to logged-in user
        const votesCastByMe = data.filter(vote => vote.voter === user.id);
        setUserVotes(votesCastByMe);
      }
    } catch (err) {
      console.error('Failed to load current voter votes', err);
    }
  };

  const handleVoteSubmission = async (electionId, candidateId) => {
    try {
      const response = await fetch('http://localhost:8000/api/votes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voter: user.id, election: electionId, candidate: candidateId }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Identity Verification Failed. Vote aborted.');
      }
      
      setMessage('Vote successfully committed to the cryptographic ledger.');
      
      // Reload both lists
      await Promise.all([fetchElections(), fetchUserVotes()]);
      
      // Clear selection for this election
      setSelectedCandidates(prev => {
        const copy = { ...prev };
        delete copy[electionId];
        return copy;
      });
      
      // Inject user's vote transaction directly into the live feed
      const characters = '0123456789ABCDEF';
      let randomTxHash = '0x';
      for (let i = 0; i < 4; i++) randomTxHash += characters.charAt(Math.floor(Math.random() * characters.length));
      randomTxHash += '...';
      for (let i = 0; i < 4; i++) randomTxHash += characters.charAt(Math.floor(Math.random() * characters.length));
      
      const userLog = {
        id: Date.now(),
        key: randomTxHash,
        action: 'User vote verified and committed to block #' + Math.floor(Math.random() * 8000 + 1000),
        node: 'VAULT_NODE_LOCKED',
        time: 'Just now'
      };
      setLedgerLogs((prev) => [...prev.slice(-2), userLog]);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleSelectCandidate = (electionId, candidateId) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [electionId]: candidateId,
    }));
  };

  const getElectionStatus = (election) => {
    const now = new Date();
    const start = new Date(election.start_time);
    const end = new Date(election.end_time);
    
    if (now < start) {
      return { label: 'Upcoming', class: 'upcoming', percentage: 0 };
    } else if (now > end) {
      return { label: 'Closed', class: 'closed', percentage: 100 };
    } else {
      // Active: compute percentage time elapsed
      const total = end.getTime() - start.getTime();
      const elapsed = now.getTime() - start.getTime();
      const percentage = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
      return { label: 'Active', class: 'active', percentage };
    }
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${xPercent}%`);
    card.style.setProperty('--mouse-y', `${yPercent}%`);

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = (yc - y) / 10; 
    const rotateY = (x - xc) / 10; 
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  if (loading) {
    return (
      <div className="page-fade-enter page-fade-enter-active">
        {/* Shimmering Hero Header */}
        <div className="cyber-glass-panel skeleton-loader" style={{ height: '360px', marginBottom: '4rem' }} />
        {/* Shimmering Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3.5rem', marginTop: '-2.5rem' }}>
          <div className="skeleton-loader" style={{ height: '80px', borderRadius: '20px' }} />
          <div className="skeleton-loader" style={{ height: '80px', borderRadius: '20px' }} />
          <div className="skeleton-loader" style={{ height: '80px', borderRadius: '20px' }} />
        </div>
        {/* Shimmering Election Section */}
        <div className="cyber-glass-panel skeleton-loader" style={{ height: '400px', marginBottom: '3rem' }} />
      </div>
    );
  }

  return (
    <div className="page-fade-enter page-fade-enter-active">
      
      {/* Visual Security & Trust Indicators Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2rem' }}>
        <div className="hologram-capsule" style={{ color: 'var(--accent-3)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
          <Lock size={14} />
          <span>ENCRYPTED END-TO-END</span>
        </div>
        <div className="hologram-capsule" style={{ color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <ShieldCheck size={14} />
          <span>SECURE VOTE TRANSMISSION</span>
        </div>
        <div className="hologram-capsule" style={{ color: '#93c5fd', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
          <Activity size={14} style={{ animation: 'pulse 2s infinite' }} />
          <span>AUDIT LOGGING ACTIVE</span>
        </div>
      </div>

      {/* SaaS Hero Section */}
      <div className="cyber-glass-panel scan-line-effect" style={{ marginBottom: '4rem' }}>
        <div className="grid-overlay" />
        
        <div className="hero-main-content">
          <div className="hologram-capsule" style={{ color: 'var(--accent-3)', marginBottom: '1.5rem' }}>
            <ShieldCheck size={16} color="var(--accent-3)" style={{ animation: 'pulse 2s infinite' }} />
            <span>Global Election Commission</span>
          </div>
          
          <h1 className="hero-title floating-title" style={{ fontSize: '2.5rem', lineHeight: '1.15', marginBottom: '1.25rem' }}>
            Official Portal for <br/>
            <span className="text-gradient" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>Democratic Action.</span>
          </h1>
          <p className="hero-subtitle" style={{marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.7'}}>Secured by end-to-end multi-party encryption. Every ballot cast is fully cryptographically signed and anonymous.</p>
          
          {/* Ticking Election Countdown Widget */}
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>POLLS CLOSE IN</span>
            <div className="countdown-container">
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="countdown-label">Mins</div>
              </div>
              <div className="countdown-box" style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                <div className="countdown-num" style={{ color: 'var(--accent-2)' }}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="countdown-label">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Interactive CryptoGlobe widget opposite text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <CryptoGlobe3D />
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'Orbitron, monospace', letterSpacing: '0.1em' }}>
            DRAG TO ROTATEPERSPECTIVE
          </span>
        </div>
      </div>

      {/* Live widgets row */}
      <div className="hero-widget-row" style={{ marginTop: '-2.5rem', marginBottom: '3.5rem' }}>
        <div className="hero-widget" style={{ background: 'rgba(13, 20, 38, 0.5)', backdropFilter: 'blur(20px)' }}>
          <span className="widget-title">Secure Node</span>
          <span className="widget-value">
            <Cpu size={18} color="var(--accent-3)" /> ONLINE
          </span>
        </div>
        <div className="hero-widget" style={{ background: 'rgba(13, 20, 38, 0.5)', backdropFilter: 'blur(20px)' }}>
          <span className="widget-title">Audited Speed</span>
          <span className="widget-value">
            <Clock size={18} color="var(--accent-2)" /> 12.8ms avg
          </span>
        </div>
        <div className="hero-widget" style={{ background: 'rgba(13, 20, 38, 0.5)', backdropFilter: 'blur(20px)' }}>
          <span className="widget-title">Cryptographic Sync</span>
          <span className="widget-value">
            <Activity size={18} color="var(--success)" /> 100% SECURE
          </span>
        </div>
      </div>

      {error && (
        <div className="alert-modern error">
          <ShieldAlert size={24} />
          <span>{error}</span>
        </div>
      )}
      
      {message && (
        <div className="alert-modern success">
          <ShieldCheck size={24} />
          <span>{message}</span>
        </div>
      )}
      
      {/* Elections List */}
      {elections.map((election) => {
        const status = getElectionStatus(election);
        const hasVoted = userVotes.some(v => v.election === election.id);
        const selectedCandidateId = selectedCandidates[election.id];
        
        return (
          <div key={election.id} className="election-section">
            <div className="cyber-glass-panel scan-line-effect" style={{ border: hasVoted ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="grid-overlay" />
              
              {/* Election Header Metadata */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1, marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '0.45rem' }}>{election.name}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{election.description}</p>
                </div>
                
                {/* Status Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {status.label === 'Active' && (
                    <span className="hologram-capsule" style={{ color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.35)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                      Active Poll
                    </span>
                  )}
                  {status.label === 'Upcoming' && (
                    <span className="hologram-capsule" style={{ color: '#93c5fd', borderColor: 'rgba(59, 130, 246, 0.35)', background: 'rgba(59, 130, 246, 0.08)' }}>
                      Upcoming
                    </span>
                  )}
                  {status.label === 'Closed' && (
                    <span className="hologram-capsule" style={{ color: '#cbd5e1', borderColor: 'rgba(148, 163, 184, 0.35)', background: 'rgba(148, 163, 184, 0.08)' }}>
                      Closed
                    </span>
                  )}
                </div>
              </div>

              {/* Timeline Progress */}
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <span>Timeline progress</span>
                  <span>{status.percentage}% elapsed</span>
                </div>
                <div className="timeline-progress-track">
                  <div className="timeline-progress-bar" style={{ width: `${status.percentage}%` }} />
                </div>
              </div>
              
              {/* Candidate Grid */}
              <div className="candidate-grid container-3d" style={{ position: 'relative', zIndex: 1 }}>
                {election.candidates.map((candidate) => {
                  const isSelected = selectedCandidateId === candidate.id;
                  return (
                    <div 
                      key={candidate.id} 
                      className={`premium-card card-tilt-3d ${isSelected ? 'selected' : ''} ${hasVoted || status.label !== 'Active' ? 'disabled-card' : ''}`}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      onClick={() => {
                        if (hasVoted || status.label !== 'Active') return;
                        setMessage('');
                        setError('');
                        handleSelectCandidate(election.id, candidate.id);
                      }}
                    >
                      <div className="glare-effect" />
                      <div className="certified-tag">CERTIFIED NOMINEE</div>

                      <div className="card-tilt-3d-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="premium-card-avatar" style={{ background: isSelected ? 'linear-gradient(135deg, var(--accent-3), var(--accent-2))' : 'linear-gradient(135deg, var(--accent-1), var(--accent-3))' }}>
                          {candidate.name.charAt(0)}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{candidate.name}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>{candidate.description}</p>
                        
                        {/* Data Syncing Pulse Visuals */}
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: 'auto', marginBottom: '0.50rem' }}>
                          <span style={{ width: '4px', height: '10px', background: isSelected ? 'var(--accent-3)' : 'rgba(255,255,255,0.15)', borderRadius: '2px', animation: 'pulse 1.2s infinite' }} />
                          <span style={{ width: '4px', height: '16px', background: isSelected ? 'var(--accent-3)' : 'rgba(255,255,255,0.15)', borderRadius: '2px', animation: 'pulse 1.2s infinite 0.2s' }} />
                          <span style={{ width: '4px', height: '12px', background: isSelected ? 'var(--accent-3)' : 'rgba(255,255,255,0.15)', borderRadius: '2px', animation: 'pulse 1.2s infinite 0.4s' }} />
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: '6px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                            {isSelected ? 'SECURE_CHANNEL_READY' : 'STANDBY_VAL_LINK'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Actions Container */}
              <div style={{ position: 'relative', zIndex: 1, marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem' }}>
                {hasVoted ? (
                  /* Sealed Voter Interface */
                  <div className="election-sealed-banner">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <ShieldCheck size={32} color="var(--success)" style={{ filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))' }} />
                      <div>
                        <h4 style={{ color: 'white', fontWeight: '850', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Ballot Sealed & Recorded</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>Your cryptographic vote has been successfully written to the ledger block consensus.</p>
                      </div>
                    </div>
                    <div className="election-sealed-badge">
                      <Lock size={12} /> SECURED
                    </div>
                  </div>
                ) : status.label !== 'Active' ? (
                  /* Inactive Poll Warning Banner */
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '1rem 1.5rem', borderRadius: '16px' }}>
                    <Info size={20} color="var(--warning)" />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Voting is currently unavailable because this poll is {status.label.toLowerCase()}.
                    </span>
                  </div>
                ) : (
                  /* Standard Voting Actions */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                    {!selectedCandidateId ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={16} color="var(--accent-2)" /> Please select a certified nominee card above to cast your ballot.
                      </p>
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        Nominee selected: <strong style={{ color: 'var(--accent-3)' }}>{election.candidates.find(c => c.id === selectedCandidateId)?.name}</strong>
                      </p>
                    )}
                    
                    <button 
                      className="btn-premium" 
                      style={{ 
                        opacity: selectedCandidateId ? 1 : 0.45, 
                        cursor: selectedCandidateId ? 'pointer' : 'not-allowed', 
                        boxShadow: selectedCandidateId ? '0 8px 20px rgba(6, 182, 212, 0.2)' : 'none',
                        background: selectedCandidateId ? 'linear-gradient(135deg, var(--accent-3), var(--accent-2))' : 'rgba(255,255,255,0.05)'
                      }} 
                      disabled={!selectedCandidateId}
                      onClick={() => {
                        const candidate = election.candidates.find(c => c.id === selectedCandidateId);
                        setActiveBallot({ candidate, election });
                      }}
                    >
                      <Vote size={18} /> Cast Certified Ballot
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        );
      })}

      {/* Real-time Cryptographic Audit Feed */}
      <div className="ledger-feed-panel">
        <div className="grid-overlay" />
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem', position: 'relative', zIndex: 1 }}>
          <Activity color="var(--accent-3)" style={{ animation: 'pulse 1.5s infinite' }} /> 
          Cryptographic Ledger Audit Feed
        </h2>
        
        <div className="ledger-feed-list" style={{ position: 'relative', zIndex: 1 }}>
          {ledgerLogs.map((log) => (
            <div key={log.id} className="ledger-feed-item">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent-3)', fontWeight: 'bold' }}>{log.key}</span>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{log.action}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--accent-1)', background: 'rgba(79, 70, 229, 0.08)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
                  {log.node}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render 3D Ballot Box Confirmation Modal */}
      {activeBallot && (
        <BallotBox3D
          candidate={activeBallot.candidate}
          election={activeBallot.election}
          user={user}
          onConfirm={() => handleVoteSubmission(activeBallot.election.id, activeBallot.candidate.id)}
          onClose={() => setActiveBallot(null)}
        />
      )}
    </div>
  );
}
