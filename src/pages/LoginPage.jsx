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
  const { login } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError('יש למלא אימייל וסיסמה'); return; }
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.ok) { setError(result.error); return; }
    navigate('/dashboard');
  };

  return (
    <div className="login-page">

      {/* ── Marketing Hero ── */}
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

      {/* ── Auth Card ── */}
      <div className="login-card">
        <div className="login-heading">
          <h2 className="text-h2">כניסה / הרשמה</h2>
          <p className="text-small text-mute">אימייל חדש? ניצור לך חשבון אוטומטית</p>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
              />
              <span className="input-icon" style={{ cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--full"
            disabled={loading || !email.trim() || !password.trim()}
          >
            {loading ? 'מתחבר...' : 'כניסה לחשבון →'}
          </button>
        </form>

        <p className="text-small text-mute" style={{ textAlign: 'center', marginTop: 16 }}>
          אימייל חדש = חשבון חדש נוצר אוטומטית
        </p>
      </div>

      <Footer />
    </div>
  );
}
