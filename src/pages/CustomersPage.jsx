import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import FilterChip from '../components/FilterChip';
import './CustomersPage.css';

const CUSTOMERS = [
  { id: 1, name: 'מיכל ברק', phone: '054-9988776', visits: 12, revenue: '₪28,500', rating: 5.0, lastVisit: 'אתמול', status: 'vip', initials: 'מב' },
  { id: 2, name: 'אבי כהן', phone: '050-1234567', visits: 8, revenue: '₪12,400', rating: 4.8, lastVisit: 'לפני 3 ימים', status: 'active', initials: 'אכ' },
  { id: 3, name: 'שרה גולדברג', phone: '052-8765432', visits: 3, revenue: '₪4,200', rating: 4.5, lastVisit: 'לפני שבוע', status: 'active', initials: 'שג' },
  { id: 4, name: 'יצחק פרץ', phone: '058-4433221', visits: 1, revenue: '₪1,800', rating: 4.0, lastVisit: 'לפני חודש', status: 'new', initials: 'יפ' },
  { id: 5, name: 'רונית אברהם', phone: '053-7766554', visits: 5, revenue: '₪7,900', rating: 4.7, lastVisit: 'לפני 5 ימים', status: 'active', initials: 'רא' },
];

const FILTERS = [
  { key: 'all', label: 'הכל' },
  { key: 'vip', label: 'VIP' },
  { key: 'active', label: 'פעיל' },
  { key: 'new', label: 'חדש' },
];

const STATUS_BADGE = {
  vip: { label: 'VIP', cls: 'chip--warn' },
  active: { label: 'פעיל', cls: 'chip--success' },
  new: { label: 'חדש', cls: 'chip--primary' },
};

const AVATAR_COLORS = [
  { bg: 'var(--primary-soft)', color: 'var(--primary)' },
  { bg: 'var(--warn-soft)', color: 'var(--warn-ink)' },
  { bg: 'var(--success-soft)', color: 'var(--success-ink)' },
  { bg: 'var(--tint2)', color: 'var(--primary-deep)' },
];

function StarRating({ value }) {
  return (
    <span className="customer-rating">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--warn)" stroke="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
      {value.toFixed(1)}
    </span>
  );
}

export default function CustomersPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = CUSTOMERS.filter((c) => {
    const matchFilter = activeFilter === 'all' || c.status === activeFilter;
    const matchSearch = search === '' || c.name.includes(search) || c.phone.includes(search);
    return matchFilter && matchSearch;
  });

  return (
    <div className="app-shell">
      <AppHeader title="לקוחות" />
      <main className="page-content customers-page">

        {/* Search */}
        <div className="px-container customers-search">
          <div className="input-wrap">
            <input
              type="text"
              className="input-field"
              placeholder="חיפוש לפי שם או טלפון"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="customers-filters px-container">
          {FILTERS.map((f) => (
            <FilterChip key={f.key} label={f.label} active={activeFilter === f.key} onClick={() => setActiveFilter(f.key)} />
          ))}
        </div>

        <div className="px-container customers-count">
          <span className="text-caption text-mute">{filtered.length} לקוחות</span>
        </div>

        {/* Cards */}
        <div className="px-container customers-list">
          {filtered.map((c, i) => {
            const avatarStyle = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const badge = STATUS_BADGE[c.status];
            return (
              <div key={c.id} className="customer-card">
                <div className="customer-card__header">
                  <div className="customer-card__identity">
                    <div className="customer-card__avatar" style={{ background: avatarStyle.bg, color: avatarStyle.color }}>
                      {c.initials}
                    </div>
                    <div>
                      <div className="customer-card__name">{c.name}</div>
                      <div className="customer-card__phone">{c.phone}</div>
                    </div>
                  </div>
                  <div className="customer-card__top-meta">
                    <span className={`chip ${badge.cls}`}>{badge.label}</span>
                    <div className="customer-card__last">ביקור {c.lastVisit}</div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="customer-card__stats">
                  <div className="customer-stat">
                    <span className="customer-stat__val">{c.visits}</span>
                    <span className="customer-stat__label">ביקורים</span>
                  </div>
                  <div className="customer-stat">
                    <span className="customer-stat__val">{c.revenue}</span>
                    <span className="customer-stat__label">סה"כ הכנסות</span>
                  </div>
                  <div className="customer-stat">
                    <StarRating value={c.rating} />
                    <span className="customer-stat__label">דירוג</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="customer-card__actions">
                  <button type="button" className="customer-action customer-action--call">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18z"/>
                    </svg>
                    התקשר
                  </button>
                  <button type="button" className="customer-action customer-action--whatsapp">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button type="button" className="customer-action customer-action--quote">
                    צור הצעה
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* FAB */}
      <button type="button" className="customers-fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <BottomNav />
    </div>
  );
}
