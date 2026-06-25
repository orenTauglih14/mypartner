import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './SuppliersPage.css';

const CATS = [
  { key: 'all', label: 'הכל' },
  { key: 'צנרת', label: 'צנרת' },
  { key: 'סניטרי', label: 'סניטרי' },
  { key: 'ריצוף', label: 'ריצוף' },
  { key: 'חומרים', label: 'חומרים' },
];

const CAT_COLOR = {
  צנרת:   { bg: '#EEF3FF', color: '#0050CB' },
  סניטרי: { bg: '#E8FFF4', color: '#0AB571' },
  ריצוף:  { bg: '#FFF8E6', color: '#B06C00' },
  חומרים: { bg: '#FFF0F5', color: '#C2185B' },
};

function waLink(phone) {
  const d = phone.replace(/\D/g, '');
  return `https://wa.me/972${d.startsWith('0') ? d.slice(1) : d}`;
}

const EMPTY = { name: '', contact: '', phone: '', specialty: '', category: 'צנרת', terms: 'מיידי' };

export default function SuppliersPage() {
  const navigate = useNavigate();
  const { suppliers, addSupplier, purchaseOrders } = useApp();
  const [cat, setCat] = useState('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const filtered = cat === 'all' ? suppliers : suppliers.filter(s => s.category === cat);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    addSupplier(form);
    setForm(EMPTY);
    setModal(false);
  };

  const pendingOrders = purchaseOrders.filter(o => o.status === 'pending').length;

  return (
    <Layout title="ספקים" mainClass="suppliers-page">

      {/* Hero */}
      <div className="sup-hero">
        <div className="sup-hero__stat">
          <span className="sup-hero__val">{suppliers.length}</span>
          <span className="sup-hero__lbl">ספקים</span>
        </div>
        <div className="sup-hero__divider" />
        <div className="sup-hero__stat">
          <span className="sup-hero__val">{pendingOrders}</span>
          <span className="sup-hero__lbl">הזמנות פתוחות</span>
        </div>
        <div className="sup-hero__divider" />
        <button type="button" className="sup-hero__po-btn" onClick={() => navigate('/purchase-orders')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          הזמנות רכש
        </button>
      </div>

      {/* Filters */}
      <div className="sup-filters px-container">
        {CATS.map(c => (
          <FilterChip key={c.key} label={c.label} active={cat === c.key} onClick={() => setCat(c.key)} />
        ))}
      </div>

      {/* List */}
      <div className="px-container sup-list">
        {filtered.map((s) => {
          const cc = CAT_COLOR[s.category] || CAT_COLOR['חומרים'];
          const myOrders = purchaseOrders.filter(o => o.supplier === s.name);
          const lastOrder = myOrders[0];
          return (
            <div key={s.id} className="sup-card">
              <div className="sup-card__header">
                <div className="sup-card__avatar" style={{ background: cc.bg, color: cc.color }}>
                  {s.name.slice(0, 2)}
                </div>
                <div className="sup-card__info">
                  <div className="sup-card__name">{s.name}</div>
                  <div className="sup-card__contact">{s.contact} · {s.phone}</div>
                  <div className="sup-card__specialty">{s.specialty}</div>
                </div>
                <span className="sup-card__cat" style={{ background: cc.bg, color: cc.color }}>{s.category}</span>
              </div>

              <div className="sup-card__meta">
                <div className="sup-meta-item">
                  <span className="sup-meta-label">תנאי תשלום</span>
                  <span className="sup-meta-val">{s.terms}</span>
                </div>
                <div className="sup-meta-item">
                  <span className="sup-meta-label">הזמנה אחרונה</span>
                  <span className="sup-meta-val">{s.lastOrder}</span>
                </div>
                <div className="sup-meta-item">
                  <span className="sup-meta-label">דירוג</span>
                  <span className="sup-meta-val">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B" stroke="none" style={{ verticalAlign: 'middle', marginLeft: 2 }}>
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                    {s.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {lastOrder && (
                <div className="sup-card__last-order">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                  </svg>
                  הזמנה אחרונה: {lastOrder.id} — ₪{lastOrder.total.toLocaleString()} — {lastOrder.status === 'received' ? 'התקבלה' : 'בדרך'}
                </div>
              )}

              <div className="sup-card__actions">
                <a href={`tel:${s.phone}`} className="sup-action sup-action--call">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13.5 19.79 19.79 0 011.61 4.87 2 2 0 013.59 2.69h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 10.5a16 16 0 006 6l.92-.92a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 18z"/>
                  </svg>
                  התקשר
                </a>
                <a href={waLink(s.phone)} target="_blank" rel="noreferrer" className="sup-action sup-action--wa">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <button type="button" className="sup-action sup-action--order" onClick={() => navigate('/purchase-orders')}>
                  הזמן
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button type="button" className="sup-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <Modal open={modal} onClose={() => setModal(false)} title="ספק חדש">
        <div className="mfield"><label>שם הספק *</label><input type="text" placeholder="מחסן הצנרת ישראלי" {...field('name')} /></div>
        <div className="mfield"><label>איש קשר</label><input type="text" placeholder="שם נציג" {...field('contact')} /></div>
        <div className="mfield"><label>טלפון *</label><input type="tel" placeholder="03-0000000" {...field('phone')} /></div>
        <div className="mfield"><label>התמחות</label><input type="text" placeholder="צינורות, ברזים..." {...field('specialty')} /></div>
        <div className="mfield">
          <label>קטגוריה</label>
          <select {...field('category')}>
            <option value="צנרת">צנרת</option>
            <option value="סניטרי">סניטרי</option>
            <option value="ריצוף">ריצוף</option>
            <option value="חומרים">חומרים</option>
          </select>
        </div>
        <div className="mfield">
          <label>תנאי תשלום</label>
          <select {...field('terms')}>
            <option value="מיידי">מיידי</option>
            <option value="14 ימים">14 ימים</option>
            <option value="30 ימים">30 ימים</option>
            <option value="60 ימים">60 ימים</option>
          </select>
        </div>
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={handleAdd} disabled={!form.name.trim() || !form.phone.trim()}>
          הוסף ספק
        </button>
      </Modal>
    </Layout>
  );
}
