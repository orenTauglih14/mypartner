import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import './CalendarPage.css';

const DAYS = [
  { day: 'א', date: 12, active: false },
  { day: 'ב', date: 13, active: false },
  { day: 'ג', date: 14, active: false },
  { day: 'ד', date: 15, active: true },
  { day: 'ה', date: 16, active: false },
  { day: 'ו', date: 17, active: false },
  { day: 'ש', date: 18, active: false, sabbath: true },
];

const EVENTS = [
  {
    id: 1, time: '09:00', endTime: '10:30',
    name: 'אבי כהן', job: 'תיקון נזילה', address: 'הרצל 12, תל אביב',
    status: 'done', statusLabel: 'הושלם', amount: '₪850',
  },
  {
    id: 2, time: '11:30', endTime: '13:00',
    name: 'מיכל לוי', job: 'פגישת ייעוץ ראשונית', address: 'ביאליק 5, רמת גן',
    status: 'active', statusLabel: 'בביצוע', amount: '₪0',
  },
  {
    id: 3, time: '14:00', endTime: '15:30',
    name: 'יוסי מזרחי', job: 'בדיקת לחץ מים', address: 'בן גוריון 88, חולון',
    status: 'waiting', statusLabel: 'ממתין', amount: '₪400',
  },
  {
    id: 4, time: '16:30', endTime: '18:00',
    name: 'שרה גולדברג', job: 'התקנת מקלחון', address: 'ויצמן 3, פתח תקווה',
    status: 'waiting', statusLabel: 'ממתין', amount: '₪1,200',
  },
];

const STATUS_CONFIG = {
  done: { dot: 'var(--success)', chip: 'chip--success' },
  active: { dot: 'var(--primary)', chip: 'chip--primary' },
  waiting: { dot: 'var(--ink-ghost)', chip: 'chip--neutral' },
};

export default function CalendarPage() {
  const [activeDay, setActiveDay] = useState(3); // index of Wednesday

  const totalAmount = EVENTS.reduce((sum, e) => {
    const n = parseInt(e.amount.replace(/[^0-9]/g, '') || '0');
    return sum + n;
  }, 0);

  return (
    <div className="app-shell">
      <AppHeader title="יומן" />
      <main className="page-content calendar-page">

        {/* Week selector */}
        <div className="px-container calendar-week">
          <div className="calendar-week__header">
            <span className="text-caption text-mute">אוקטובר 2024</span>
            <div className="calendar-week__nav">
              <button type="button" className="calendar-nav-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button type="button" className="calendar-nav-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          <div className="calendar-week__days">
            {DAYS.map((d, i) => (
              <button
                key={i}
                type="button"
                className={`calendar-day${d.active || i === activeDay ? ' calendar-day--active' : ''}${d.sabbath ? ' calendar-day--sabbath' : ''}`}
                onClick={() => setActiveDay(i)}
              >
                <span className="calendar-day__name">{d.day}</span>
                <span className="calendar-day__date">{d.date}</span>
                {(d.active || i === activeDay) && <span className="calendar-day__dot" />}
              </button>
            ))}
          </div>
        </div>

        {/* Day summary */}
        <div className="px-container calendar-summary">
          <div className="calendar-summary-card">
            <div className="calendar-summary-card__stat">
              <span className="calendar-summary-card__val">{EVENTS.length}</span>
              <span className="calendar-summary-card__label">ביקורים היום</span>
            </div>
            <div className="calendar-summary-card__divider" />
            <div className="calendar-summary-card__stat">
              <span className="calendar-summary-card__val">₪{totalAmount.toLocaleString()}</span>
              <span className="calendar-summary-card__label">הכנסה צפויה</span>
            </div>
            <div className="calendar-summary-card__divider" />
            <div className="calendar-summary-card__stat">
              <span className="calendar-summary-card__val">1</span>
              <span className="calendar-summary-card__label">הושלם</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-container calendar-timeline">
          <div className="calendar-section-title">לוח זמנים</div>

          <div className="timeline">
            {EVENTS.map((ev, i) => {
              const cfg = STATUS_CONFIG[ev.status];
              return (
                <div key={ev.id} className="timeline-item">
                  {/* Time column */}
                  <div className="timeline-time">
                    <span className="timeline-time__main">{ev.time}</span>
                    <span className="timeline-time__end">{ev.endTime}</span>
                  </div>

                  {/* Line + dot */}
                  <div className="timeline-track">
                    <div className="timeline-dot" style={{ background: cfg.dot }} />
                    {i < EVENTS.length - 1 && <div className="timeline-line" />}
                  </div>

                  {/* Card */}
                  <div className={`timeline-card${ev.status === 'active' ? ' timeline-card--active' : ''}`}>
                    <div className="timeline-card__top">
                      <div className="timeline-card__name">{ev.name}</div>
                      <span className={`chip ${cfg.chip}`}>{ev.statusLabel}</span>
                    </div>
                    <div className="timeline-card__job">{ev.job}</div>
                    <div className="timeline-card__address">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {ev.address}
                    </div>
                    {ev.amount !== '₪0' && (
                      <div className="timeline-card__amount">{ev.amount}</div>
                    )}
                    <div className="timeline-card__actions">
                      <button type="button" className="timeline-action timeline-action--call">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18z"/>
                        </svg>
                        התקשר
                      </button>
                      {ev.status === 'active' && (
                        <button type="button" className="timeline-action timeline-action--done">
                          סמן כהושלם
                        </button>
                      )}
                      {ev.status === 'waiting' && (
                        <button type="button" className="timeline-action timeline-action--nav">
                          נווט
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* FAB: add event */}
      <button type="button" className="calendar-fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <BottomNav />
    </div>
  );
}
