import { createContext, useContext, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { supabase, isConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const STORAGE_USER  = 'mp_user';
const STORAGE_AUTH  = 'mp_auth';
const STORAGE_OTP   = 'mp_otp_pending';

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';
const ejsReady     = !!(EJS_SERVICE && EJS_TEMPLATE && EJS_KEY);

const genCode = () => String(Math.floor(100000 + Math.random() * 900000));

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn]   = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady]     = useState(true); // EmailJS is sync-ready

  useEffect(() => {
    // Restore session from localStorage
    const loggedIn = !!localStorage.getItem(STORAGE_AUTH);
    const user = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_USER)); } catch { return null; } })();
    setIsLoggedIn(loggedIn);
    setCurrentUser(user);

    // Also watch Supabase session (for magic-link fallback or future use)
    if (isConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
        if (session && !localStorage.getItem(STORAGE_AUTH)) {
          // User arrived via Supabase magic link — accept the session
          const u = { email: session.user.email, name: session.user.email.split('@')[0] };
          localStorage.setItem(STORAGE_AUTH, 'true');
          localStorage.setItem(STORAGE_USER, JSON.stringify(u));
          setCurrentUser(u);
          setIsLoggedIn(true);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const sendOtp = async (email) => {
    const trimmed = email.trim().toLowerCase();

    // Demo mode (no EmailJS configured)
    if (!ejsReady) {
      const user = { email: trimmed, name: trimmed.split('@')[0] };
      localStorage.setItem(STORAGE_AUTH, 'true');
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      return { ok: true, demo: true };
    }

    const code    = genCode();
    const expires = Date.now() + 10 * 60 * 1000; // 10 min
    localStorage.setItem(STORAGE_OTP, JSON.stringify({ email: trimmed, code, expires }));

    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        to_email: trimmed,
        otp_code: code,
        to_name:  trimmed.split('@')[0],
      }, EJS_KEY);
      return { ok: true };
    } catch {
      localStorage.removeItem(STORAGE_OTP);
      return { ok: false, error: 'שגיאה בשליחת קוד — נסה שוב' };
    }
  };

  // ── Verify OTP ────────────────────────────────────────────────────────────
  const verifyOtp = async (email, token) => {
    if (!ejsReady) return { ok: true };

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedToken = token.trim();

    const stored = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_OTP)); } catch { return null; } })();
    if (!stored)                          return { ok: false, error: 'לא נמצא קוד — שלח מחדש' };
    if (stored.email !== trimmedEmail)    return { ok: false, error: 'אימייל לא תואם' };
    if (stored.expires < Date.now())      return { ok: false, error: 'הקוד פג תוקף — שלח מחדש' };
    if (stored.code !== trimmedToken)     return { ok: false, error: 'קוד שגוי — נסה שוב' };

    localStorage.removeItem(STORAGE_OTP);

    const user = { email: trimmedEmail, name: trimmedEmail.split('@')[0] };
    localStorage.setItem(STORAGE_AUTH, 'true');
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);

    // Fire Supabase sign-in in background so RLS works (best-effort)
    if (isConfigured) {
      const pw = btoa(trimmedEmail + '_mp');
      supabase.auth.signUp({ email: trimmedEmail, password: pw }).then(() =>
        supabase.auth.signInWithPassword({ email: trimmedEmail, password: pw })
      );
    }

    return { ok: true };
  };

  // ── Register (keep for RegisterPage compatibility) ─────────────────────────
  const register = async (userData) => {
    return sendOtp(userData.email); // reuse OTP flow
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    localStorage.removeItem(STORAGE_AUTH);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_OTP);
    setIsLoggedIn(false);
    setCurrentUser(null);
    if (isConfigured) supabase.auth.signOut();
  };

  const resetPassword = async () => ({ ok: true });
  const login = async (email) => sendOtp(email);

  if (!authReady) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, sendOtp, verifyOtp, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
