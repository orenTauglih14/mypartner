import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import './QuotesPage.css';

const QUOTES = [
  { id: '#001248', client: 'אבי כהן', job: 'שיפוץ חדר אמבטיה', amount: '₪8,400', status: 'open', statusLabel: 'פתוח', date: '12 באוקטובר', viewed: true, hot: true },
  { id: '#001247', client: 'שרה גולד', job: 'החלפת ברזים', amount: '₪1,200', status: 'accepted', statusLabel: 'אושר', date: '10 באוקטובר', viewed: true, hot: false },
  { id: '#001246', client: 'מיכל לוי', job: 'התקנת דוד שמש', amount: '₪5,600', status: 'pending', statusLabel: 'ממתין', date: '09 באוקטובר', viewed: false, hot: false },
  { id: '#001245', client: 'יוסי מזרחי', job: 'בדיקת מערכת ניקוז', amount: '₪900', status: 'rejected', statusLabel: 'נדחה', date: '07 באוקטובר', viewed: true, hot: false },
  { id: '#001244', client: 'רונית אברהם', job: 'שיפוץ מטבח', amount: '₪14,200', status: 'open', statusLabel: 'פתוח', date: '05 באוקטובר', viewed: false, hot: true },
];

const FILTERS = [
  { key: 'all', label: 'הכל' },
  { key: 'open', label: 'פתוח' },
  { key: 'accepted', label: 'אושר' },
  { key: 'pending', label: 'ממתין' },
  { key: 'rejected', label: 'נדחה' },
];

const STATUS_CHIP = {
  open: 'chip--primary',
  accepted: 'chip--success',
  pending: 'chip--warn',
  rejected: 'chip--neutral',
};

export default function QuotesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = QUOTES.filter((q) => activeFilter === 'all' || q.status === activeFilter);

  const totalOpen = QUOTES.filter((q) => q.status === 'open').reduce((s, q) => s + parseInt(q.amount.replace(/[^0-9]/g, '')), 0);
  const totalAccepted = QUOTES.filter((q) => q.status === 'accepted').reduce((s, q) => s + parseInt(q.amount.replace(/[^0-9]/g, '')), 0);

  return (
    <Layout title="הצעות מחיר" mainClass="quotes-page">

        {/* Hero summary card */}
        <div className="px-container quotes-hero">
          <div className="quotes-hero-card">
            <div className="quotes-hero-card__row">
              <div className="quotes-hero-stat">
                <span className="quotes-hero-stat__label">הצעות פתוחות</span>
                <span className="quotes-hero-stat__val">₪{totalOpen.toLocaleString()}</span>
                <span className="quotes-hero-stat__count">{QUOTES.filter(q => q.status === 'open').length} הצעות</span>
              </div>
              <div className="quotes-hero-divider" />
              <div className="quotes-hero-stat">
                <span className="quotes-hero-stat__label">אושר החודש</span>
                <span className="quotes-hero-stat__val">₪{totalAccepted.toLocaleString()}</span>
                <span className="quotes-hero-stat__count">{QUOTES.filter(q => q.status === 'accepted').length} הצעות</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="quotes-filters px-container">
          {FILTERS.map((f) => (
            <FilterChip key={f.key} label={f.label} active={activeFilter === f.key} onClick={() => setActiveFilter(f.key)} />
          ))}
        </div>

        {/* Quote cards */}
        <div className="px-container quotes-list">
          {filtered.map((q) => (
            <div key={q.id} className="quote-card">
              <div className="quote-card__header">
                <div className="quote-card__id-row">
                  <span className="quote-card__id">{q.id}</span>
                  {!q.viewed && <span className="quote-card__unread">לא נצפה</span>}
                  {q.hot && <span className="quote-card__hot">חם</span>}
                </div>
                <div className="quote-card__date">{q.date}</div>
              </div>

              <div className="quote-card__body">
                <div>
                  <div className="quote-card__client">{q.client}</div>
                  <div className="quote-card__job">{q.job}</div>
                </div>
                <div className="quote-card__amount-col">
                  <div className="quote-card__amount">{q.amount}</div>
                  <span className={`chip ${STATUS_CHIP[q.status]}`}>{q.statusLabel}</span>
                </div>
              </div>

              <div className="quote-card__actions">
                <button type="button" className="quote-action quote-action--view">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  צפה
                </button>
                <button type="button" className="quote-action quote-action--send">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  שלח שוב
                </button>
                {q.status === 'open' && (
                  <button type="button" className="quote-action quote-action--follow">
                    מעקב
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      {/* FAB: new quote */}
      <button type="button" className="quotes-fab" onClick={() => navigate('/create-quote')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </Layout>
  );
}
