import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import { useApp } from '../context/AppContext';
import './QuotesPage.css';

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

function useToast() {
  const [msg, setMsg] = useState('');
  const show = (m) => { setMsg(m); setTimeout(() => setMsg(''), 2400); };
  return [msg, show];
}

export default function QuotesPage() {
  const navigate = useNavigate();
  const { quotes, updateQuoteStatus, markQuoteViewed } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [toast, showToast] = useToast();

  const filtered = quotes.filter((q) => activeFilter === 'all' || q.status === activeFilter);

  const totalOpen = quotes.filter((q) => q.status === 'open').reduce((s, q) => s + (q.amountNum || 0), 0);
  const totalAccepted = quotes.filter((q) => q.status === 'accepted').reduce((s, q) => s + (q.amountNum || 0), 0);

  const handleView = (q) => {
    markQuoteViewed(q.id);
    setExpandedId(expandedId === q.id ? null : q.id);
  };

  const handleResend = (q) => {
    updateQuoteStatus(q.id, 'pending', 'ממתין');
    showToast('הצעת המחיר נשלחה מחדש');
  };

  const handleFollow = (q) => {
    updateQuoteStatus(q.id, 'pending', 'ממתין');
    showToast('מעקב הופעל');
  };

  const handleAccept = (q) => {
    updateQuoteStatus(q.id, 'accepted', 'אושר');
    showToast('הצעה אושרה!');
  };

  return (
    <Layout title="הצעות מחיר" mainClass="quotes-page">

      {/* Hero summary */}
      <div className="px-container quotes-hero">
        <div className="quotes-hero-card">
          <div className="quotes-hero-card__row">
            <div className="quotes-hero-stat">
              <span className="quotes-hero-stat__label">הצעות פתוחות</span>
              <span className="quotes-hero-stat__val">₪{totalOpen.toLocaleString()}</span>
              <span className="quotes-hero-stat__count">{quotes.filter((q) => q.status === 'open').length} הצעות</span>
            </div>
            <div className="quotes-hero-divider" />
            <div className="quotes-hero-stat">
              <span className="quotes-hero-stat__label">אושר החודש</span>
              <span className="quotes-hero-stat__val">₪{totalAccepted.toLocaleString()}</span>
              <span className="quotes-hero-stat__count">{quotes.filter((q) => q.status === 'accepted').length} הצעות</span>
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
                <span className={`chip ${STATUS_CHIP[q.status] || 'chip--neutral'}`}>{q.statusLabel}</span>
              </div>
            </div>

            {/* Expanded detail */}
            {expandedId === q.id && (
              <div className="quote-card__detail">
                <div className="quote-detail-row">
                  <span className="quote-detail-label">לקוח</span>
                  <span className="quote-detail-val">{q.client}</span>
                </div>
                <div className="quote-detail-row">
                  <span className="quote-detail-label">עבודה</span>
                  <span className="quote-detail-val">{q.job}</span>
                </div>
                <div className="quote-detail-row">
                  <span className="quote-detail-label">סכום</span>
                  <span className="quote-detail-val">{q.amount}</span>
                </div>
                <div className="quote-detail-row">
                  <span className="quote-detail-label">תאריך</span>
                  <span className="quote-detail-val">{q.date}</span>
                </div>
                {q.status === 'open' && (
                  <button type="button" className="btn btn--primary btn--md btn--full" style={{ marginTop: 8 }} onClick={() => handleAccept(q)}>
                    סמן כאושר
                  </button>
                )}
              </div>
            )}

            <div className="quote-card__actions">
              <button type="button" className={`quote-action quote-action--view${expandedId === q.id ? ' quote-action--active' : ''}`} onClick={() => handleView(q)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
                {expandedId === q.id ? 'סגור' : 'צפה'}
              </button>
              <button type="button" className="quote-action quote-action--send" onClick={() => handleResend(q)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                שלח שוב
              </button>
              {q.status === 'open' && (
                <button type="button" className="quote-action quote-action--follow" onClick={() => handleFollow(q)}>
                  מעקב
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button type="button" className="quotes-fab" onClick={() => navigate('/create-quote')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {toast && (
        <div className="toast">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          {toast}
        </div>
      )}

    </Layout>
  );
}
