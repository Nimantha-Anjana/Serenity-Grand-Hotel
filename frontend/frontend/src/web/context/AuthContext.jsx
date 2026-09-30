import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on first mount
  useEffect(() => {
    const savedToken = localStorage.getItem('sgh_token');
    const savedUser = localStorage.getItem('sgh_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /** Call after successful login / OTP verify */
  function login(tokenStr, customerData) {
    localStorage.setItem('sgh_token', tokenStr);
    localStorage.setItem('sgh_user', JSON.stringify(customerData));
    setToken(tokenStr);
    setUser(customerData);
  }

  /** Clear session */
  function logout() {
    localStorage.removeItem('sgh_token');
    localStorage.removeItem('sgh_user');
    setToken(null);
    setUser(null);
  }

  /** Refresh profile from backend and sync localStorage */
  async function refreshProfile() {
    if (!token) return;
    try {
      const res = await fetch(`${API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('sgh_user', JSON.stringify(data));
        setUser(data);
      }
    } catch {
      // silently ignore
    }
  }

  /** Update local user state after profile edit */
  function updateUser(newData) {
    const merged = { ...user, ...newData };
    localStorage.setItem('sgh_user', JSON.stringify(merged));
    setUser(merged);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser, refreshProfile, API }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
