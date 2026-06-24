import { useState } from 'react';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import './PaymentsPage.css';

const PAYMENTS = [
  { id: '#001248', client: 'אבי כהן', job: 'שיפוץ אמבטיה', amount: '₪8,400', due: '12 באוקטובר', status: 'overdue', daysLate: 3 },
  { id: '#001247', client: 'שרה גולד', job: 'החלפת ברזים', amount: '₪1,200', due: '20 באוקטובר', status: 'pending', daysLate: 0 },
  { id: '#001246', client: 'מיכל לוי', job: 'התקנת דוד שמש', amount: '₪5,600', due: '25 באוקטובר', status: 'pending', daysLate: 0 },
  { id: '#001244', client: 'רונית אברהם', job: 'שיפוץ מטבח', amount: '₪14,200', due: '30 באוקטובר', status: 'pending', daysLate: 0 },
  { id: '#001243', client: 'יוסי מזרחי', job: 'בדיקת ניקוז', amount: '₪900', due: '05 ספטמבר', status: 'paid', daysLate: 0 },
];

const FORECAST = [
  { week: 'שבוע 1', amount: 8400, max: 20000 },
  { week: 'שבוע 2', amount: 6800, max: 20000 },
  { week: 'שבוע 3', amount: 14200, max: 20000 },
  { week: 'שבוע 4', amount: 5600, max: 20000 },
];

const FILTERS = [
  { key: 'all', label: 'הכל' },
  { key: 'overdue', label: 'באיחור' },
  { key: 'pending', label: 'ממתין' },
  { key: 'paid', label: 'שולם' },
];

const STATUS_CONFIG = {
  overdue: { chip: 'chip--danger', label: 'באיחור' },
  pending: { chip: 'chip--warn', label: 'ממתין' },
  paid: { chip: 'chip--success', label: 'שולם' },
};

export default function PaymentsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = PAYMENTS.filter((p) => activeFilter === 'all' || p.status === activeFilter);
  const totalPending = PAYMENTS.filter(p => p.status !== 'paid').reduce((s, p) => s + parseInt(p.amount.replace(/[^0-9]/g, '')), 0);
  const totalOverdue = PAYMENTS.filter(p => p.status === 'overdue').reduce((s, p) => s + parseInt(p.amount.replace(/[^0-9]/g, '')), 0);

  return (
    <Layout title="תשלומים" mainClass="payments-page">

        {/* Navy hero */}
        <div className="px-container payments-hero">
          <div className="payments-hero-card">
            <div className="payments-hero-card__label">סה"כ לגבייה</div>
            <div className="payments-hero-card__val">₪{totalPending.toLocaleString()}</div>
            <div className="payments-hero-card__row">
              <div className="payments-hero-mini">
                <span className="payments-hero-mini__val">{PAYMENTS.filter(p => p.status !== 'paid').length}</span>
                <span className="payments-hero-mini__label">חשבוניות פתוחות</span>
              </div>
              <div className="payments-hero-mini">
                <span className="payments-hero-mini__val" style={{ color: '#FF9533' }}>₪{totalOverdue.toLocaleString()}</span>
                <span className="payments-hero-mini__label">באיחור</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overdue alert */}
        {totalOverdue > 0 && (
          <div className="px-container payments-alert">
            <div className="payments-alert-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>יש {PAYMENTS.filter(p => p.status === 'overdue').length} חשבוניות שעברו את תאריך הפירעון</span>
              <button type="button" className="payments-alert-bar__cta">שלח תזכורת</button>
            </div>
          </div>
        )}

        {/* Forecast bars */}
        <div className="px-container payments-forecast">
          <div className="payments-section-title">תחזית גבייה — אוקטובר</div>
          <div className="payments-bars">
            {FORECAST.map((f) => (
              <div key={f.week} className="payments-bar-col">
                <div className="payments-bar-wrap">
                  <div className="payments-bar" style={{ height: `${(f.amount / f.max) * 64}px` }} />
                </div>
                <span className="payments-bar-label">{f.week}</span>
                <span className="payments-bar-val">₪{(f.amount / 1000).toFixed(1)}K</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="payments-filters px-container">
          {FILTERS.map((f) => (
            <FilterChip key={f.key} label={f.label} active={activeFilter === f.key} onClick={() => setActiveFilter(f.key)} />
          ))}
        </div>

        {/* Payment cards */}
        <div className="px-container payments-list">
          {filtered.map((p) => {
            const cfg = STATUS_CONFIG[p.status];
            return (
              <div key={p.id} className={`payment-card${p.status === 'overdue' ? ' payment-card--overdue' : ''}`}>
                <div className="payment-card__header">
                  <span className="payment-card__id">{p.id}</span>
                  <span className={`chip ${cfg.chip}`}>{cfg.label}</span>
                </div>
                <div className="payment-card__body">
                  <div>
                    <div className="payment-card__client">{p.client}</div>
                    <div className="payment-card__job">{p.job}</div>
                    <div className="payment-card__due">
                      {p.status === 'overdue'
                        ? `איחור של ${p.daysLate} ימים`
                        : `לתשלום עד ${p.due}`}
                    </div>
                  </div>
                  <div className="payment-card__amount">{p.amount}</div>
                </div>
                {p.status !== 'paid' && (
                  <div className="payment-card__actions">
                    <button type="button" className="payment-action">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      </svg>
                      תזכורת
                    </button>
                    <button type="button" className="payment-action payment-action--mark">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      סמן כשולם
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

    </Layout>
  );
}
