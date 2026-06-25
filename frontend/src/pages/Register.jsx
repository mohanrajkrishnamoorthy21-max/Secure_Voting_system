import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, ShieldCheck, Key } from 'lucide-react';
import Auth3DScene from '../components/Auth3DScene';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [timezone, setTimezone] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, city, state, timezone }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page" style={{padding: '4rem 1rem'}}>
      <Auth3DScene />
      <div className={`auth-box page-fade-enter ${mounted ? 'page-fade-enter-active' : ''}`} style={{maxWidth: '600px', border: '1px solid rgba(6, 182, 212, 0.15)'}}>
        
        {/* Encrypted Handshake Alert */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.50rem', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)', padding: '0.45rem 0.85rem', borderRadius: '100px', width: 'fit-content', margin: '0 auto 1.5rem', fontSize: '0.75rem', color: '#6ee7b7', fontWeight: '700' }}>
          <ShieldCheck size={14} style={{ animation: 'pulse 1.8s infinite' }} />
          <span>ENCRYPTED GENESIS BLOCK</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-2)' }}>
          <Hexagon size={48} style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))' }} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>Digital Identity</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Register for a secure voting profile</p>
        
        {error && <div className="alert-modern error">{error}</div>}
        {success && <div className="alert-modern success">Profile minted successfully. Initializing access...</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Identifier</label>
              <input type="text" className="auth-input" style={{marginBottom: 0}} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. Satoshi" required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</label>
              <input type="email" className="auth-input" style={{marginBottom: 0}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@network.io" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>City</label>
              <input type="text" className="auth-input" style={{marginBottom: 0}} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Metropolis" required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>State/Region</label>
              <input type="text" className="auth-input" style={{marginBottom: 0}} value={state} onChange={(e) => setState(e.target.value)} placeholder="NY" required />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Timezone</label>
            <select className="auth-input" style={{backgroundColor: 'rgba(0,0,0,0.4)'}} value={timezone} onChange={(e) => setTimezone(e.target.value)} required>
              <option value="" disabled>Select your timezone</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="CST">Central Standard Time (CST)</option>
              <option value="MST">Mountain Standard Time (MST)</option>
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="CET">Central European Time (CET)</option>
              <option value="IST">Indian Standard Time (IST)</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Master Key (Password)</label>
            <input type="password" className="auth-input" style={{marginBottom: 0}} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.50rem' }}>
            <Key size={18} /> Mint Profile
          </button>
        </form>
        
        <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have a profile? <Link to="/login" style={{ color: 'var(--accent-1)', textDecoration: 'none', fontWeight: '600' }}>Authenticate</Link>
        </div>
      </div>
    </div>
  );
}
