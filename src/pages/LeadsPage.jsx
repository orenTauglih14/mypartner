import { useState } from 'react';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import LeadCard from '../components/LeadCard';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './LeadsPage.css';

const FILTERS = [
  { key: 'all', label: 'הכל' },
  { key: 'חדש', label: 'חדש' },
  { key: 'בטיפול', label: 'בטיפול' },
  { key: 'נסגר', label: 'נסגר' },
];

const EMPTY_FORM = { name: '', jobType: '', phone: '', status: 'חדש' };

export default function LeadsPage() {
  const { leads, addLead, updateLeadStatus } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = leads.filter((l) => {
    const matchFilter = activeFilter === 'all' || l.status === activeFilter;
    const matchSearch =
      search === '' || l.name.includes(search) || l.jobType.includes(search);
    return matchFilter && matchSearch;
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    addLead(form);
    setForm(EMPTY_FORM);
    setModal(false);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <Layout title="לידים" mainClass="leads-page">

      {/* Search */}
      <div className="px-container leads-search">
        <div className="input-wrap">
          <input
            type="text"
            className="input-field"
            placeholder="חיפוש לפי שם לקוח או סוג עבודה"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="leads-filters px-container">
        {FILTERS.map((f) => (
          <FilterChip
            key={f.key}
            label={f.label}
            active={activeFilter === f.key}
            onClick={() => setActiveFilter(f.key)}
          />
        ))}
      </div>

      {/* Lead count */}
      <div className="px-container leads-count">
        <span className="text-caption text-mute">{filtered.length} פניות</span>
      </div>

      {/* Lead cards */}
      <div className="px-container leads-list">
        {filtered.length === 0 ? (
          <div className="leads-empty">
            <div className="leads-empty__icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="leads-empty__title">אין פניות כרגע</div>
            <div className="leads-empty__sub">לחץ + להוספת ליד חדש</div>
          </div>
        ) : (
          filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onStatusChange={updateLeadStatus} />
          ))
        )}
      </div>

      {/* FAB */}
      <button type="button" className="leads-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Add Lead Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="ליד חדש">
        <div className="mfield">
          <label>שם לקוח *</label>
          <input type="text" placeholder="ישראל ישראלי" {...field('name')} />
        </div>
        <div className="mfield">
          <label>סוג עבודה</label>
          <input type="text" placeholder="לדוגמה: תיקון נזילה" {...field('jobType')} />
        </div>
        <div className="mfield">
          <label>טלפון *</label>
          <input type="tel" placeholder="050-0000000" {...field('phone')} />
        </div>
        <div className="mfield">
          <label>סטטוס</label>
          <select {...field('status')}>
            <option>חדש</option>
            <option>בטיפול</option>
            <option>נסגר</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--lg btn--full"
          onClick={handleAdd}
          disabled={!form.name.trim() || !form.phone.trim()}
        >
          הוסף ליד
        </button>
      </Modal>

    </Layout>
  );
}
