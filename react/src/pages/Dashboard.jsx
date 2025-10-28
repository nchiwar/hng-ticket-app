import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth/login');
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setStats({
      total: tickets.length,
      open: tickets.filter(t => t.status !== 'closed').length,
      closed: tickets.filter(t => t.status === 'closed').length
    });
  }, [user, navigate]);

  return (
    <>
      <Header />
      <main className="container">
        <h1 style={{ margin: '2rem 0' }}>Dashboard</h1>
        <div className="stats-grid">
          <div className="card"><h3>Total Tickets</h3><p>{stats.total}</p></div>
          <div className="card"><h3>Open</h3><p>{stats.open}</p></div>
          <div className="card"><h3>Closed</h3><p>{stats.closed}</p></div>
        </div>
        <a href="/tickets" className="btn gradient" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Manage Tickets
        </a>
      </main>
      <footer className="footer">© 2025 Nehemiah Yusuf. All rights reserved.</footer>
    </>
  );
}