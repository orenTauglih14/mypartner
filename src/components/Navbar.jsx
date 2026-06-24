import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar({ title, showLogo = false, showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      {/* Right: logo or title (RTL — right is the "start" side) */}
      <div className="navbar__right">
        {showLogo ? (
          <NavLink to="/dashboard" className="navbar__logo-link">
            <Logo size={28} />
          </NavLink>
        ) : (
          <span className="navbar__title">{title}</span>
        )}
      </div>

      {/* Left: back button or action */}
      <div className="navbar__left">
        {showBack && (
          <button
            type="button"
            className="navbar__back"
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
