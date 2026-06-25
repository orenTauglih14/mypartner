import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetResult, setResetResult] = useState(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) { setError('יש להזין אימייל וסיסמה'); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) navigate('/dashboard');
    else setError(result.error);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    const result = await resetPassword(forgotEmail);
    setResetResult(result);
  };

  const handleOAuth = () => {
    login('oauth@mypartner.co.il', 'OAuthPass1');
    navigate('/dashboard');
  };

  if (forgotMode) {
    return (
      <div className="login-page">
        <div className="login-hero">
          <Logo size={32} white />
        </div>
        <div className="login-card">
          <div className="login-heading">
            <h1 className="text-h2">איפוס סיסמה</h1>
            <p className="text-small text-mute">הזן את האימייל ונשלח לך את הסיסמה</p>
          </div>
          {resetResult && resetResult.ok ? (
            <div className="login-reset-success">
              <div className="login-reset-success__icon">✓</div>
              <div className="login-reset-success__title">נמצאנו!</div>
              <div className="login-reset-success__msg">הסיסמה שלך:</div>
              <div className="login-reset-success__pw">{resetResult.password}</div>
              <button type="button" className="btn btn--primary btn--lg btn--full" style={{ marginTop: 16 }}
                onClick={() => { setForgotMode(false); setPassword(resetResult.password); setEmail(forgotEmail); setResetResult(null); }}>
                חזור לכניסה
              </button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleForgot}>
              {resetResult && !resetResult.ok && <div className="login-error">{resetResult.error}</div>}
              <div className="login-field">
                <label className="login-label">אימייל</label>
                <div className="input-wrap">
                  <input type="email" className="input-field" placeholder="you@example.com"
                    value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={!forgotEmail.trim()}>שלח סיסמה</button>
              <button type="button" className="btn btn--outline btn--lg btn--full" onClick={() => { setForgotMode(false); setResetResult(null); }}>חזור</button>
            </form>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="login-page">

      {/* ── Marketing Hero ── */}
      <div className="login-hero">
        <div className="login-hero__top">
          <Logo size={32} white />
          <Link to="/pricing" className="login-hero__plans">תוכניות ומחירים</Link>
        </div>

        <div className="login-hero__copy">
          <h1 className="login-hero__title">
            ניהול העסק שלך,<br />פשוט יותר
          </h1>
          <p className="login-hero__sub">
            לידים, הצעות מחיר, חשבוניות, יומן וגבייה — הכל במקום אחד
          </p>
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

      {/* ── Login Card ── */}
      <div className="login-card">
        <div className="login-heading">
          <h2 className="text-h2">כניסה לחשבון</h2>
          <p className="text-small text-mute">ברוך הבא חזרה</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label className="login-label">אימייל</label>
            <div className="input-wrap">
              <input type="email" className="input-field" placeholder="you@example.com" autoComplete="email"
                value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label">סיסמה</label>
              <button type="button" className="login-forgot" onClick={() => { setForgotMode(true); setForgotEmail(email); }}>
                שכחתי סיסמה
              </button>
            </div>
            <div className="input-wrap">
              <input type={showPass ? 'text' : 'password'} className="input-field" placeholder="••••••••"
                autoComplete="current-password" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }} />
              <button type="button" className="input-icon input-icon--btn" onClick={() => setShowPass(v => !v)}>
                {showPass
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={loading}>
            {loading ? 'מתחבר...' : 'כנס לחשבון'}
          </button>
        </form>

        <div className="login-divider">
          <span className="login-divider__line" />
          <span className="login-divider__text">או כנס עם</span>
          <span className="login-divider__line" />
        </div>

        <div className="login-oauth">
          <button type="button" className="login-oauth-btn" onClick={handleOAuth}><GoogleLogo /><span>Google</span></button>
          <button type="button" className="login-oauth-btn" onClick={handleOAuth}><AppleLogo /><span>Apple</span></button>
        </div>

        <p className="login-signup">
          אין לך חשבון עדיין?{' '}
          <Link to="/register" className="login-signup__link">התחל עכשיו — חינם</Link>
        </p>
      </div>

      <Footer />
    </div>
  );
}
