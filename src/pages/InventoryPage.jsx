import { useState } from 'react';
import Layout from '../components/Layout';
import FilterChip from '../components/FilterChip';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import './InventoryPage.css';

const CATS = [
  { key: 'all', label: 'הכל' },
  { key: 'צנרת', label: 'צנרת' },
  { key: 'סניטרי', label: 'סניטרי' },
  { key: 'ריצוף', label: 'ריצוף' },
  { key: 'ברזים', label: 'ברזים' },
  { key: 'אסלות', label: 'אסלות' },
];

const EMPTY = { name: '', sku: '', qty: 0, minQty: 2, unit: 'יח\'', price: 0, supplier: '', category: 'צנרת' };

export default function InventoryPage() {
  const { inventory, adjustQty, addInventoryItem } = useApp();
  const [cat, setCat] = useState('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const filtered = cat === 'all' ? inventory : inventory.filter(i => i.category === cat);
  const lowStock = inventory.filter(i => i.qty < i.minQty);
  const totalValue = inventory.reduce((s, i) => s + i.qty * i.price, 0);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addInventoryItem({ ...form, qty: Number(form.qty), minQty: Number(form.minQty), price: Number(form.price) });
    setForm(EMPTY);
    setModal(false);
  };

  function stockStatus(item) {
    if (item.qty === 0) return { label: 'אזל', cls: 'inv-chip--danger' };
    if (item.qty < item.minQty) return { label: 'נמוך', cls: 'inv-chip--warn' };
    return { label: 'תקין', cls: 'inv-chip--ok' };
  }

  return (
    <Layout title="מלאי" mainClass="inventory-page">

      {/* Hero */}
      <div className="inv-hero">
        <div className="inv-hero__stat">
          <span className="inv-hero__val">{inventory.length}</span>
          <span className="inv-hero__lbl">פריטים</span>
        </div>
        <div className="inv-hero__divider" />
        <div className="inv-hero__stat">
          <span className={`inv-hero__val${lowStock.length > 0 ? ' inv-hero__val--warn' : ''}`}>{lowStock.length}</span>
          <span className="inv-hero__lbl">מלאי נמוך</span>
        </div>
        <div className="inv-hero__divider" />
        <div className="inv-hero__stat">
          <span className="inv-hero__val">₪{totalValue.toLocaleString()}</span>
          <span className="inv-hero__lbl">שווי מלאי</span>
        </div>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="inv-alert px-container">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          {lowStock.length} פריטים במלאי נמוך — {lowStock.map(i => i.name).join(', ')}
        </div>
      )}

      {/* Filters */}
      <div className="inv-filters px-container">
        {CATS.map(c => (
          <FilterChip key={c.key} label={c.label} active={cat === c.key} onClick={() => setCat(c.key)} />
        ))}
      </div>

      {/* Items */}
      <div className="px-container inv-list">
        {filtered.map((item) => {
          const st = stockStatus(item);
          return (
            <div key={item.id} className={`inv-card${item.qty === 0 ? ' inv-card--empty' : ''}`}>
              <div className="inv-card__header">
                <div>
                  <div className="inv-card__name">{item.name}</div>
                  <div className="inv-card__sku">{item.sku} · {item.supplier}</div>
                </div>
                <span className={`inv-chip ${st.cls}`}>{st.label}</span>
              </div>

              <div className="inv-card__body">
                <div className="inv-stat">
                  <span className={`inv-stat__val${item.qty === 0 ? ' inv-stat__val--zero' : item.qty < item.minQty ? ' inv-stat__val--low' : ''}`}>{item.qty}</span>
                  <span className="inv-stat__lbl">{item.unit} במלאי</span>
                </div>
                <div className="inv-stat">
                  <span className="inv-stat__val">{item.minQty}</span>
                  <span className="inv-stat__lbl">מינימום</span>
                </div>
                <div className="inv-stat">
                  <span className="inv-stat__val">₪{item.price}</span>
                  <span className="inv-stat__lbl">מחיר יח׳</span>
                </div>
              </div>

              {/* Stock bar */}
              <div className="inv-bar-wrap">
                <div
                  className={`inv-bar ${item.qty === 0 ? 'inv-bar--zero' : item.qty < item.minQty ? 'inv-bar--low' : 'inv-bar--ok'}`}
                  style={{ width: `${Math.min(100, (item.qty / (item.minQty * 3)) * 100)}%` }}
                />
              </div>

              <div className="inv-card__actions">
                <button type="button" className="inv-btn inv-btn--minus" onClick={() => adjustQty(item.id, -1)} disabled={item.qty === 0}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <span className="inv-qty-display">{item.qty} {item.unit}</span>
                <button type="button" className="inv-btn inv-btn--plus" onClick={() => adjustQty(item.id, 1)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" className="inv-fab" onClick={() => setModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <Modal open={modal} onClose={() => setModal(false)} title="פריט חדש">
        <div className="mfield"><label>שם הפריט *</label><input type="text" placeholder='ברז מטבח A200' {...field('name')} /></div>
        <div className="mfield"><label>מק"ט</label><input type="text" placeholder="BRZ-001" {...field('sku')} /></div>
        <div className="mfield"><label>כמות במלאי</label><input type="number" min="0" {...field('qty')} /></div>
        <div className="mfield"><label>מינימום מלאי</label><input type="number" min="0" {...field('minQty')} /></div>
        <div className="mfield"><label>יחידה</label><input type="text" placeholder="יח', מ', מ&quot;ר..." {...field('unit')} /></div>
        <div className="mfield"><label>מחיר ליחידה (₪)</label><input type="number" min="0" {...field('price')} /></div>
        <div className="mfield"><label>ספק</label><input type="text" placeholder="שם הספק" {...field('supplier')} /></div>
        <div className="mfield">
          <label>קטגוריה</label>
          <select {...field('category')}>
            {['צנרת','סניטרי','ריצוף','ברזים','אסלות','חומרים'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={handleAdd} disabled={!form.name.trim()}>
          הוסף פריט
        </button>
      </Modal>
    </Layout>
  );
}
