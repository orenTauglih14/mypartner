import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const STORAGE_USER = 'mp_user';
const STORAGE_AUTH = 'mp_auth';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(!isConfigured);

  // Prevent onAuthStateChange from auto-logging in while user is mid-OTP flow.
  // Supabase creates a session immediately when email confirmation is disabled.
  const inOtpFlow = useRef(false);

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
      if (inOtpFlow.current) return; // ignore auto-session during OTP entry
      setIsLoggedIn(!!session);
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!isConfigured) {
      const user = { email: email.trim(), name: email.split('@')[0] };
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

  const sendOtp = async (email) => {
    if (!isConfigured) {
      const user = { email: email.trim(), name: email.split('@')[0] };
      localStorage.setItem(STORAGE_AUTH, 'true');
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      return { ok: true, demo: true };
    }
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) return { ok: false, error: 'שגיאה בשליחת קישור — בדוק את האימייל' };
    return { ok: true };
  };

  const verifyOtp = async (email, token) => {
    if (!isConfigured) return { ok: true };
    inOtpFlow.current = false; // allow onAuthStateChange to fire once verified
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: token.trim(),
      type: 'email',
    });
    if (error) {
      inOtpFlow.current = true; // still in OTP flow, user must retry
      return { ok: false, error: 'קוד שגוי או פג תוקף — נסה שוב' };
    }
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
      options: { data: { full_name: userData.name, profession: userData.profession, phone: userData.phone } },
    });
    if (error) return { ok: false, error: error.message };
    if (data.session) return { ok: true, confirmed: true };
    return { ok: true, confirmed: false };
  };

  const logout = async () => {
    inOtpFlow.current = false;
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
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, sendOtp, verifyOtp, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
