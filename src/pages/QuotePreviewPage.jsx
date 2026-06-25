import { useLocation, useNavigate } from 'react-router-dom';
import SignaturePad from '../components/SignaturePad';
import './QuotePreviewPage.css';

const DEFAULT_ITEMS = [
  { desc: 'פירוק ואריזת ריצוף קיים', qty: 1, unit: 'עבודה', price: 800 },
  { desc: 'ריצוף חדר אמבטיה (אריחים 60×60)', qty: 8, unit: 'מ"ר', price: 320 },
  { desc: 'הנחת אריחי קיר (גובה 2.4מ)', qty: 18, unit: 'מ"ר', price: 280 },
  { desc: 'התקנת תא מקלחון פינתי', qty: 1, unit: 'יח\'', price: 1200 },
  { desc: 'חיבורי אינסטלציה', qty: 1, unit: 'עבודה', price: 1400 },
];

function formatDate(offset = 0) {
  const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getDate()} ב${months[d.getMonth()]} ${d.getFullYear()}`;
}

function waLink(phone) {
  const d = phone.replace(/\D/g, '');
  return `https://wa.me/972${d.startsWith('0') ? d.slice(1) : d}`;
}

export default function QuotePreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const client     = state?.client     || 'אבי כהן';
  const clientPhone= state?.clientPhone|| '050-1234567';
  const job        = state?.job        || 'שיפוץ חדר אמבטיה';
  const items      = state?.items      || DEFAULT_ITEMS;
  const accent     = state?.accent     || '#0050CB';
  const quoteNum   = state?.quoteNum   || '#001249';

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const vat      = Math.round(subtotal * 0.17);
  const total    = subtotal + vat;

  const waMsg = encodeURIComponent(
    `שלום ${client},\nמצ"ב הצעת המחיר עבור: ${job}\nסה"כ: ₪${total.toLocaleString()}\n\nאשמח לענות על כל שאלה 🙏`
  );

  return (
    <div className="qp-shell">

      {/* ── Toolbar (hidden on print) ── */}
      <div className="qp-toolbar no-print">
        <button type="button" className="qp-toolbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
        </button>
        <span className="qp-toolbar__title">הצעת מחיר {quoteNum}</span>
        <div className="qp-toolbar__actions">
          <a
            href={`${waLink(clientPhone)}?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            className="qp-toolbar__btn qp-toolbar__btn--wa"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            שתף
          </a>
          <button type="button" className="qp-toolbar__btn qp-toolbar__btn--pdf" onClick={() => window.print()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            הורד PDF
          </button>
        </div>
      </div>

      {/* ── Quote Document ── */}
      <div className="qp-page-wrap">
        <div className="qp-doc" id="quote-doc">

          {/* Header */}
          <div className="qp-doc__header" style={{ borderBottomColor: accent }}>
            <div className="qp-doc__biz">
              <div className="qp-doc__biz-logo" style={{ background: accent }}>
                <span>MP</span>
              </div>
              <div className="qp-doc__biz-info">
                <div className="qp-doc__biz-name">ישראל ישראלי</div>
                <div className="qp-doc__biz-role">אינסטלטור מוסמך · רישיון #12345</div>
                <div className="qp-doc__biz-contact">050-0000000 · israel@mypartner.co.il</div>
              </div>
            </div>
            <div className="qp-doc__meta">
              <div className="qp-doc__meta-badge" style={{ background: accent }}>הצעת מחיר</div>
              <div className="qp-doc__meta-num" style={{ color: accent }}>{quoteNum}</div>
              <div className="qp-doc__meta-row">
                <span className="qp-doc__meta-key">תאריך:</span>
                <span>{formatDate(0)}</span>
              </div>
              <div className="qp-doc__meta-row">
                <span className="qp-doc__meta-key">תוקף עד:</span>
                <span>{formatDate(14)}</span>
              </div>
            </div>
          </div>

          {/* Client block */}
          <div className="qp-doc__client-block">
            <div className="qp-doc__client-label">לכבוד:</div>
            <div className="qp-doc__client-name">{client}</div>
            <div className="qp-doc__client-phone">{clientPhone}</div>
            <div className="qp-doc__client-subject">
              <span className="qp-doc__client-subject-label">הנדון:</span> {job}
            </div>
          </div>

          {/* Items table */}
          <table className="qp-table">
            <thead>
              <tr style={{ background: accent }}>
                <th className="qp-table__th qp-table__th--desc">תיאור העבודה / החומר</th>
                <th className="qp-table__th">כמות</th>
                <th className="qp-table__th">יח׳</th>
                <th className="qp-table__th">מחיר יח׳</th>
                <th className="qp-table__th qp-table__th--total">סה"כ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'qp-table__row--even' : ''}>
                  <td className="qp-table__td qp-table__td--desc">{item.desc}</td>
                  <td className="qp-table__td qp-table__td--center">{item.qty}</td>
                  <td className="qp-table__td qp-table__td--center">{item.unit}</td>
                  <td className="qp-table__td qp-table__td--num">₪{item.price.toLocaleString()}</td>
                  <td className="qp-table__td qp-table__td--num qp-table__td--bold">₪{(item.qty * item.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="qp-doc__totals">
            <div className="qp-doc__totals-inner">
              <div className="qp-doc__total-row">
                <span>סכום ביניים</span>
                <span>₪{subtotal.toLocaleString()}</span>
              </div>
              <div className="qp-doc__total-row">
                <span>מע"מ 17%</span>
                <span>₪{vat.toLocaleString()}</span>
              </div>
              <div className="qp-doc__total-row qp-doc__total-row--grand" style={{ borderTopColor: accent, color: accent }}>
                <span>סה"כ לתשלום</span>
                <span>₪{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="qp-doc__notes">
            <div className="qp-doc__notes-title">הערות ותנאי תשלום</div>
            <ul className="qp-doc__notes-list">
              <li>תשלום ב-3 תשלומים: 30% מקדמה, 40% בסיום, 30% לאחר 30 יום.</li>
              <li>הצעה זו תקפה ל-14 יום מתאריך הנפקתה.</li>
              <li>המחירים אינם כוללים חומרים שלא צוינו במפורש.</li>
              <li>כל שינוי בהיקף העבודה יחייב הצעת מחיר עדכנית.</li>
            </ul>
          </div>

          {/* Signatures */}
          <div className="qp-doc__sigs">
            <SignaturePad
              label="חתימת הלקוח ואישור הצעה"
              storageKey={`mp_sig_client_${quoteNum}`}
            />
            <SignaturePad
              label="חתימת בעל העסק"
              storageKey="mp_sig_contractor"
            />
          </div>

          {/* Footer */}
          <div className="qp-doc__footer" style={{ borderTopColor: accent + '40' }}>
            <span>MyPartner · ניהול עסק חכם</span>
            <span>{quoteNum} · {formatDate(0)}</span>
          </div>

        </div>
      </div>

      {/* ── Mobile bottom bar (hidden on print) ── */}
      <div className="qp-bottom no-print">
        <button type="button" className="qp-bottom__btn qp-bottom__btn--outline" onClick={() => navigate('/quotes')}>
          חזור להצעות
        </button>
        <button type="button" className="qp-bottom__btn qp-bottom__btn--primary" style={{ background: accent }} onClick={() => window.print()}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          הורד PDF
        </button>
      </div>

    </div>
  );
}
