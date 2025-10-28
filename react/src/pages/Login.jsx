import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Toast from '../components/Toast';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [toast, setToast] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setToast({ message: 'Invalid credentials', type: 'error' });
    }
  };

  return (
    <>
      <Header />
      <main className="container" style={{ marginTop: '3rem' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn gradient">Login</button>
          </form>
        </div>
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <footer className="footer">© 2025 Nehemiah Yusuf. All rights reserved.</footer>
    </>
  );
}