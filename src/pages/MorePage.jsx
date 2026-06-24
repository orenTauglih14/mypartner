import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './MorePage.css';

const MENU_ITEMS = [
  {
    section: 'ניהול',
    items: [
      {
        to: '/customers',
        label: 'לקוחות',
        sub: 'CRM ורשימת לקוחות',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
        color: 'var(--primary-soft)',
        iconColor: 'var(--primary)',
      },
      {
        to: '/payments',
        label: 'תשלומים',
        sub: 'מעקב חשבוניות ותשלומים',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        ),
        color: 'var(--success-soft)',
        iconColor: 'var(--success-ink)',
      },
      {
        to: '/collections',
        label: 'גבייה',
        sub: 'מעקב חובות וגביית כספים',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        ),
        color: 'var(--warn-soft)',
        iconColor: 'var(--warn-ink)',
      },
      {
        to: '/reminders',
        label: 'תזכורות',
        sub: 'אוטומציה ומעקב אחר לקוחות',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        ),
        color: 'var(--tint2)',
        iconColor: 'var(--primary)',
      },
    ],
  },
  {
    section: 'חשבון',
    items: [
      {
        to: '/pricing',
        label: 'שדרג תוכנית',
        sub: 'צפה בתוכניות ומחירים',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        ),
        color: 'var(--primary-soft)',
        iconColor: 'var(--primary)',
      },
      {
        to: '/',
        label: 'התנתק',
        sub: 'יציאה מהחשבון',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        ),
        color: 'var(--danger-soft)',
        iconColor: 'var(--danger)',
        danger: true,
      },
    ],
  },
];

export default function MorePage() {
  return (
    <Layout title="עוד" mainClass="more-page">

        {/* Profile card */}
        <div className="px-container more-profile">
          <div className="more-profile-card">
            <div className="more-profile-avatar">י</div>
            <div className="more-profile-info">
              <div className="more-profile-name">ישראל ישראלי</div>
              <div className="more-profile-role">אינסטלטור מוסמך</div>
            </div>
            <span className="chip chip--primary">Pro</span>
          </div>
        </div>

        {/* Menu sections */}
        {MENU_ITEMS.map((section) => (
          <div key={section.section} className="px-container more-section">
            <div className="more-section__title">{section.section}</div>
            <div className="more-section__list">
              {section.items.map((item) => (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  className={`more-item${item.danger ? ' more-item--danger' : ''}`}
                >
                  <div
                    className="more-item__icon"
                    style={{ background: item.color, color: item.iconColor }}
                  >
                    {item.icon}
                  </div>
                  <div className="more-item__body">
                    <div className="more-item__label">{item.label}</div>
                    <div className="more-item__sub">{item.sub}</div>
                  </div>
                  <svg className="more-item__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="px-container more-version">
          <span className="text-nano text-faint">MyPartner v1.0.0</span>
        </div>

    </Layout>
  );
}
