/**
 * CARD Technocrats & Engineers LLP - Global React Context State Provider
 * 
 * Senior Developer Notes:
 * - Houses central state machines (such as auth context or color theme).
 * - Avoids props drilling by wrapping parent layout routing trees.
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Local state container managing interactive view variables
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  /* Verify auth on mount */
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await api.get('/auth/me');
        const userData = data.data || data.user || data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    const userData = data.user || data.data?.user || data.data;

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      if (data.token || data.data?.token) {
        localStorage.setItem('token', data.token || data.data.token);
      }
      setUser(userData);
    }

    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout failed', err);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated, login, logout }),
    [user, loading, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
