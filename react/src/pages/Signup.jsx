import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Toast from '../components/Toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const { login } = useAuth(); // Reuse login (signup = login)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password); // Mock signup
      navigate('/dashboard');
    } else {
      setToast({ message: 'Fill all fields', type: 'error' });
    }
  };

  return (
    <>
      <Header />
      <main className="container" style={{ marginTop: '3rem' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn gradient">Sign Up</button>
          </form>
        </div>
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <footer className="footer">© 2025 Nehemiah Yusuf. All rights reserved.</footer>
    </>
  );
}