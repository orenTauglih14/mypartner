import { useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './CalendarPage.css';

const DAYS = [
  { day: 'א', date: 12 },
  { day: 'ב', date: 13 },
  { day: 'ג', date: 14 },
  { day: 'ד', date: 15 },
  { day: 'ה', date: 16 },
  { day: 'ו', date: 17 },
  { day: 'ש', date: 18, sabbath: true },
];

const STATUS_CONFIG = {
  done:    { dot: 'var(--success)', chip: 'chip--success' },
  active:  { dot: 'var(--primary)', chip: 'chip--primary' },
  waiting: { dot: 'var(--ink-ghost)', chip: 'chip--neutral' },
};

function waLink(phone) {
  const d = phone.replace(/\D/g, '');
  return `https://wa.me/972${d.startsWith('0') ? d.slice(1) : d}`;
}

const EMPTY_FORM = { time: '09:00', endTime: '10:30', name: '', job: '', address: '', phone: '' };

export default function CalendarPage() {
  const { events, addEvent, markEventDone, markEventActive } = useApp();
  const [activeDay, setActiveDay] = useState(3);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const dayEvents = events.filter((e) => e.dayIndex === activeDay);

  const totalAmount = dayEvents.reduce((sum, e) => {
    const n = parseInt(e.amount.replace(/[^0-9]/g, '') || '0');
    return sum + n;
  }, 0);

  const handleAdd = () => {
    if (!form.name.trim() || !form.job.trim()) return;
    addEvent({ ...form, dayIndex: activeDay });
    setForm(EMPTY_FORM);
    setModal(false);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <Layout title="יומן" mainClass="calendar-page">

      {/* Week selector */}
      <div className="px-container calendar-week">
        <div className="calendar-week__header">
          <span className="text-caption text-mute">אוקטובר 2024</span>
          <div className="calendar-week__nav">
            <button type="button" className="calendar-nav-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="calendar-nav-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="calendar-week__days">
          {DAYS.map((d, i) => (
            <button
              key={i}
              type="button"
              className={`calendar-day${i === activeDay ? ' calendar-day--active' : ''}${d.sabbath ? ' calendar-day--sabbath' : ''}`}
              onClick={() => setActiveDay(i)}
            >
              <span className="calendar-day__name">{d.day}</span>
              <span className="calendar-day__date">{d.date}</span>
              {i === activeDay && <span className="calendar-day__dot" />}
            </button>
          ))}
        </div>
      </div>

      {/* Day summary */}
      <div className="px-container calendar-summary">
        <div className="calendar-summary-card">
          <div className="calendar-summary-card__stat">
            <span className="calendar-summary-card__val">{dayEvents.length}</span>
            <span className="calendar-summary-card__label">ביקורים היום</span>
          </div>
          <div className="calendar-summary-card__divider" />
          <div className="calendar-summary-card__stat">
            <span className="calendar-summary-card__val">₪{totalAmount.toLocaleString()}</span>
            <span className="calendar-summary-card__label">הכנסה צפויה</span>
          </div>
          <div className="calendar-summary-card__divider" />
          <div className="calendar-summary-card__stat">
            <span className="calendar-summary-card__val">{dayEvents.filter((e) => e.status === 'done').length}</span>
            <span className="calendar-summary-card__label">הושלמו</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-container calendar-timeline">
        <div className="calendar-section-title">לוח זמנים</div>

        <div className="timeline">
          {dayEvents.length === 0 && (
            <div className="text-caption text-mute" style={{ padding: '24px 0', textAlign: 'center' }}>אין ביקורים ביום זה</div>
          )}
          {dayEvents.map((ev, i) => {
            const cfg = STATUS_CONFIG[ev.status] || STATUS_CONFIG.waiting;
            return (
              <div key={ev.id} className="timeline-item">
                <div className="timeline-time">
                  <span className="timeline-time__main">{ev.time}</span>
                  <span className="timeline-time__end">{ev.endTime}</span>
                </div>

                <div className="timeline-track">
                  <div className="timeline-dot" style={{ background: cfg.dot }} />
                  {i < dayEvents.length - 1 && <div className="timeline-line" />}
                </div>

                <div className={`timeline-card${ev.status === 'active' ? ' timeline-card--active' : ''}`}>
                  <div className="timeline-card__top">
                    <div className="timeline-card__name">{ev.name}</div>
                    <span className={`chip ${cfg.chip}`}>{ev.statusLabel}</span>
                  </div>
                  <div className="timeline-card__job">{ev.job}</div>
                  {ev.address && (
                    <div className="timeline-card__address">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {ev.address}
                    </div>
                  )}
                  {ev.amount && ev.amount !== '₪0' && (
                    <div className="timeline-card__amount">{ev.amount}</div>
                  )}
                  <div className="timeline-card__actions">
                    {ev.phone && (
                      <a href={`tel:${ev.phone}`} className="timeline-action timeline-action--call">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18z" />
                        </svg>
                        התקשר
                      </a>
                    )}
                    {ev.status === 'waiting' && (
                      <button type="button" className="timeline-action timeline-action--nav" onClick={() => markEventActive(ev.id)}>
                        התחל
                      </button>
                    )}
                    {ev.status === 'active' && (
                      <button type="button" className="timeline-action timeline-action--done" onClick={() => markEventDone(ev.id)}>
                        סמן כהושלם
                      </button>
                    )}
                    {ev.address && (
                      <a
                        href={`https://waze.com/ul?q=${encodeURIComponent(ev.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="timeline-action timeline-action--nav"
                      >
                        נווט
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button type="button" className="calendar-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Add Event Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="ביקור חדש">
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="mfield" style={{ flex: 1 }}>
            <label>שעת התחלה</label>
            <input type="time" {...field('time')} />
          </div>
          <div className="mfield" style={{ flex: 1 }}>
            <label>שעת סיום</label>
            <input type="time" {...field('endTime')} />
          </div>
        </div>
        <div className="mfield">
          <label>שם לקוח *</label>
          <input type="text" placeholder="ישראל ישראלי" {...field('name')} />
        </div>
        <div className="mfield">
          <label>סוג עבודה *</label>
          <input type="text" placeholder="לדוגמה: תיקון נזילה" {...field('job')} />
        </div>
        <div className="mfield">
          <label>כתובת</label>
          <input type="text" placeholder="הרצל 1, תל אביב" {...field('address')} />
        </div>
        <div className="mfield">
          <label>טלפון</label>
          <input type="tel" placeholder="050-0000000" {...field('phone')} />
        </div>
        <button
          type="button"
          className="btn btn--primary btn--lg btn--full"
          onClick={handleAdd}
          disabled={!form.name.trim() || !form.job.trim()}
        >
          הוסף ביקור
        </button>
      </Modal>

    </Layout>
  );
}
