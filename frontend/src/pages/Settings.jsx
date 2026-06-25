import { useState } from 'react';
import { User, ShieldCheck, Key, Bell, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Settings({ user }) {
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // 3D Security Shield Animation
  const shieldRef = useRef(null);
  const [shieldRotation, setShieldRotation] = useState({ x: 0, y: 0 });

  const handleShieldMouseMove = (e) => {
    if (!shieldRef.current) return;
    const rect = shieldRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setShieldRotation({ x: y * 20, y: -x * 20 });
  };

  const handleShieldMouseLeave = () => {
    setShieldRotation({ x: 0, y: 0 });
  };

  const handleUpdateProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage('Demographics successfully synchronized.');
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
  };

  const handleUpdatePassword = () => {
    setPasswordLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPasswordLoading(false);
      setMessage('Security keys successfully rotated.');
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="hero-glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div className="hero-main-content">
          <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Account <span className="text-gradient">Settings</span></h1>
          <p className="hero-subtitle">Manage your digital identity, regional profile, and secure your voting credentials.</p>
        </div>
        
        {/* 3D Interactive Security Shield */}
        <div 
          ref={shieldRef}
          onMouseMove={handleShieldMouseMove}
          onMouseLeave={handleShieldMouseLeave}
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            margin: '0 auto',
            perspective: '1000px',
            cursor: 'grab'
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${shieldRotation.x}deg) rotateY(${shieldRotation.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}>
            {/* Shield Base */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
              border: '2px solid rgba(6, 182, 212, 0.4)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translateZ(0px)',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)'
            }}>
              <ShieldCheck size={80} color="var(--accent-3)" style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))' }} />
            </div>
            
            {/* Floating Ring 1 */}
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '50%',
              top: '-10%',
              left: '-10%',
              transform: 'translateZ(20px) rotateX(60deg)',
              animation: 'spin3D 8s linear infinite'
            }} />
            
            {/* Floating Ring 2 */}
            <div style={{
              position: 'absolute',
              width: '140%',
              height: '140%',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '50%',
              top: '-20%',
              left: '-20%',
              transform: 'translateZ(30px) rotateY(45deg)',
              animation: 'spin3D 12s linear infinite reverse'
            }} />
            
            {/* Data Particles */}
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: 'var(--accent-3)',
                borderRadius: '50%',
                transform: `translateZ(${40 + Math.random() * 30}px) rotate(${i * 45}deg) translateX(90px)`,
                animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`,
                boxShadow: '0 0 10px var(--accent-3)'
              }} />
            ))}
          </div>
        </div>
      </div>

      {message && (
        <div className="alert-modern success">
          <CheckCircle2 size={24} />
          <span>{message}</span>
        </div>
      )}

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <User color="var(--accent-1)" /> Profile Information
        </h2>
        <div className="settings-form">
          <div className="form-group">
            <label>Cryptographic Identifier (Username)</label>
            <input type="text" className="form-input" value={user?.username || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Registered Email</label>
            <input type="email" className="form-input" value={user?.email || ''} readOnly />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label>City</label>
              <input type="text" className="form-input" value={user?.profile?.city || 'Unknown'} readOnly />
            </div>
            <div className="form-group">
              <label>State/Region</label>
              <input type="text" className="form-input" value={user?.profile?.state || 'Unknown'} readOnly />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Local Timezone</label>
            <input type="text" className="form-input" value={user?.profile?.timezone || 'UTC'} readOnly />
          </div>
          
          <button 
            className="btn-premium" 
            onClick={handleUpdateProfile}
            disabled={loading}
            style={{ width: 'fit-content', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Synchronizing...' : 'Modify Demographics'}
          </button>
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck color="var(--accent-2)" /> Security & Network
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', color: 'var(--accent-1)' }}>
                <Key size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Rotate Master Key</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ensure your account remains safe against threats.</p>
              </div>
            </div>
            <button 
              className="btn-premium" 
              onClick={handleUpdatePassword}
              disabled={passwordLoading}
              style={{ background: 'transparent', border: '1px solid var(--accent-1)', padding: '0.75rem 1.5rem' }}
            >
              {passwordLoading ? 'Rotating...' : 'Update Password'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', color: 'var(--accent-2)' }}>
                <Bell size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Network Notifications</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Receive secure alerts for new elections.</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
                setMessage(notificationsEnabled ? 'Notifications disabled.' : 'Notifications active.');
                setTimeout(() => setMessage(''), 3000);
              }}
              style={{
                width: '60px',
                height: '32px',
                borderRadius: '16px',
                background: notificationsEnabled ? 'var(--accent-1)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '4px',
                left: notificationsEnabled ? '32px' : '4px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'white',
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
