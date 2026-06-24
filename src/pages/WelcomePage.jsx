import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import './WelcomePage.css';

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z" />
      </svg>
    ),
    text: 'אל תפספס אף פנייה',
    sub: 'כל ליד נכנס ישירות לאפליקציה',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    text: 'הצעת מחיר מקצועית תוך דקות',
    sub: 'AI מייצר הצעה לפי הפירוט שלך',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    text: 'גבייה, יומן ולקוחות בכיס',
    sub: 'הכל מנוהל ממסך אחד',
  },
];

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      {/* Top bar */}
      <header className="welcome-header">
        <Logo size={30} />
      </header>

      {/* Hero section */}
      <section className="welcome-hero">
        <div className="welcome-hero__tag">
          <span className="chip chip--primary">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            מבוסס AI
          </span>
        </div>
        <h1 className="welcome-hero__title">
          השותף החכם<br />לניהול העסק<br />מהשטח
        </h1>
        <p className="welcome-hero__subtitle">
          לידים, לקוחות, הצעות מחיר, יומן וגבייה — הכל במקום אחד, עם סוכן AI שמכיר את העסק שלך.
        </p>
      </section>

      {/* Navy AI demo card */}
      <section className="welcome-demo px-container">
        <div className="welcome-ai-card">
          <div className="welcome-ai-card__top">
            <div className="welcome-ai-card__avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="welcome-ai-card__title">סוכן AI</div>
              <div className="welcome-ai-card__sub">MyPartner</div>
            </div>
            <div className="welcome-ai-card__live">
              <span className="welcome-ai-card__dot" />
              פעיל
            </div>
          </div>
          <div className="welcome-ai-card__bubble">
            זיהיתי 3 פניות חמות — אחת ממתינה כבר 2 שעות. רוצה שאכין הצעת מחיר?
          </div>
          <div className="welcome-ai-card__footer">
            <div className="welcome-ai-card__stat">
              <span className="welcome-ai-card__stat-val">~8 דק'</span>
              <span className="welcome-ai-card__stat-label">לכל הצעת מחיר</span>
            </div>
            <div className="welcome-ai-card__stat">
              <span className="welcome-ai-card__stat-val">30%</span>
              <span className="welcome-ai-card__stat-label">יותר סגירות</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="welcome-benefits px-container">
        {BENEFITS.map((b, i) => (
          <div key={i} className="welcome-benefit">
            <div className="welcome-benefit__icon">{b.icon}</div>
            <div>
              <div className="welcome-benefit__text">{b.text}</div>
              <div className="welcome-benefit__sub">{b.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA buttons */}
      <section className="welcome-cta px-container">
        <Link to="/onboarding" className="btn btn--primary btn--lg btn--full">
          התחל עכשיו
        </Link>
        <Link to="/dashboard" className="btn btn--outline btn--lg btn--full">
          כניסה לחשבון
        </Link>
      </section>

      <div className="welcome-footer">
        <span className="text-nano text-faint">ללא דרישת כרטיס אשראי · התחל בחינם</span>
      </div>
      <Footer />
    </div>
  );
}
