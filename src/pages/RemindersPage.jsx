import { useState } from 'react';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './RemindersPage.css';

const FILTERS = [
  { key: 'all',       label: 'הכל' },
  { key: 'active',    label: 'פעיל' },
  { key: 'inactive',  label: 'כבוי' },
  { key: 'WhatsApp',  label: 'WhatsApp' },
  { key: 'SMS',       label: 'SMS' },
  { key: 'Email',     label: 'Email' },
];

const CHANNEL_CONFIG = {
  WhatsApp: { bg: '#E9FBF0', color: '#065f46', icon: '📱' },
  SMS:      { bg: 'var(--tint2)', color: 'var(--primary-deep)', icon: '💬' },
  Email:    { bg: 'var(--warn-soft)', color: 'var(--warn-ink)', icon: '📧' },
};

function Toggle({ on, onChange }) {
  return (
    <div className={`reminder-toggle${on ? ' reminder-toggle--on' : ''}`} onClick={onChange}>
      <div className="reminder-toggle__thumb" />
    </div>
  );
}

const EMPTY_FORM = { client: '', type: 'תזכורת תשלום', channel: 'WhatsApp' };

export default function RemindersPage() {
  const { reminders, toggleReminder, addReminder } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = reminders.filter((r) => {
    if (activeFilter === 'all')      return true;
    if (activeFilter === 'active')   return r.active;
    if (activeFilter === 'inactive') return !r.active;
    return r.channel === activeFilter;
  });

  const handleAdd = () => {
    if (!form.client.trim()) return;
    addReminder(form);
    setForm(EMPTY_FORM);
    setModal(false);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <Layout title="תזכורות" mainClass="reminders-page">

      {/* Automation hero */}
      <div className="px-container reminders-hero">
        <div className="reminders-hero-card">
          <div className="reminders-hero-card__left">
            <div className="reminders-hero-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="reminders-hero-card__title">אוטומציה חכמה</div>
              <div className="reminders-hero-card__sub">
                {autoEnabled ? 'פעיל — תזכורות נשלחות אוטומטית' : 'כבוי — תזכורות עצורות'}
              </div>
            </div>
          </div>
          <Toggle on={autoEnabled} onChange={() => setAutoEnabled(!autoEnabled)} />
        </div>
      </div>

      {/* Stats row */}
      <div className="px-container reminders-stats">
        <div className="reminder-stat">
          <span className="reminder-stat__val">{reminders.filter((r) => r.active).length}</span>
          <span className="reminder-stat__label">פעילות</span>
        </div>
        <div className="reminder-stat">
          <span className="reminder-stat__val">{reminders.reduce((s, r) => s + r.count, 0)}</span>
          <span className="reminder-stat__label">נשלחו החודש</span>
        </div>
        <div className="reminder-stat">
          <span className="reminder-stat__val" style={{ color: 'var(--success)' }}>68%</span>
          <span className="reminder-stat__label">שיעור מענה</span>
        </div>
      </div>

      {/* Filters */}
      <div className="reminders-filters px-container">
        {FILTERS.map((f) => (
          <FilterChip key={f.key} label={f.label} active={activeFilter === f.key} onClick={() => setActiveFilter(f.key)} />
        ))}
      </div>

      {/* Reminder cards */}
      <div className="px-container reminders-list">
        {filtered.length === 0 && (
          <div className="text-caption text-mute" style={{ padding: '16px 0', textAlign: 'center' }}>אין תזכורות תואמות</div>
        )}
        {filtered.map((r) => {
          const ch = CHANNEL_CONFIG[r.channel] || CHANNEL_CONFIG.SMS;
          return (
            <div key={r.id} className={`reminder-card${!r.active ? ' reminder-card--off' : ''}`}>
              <div className="reminder-card__header">
                <div className="reminder-card__identity">
                  <div className="reminder-card__avatar">{r.client.charAt(0)}</div>
                  <div>
                    <div className="reminder-card__client">{r.client}</div>
                    <div className="reminder-card__type">{r.type}</div>
                  </div>
                </div>
                <Toggle on={r.active} onChange={() => toggleReminder(r.id)} />
              </div>

              <div className="reminder-card__meta">
                <span className="reminder-card__channel" style={{ background: ch.bg, color: ch.color }}>
                  {ch.icon} {r.channel}
                </span>
                <div className="reminder-card__times">
                  <span className="reminder-card__next">שליחה הבאה: {r.nextSend}</span>
                  <span className="reminder-card__last">נשלח: {r.lastSent}</span>
                </div>
              </div>

              <div className="reminder-card__count">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                {r.count} הודעות נשלחו
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button type="button" className="reminders-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Add Reminder Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="תזכורת חדשה">
        <div className="mfield">
          <label>שם לקוח *</label>
          <input type="text" placeholder="ישראל ישראלי" {...field('client')} />
        </div>
        <div className="mfield">
          <label>סוג תזכורת</label>
          <select {...field('type')}>
            <option>תזכורת תשלום</option>
            <option>מעקב הצעת מחיר</option>
            <option>אישור ביקור</option>
            <option>שביעות רצון</option>
          </select>
        </div>
        <div className="mfield">
          <label>ערוץ שליחה</label>
          <select {...field('channel')}>
            <option>WhatsApp</option>
            <option>SMS</option>
            <option>Email</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--lg btn--full"
          onClick={handleAdd}
          disabled={!form.client.trim()}
        >
          הוסף תזכורת
        </button>
      </Modal>

    </Layout>
  );
}
