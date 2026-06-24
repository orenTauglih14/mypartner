import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function AppHeader({ title, showLogo = false, showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      {/* Right side: logo or title */}
      <div className="app-header__right">
        {showLogo ? (
          <Logo size={28} />
        ) : (
          <span className="app-header__title">{title}</span>
        )}
      </div>

      {/* Left side: back or actions */}
      <div className="app-header__left">
        {showBack && (
          <button
            type="button"
            className="app-header__back"
            onClick={() => navigate(-1)}
            aria-label="חזרה"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
