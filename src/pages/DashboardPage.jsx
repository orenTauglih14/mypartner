import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useApp } from '../context/AppContext';
import './DashboardPage.css';

const QUICK_ACTIONS = [
  { label: 'יצירת הצעת מחיר', icon: '📄', to: '/create-quote' },
  { label: 'ליד חדש', icon: '➕', to: '/leads' },
  { label: 'לקוח חדש', icon: '👤', to: '/customers' },
  { label: 'קביעת ביקור', icon: '📅', to: '/calendar' },
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
  const { leads, quotes, customers, payments, invoices, inventory, suppliers } = useApp();

  const newLeads = leads.filter((l) => l.status === 'חדש').length;
  const openQuotes = quotes.filter((q) => q.status === 'open').length;
  const activeCustomers = customers.filter((c) => c.status !== 'new').length;
  const pendingAmount = payments
    .filter((p) => p.status !== 'paid')
    .reduce((s, p) => s + (p.amountNum || 0), 0);
  const pendingCount = payments.filter((p) => p.status !== 'paid').length;

  const STATS = [
    { label: 'לידים חדשים', value: String(newLeads), trend: `+${newLeads}`, trendUp: true },
    { label: 'הצעות פתוחות', value: String(openQuotes) },
    { label: 'לקוחות פעילים', value: String(activeCustomers) },
    { label: 'תשלומים ממתינים', value: `₪${pendingAmount.toLocaleString()}`, trend: `${pendingCount} פתוחים`, trendUp: false },
  ];

  return (
    <Layout title="דשבורד" showLogo mainClass="dashboard-page">

        {/* Greeting */}
        <section className="px-container dashboard-greeting">
          <h1 className="dashboard-greeting__name">שלום, ישראל 👋</h1>
          <p className="dashboard-greeting__sub">הנה תמונת המצב העסקית שלך להיום</p>
        </section>

        {/* ראובן הסוכן tile */}
        <section className="px-container mb-section">
          <button type="button" className="dashboard-reuven-tile" onClick={() => navigate('/agent')}>
            {/* decorative circles */}
            <span className="dashboard-reuven-tile__circle1" />
            <span className="dashboard-reuven-tile__circle2" />

            {/* top row: badge + status */}
            <div className="dashboard-reuven-tile__top">
              <span className="dashboard-reuven-tile__badge">✦ MyPartner AI</span>
              <span className="dashboard-reuven-tile__online">
                <span className="dashboard-reuven-tile__online-dot" />
                זמין עכשיו
              </span>
            </div>

            {/* center row: face + info side by side */}
            <div className="dashboard-reuven-tile__center">
              <div className="dashboard-reuven-tile__avatar">
                <svg width="64" height="64" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', display: 'block' }}>
                  <circle cx="80" cy="80" r="80" fill="#1B3A6B"/>
                  <path d="M8 160 Q8 118 80 108 Q152 118 152 160Z" fill="#243F7A"/>
                  <path d="M80 108 L64 128 L54 160 L80 160Z" fill="#162D58"/>
                  <path d="M80 108 L96 128 L106 160 L80 160Z" fill="#162D58"/>
                  <path d="M70 108 L80 122 L90 108 L87 102 L80 108 L73 102Z" fill="#EEF3FF"/>
                  <path d="M77 108 L80 122 L83 108 L82 102 L78 102Z" fill="#C0392B"/>
                  <rect x="77" y="102" width="6" height="4" rx="2" fill="#96281B"/>
                  <rect x="71" y="91" width="18" height="19" rx="7" fill="#E8A87C"/>
                  <circle cx="80" cy="72" r="34" fill="#F0B27A"/>
                  <circle cx="46" cy="73" r="6" fill="#E29B65"/>
                  <circle cx="114" cy="73" r="6" fill="#E29B65"/>
                  <path d="M47 65 Q47 36 80 34 Q113 36 113 65 Q110 46 80 44 Q50 46 47 65Z" fill="#1C0F00"/>
                  <path d="M47 65 Q44 74 47 82 Q46 68 50 62Z" fill="#1C0F00"/>
                  <path d="M113 65 Q116 74 113 82 Q114 68 110 62Z" fill="#1C0F00"/>
                  <path d="M58 60 Q66 56 74 59" stroke="#1C0F00" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M86 59 Q94 56 102 60" stroke="#1C0F00" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="66" cy="70" r="9" fill="white"/>
                  <circle cx="94" cy="70" r="9" fill="white"/>
                  <circle cx="67" cy="71" r="6" fill="#4A2800"/>
                  <circle cx="95" cy="71" r="6" fill="#4A2800"/>
                  <circle cx="67" cy="71" r="3.5" fill="#1C0F00"/>
                  <circle cx="95" cy="71" r="3.5" fill="#1C0F00"/>
                  <circle cx="69" cy="69" r="1.8" fill="white"/>
                  <circle cx="97" cy="69" r="1.8" fill="white"/>
                  <circle cx="76" cy="80" r="1.8" fill="#D4894A" opacity="0.7"/>
                  <circle cx="84" cy="80" r="1.8" fill="#D4894A" opacity="0.7"/>
                  <path d="M64 89 Q80 101 96 89" stroke="#1C0F00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M67 90 Q80 100 93 90 Q80 96 67 90Z" fill="white" opacity="0.6"/>
                  <circle cx="55" cy="82" r="7" fill="#F07050" opacity="0.22"/>
                  <circle cx="105" cy="82" r="7" fill="#F07050" opacity="0.22"/>
                </svg>
              </div>
              <div className="dashboard-reuven-tile__info">
                <div className="dashboard-reuven-tile__pretitle">התייעץ עם</div>
                <div className="dashboard-reuven-tile__name">ראובן הסוכן</div>
                <div className="dashboard-reuven-tile__sub">שאל כל שאלה על העסק שלך</div>
              </div>
            </div>

            {/* CTA row */}
            <div className="dashboard-reuven-tile__cta">
              <span>פתח שיחה</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5m7-7-7 7 7 7"/>
              </svg>
            </div>
          </button>
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
                onClick={() => navigate(a.to)}
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
        <section className="px-container mb-section">
          <div className="dashboard-section-title">פניות אחרונות</div>
          <div className="dashboard-inquiries">
            {INQUIRIES.map((q, i) => (
              <div key={i} className="dashboard-inquiry">
                <div className="dashboard-inquiry__avatar">{q.initials}</div>
                <div className="dashboard-inquiry__body">
                  <div className="dashboard-inquiry__name">{q.name}</div>
                  <div className="dashboard-inquiry__msg">{q.msg}</div>
                </div>
                <button type="button" className="dashboard-inquiry__arrow" onClick={() => navigate('/leads')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Open invoices */}
        {invoices && invoices.filter(inv => inv.status !== 'paid').length > 0 && (
          <section className="px-container mb-section">
            <div className="dashboard-section-title-row">
              <div className="dashboard-section-title">חשבוניות פתוחות</div>
              <button type="button" className="dashboard-section-link" onClick={() => navigate('/invoices')}>הכל</button>
            </div>
            <div className="dashboard-inv-list">
              {invoices.filter(inv => inv.status !== 'paid').slice(0, 3).map((inv, i) => (
                <div key={i} className="dashboard-inv-row" onClick={() => navigate('/invoice-preview', { state: inv })}>
                  <div className="dashboard-inv-row__left">
                    <div className="dashboard-inv-row__id">{inv.id}</div>
                    <div className="dashboard-inv-row__client">{inv.client}</div>
                  </div>
                  <div className="dashboard-inv-row__right">
                    <div className="dashboard-inv-row__amount">₪{inv.total?.toLocaleString()}</div>
                    <span className={`chip chip--${inv.status === 'overdue' ? 'danger' : inv.status === 'sent' ? 'warn' : 'default'}`}>
                      {inv.status === 'overdue' ? 'באיחור' : inv.status === 'sent' ? 'נשלחה' : inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Low stock alerts */}
        {inventory && inventory.filter(it => it.qty <= it.minQty).length > 0 && (
          <section className="px-container mb-section">
            <div className="dashboard-section-title-row">
              <div className="dashboard-section-title">
                <span className="dashboard-alert-dot" />
                מלאי נמוך — דורש תשומת לב
              </div>
              <button type="button" className="dashboard-section-link" onClick={() => navigate('/inventory')}>מלאי</button>
            </div>
            <div className="dashboard-stock-list">
              {inventory.filter(it => it.qty <= it.minQty).slice(0, 4).map((item, i) => (
                <div key={i} className="dashboard-stock-row">
                  <div className="dashboard-stock-row__info">
                    <div className="dashboard-stock-row__name">{item.name}</div>
                    <div className="dashboard-stock-row__sku">{item.sku}</div>
                  </div>
                  <div className="dashboard-stock-row__right">
                    <div className={`dashboard-stock-row__qty${item.qty === 0 ? ' dashboard-stock-row__qty--zero' : ''}`}>
                      {item.qty === 0 ? 'אזל' : `${item.qty}/${item.minQty} ${item.unit}`}
                    </div>
                    <div className="dashboard-stock-bar">
                      <div
                        className="dashboard-stock-bar__fill"
                        style={{ width: `${Math.min(100, (item.qty / item.minQty) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Suppliers snapshot */}
        {suppliers && suppliers.length > 0 && (
          <section className="px-container mb-section">
            <div className="dashboard-section-title-row">
              <div className="dashboard-section-title">ספקים</div>
              <button type="button" className="dashboard-section-link" onClick={() => navigate('/suppliers')}>הכל</button>
            </div>
            <div className="dashboard-suppliers">
              {suppliers.slice(0, 3).map((s, i) => (
                <div key={i} className="dashboard-supplier-chip" onClick={() => navigate('/suppliers')}>
                  <div className="dashboard-supplier-chip__avatar">{s.name.slice(0, 2)}</div>
                  <div className="dashboard-supplier-chip__info">
                    <div className="dashboard-supplier-chip__name">{s.name}</div>
                    <div className="dashboard-supplier-chip__cat">{s.category}</div>
                  </div>
                  <div className="dashboard-supplier-chip__rating">★ {s.rating}</div>
                </div>
              ))}
            </div>
          </section>
        )}

    </Layout>
  );
}
