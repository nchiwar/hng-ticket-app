import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import TicketCard from '../components/TicketCard';
import Toast from '../components/Toast';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'open' });
  const [toast, setToast] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth/login');
    setTickets(JSON.parse(localStorage.getItem('tickets') || '[]'));
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return setToast({ message: 'Title required', type: 'error' });
    if (!['open', 'in_progress', 'closed'].includes(form.status)) return setToast({ message: 'Invalid status', type: 'error' });

    const newTicket = { id: Date.now(), ...form };
    const updated = [...tickets, newTicket];
    localStorage.setItem('tickets', JSON.stringify(updated));
    setTickets(updated);
    setForm({ title: '', description: '', status: 'open' });
    setToast({ message: 'Ticket created!', type: 'success' });
  };

  const deleteTicket = (id) => {
    if (!confirm('Delete?')) return;
    const updated = tickets.filter(t => t.id !== id);
    localStorage.setItem('tickets', JSON.stringify(updated));
    setTickets(updated);
    setToast({ message: 'Ticket deleted', type: 'success' });
  };

  return (
    <>
      <Header />
      <main className="container">
        <h1 style={{ margin: '2rem 0' }}>Manage Tickets</h1>

        <div className="card">
          <h2>Create Ticket</h2>
          <form onSubmit={handleSubmit}>
            <label>Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows="3" />
            <label>Status *</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <button type="submit" className="btn gradient">Create</button>
          </form>
        </div>

        <h2 style={{ margin: '2rem 0 1rem' }}>All Tickets</h2>
        <div className="ticket-grid">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} onDelete={deleteTicket} />
          ))}
        </div>
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <footer className="footer">© 2025 Nehemiah Yusuf. All rights reserved.</footer>
    </>
  );
}