import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, ShieldCheck, Lock } from 'lucide-react';
import Auth3DScene from '../components/Auth3DScene';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Authentication denied');
      
      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <Auth3DScene />
      <div className={`auth-box page-fade-enter ${mounted ? 'page-fade-enter-active' : ''}`} style={{ border: '1px solid rgba(6, 182, 212, 0.15)' }}>
        
        {/* Encrypted Handshake Alert */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.50rem', background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.15)', padding: '0.45rem 0.85rem', borderRadius: '100px', width: 'fit-content', margin: '0 auto 1.5rem', fontSize: '0.75rem', color: 'var(--accent-3)', fontWeight: '700' }}>
          <ShieldCheck size={14} style={{ animation: 'pulse 2s infinite' }} />
          <span>SECURE ENDPOINT ACTIVE</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-3)' }}>
          <Hexagon size={48} style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' }} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>Sign In</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Access the secure voting portal</p>
        
        {error && <div className="alert-modern error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Identifier</label>
            <input 
              type="text" 
              className="auth-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Security Key</label>
            <input 
              type="password" 
              className="auth-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Lock size={18} /> Authenticate
          </button>
        </form>
        
        <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          New to the network? <Link to="/register" style={{ color: 'var(--accent-2)', textDecoration: 'none', fontWeight: '600' }}>Request Access</Link>
        </div>
      </div>
    </div>
  );
}
