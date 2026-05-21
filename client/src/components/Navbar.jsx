import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { adminToken, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: 'var(--navbar-bg)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '20px', fontWeight: 900, color: '#3b82f6', letterSpacing: '1px' }}>MEGA</span>
          <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '1px' }}> TECHNOLOGY</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden-mobile">
          {['/', '/products', '/services', '/contact'].map((path, i) => (
            <Link key={path} to={path} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px' }}>
              {['Home', 'Products', 'Services', 'Contact'][i]}
            </Link>
          ))}
          {adminToken && (
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>Dashboard</Link>
          )}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            {theme === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
          </button>

          {adminToken ? (
            <button
              onClick={handleLogout}
              style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/order"
              style={{ background: '#2563eb', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px' }}
            >
              Order Now
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '22px', cursor: 'pointer', display: 'none' }}
            className="show-mobile"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: 'var(--bg-primary)'
        }}>
          {[['/', 'Home'], ['/products', 'Products'], ['/services', 'Services'], ['/contact', 'Contact'], ['/order', 'Order Now']].map(([path, label]) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)}
              style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 500 }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;