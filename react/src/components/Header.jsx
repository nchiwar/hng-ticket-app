import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <nav>
        <ul>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          {!user ? (
            <>
              <li><Link to="/auth/login" className={isActive('/auth/login') ? 'active' : ''}>Login</Link></li>
              <li><Link to="/auth/signup" className={isActive('/auth/signup') ? 'active' : ''}>Sign Up</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link></li>
              <li><Link to="/tickets" className={isActive('/tickets') ? 'active' : ''}>Tickets</Link></li>
              <li><button onClick={logout} className="btn small" style={{ marginLeft: 'auto' }}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}