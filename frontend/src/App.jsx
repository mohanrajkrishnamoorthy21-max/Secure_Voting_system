import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Results from './pages/Results';
import Background3D from './components/Background3D';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('voter_user');
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Failed to parse user");
        }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('voter_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('voter_user');
  };

  if (loading) return null;

  return (
    <Router>
      <Background3D />
      <div className="app-wrapper">
        {user ? (
          <>
            <Sidebar user={user} onLogout={handleLogout} />
            <main className="main-view">
              <Routes>
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/results" element={<Results user={user} />} />
                <Route path="/settings" element={<Settings user={user} onUpdateUser={handleLogin} />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </>
        ) : (
          <div style={{width: '100%'}}>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
