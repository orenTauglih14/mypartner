import { createContext, useContext, useState } from 'react';

const STORAGE_USER = 'mp_user';
const STORAGE_AUTH = 'mp_auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem(STORAGE_AUTH));
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_USER)) || null; } catch { return null; }
  });

  const login = (email, password) => {
    if (!email.trim() || password.length < 6) {
      return { ok: false, error: 'יש להזין אימייל וסיסמה (לפחות 6 תווים)' };
    }
    const stored = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; }
    })();

    // If user registered, validate against stored credentials
    if (stored && stored.email) {
      if (email.trim().toLowerCase() !== stored.email.toLowerCase()) {
        return { ok: false, error: 'אימייל או סיסמה שגויים' };
      }
      if (stored.password && password !== stored.password) {
        return { ok: false, error: 'אימייל או סיסמה שגויים' };
      }
    }

    // Save / update user session
    const user = stored || { email: email.trim(), name: email.split('@')[0] };
    localStorage.setItem(STORAGE_AUTH, 'true');
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);
    return { ok: true };
  };

  const register = (user) => {
    const saved = { ...user, email: user.email.trim().toLowerCase() };
    localStorage.setItem(STORAGE_USER, JSON.stringify(saved));
    localStorage.setItem(STORAGE_AUTH, 'true');
    setCurrentUser(saved);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_AUTH);
    setIsLoggedIn(false);
  };

  const resetPassword = (email) => {
    const stored = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; }
    })();
    if (stored && email.trim().toLowerCase() === stored.email?.toLowerCase()) {
      return { ok: true, password: stored.password || '(כנס עם כל סיסמה)' };
    }
    return { ok: false, error: 'האימייל לא נמצא במערכת' };
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
