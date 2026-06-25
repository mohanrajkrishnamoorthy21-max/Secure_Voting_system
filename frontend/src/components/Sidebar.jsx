import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, LogOut, ShieldCheck, User, BarChart, Activity } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Election Results', path: '/results', icon: BarChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="pro-sidebar">
      {/* Brand Header */}
      <div className="pro-sidebar-header">
        <div className="pro-brand-logo">
          <ShieldCheck size={26} strokeWidth={2.5} color="white" />
        </div>
        <span className="pro-brand-text">SecureVote</span>
      </div>

      {/* User Profile Mini-Card */}
      <div className="pro-user-card">
        <div className="pro-user-avatar">
          {user?.username?.charAt(0).toUpperCase() || <User size={20} />}
        </div>
        <div className="pro-user-info">
          <div className="pro-user-name">{user?.username || 'Verified User'}</div>
          <div className="pro-user-role">Voter Network</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="pro-sidebar-nav">
        <div className="pro-nav-section-title">Main Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`pro-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="pro-nav-icon" />
              <span className="pro-nav-text">{item.name}</span>
              {isActive && <div className="pro-active-dot" />}
            </Link>
          );
        })}
      </nav>

      {/* Trust & Security Status Badges */}
      <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div className="sidebar-security-badge">
          <ShieldCheck size={16} style={{ flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '750', color: 'white', fontSize: '0.7rem' }}>E2E ENCRYPTED</span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(6, 182, 212, 0.75)' }}>AES-GCM 256 Active</span>
          </div>
        </div>
        <div className="sidebar-audit-badge">
          <Activity size={16} style={{ flexShrink: 0, animation: 'pulse 2s infinite' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '750', color: 'white', fontSize: '0.7rem' }}>AUDIT SYNCED</span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(110, 231, 183, 0.75)' }}>Ledger Consensus</span>
          </div>
        </div>
      </div>

      {/* Logout Footer */}
      <div className="pro-sidebar-footer">
        <button className="pro-logout-btn" onClick={onLogout}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
