import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

const AuthContext = createContext(null);
const STORAGE_USER = 'mp_user';
const STORAGE_AUTH = 'mp_auth';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn]   = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady]     = useState(!isConfigured);

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsLoggedIn(!!session);
      setCurrentUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const e = email.trim().toLowerCase();
    const p = password.trim();
    if (!e || !p) return { ok: false, error: 'יש למלא אימייל וסיסמה' };

    if (!isConfigured) {
      const stored = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; } })();
      if (stored?.email === e && stored.password && stored.password !== p)
        return { ok: false, error: 'סיסמה שגויה' };
      const user = { email: e, name: e.split('@')[0], password: p };
      localStorage.setItem(STORAGE_AUTH, 'true');
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      setCurrentUser(user); setIsLoggedIn(true);
      return { ok: true };
    }

    const { error } = await supabase.auth.signInWithPassword({ email: e, password: p });
    if (!error) return { ok: true };
    return { ok: false, error: 'אימייל או סיסמה שגויים' };
  };

  const register = async ({ email, password }) => {
    const e = email.trim().toLowerCase();
    const p = password.trim();
    if (!e || !p) return { ok: false, error: 'יש למלא אימייל וסיסמה' };
    if (p.length < 6)  return { ok: false, error: 'הסיסמה חייבת להיות לפחות 6 תווים' };

    if (!isConfigured) {
      const stored = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; } })();
      if (stored?.email === e) return { ok: false, error: 'האימייל כבר קיים — כנס עם הסיסמה שלך' };
      const user = { email: e, name: e.split('@')[0], password: p };
      localStorage.setItem(STORAGE_AUTH, 'true');
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      setCurrentUser(user); setIsLoggedIn(true);
      return { ok: true };
    }

    const { error: signUpErr } = await supabase.auth.signUp({ email: e, password: p });
    if (signUpErr) {
      if (signUpErr.message?.toLowerCase().includes('already')) {
        return { ok: false, error: 'האימייל כבר רשום — כנס עם הסיסמה שלך' };
      }
      return { ok: false, error: 'שגיאה ביצירת חשבון — נסה שוב' };
    }
    // sign in right after signup
    await supabase.auth.signInWithPassword({ email: e, password: p });
    return { ok: true };
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_AUTH);
    localStorage.removeItem(STORAGE_USER);
    setIsLoggedIn(false);
    setCurrentUser(null);
    if (isConfigured) supabase.auth.signOut();
  };

  // stubs for compatibility
  const sendOtp      = async (email) => login(email, '');
  const verifyOtp    = async () => ({ ok: true });
  const register     = async (d)  => login(d.email, d.password);
  const resetPassword = async ()  => ({ ok: true });

  if (!authReady) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6FB' }}>
        <div style={{ width: 36, height: 36, border: '3px solid #0050CB', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, sendOtp, verifyOtp, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
