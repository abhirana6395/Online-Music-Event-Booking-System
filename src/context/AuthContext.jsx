import { createContext, useState } from 'react';
import { setAuthToken } from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('token');
    if (t) setAuthToken(t);
    return { token: t };
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser({ token });
  };
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
