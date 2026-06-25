import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">SecureVote</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={onLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{textDecoration: 'none'}}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{textDecoration: 'none'}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
