import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import './CreateQuotePage.css';

const TABS = [
  { key: 'content', label: 'תוכן', step: 1 },
  { key: 'design', label: 'עיצוב', step: 2 },
  { key: 'send', label: 'שליחה', step: 3 },
];

const AI_ITEMS = [
  { desc: 'פירוק ואריזת ריצוף קיים', qty: 1, unit: 'עבודה', price: 800 },
  { desc: 'ריצוף חדר אמבטיה (אריחים 60×60)', qty: 8, unit: 'מ"ר', price: 320 },
  { desc: 'הנחת אריחי קיר (גובה 2.4מ)', qty: 18, unit: 'מ"ר', price: 280 },
  { desc: 'התקנת תא מקלחון פינתי', qty: 1, unit: 'יח"', price: 1200 },
  { desc: 'חיבורי אינסטלציה', qty: 1, unit: 'עבודה', price: 1400 },
];

const TEMPLATES = [
  { key: 'clean', label: 'נקי', desc: 'פשוט ומקצועי' },
  { key: 'bold', label: 'מודגש', desc: 'בולט וחזק' },
  { key: 'warm', label: 'חם', desc: 'ידידותי ואישי' },
  { key: 'formal', label: 'רשמי', desc: 'קלאסי ורשמי' },
];

const ACCENT_COLORS = ['#0050CB', '#0AB571', '#FF9533', '#E5484D', '#7C3AED'];

const CHANNELS = [
  { key: 'whatsapp', label: 'WhatsApp', icon: '📱' },
  { key: 'email', label: 'אימייל', icon: '📧' },
  { key: 'sms', label: 'SMS', icon: '💬' },
];

function WaveformBars({ recording }) {
  const heights = [8, 18, 12, 24, 16, 28, 14, 22, 10, 20, 16, 26, 12, 18, 24];
  return (
    <div className="waveform">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`waveform-bar${recording ? ' waveform-bar--active' : ''}`}
          style={{
            height: recording ? `${h + Math.sin(i * 0.8) * 8}px` : `${h * 0.5}px`,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function CreateQuotePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [recording, setRecording] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('clean');
  const [selectedAccent, setSelectedAccent] = useState('#0050CB');
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [coverMsg, setCoverMsg] = useState('שלום! מצ"ב הצעת המחיר שהכנתי עבורך. אשמח לענות על כל שאלה.');

  const total = AI_ITEMS.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = Math.round(total * 0.17);

  const goNext = () => {
    const idx = TABS.findIndex((t) => t.key === activeTab);
    if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1].key);
  };

  const goPrev = () => {
    const idx = TABS.findIndex((t) => t.key === activeTab);
    if (idx > 0) setActiveTab(TABS[idx - 1].key);
  };

  return (
    <div className="app-shell">
      <AppHeader title="הצעת מחיר חדשה" showBack />
      <main className="page-content create-quote-page">

        {/* Tab bar */}
        <div className="cq-tabs px-container">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              className={`cq-tab${activeTab === t.key ? ' cq-tab--active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              <span className="cq-tab__step">{t.step}</span>
              <span className="cq-tab__label">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── TAB 1: תוכן ── */}
        {activeTab === 'content' && (
          <div className="cq-section px-container">

            {/* Client picker */}
            <div className="cq-block">
              <div className="cq-block__title">לקוח</div>
              <div className="cq-client-picker">
                <div className="cq-client-avatar">א</div>
                <div className="cq-client-info">
                  <div className="cq-client-name">אבי כהן</div>
                  <div className="cq-client-phone">050-1234567</div>
                </div>
                <button type="button" className="btn btn--soft btn--sm">שנה</button>
              </div>
            </div>

            {/* Voice recorder */}
            <div className="cq-block">
              <div className="cq-block__title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
                תיאור קולי
              </div>
              <div className="cq-recorder">
                <div className="cq-recorder__top">
                  {recording && <span className="cq-recorder__dot" />}
                  <span className="cq-recorder__timer">{recording ? '00:14' : '00:00'}</span>
                  <button
                    type="button"
                    className={`cq-recorder__btn${recording ? ' cq-recorder__btn--stop' : ''}`}
                    onClick={() => setRecording(!recording)}
                  >
                    {recording ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      </svg>
                    )}
                    {recording ? 'עצור' : 'הקלט'}
                  </button>
                </div>
                <WaveformBars recording={recording} />
                {!recording && (
                  <div className="cq-transcript">
                    <span className="cq-transcript__tag">תמלול AI</span>
                    <span className="cq-transcript__text">שיפוץ מלא לחדר אמבטיה: ריצוף, קירות, מקלחון ואינסטלציה...</span>
                  </div>
                )}
              </div>
            </div>

            {/* AI items */}
            <div className="cq-block">
              <div className="cq-block__title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                פריטים (הוצע על ידי AI)
              </div>
              <div className="cq-items">
                {AI_ITEMS.map((item, i) => (
                  <div key={i} className="cq-item">
                    <div className="cq-item__desc">{item.desc}</div>
                    <div className="cq-item__meta">
                      <span className="cq-item__qty">{item.qty} {item.unit}</span>
                      <span className="cq-item__price">₪{(item.qty * item.price).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                <div className="cq-items__add">
                  <button type="button" className="btn btn--soft btn--sm">+ הוסף פריט</button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="cq-summary">
              <div className="cq-summary__row">
                <span>סכום ביניים</span>
                <span>₪{total.toLocaleString()}</span>
              </div>
              <div className="cq-summary__row">
                <span>מע"מ 17%</span>
                <span>₪{vat.toLocaleString()}</span>
              </div>
              <div className="cq-summary__row cq-summary__row--total">
                <span>סה"כ לתשלום</span>
                <span>₪{(total + vat).toLocaleString()}</span>
              </div>
            </div>

            {/* AI hint */}
            <div className="cq-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>AI מזהה שמחיר זה נמוך ב-12% ממחיר השוק לעבודה דומה באזורך.</span>
            </div>

          </div>
        )}

        {/* ── TAB 2: עיצוב ── */}
        {activeTab === 'design' && (
          <div className="cq-section px-container">

            <div className="cq-block">
              <div className="cq-block__title">בחר תבנית</div>
              <div className="cq-templates">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`cq-template${selectedTemplate === t.key ? ' cq-template--active' : ''}`}
                    onClick={() => setSelectedTemplate(t.key)}
                  >
                    <div className="cq-template__preview">
                      <div className="cq-template__line cq-template__line--title" style={{ background: selectedTemplate === t.key ? selectedAccent : '#E2E5F2' }} />
                      <div className="cq-template__line" />
                      <div className="cq-template__line cq-template__line--sm" />
                      <div className="cq-template__line cq-template__line--sm" />
                      <div className="cq-template__line cq-template__line--btn" style={{ background: selectedTemplate === t.key ? selectedAccent : '#C2C6D8' }} />
                    </div>
                    <span className="cq-template__label">{t.label}</span>
                    <span className="cq-template__desc">{t.desc}</span>
                    {selectedTemplate === t.key && (
                      <div className="cq-template__check">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="cq-block">
              <div className="cq-block__title">צבע מבטא</div>
              <div className="cq-colors">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`cq-color${selectedAccent === c ? ' cq-color--active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setSelectedAccent(c)}
                  >
                    {selectedAccent === c && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Live preview mock */}
            <div className="cq-block">
              <div className="cq-block__title">תצוגה מקדימה</div>
              <div className="cq-preview" style={{ borderColor: selectedAccent + '40' }}>
                <div className="cq-preview__header" style={{ background: selectedAccent }}>
                  <div className="cq-preview__logo">MyPartner.</div>
                  <div className="cq-preview__tagline">הצעת מחיר</div>
                </div>
                <div className="cq-preview__body">
                  <div className="cq-preview__client">אבי כהן</div>
                  <div className="cq-preview__job">שיפוץ חדר אמבטיה</div>
                  <div className="cq-preview__lines">
                    {[1,2,3].map(i => <div key={i} className="cq-preview__line" />)}
                  </div>
                  <div className="cq-preview__total" style={{ color: selectedAccent }}>
                    ₪{(total + vat).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 3: שליחה ── */}
        {activeTab === 'send' && (
          <div className="cq-section px-container">

            {/* Signature */}
            <div className="cq-block">
              <div className="cq-block__title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                חתימה ואימות
              </div>
              <div className="cq-signature">
                <div className="cq-signature__box">
                  <div className="cq-signature__name">ישראל ישראלי</div>
                  <div className="cq-signature__role">אינסטלטור מוסמך · רישיון #12345</div>
                </div>
                <span className="chip chip--success">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  מאומת
                </span>
              </div>
            </div>

            {/* Channel */}
            <div className="cq-block">
              <div className="cq-block__title">שלח באמצעות</div>
              <div className="cq-channels">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.key}
                    type="button"
                    className={`cq-channel${selectedChannel === ch.key ? ' cq-channel--active' : ''}`}
                    onClick={() => setSelectedChannel(ch.key)}
                  >
                    <span className="cq-channel__icon">{ch.icon}</span>
                    <span className="cq-channel__label">{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cover message */}
            <div className="cq-block">
              <div className="cq-block__title">הודעת ליווי</div>
              <textarea
                className="textarea-field"
                value={coverMsg}
                onChange={(e) => setCoverMsg(e.target.value)}
                rows={4}
              />
            </div>

            {/* Toggles */}
            <div className="cq-toggles">
              <CqToggle label='מחיר כולל מע"מ' defaultOn />
              <CqToggle label="תוקף הצעה: 14 יום" defaultOn />
              <CqToggle label="קבל התראה עם פתיחה" defaultOn />
            </div>

          </div>
        )}

        {/* Bottom actions */}
        <div className="cq-bottom px-container">
          {activeTab !== 'content' && (
            <button type="button" className="btn btn--outline btn--lg" onClick={goPrev}>
              חזור
            </button>
          )}
          {activeTab !== 'send' ? (
            <button type="button" className="btn btn--primary btn--lg btn--full" onClick={goNext}>
              המשך לשלב הבא
            </button>
          ) : (
            <button type="button" className="btn btn--primary btn--lg btn--full" onClick={() => navigate('/quotes')}>
              שלח הצעת מחיר
            </button>
          )}
        </div>

      </main>
    </div>
  );
}

function CqToggle({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="cq-toggle" onClick={() => setOn(!on)}>
      <span className="cq-toggle__label">{label}</span>
      <div className={`cq-toggle__track${on ? ' cq-toggle__track--on' : ''}`}>
        <div className="cq-toggle__thumb" />
      </div>
    </div>
  );
}
