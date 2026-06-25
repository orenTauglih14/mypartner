import { useLocation, useNavigate } from 'react-router-dom';
import SignaturePad from '../components/SignaturePad';
import './InvoicePreviewPage.css';

const DEFAULT_ITEMS = [
  { desc: 'עבודה ראשית', qty: 1, unit: 'עבודה', price: 800 },
  { desc: 'חומרים', qty: 1, unit: 'יח\'', price: 400 },
];

function formatDate(offset = 0) {
  const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getDate()} ב${months[d.getMonth()]} ${d.getFullYear()}`;
}

function waLink(phone) {
  const d = (phone || '').replace(/\D/g, '');
  return `https://wa.me/972${d.startsWith('0') ? d.slice(1) : d}`;
}

export default function InvoicePreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const type          = state?.type          || 'חשבונית מס/קבלה';
  const client        = state?.client        || 'ישראל ישראלי';
  const clientPhone   = state?.clientPhone   || '050-0000000';
  const clientVAT     = state?.clientVAT     || '';
  const job           = state?.job           || 'עבודת אינסטלציה';
  const items         = (state?.items && state.items.length > 0) ? state.items : DEFAULT_ITEMS;
  const paymentMethod = state?.paymentMethod || 'העברה בנקאית';
  const invoiceId     = state?.id            || `INV-${String(Date.now()).slice(-5)}`;
  const quoteRef      = state?.quoteRef      || '';

  const subtotal = state?.subtotal || items.reduce((s, i) => s + i.qty * i.price, 0);
  const vat      = state?.vat      || Math.round(subtotal * 0.17);
  const total    = state?.total    || subtotal + vat;

  const waMsg = encodeURIComponent(`שלום ${client},\nמצ"ב ${type} עבור: ${job}\nסה"כ: ₪${total.toLocaleString()}\nתודה!`);

  const isPaid = state?.status === 'paid' || type.includes('קבלה');

  return (
    <div className="ip-shell">

      {/* Toolbar */}
      <div className="ip-toolbar no-print">
        <button type="button" className="ip-toolbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
        </button>
        <span className="ip-toolbar__title">{type} {invoiceId}</span>
        <div className="ip-toolbar__actions">
          <a href={`${waLink(clientPhone)}?text=${waMsg}`} target="_blank" rel="noreferrer"
            className="ip-toolbar__btn ip-toolbar__btn--wa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            שלח
          </a>
          <button type="button" className="ip-toolbar__btn ip-toolbar__btn--pdf" onClick={() => window.print()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="ip-page-wrap">
        <div className="ip-doc">

          {/* Paid stamp overlay */}
          {isPaid && (
            <div className="ip-stamp">
              <div className="ip-stamp__inner">שולם</div>
            </div>
          )}

          {/* Header */}
          <div className="ip-doc__header">
            <div className="ip-doc__biz">
              <div className="ip-doc__biz-logo">MP</div>
              <div>
                <div className="ip-doc__biz-name">ישראל ישראלי</div>
                <div className="ip-doc__biz-sub">אינסטלטור מוסמך</div>
                <div className="ip-doc__biz-contact">050-0000000 · israel@mypartner.co.il</div>
                <div className="ip-doc__biz-vat">ע.מ. 123456789</div>
              </div>
            </div>
            <div className="ip-doc__meta">
              <div className="ip-doc__type-badge">{type}</div>
              <div className="ip-doc__num">{invoiceId}</div>
              <div className="ip-doc__meta-row"><span>תאריך הפקה:</span><span>{state?.date || formatDate(0)}</span></div>
              <div className="ip-doc__meta-row"><span>תאריך ערך:</span><span>{formatDate(0)}</span></div>
              {quoteRef && <div className="ip-doc__meta-row"><span>הצעה:</span><span>{quoteRef}</span></div>}
            </div>
          </div>

          {/* Client */}
          <div className="ip-doc__client">
            <div className="ip-doc__client-label">לכבוד:</div>
            <div className="ip-doc__client-name">{client}</div>
            <div className="ip-doc__client-phone">{clientPhone}</div>
            {clientVAT && <div className="ip-doc__client-vat">ע.מ. לקוח: {clientVAT}</div>}
            <div className="ip-doc__client-subject"><strong>הנדון:</strong> {job}</div>
          </div>

          {/* Items table */}
          <table className="ip-table">
            <thead>
              <tr className="ip-table__head">
                <th className="ip-th ip-th--desc">תיאור</th>
                <th className="ip-th">כמות</th>
                <th className="ip-th">יח׳</th>
                <th className="ip-th">מחיר</th>
                <th className="ip-th ip-th--total">סה"כ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'ip-row--even' : ''}>
                  <td className="ip-td ip-td--desc">{item.desc}</td>
                  <td className="ip-td ip-td--center">{item.qty}</td>
                  <td className="ip-td ip-td--center">{item.unit}</td>
                  <td className="ip-td ip-td--num">₪{item.price.toLocaleString()}</td>
                  <td className="ip-td ip-td--num ip-td--bold">₪{(item.qty * item.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="ip-doc__totals">
            <div className="ip-total-row"><span>סכום לפני מע"מ</span><span>₪{subtotal.toLocaleString()}</span></div>
            <div className="ip-total-row"><span>מע"מ 17%</span><span>₪{vat.toLocaleString()}</span></div>
            <div className="ip-total-row ip-total-row--grand"><span>סה"כ לתשלום</span><span>₪{total.toLocaleString()}</span></div>
          </div>

          {/* Payment details */}
          <div className="ip-doc__payment">
            <div className="ip-doc__payment-title">פרטי תשלום</div>
            <div className="ip-doc__payment-grid">
              <div className="ip-doc__payment-item">
                <span className="ip-doc__payment-key">אמצעי תשלום</span>
                <span className="ip-doc__payment-val">{paymentMethod}</span>
              </div>
              {isPaid && (
                <div className="ip-doc__payment-item">
                  <span className="ip-doc__payment-key">סטטוס</span>
                  <span className="ip-doc__payment-val ip-doc__payment-val--paid">✓ שולם במלואו</span>
                </div>
              )}
              <div className="ip-doc__payment-item">
                <span className="ip-doc__payment-key">בנק הפועלים</span>
                <span className="ip-doc__payment-val">סניף 123 · חשבון 456789</span>
              </div>
            </div>
          </div>

          {/* Legal note */}
          <div className="ip-doc__legal">
            מסמך זה הופק ממערכת MyPartner ומהווה {type} לצרכי מס ערך מוסף בהתאם לתקנות מס ערך מוסף, תשל"ו–1976.
          </div>

          {/* Signatures */}
          <div className="ip-doc__sig-row">
            <SignaturePad
              label="חתימת הלקוח"
              storageKey={`mp_sig_client_${invoiceId}`}
              readOnly={isPaid}
            />
            <SignaturePad
              label="חתימת בעל העסק"
              storageKey="mp_sig_contractor"
              readOnly={isPaid}
            />
          </div>

          {/* Footer */}
          <div className="ip-doc__footer">
            <span>MyPartner · מערכת ניהול עסק</span>
            <span>{invoiceId} · {state?.date || formatDate(0)}</span>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="ip-bottom no-print">
        <button type="button" className="ip-bottom__btn ip-bottom__btn--outline" onClick={() => navigate('/invoices')}>
          חזור לחשבוניות
        </button>
        <button type="button" className="ip-bottom__btn ip-bottom__btn--primary" onClick={() => window.print()}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          הורד PDF
        </button>
      </div>

    </div>
  );
}
