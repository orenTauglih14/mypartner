import { useState } from 'react';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './PurchaseOrdersPage.css';

const FILTERS = [
  { key: 'all', label: 'הכל' },
  { key: 'pending', label: 'ממתין' },
  { key: 'received', label: 'התקבל' },
  { key: 'cancelled', label: 'בוטל' },
];

const STATUS_CFG = {
  pending:   { label: 'ממתין', cls: 'po-chip--warn' },
  received:  { label: 'התקבל', cls: 'po-chip--ok' },
  cancelled: { label: 'בוטל', cls: 'po-chip--muted' },
};

const EMPTY = { supplier: '', eta: 'בתיאום', items: [{ name: '', qty: 1, price: 0 }] };

export default function PurchaseOrdersPage() {
  const { purchaseOrders, addPurchaseOrder, markPOReceived, suppliers } = useApp();
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const shown = filter === 'all' ? purchaseOrders : purchaseOrders.filter(o => o.status === filter);
  const pendingTotal = purchaseOrders.filter(o => o.status === 'pending').reduce((s, o) => s + o.total, 0);

  const setItem = (i, key, val) => setForm(f => {
    const items = [...f.items];
    items[i] = { ...items[i], [key]: val };
    return { ...f, items };
  });

  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { name: '', qty: 1, price: 0 }] }));

  const handleCreate = () => {
    if (!form.supplier.trim()) return;
    const validItems = form.items.filter(i => i.name.trim());
    if (!validItems.length) return;
    const total = validItems.reduce((s, i) => s + Number(i.qty) * Number(i.price), 0);
    addPurchaseOrder({ supplier: form.supplier, eta: form.eta, items: validItems, total });
    setForm(EMPTY);
    setModal(false);
  };

  return (
    <Layout title="הזמנות רכש" mainClass="po-page">

      {/* Summary */}
      <div className="po-hero">
        <div className="po-hero__stat">
          <span className="po-hero__val">{purchaseOrders.filter(o => o.status === 'pending').length}</span>
          <span className="po-hero__lbl">הזמנות פתוחות</span>
        </div>
        <div className="po-hero__divider" />
        <div className="po-hero__stat">
          <span className="po-hero__val">₪{pendingTotal.toLocaleString()}</span>
          <span className="po-hero__lbl">בדרך</span>
        </div>
        <div className="po-hero__divider" />
        <div className="po-hero__stat">
          <span className="po-hero__val">{purchaseOrders.filter(o => o.status === 'received').length}</span>
          <span className="po-hero__lbl">התקבלו</span>
        </div>
      </div>

      {/* Filters */}
      <div className="po-filters px-container">
        {FILTERS.map(f => (
          <FilterChip key={f.key} label={f.label} active={filter === f.key} onClick={() => setFilter(f.key)} />
        ))}
      </div>

      {/* Orders */}
      <div className="px-container po-list">
        {shown.map((o) => {
          const st = STATUS_CFG[o.status] || STATUS_CFG.pending;
          return (
            <div key={o.id} className="po-card">
              <div className="po-card__header">
                <div>
                  <div className="po-card__id">{o.id}</div>
                  <div className="po-card__supplier">{o.supplier}</div>
                </div>
                <div className="po-card__right">
                  <span className={`po-chip ${st.cls}`}>{st.label}</span>
                  <div className="po-card__date">{o.date}</div>
                </div>
              </div>

              <div className="po-card__items">
                {o.items.map((it, i) => (
                  <div key={i} className="po-item">
                    <span className="po-item__name">{it.name}</span>
                    <span className="po-item__qty">x{it.qty}</span>
                    <span className="po-item__price">₪{(it.qty * it.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="po-card__footer">
                <div className="po-card__eta">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {o.eta}
                </div>
                <div className="po-card__total">₪{o.total.toLocaleString()}</div>
                {o.status === 'pending' && (
                  <button type="button" className="po-receive-btn" onClick={() => markPOReceived(o.id)}>
                    אשר קבלה
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" className="po-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <Modal open={modal} onClose={() => setModal(false)} title="הזמנת רכש חדשה">
        <div className="mfield">
          <label>ספק *</label>
          <select value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))}>
            <option value="">בחר ספק</option>
            {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            <option value="אחר">אחר</option>
          </select>
        </div>
        <div className="mfield">
          <label>זמן אספקה משוער</label>
          <input type="text" placeholder="מחר / בעוד 3 ימים..." value={form.eta} onChange={e => setForm(f => ({ ...f, eta: e.target.value }))} />
        </div>
        <div className="po-items-label">פריטים:</div>
        {form.items.map((it, i) => (
          <div key={i} className="po-item-row">
            <input className="po-item-name" type="text" placeholder="שם פריט" value={it.name} onChange={e => setItem(i, 'name', e.target.value)} />
            <input className="po-item-qty" type="number" min="1" value={it.qty} onChange={e => setItem(i, 'qty', e.target.value)} />
            <input className="po-item-price" type="number" min="0" placeholder="₪" value={it.price || ''} onChange={e => setItem(i, 'price', e.target.value)} />
          </div>
        ))}
        <button type="button" className="po-add-item" onClick={addItem}>+ הוסף פריט</button>
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={handleCreate} disabled={!form.supplier || !form.items[0]?.name}>
          שלח הזמנה
        </button>
      </Modal>
    </Layout>
  );
}
