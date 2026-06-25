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
  const { sendOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState(1); // 1=email, 2=code
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('יש להזין אימייל'); return; }
    setError('');
    setLoading(true);
    const result = await sendOtp(email);
    setLoading(false);
    if (!result.ok) { setError(result.error); return; }
    if (result.demo) { navigate('/dashboard'); return; }
    setStep(2);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.trim().length < 4) { setError('יש להזין את הקוד מהאימייל'); return; }
    setError('');
    setLoading(true);
    const result = await verifyOtp(email, code);
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

        {step === 1 && (
          <>
            <div className="login-heading">
              <h2 className="text-h2">כניסה / הרשמה</h2>
              <p className="text-small text-mute">הזן את האימייל ונשלח לך קוד כניסה</p>
            </div>
            <form className="login-form" onSubmit={handleSendOtp}>
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
              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={loading || !email.trim()}>
                {loading ? 'שולח...' : 'שלח קוד כניסה →'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className="login-heading">
              <div style={{ fontSize: 44, marginBottom: 8 }}>✉️</div>
              <h2 className="text-h2">בדוק את האימייל</h2>
              <p className="text-small text-mute">שלחנו קישור כניסה ל-<strong>{email}</strong></p>
            </div>
            <div className="login-form">
              <div style={{ background: '#F0F4FF', borderRadius: 14, padding: '20px 16px', textAlign: 'center', color: '#3B4B8C', fontSize: 14, lineHeight: 1.7 }}>
                לחץ על הקישור <strong>"Sign in"</strong> שקיבלת במייל<br />
                <span style={{ fontSize: 12, color: '#8891B2' }}>הקישור תקף לכמה דקות בלבד</span>
              </div>
              {error && <div className="login-error">{error}</div>}
              <button type="button" className="btn btn--outline btn--lg btn--full" onClick={() => { setStep(1); setError(''); }}>
                שלח קישור מחדש
              </button>
            </div>
          </>
        )}

      </div>

      <Footer />
    </div>
  );
}
