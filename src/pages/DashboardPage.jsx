import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import StatCard from '../components/StatCard';
import './DashboardPage.css';

const STATS = [
  { label: 'לידים חדשים', value: '12', trend: '+3', trendUp: true },
  { label: 'הצעות פתוחות', value: '8' },
  { label: 'לקוחות פעילים', value: '45' },
  { label: 'תשלומים ממתינים', value: '₪3,400', trend: '2 פתוחים', trendUp: false },
];

const QUICK_ACTIONS = [
  { label: 'יצירת הצעת מחיר', icon: '📄', to: null },
  { label: 'ליד חדש', icon: '➕', to: '/leads' },
  { label: 'לקוח חדש', icon: '👤', to: null },
  { label: 'קביעת ביקור', icon: '📅', to: null },
];

const TASKS = [
  { time: '09:00', name: 'אבי כהן', job: 'תיקון תשתית תקשורת', status: 'ממתין', statusKey: 'pending' },
  { time: '11:30', name: 'מיכל לוי', job: 'פגישת ייעוץ ראשונית', status: 'בביצוע', statusKey: 'active' },
];

const INQUIRIES = [
  { name: 'רונית אברהם', msg: 'מעוניינת בהצעת מחיר לשיפוץ כללי', initials: 'רא' },
  { name: 'דניאל גולד', msg: 'האם אתם עובדים באזור המרכז ביום שישי?', initials: 'דג' },
];

// Minimal sparkline SVG
function Sparkline() {
  const points = [0, 30, 18, 45, 28, 60, 42, 72, 55, 80];
  const max = Math.max(...points);
  const h = 40;
  const w = 120;
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => `${i * step},${h - (p / max) * h}`).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ overflow: 'visible' }}>
      <polyline points={pts} stroke="#0050CB" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill="url(#sparkGrad)"
        stroke="none"
      />
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0050CB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0050CB" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const STATUS_DOT = {
  pending: '#FF9533',
  active: '#0AB571',
};

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <AppHeader showLogo title="דשבורד" />
      <main className="page-content dashboard-page">

        {/* Greeting */}
        <section className="px-container dashboard-greeting">
          <h1 className="dashboard-greeting__name">שלום, ישראל 👋</h1>
          <p className="dashboard-greeting__sub">הנה תמונת המצב העסקית שלך להיום</p>
        </section>

        {/* AI insight tile */}
        <section className="px-container mb-section">
          <div className="dashboard-ai-tile">
            <div className="dashboard-ai-tile__left">
              <div className="dashboard-ai-tile__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <div className="dashboard-ai-tile__title">AI זיהה 3 פניות חמות שכדאי לטפל בהן עכשיו</div>
                <button
                  type="button"
                  className="dashboard-ai-tile__cta"
                  onClick={() => navigate('/leads')}
                >
                  טפל עכשיו ←
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4 stat cards */}
        <section className="px-container mb-section">
          <div className="dashboard-stats">
            {STATS.map((s, i) => (
              <StatCard key={i} label={s.label} value={s.value} trend={s.trend} trendUp={s.trendUp} />
            ))}
          </div>
        </section>

        {/* Revenue card */}
        <section className="px-container mb-section">
          <div className="dashboard-revenue">
            <div className="dashboard-revenue__header">
              <div>
                <div className="dashboard-revenue__label">הכנסות החודש</div>
                <div className="dashboard-revenue__value">₪28,400</div>
              </div>
              <div className="dashboard-revenue__trend">
                <span className="chip chip--success">↑ 14%</span>
              </div>
            </div>
            <Sparkline />
          </div>
        </section>

        {/* Quick actions */}
        <section className="px-container mb-section">
          <div className="dashboard-section-title">פעולות מהירות</div>
          <div className="dashboard-quick-actions">
            {QUICK_ACTIONS.map((a, i) => (
              <button
                key={i}
                type="button"
                className="dashboard-quick-action"
                onClick={() => a.to && navigate(a.to)}
              >
                <span className="dashboard-quick-action__icon">{a.icon}</span>
                <span className="dashboard-quick-action__label">{a.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Today's tasks */}
        <section className="px-container mb-section">
          <div className="dashboard-section-title">ביקורים היום</div>
          <div className="dashboard-tasks">
            {TASKS.map((t, i) => (
              <div key={i} className="dashboard-task">
                <div className="dashboard-task__time">{t.time}</div>
                <div
                  className="dashboard-task__dot"
                  style={{ background: STATUS_DOT[t.statusKey] || '#C2C6D8' }}
                />
                <div className="dashboard-task__info">
                  <div className="dashboard-task__name">{t.name}</div>
                  <div className="dashboard-task__job">{t.job}</div>
                </div>
                <span className={`chip chip--${t.statusKey === 'active' ? 'success' : 'warn'}`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent inquiries */}
        <section className="px-container">
          <div className="dashboard-section-title">פניות אחרונות</div>
          <div className="dashboard-inquiries">
            {INQUIRIES.map((q, i) => (
              <div key={i} className="dashboard-inquiry">
                <div className="dashboard-inquiry__avatar">{q.initials}</div>
                <div className="dashboard-inquiry__body">
                  <div className="dashboard-inquiry__name">{q.name}</div>
                  <div className="dashboard-inquiry__msg">{q.msg}</div>
                </div>
                <button type="button" className="dashboard-inquiry__arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
      <BottomNav />
    </div>
  );
}
