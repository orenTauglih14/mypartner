import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__links">
        <Link to="/pricing" className="footer__link">תמחור</Link>
        <span className="footer__sep">·</span>
        <Link to="/" className="footer__link">בית</Link>
        <span className="footer__sep">·</span>
        <Link to="/dashboard" className="footer__link">דשבורד</Link>
      </div>
      <p className="footer__copy">© {year} MyPartner. כל הזכויות שמורות.</p>
    </footer>
  );
}
