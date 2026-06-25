import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const STORAGE_USER = 'mp_user';
const STORAGE_AUTH = 'mp_auth';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(!isConfigured);

  useEffect(() => {
    if (!isConfigured) {
      const loggedIn = !!localStorage.getItem(STORAGE_AUTH);
      const user = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; } })();
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setCurrentUser(session?.user ?? null);
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!isConfigured) {
      if (!email.trim() || password.length < 6) return { ok: false, error: 'יש להזין אימייל וסיסמה' };
      const stored = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; } })();
      if (stored?.email && email.trim().toLowerCase() !== stored.email.toLowerCase()) return { ok: false, error: 'אימייל או סיסמה שגויים' };
      if (stored?.password && password !== stored.password) return { ok: false, error: 'אימייל או סיסמה שגויים' };
      const user = stored || { email: email.trim(), name: email.split('@')[0] };
      localStorage.setItem(STORAGE_AUTH, 'true');
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      return { ok: true };
    }

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { ok: false, error: 'אימייל או סיסמה שגויים' };
    return { ok: true };
  };

  const register = async (userData) => {
    if (!isConfigured) {
      const saved = { ...userData, email: userData.email.trim().toLowerCase() };
      localStorage.setItem(STORAGE_USER, JSON.stringify(saved));
      localStorage.setItem(STORAGE_AUTH, 'true');
      setCurrentUser(saved);
      setIsLoggedIn(true);
      return { ok: true, confirmed: true };
    }

    const { data, error } = await supabase.auth.signUp({
      email: userData.email.trim(),
      password: userData.password,
      options: {
        data: {
          full_name: userData.name,
          profession: userData.profession,
          phone: userData.phone,
        },
      },
    });
    if (error) return { ok: false, error: error.message };
    if (data.session) return { ok: true, confirmed: true };
    return { ok: true, confirmed: false };
  };

  const logout = async () => {
    if (!isConfigured) {
      localStorage.removeItem(STORAGE_AUTH);
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    if (!isConfigured) {
      const stored = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; } })();
      if (stored && email.trim().toLowerCase() === stored.email?.toLowerCase()) {
        return { ok: true, password: stored.password || '(כנס עם כל סיסמה)' };
      }
      return { ok: false, error: 'האימייל לא נמצא במערכת' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    if (error) return { ok: false, error: 'שגיאה בשליחת איפוס סיסמה' };
    return { ok: true, emailSent: true };
  };

  if (!authReady) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg, #F4F6FB)' }}>
        <div style={{ width: 36, height: 36, border: '3px solid #0050CB', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
