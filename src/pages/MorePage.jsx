import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import './MorePage.css';

const MENU_ITEMS = [
  {
    section: 'מכירות',
    items: [
      {
        to: '/quotes',
        label: 'הצעות מחיר',
        sub: 'יצירה וניהול הצעות',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        ),
        color: '#EEF3FF',
        iconColor: '#0050CB',
      },
      {
        to: '/invoices',
        label: 'חשבוניות',
        sub: 'חשבונית מס, מס/קבלה וקבלה',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            <line x1="9" y1="7" x2="15" y2="7"/>
            <line x1="9" y1="11" x2="15" y2="11"/>
            <line x1="9" y1="15" x2="12" y2="15"/>
          </svg>
        ),
        color: '#F0F4FF',
        iconColor: '#0050CB',
      },
    ],
  },
  {
    section: 'ספקים ומלאי',
    items: [
      {
        to: '/suppliers',
        label: 'ספקים',
        sub: 'רשימת ספקים ומחירונים',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        ),
        color: '#F0FFF4',
        iconColor: '#0AB571',
      },
      {
        to: '/inventory',
        label: 'ניהול מלאי',
        sub: 'מעקב כמויות ואזהרות',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        ),
        color: '#FFF8F0',
        iconColor: '#E67E22',
      },
      {
        to: '/purchase-orders',
        label: 'הזמנות רכש',
        sub: 'הזמנה ומעקב משלוחים',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        ),
        color: '#F5F0FF',
        iconColor: '#7C3AED',
      },
    ],
  },
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
      {
        to: '/messages',
        label: 'תבניות הודעות',
        sub: 'תזכורות ב-WhatsApp — רשמי וידידותי',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        ),
        color: '#E8FFF3',
        iconColor: '#0AB571',
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
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const displayName = currentUser?.name || 'ישראל ישראלי';
  const displayRole  = currentUser?.profession || 'בעל מקצוע';
  const initials     = displayName.slice(0, 1);

  const handleItemClick = (item) => {
    if (item.danger) {
      logout();
      navigate('/');
      return;
    }
    navigate(item.to);
  };

  return (
    <Layout title="עוד" mainClass="more-page">

        {/* Profile card */}
        <div className="px-container more-profile">
          <div className="more-profile-card">
            <div className="more-profile-avatar">{initials}</div>
            <div className="more-profile-info">
              <div className="more-profile-name">{displayName}</div>
              <div className="more-profile-role">{displayRole}</div>
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
                <button
                  key={item.to + item.label}
                  type="button"
                  className={`more-item${item.danger ? ' more-item--danger' : ''}`}
                  onClick={() => handleItemClick(item)}
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
                </button>
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
