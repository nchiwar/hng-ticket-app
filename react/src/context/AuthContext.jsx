import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem('ticketapp_session');
    return session ? JSON.parse(session) : null;
  });

  const login = (email, password) => {
    if (email === 'test@example.com' && password === 'password') {
      const session = { token: 'mock-jwt', user: email };
      localStorage.setItem('ticketapp_session', JSON.stringify(session));
      setUser(session);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);