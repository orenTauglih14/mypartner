import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './InvoicesPage.css';

const FILTERS = [
  { key: 'all',              label: 'הכל' },
  { key: 'חשבונית מס',       label: 'חשבונית מס' },
  { key: 'חשבונית מס/קבלה', label: 'מס/קבלה' },
  { key: 'קבלה',             label: 'קבלה' },
];

const STATUS_CONFIG = {
  paid:    { label: 'שולם',    chip: 'chip--success' },
  sent:    { label: 'נשלח',    chip: 'chip--primary' },
  draft:   { label: 'טיוטה',   chip: 'chip--neutral' },
  overdue: { label: 'פג תוקף', chip: 'chip--danger'  },
};

const EMPTY_FORM = { client: '', clientPhone: '', job: '', type: 'חשבונית מס/קבלה', paymentMethod: 'העברה בנקאית' };

export default function InvoicesPage() {
  const navigate = useNavigate();
  const { invoices, addInvoice } = useApp();
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const totalPending = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0);

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.type === filter);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const handleAdd = () => {
    if (!form.client.trim() || !form.job.trim()) return;
    const id = `INV-${String(Date.now()).slice(-5)}`;
    addInvoice({ ...form, id, items: [], subtotal: 0, vat: 0, total: 0, status: 'draft', date: 'היום' });
    setForm(EMPTY_FORM);
    setModal(false);
  };

  const openPreview = (inv) => {
    navigate('/invoice-preview', { state: { ...inv } });
  };

  return (
    <Layout title="חשבוניות" mainClass="invoices-page">

      {/* Hero */}
      <div className="px-container invoices-hero">
        <div className="invoices-hero-card">
          <div className="invoices-hero-card__col">
            <div className="invoices-hero-card__label">סה"כ שולם</div>
            <div className="invoices-hero-card__val">₪{totalPaid.toLocaleString()}</div>
          </div>
          <div className="invoices-hero-card__divider" />
          <div className="invoices-hero-card__col">
            <div className="invoices-hero-card__label">ממתין לתשלום</div>
            <div className="invoices-hero-card__val invoices-hero-card__val--pending">₪{totalPending.toLocaleString()}</div>
          </div>
          <div className="invoices-hero-card__divider" />
          <div className="invoices-hero-card__col">
            <div className="invoices-hero-card__label">סה"כ חשבוניות</div>
            <div className="invoices-hero-card__val">{invoices.length}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="invoices-filters px-container">
        {FILTERS.map(f => (
          <FilterChip key={f.key} label={f.label} active={filter === f.key} onClick={() => setFilter(f.key)} />
        ))}
      </div>

      {/* List */}
      <div className="px-container invoices-list">
        {filtered.length === 0 && (
          <div className="text-caption text-mute" style={{ textAlign: 'center', padding: '24px 0' }}>אין חשבוניות</div>
        )}
        {filtered.map(inv => {
          const st = STATUS_CONFIG[inv.status] || STATUS_CONFIG.draft;
          return (
            <div key={inv.id} className="invoice-card">
              <div className="invoice-card__header">
                <span className="invoice-card__id">{inv.id}</span>
                <span className={`chip ${st.chip}`}>{st.label}</span>
              </div>

              <div className="invoice-card__body">
                <div>
                  <div className="invoice-card__client">{inv.client}</div>
                  <div className="invoice-card__job">{inv.job}</div>
                  <div className="invoice-card__meta">
                    <span className="invoice-card__type">{inv.type}</span>
                    <span className="invoice-card__date">{inv.date}</span>
                  </div>
                </div>
                <div className="invoice-card__amount">₪{inv.total.toLocaleString()}</div>
              </div>

              <div className="invoice-card__actions">
                <button type="button" className="invoice-action" onClick={() => openPreview(inv)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  הצג חשבונית
                </button>
                <button type="button" className="invoice-action" onClick={() => openPreview(inv)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  הורד PDF
                </button>
                {inv.status !== 'paid' && (
                  <button type="button" className="invoice-action invoice-action--wa">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    שלח ב-WA
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button type="button" className="invoices-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <Modal open={modal} onClose={() => setModal(false)} title="חשבונית חדשה">
        <div className="mfield">
          <label>שם לקוח *</label>
          <input type="text" placeholder="ישראל ישראלי" {...field('client')} />
        </div>
        <div className="mfield">
          <label>טלפון</label>
          <input type="tel" placeholder="050-0000000" {...field('clientPhone')} />
        </div>
        <div className="mfield">
          <label>תיאור עבודה *</label>
          <input type="text" placeholder="לדוגמה: תיקון נזילה" {...field('job')} />
        </div>
        <div className="mfield">
          <label>סוג מסמך</label>
          <select {...field('type')}>
            <option>חשבונית מס</option>
            <option>חשבונית מס/קבלה</option>
            <option>קבלה</option>
          </select>
        </div>
        <div className="mfield">
          <label>אמצעי תשלום</label>
          <select {...field('paymentMethod')}>
            <option>העברה בנקאית</option>
            <option>מזומן</option>
            <option>צ׳ק</option>
            <option>אשראי</option>
            <option>ביט</option>
            <option>פייבוקס</option>
          </select>
        </div>
        <button type="button" className="btn btn--primary btn--lg btn--full"
          onClick={handleAdd} disabled={!form.client.trim() || !form.job.trim()}>
          צור חשבונית
        </button>
      </Modal>

    </Layout>
  );
}
