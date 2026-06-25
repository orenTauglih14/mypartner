import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const FEATURES = [
  { icon: '📋', text: 'הצעות מחיר', sub: 'תוך דקות' },
  { icon: '📅', text: 'יומן חכם', sub: 'ביקורים ומסלולים' },
  { icon: '💰', text: 'גבייה', sub: 'אוטומטית' },
];

const STATS = [
  { val: '500+', label: 'מקצוענים' },
  { val: '₪2.3M', label: 'נגבה החודש' },
  { val: '4.8★', label: 'דירוג ממוצע' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode]         = useState('login'); // 'login' | 'register'
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const switchMode = (m) => { setMode(m); setError(''); setPassword(''); setConfirm(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && password !== confirm) {
      setError('הסיסמאות לא תואמות'); return;
    }

    setLoading(true);
    const result = mode === 'login'
      ? await login(email, password)
      : await register({ email, password });
    setLoading(false);

    if (!result.ok) { setError(result.error); return; }
    navigate('/dashboard');
  };

  return (
    <div className="login-page">

      <div className="login-hero">
        <div className="login-hero__top">
          <Logo size={32} white />
          <Link to="/pricing" className="login-hero__plans">תוכניות ומחירים</Link>
        </div>
        <div className="login-hero__copy">
          <h1 className="login-hero__title">ניהול העסק שלך,<br />פשוט יותר</h1>
          <p className="login-hero__sub">לידים, הצעות מחיר, חשבוניות, יומן וגבייה — הכל במקום אחד</p>
        </div>
        <div className="login-hero__features">
          {FEATURES.map((f) => (
            <div key={f.text} className="login-hero__feat">
              <span className="login-hero__feat-icon">{f.icon}</span>
              <span className="login-hero__feat-text">{f.text}</span>
              <span className="login-hero__feat-sub">{f.sub}</span>
            </div>
          ))}
        </div>
        <div className="login-hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="login-hero__stat">
              <span className="login-hero__stat-val">{s.val}</span>
              <span className="login-hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="login-card">

        {/* Tabs */}
        <div style={{ display: 'flex', borderRadius: 12, background: '#F0F2FA', padding: 4, marginBottom: 24, gap: 4 }}>
          {[{ key: 'login', label: 'כניסה' }, { key: 'register', label: 'הרשמה' }].map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => switchMode(t.key)}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 15, fontWeight: 700, transition: 'all .15s',
                background: mode === t.key ? '#fff' : 'transparent',
                color: mode === t.key ? '#0050CB' : '#8891B2',
                boxShadow: mode === t.key ? '0 1px 6px rgba(0,0,0,.1)' : 'none',
              }}
            >{t.label}</button>
          ))}
        </div>

        <div className="login-heading">
          {mode === 'login' ? (
            <p className="text-small text-mute">הזן אימייל וסיסמה כדי להיכנס לחשבון</p>
          ) : (
            <p className="text-small text-mute">צור חשבון חדש — אימייל קיים יוחזר כשגיאה</p>
          )}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label className="login-label">אימייל</label>
            <div className="input-wrap">
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
              />
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">סיסמה</label>
            <div className="input-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                className="input-field"
                placeholder="לפחות 6 תווים"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
              />
              <span className="input-icon" style={{ cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}>
                {showPass
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </span>
            </div>
          </div>

          {mode === 'register' && (
            <div className="login-field">
              <label className="login-label">אימות סיסמה</label>
              <div className="input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field"
                  placeholder="הזן שוב את הסיסמה"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--full"
            disabled={loading || !email.trim() || password.length < 6 || (mode === 'register' && !confirm)}
          >
            {loading ? (mode === 'login' ? 'מתחבר...' : 'יוצר חשבון...') : (mode === 'login' ? 'כניסה לחשבון →' : 'צור חשבון →')}
          </button>
        </form>

        <p className="text-small text-mute" style={{ textAlign: 'center', marginTop: 16 }}>
          {mode === 'login'
            ? <>אין לך חשבון? <button type="button" style={{ background: 'none', border: 'none', color: '#0050CB', cursor: 'pointer', fontWeight: 700, fontSize: 'inherit' }} onClick={() => switchMode('register')}>הרשם כאן</button></>
            : <>כבר יש לך חשבון? <button type="button" style={{ background: 'none', border: 'none', color: '#0050CB', cursor: 'pointer', fontWeight: 700, fontSize: 'inherit' }} onClick={() => switchMode('login')}>כנס כאן</button></>
          }
        </p>
      </div>

      <Footer />
    </div>
  );
}
