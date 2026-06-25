import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './CollectionsPage.css';

const TARGET = 50000;
const COLLECTED = 32400;
const PROGRESS = Math.round((COLLECTED / TARGET) * 100);

const AGING = [
  { label: '0–30 ימים', amount: '₪8,400', count: 2, pct: 42, color: 'var(--success)' },
  { label: '31–60 ימים', amount: '₪5,600', count: 1, pct: 28, color: 'var(--warn)' },
  { label: '61–90 ימים', amount: '₪3,200', count: 1, pct: 16, color: '#FF6B35' },
  { label: '90+ ימים', amount: '₪1,800', count: 1, pct: 9, color: 'var(--danger)' },
];

const DEBTORS = [
  { rank: 1, name: 'אבי כהן', amount: '₪8,400', days: 45, initials: 'אכ' },
  { rank: 2, name: 'מיכל לוי', amount: '₪5,600', days: 32, initials: 'מל' },
  { rank: 3, name: 'יצחק פרץ', amount: '₪3,200', days: 75, initials: 'יפ' },
];

const ACTIVITY = [
  { text: 'נשלחה תזכורת לאבי כהן', time: 'לפני שעה', type: 'reminder' },
  { text: 'מיכל לוי עיין בהצעת המחיר', time: 'לפני 3 שעות', type: 'view' },
  { text: 'יוסי מזרחי שילם ₪900', time: 'אתמול', type: 'payment' },
];

const CASHFLOW = [
  { month: 'יול', actual: 22000, forecast: 25000 },
  { month: 'אוג', actual: 28400, forecast: 28000 },
  { month: 'ספט', actual: 19000, forecast: 32000 },
  { month: 'אוק', actual: 32400, forecast: 40000 },
];

const MAX_CASHFLOW = 45000;

function CashflowChart() {
  return (
    <div className="cashflow-chart">
      {CASHFLOW.map((d) => (
        <div key={d.month} className="cashflow-col">
          <div className="cashflow-bars">
            <div
              className="cashflow-bar cashflow-bar--forecast"
              style={{ height: `${(d.forecast / MAX_CASHFLOW) * 80}px` }}
            />
            <div
              className="cashflow-bar cashflow-bar--actual"
              style={{ height: `${(d.actual / MAX_CASHFLOW) * 80}px` }}
            />
          </div>
          <span className="cashflow-label">{d.month}</span>
        </div>
      ))}
      <div className="cashflow-legend">
        <span className="cashflow-legend__item cashflow-legend__item--actual">בפועל</span>
        <span className="cashflow-legend__item cashflow-legend__item--forecast">תחזית</span>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  const navigate = useNavigate();
  const [collected, setCollected] = useState(COLLECTED);
  const [debtors, setDebtors] = useState(DEBTORS);
  const [activity, setActivity] = useState(ACTIVITY);
  const progress = Math.round((collected / TARGET) * 100);

  const handleCollect = (debtor) => {
    setDebtors((prev) => prev.filter((d) => d.rank !== debtor.rank));
    const amount = parseInt(debtor.amount.replace(/[^0-9]/g, ''));
    setCollected((prev) => Math.min(prev + amount, TARGET));
    setActivity((prev) => [
      { text: `${debtor.name} שילם ${debtor.amount}`, time: 'עכשיו', type: 'payment' },
      ...prev,
    ]);
  };

  return (
    <Layout title="גבייה" mainClass="collections-page">


        {/* Hero target */}
        <div className="px-container collections-hero">
          <div className="collections-hero-card">
            <div className="collections-hero-card__top">
              <div>
                <div className="collections-hero-card__label">יעד חודשי</div>
                <div className="collections-hero-card__target">₪{TARGET.toLocaleString()}</div>
              </div>
              <div className="collections-ring">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6"/>
                  <circle
                    cx="32" cy="32" r="26" fill="none"
                    stroke="white" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                  <text x="32" y="37" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Rubik">{progress}%</text>
                </svg>
              </div>
            </div>
            <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div className="progress-bar__fill" style={{ width: `${progress}%`, background: 'white' }} />
            </div>
            <div className="collections-hero-card__bottom">
              <span>₪{collected.toLocaleString()} נגבה</span>
              <span>₪{(TARGET - collected).toLocaleString()} נותר</span>
            </div>
          </div>
        </div>

        {/* Aging buckets */}
        <div className="px-container collections-aging">
          <div className="collections-section-title">פירוט גיל חוב</div>
          <div className="aging-grid">
            {AGING.map((a, i) => (
              <div key={i} className="aging-card">
                <div className="aging-card__bar">
                  <div className="aging-card__fill" style={{ height: `${a.pct}%`, background: a.color }} />
                </div>
                <div className="aging-card__amount" style={{ color: a.color }}>{a.amount}</div>
                <div className="aging-card__label">{a.label}</div>
                <div className="aging-card__count">{a.count} חשב'</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cashflow chart */}
        <div className="px-container collections-cashflow">
          <div className="collections-section-title">תזרים מזומנים</div>
          <div className="collections-chart-card">
            <CashflowChart />
          </div>
        </div>

        {/* Top debtors */}
        <div className="px-container collections-debtors">
          <div className="collections-section-title">חייבים עיקריים</div>
          <div className="debtors-list">
            {debtors.length === 0 && (
              <div className="text-caption text-mute" style={{ padding: '12px 0' }}>אין חייבים כרגע</div>
            )}
            {debtors.map((d) => (
              <div key={d.rank} className="debtor-row">
                <div className="debtor-rank">#{d.rank}</div>
                <div className="debtor-avatar">{d.initials}</div>
                <div className="debtor-info">
                  <div className="debtor-name">{d.name}</div>
                  <div className="debtor-days">{d.days} ימים ללא תשלום</div>
                </div>
                <div className="debtor-amount">{d.amount}</div>
                <button type="button" className="debtor-action" onClick={() => handleCollect(d)}>גבה</button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="px-container collections-activity">
          <div className="collections-section-title">פעילות אחרונה</div>
          <div className="activity-feed">
            {activity.map((a, i) => (
              <div key={i} className="activity-item">
                <div className={`activity-icon activity-icon--${a.type}`}>
                  {a.type === 'reminder' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  )}
                  {a.type === 'view' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                  {a.type === 'payment' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

    </Layout>
  );
}
