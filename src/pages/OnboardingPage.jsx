import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import './OnboardingPage.css';

const PROFESSIONS = ['אינסטלטור', 'שיפוצניק', 'חשמלאי', 'טכנאי מיזוג', 'אחר'];

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const currentStep = 1;

  const toggleProfession = (p) => {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const goNext = () => navigate('/dashboard');

  return (
    <div className="onboarding-page">
      {/* Header */}
      <header className="onboarding-header">
        <Logo size={28} />
        <button type="button" className="onboarding-header__skip" onClick={goNext}>
          דלג
        </button>
      </header>

      {/* Progress */}
      <div className="onboarding-progress px-container">
        <div className="onboarding-progress__label">
          <span className="text-caption text-mute">שלב {currentStep} מתוך {TOTAL_STEPS}</span>
          <span className="text-caption text-mute">{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="px-container onboarding-title">
        <h1 className="text-h1">אפיון המקצוע שלך</h1>
        <p className="text-small text-mute">
          נלמד על העסק שלך כדי להתאים את הכלים
        </p>
      </div>

      {/* Chat area */}
      <div className="px-container onboarding-chat">
        {/* Bot message */}
        <div className="onboarding-bot-msg">
          <div className="onboarding-bot-avatar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="onboarding-bot-bubble">
            שלום! אני השותף הדיגיטלי שלך. כדי להתחיל, ספר לי קצת על העסק.
          </div>
        </div>

        {/* User example bubble */}
        <div className="onboarding-user-msg">
          <div className="onboarding-user-bubble">
            אני אינסטלטור מוסמך, מבצע עבודות תשתית ושיפוץ חדרי אמבטיה.
          </div>
        </div>
      </div>

      {/* Profession chips */}
      <div className="px-container onboarding-professions">
        <div className="text-caption text-mute" style={{ marginBottom: 10 }}>בחר מקצוע (אפשר כמה)</div>
        <div className="onboarding-chips">
          {PROFESSIONS.map((p) => (
            <button
              key={p}
              type="button"
              className={`filter-chip${selected.includes(p) ? ' filter-chip--active' : ''}`}
              onClick={() => toggleProfession(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div className="px-container onboarding-input">
        <div className="input-wrap">
          <textarea
            className="textarea-field"
            placeholder="כתוב כאן את התשובה שלך..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Upload card */}
      <div className="px-container onboarding-upload">
        <div className="onboarding-upload-card">
          <div className="onboarding-upload-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div>
            <div className="onboarding-upload-card__title">העלאת מחירון קיים</div>
            <div className="onboarding-upload-card__sub">
              צרף מחירון או מסמך כדי שהסוכן ילמד מהר יותר
            </div>
          </div>
          <button type="button" className="btn btn--soft btn--sm">בחר</button>
        </div>
      </div>

      {/* Tip card */}
      <div className="px-container onboarding-tip">
        <div className="onboarding-tip-card">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <div className="onboarding-tip-card__title">טיפ מקצועי</div>
            <div className="onboarding-tip-card__body">
              ככל שתתאר יותר את השירותים שלך, ההצעות יהיו מדויקות יותר.
            </div>
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-container onboarding-cta">
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={goNext}>
          המשך לשלב הבא
        </button>
        <button type="button" className="btn btn--outline btn--lg btn--full" onClick={goNext}>
          שמור והמשך אחר כך
        </button>
      </div>
      <Footer />
    </div>
  );
}
