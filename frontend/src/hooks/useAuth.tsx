import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

type User = { _id: string; name: string; email: string; role?: string; department?: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  reload: () => Promise<void>;
  setUser: (u: User) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  async function loadMe() {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    if (data?.token) {
      localStorage.setItem('token', data.token);
      await loadMe();
    } else {
      throw new Error('No token received');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    // if you want to invalidate server session, call API here
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, reload: loadMe, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
