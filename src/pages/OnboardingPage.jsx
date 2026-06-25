import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import './OnboardingPage.css';

const PROFESSIONS = ['אינסטלטור', 'שיפוצניק', 'חשמלאי', 'טכנאי מיזוג', 'צבעי', 'נגר', 'גנן', 'אחר'];
const TOTAL_STEPS = 4;

const MSG_TYPES = [
  { id: 'payment', label: 'תזכורת תשלום', emoji: '💰' },
  { id: 'confirm', label: 'אישור עבודה', emoji: '🔨' },
  { id: 'followup', label: 'מעקב לקוח', emoji: '📞' },
  { id: 'quote', label: 'הצעת מחיר', emoji: '📄' },
  { id: 'cancel', label: 'ביטול / שינוי', emoji: '📅' },
  { id: 'thanks', label: 'תודה והערכה', emoji: '🙏' },
];

function ReuvenFace({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', display: 'block' }}>
      <circle cx="80" cy="80" r="80" fill="#1B3A6B"/>
      <path d="M8 160 Q8 118 80 108 Q152 118 152 160Z" fill="#243F7A"/>
      <path d="M80 108 L64 128 L54 160 L80 160Z" fill="#162D58"/>
      <path d="M80 108 L96 128 L106 160 L80 160Z" fill="#162D58"/>
      <path d="M70 108 L80 122 L90 108 L87 102 L80 108 L73 102Z" fill="#EEF3FF"/>
      <path d="M77 108 L80 122 L83 108 L82 102 L78 102Z" fill="#C0392B"/>
      <rect x="77" y="102" width="6" height="4" rx="2" fill="#96281B"/>
      <rect x="71" y="91" width="18" height="19" rx="7" fill="#E8A87C"/>
      <circle cx="80" cy="72" r="34" fill="#F0B27A"/>
      <circle cx="46" cy="73" r="6" fill="#E29B65"/>
      <circle cx="114" cy="73" r="6" fill="#E29B65"/>
      <path d="M47 65 Q47 36 80 34 Q113 36 113 65 Q110 46 80 44 Q50 46 47 65Z" fill="#1C0F00"/>
      <path d="M47 65 Q44 74 47 82 Q46 68 50 62Z" fill="#1C0F00"/>
      <path d="M113 65 Q116 74 113 82 Q114 68 110 62Z" fill="#1C0F00"/>
      <path d="M58 60 Q66 56 74 59" stroke="#1C0F00" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M86 59 Q94 56 102 60" stroke="#1C0F00" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="66" cy="70" r="9" fill="white"/>
      <circle cx="94" cy="70" r="9" fill="white"/>
      <circle cx="67" cy="71" r="6" fill="#4A2800"/>
      <circle cx="95" cy="71" r="6" fill="#4A2800"/>
      <circle cx="67" cy="71" r="3.5" fill="#1C0F00"/>
      <circle cx="95" cy="71" r="3.5" fill="#1C0F00"/>
      <circle cx="69" cy="69" r="1.8" fill="white"/>
      <circle cx="97" cy="69" r="1.8" fill="white"/>
      <circle cx="76" cy="80" r="1.8" fill="#D4894A" opacity="0.7"/>
      <circle cx="84" cy="80" r="1.8" fill="#D4894A" opacity="0.7"/>
      <path d="M64 89 Q80 101 96 89" stroke="#1C0F00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M67 90 Q80 100 93 90 Q80 96 67 90Z" fill="white" opacity="0.6"/>
      <circle cx="55" cy="82" r="7" fill="#F07050" opacity="0.22"/>
      <circle cx="105" cy="82" r="7" fill="#F07050" opacity="0.22"/>
    </svg>
  );
}

/* ─── Inline Signature Canvas ─── */
function InlineSigPad({ onSave }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#0D1B3E';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getXY = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const onDown = (e) => {
    e.preventDefault();
    drawing.current = true;
    setIsEmpty(false);
    const pos = getXY(e);
    lastPos.current = pos;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = '#0D1B3E';
    ctx.fill();
  };

  const onMove = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getXY(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const onUp = () => { drawing.current = false; };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.getContext('2d').clearRect(0, 0, rect.width * (window.devicePixelRatio || 1), rect.height * (window.devicePixelRatio || 1));
    setIsEmpty(true);
  };

  const handleSave = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    localStorage.setItem('mp_sig_contractor', dataUrl);
    onSave(dataUrl);
  };

  return (
    <div className="ob-sigpad">
      <div className="ob-sigpad__canvas-wrap">
        <canvas
          ref={canvasRef}
          className="ob-sigpad__canvas"
          style={{ touchAction: 'none' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        />
        {isEmpty && <div className="ob-sigpad__hint">חתום כאן עם האצבע או העכבר ↙</div>}
      </div>
      <div className="ob-sigpad__actions">
        <button type="button" className="btn btn--outline btn--sm" onClick={handleClear} disabled={isEmpty}>נקה</button>
        <button type="button" className="btn btn--primary btn--sm" onClick={handleSave} disabled={isEmpty}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          שמור חתימה
        </button>
      </div>
    </div>
  );
}

/* ─── Step 1: Profession ─── */
function StepProfession({ onNext }) {
  const [selected, setSelected] = useState([]);
  const toggle = (p) => setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  return (
    <div className="ob-step">
      <div className="ob-bot-msg">
        <div className="ob-bot-avatar"><ReuvenFace size={40} /></div>
        <div className="ob-bot-bubble">
          שלום! אני ראובן — הסוכן העסקי שלך 👋<br/>
          כדי להתאים את הכלים לעסק שלך, ספר לי — מה המקצוע שלך?
        </div>
      </div>
      <div className="ob-chips">
        {PROFESSIONS.map(p => (
          <button key={p} type="button"
            className={`filter-chip${selected.includes(p) ? ' filter-chip--active' : ''}`}
            onClick={() => toggle(p)}>
            {p}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="ob-user-reply">
          <div className="ob-user-bubble">{selected.join(', ')}</div>
        </div>
      )}
      <div className="ob-cta">
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={onNext} disabled={selected.length === 0}>
          המשך ←
        </button>
      </div>
    </div>
  );
}

/* ─── Step 2: Business Info ─── */
function StepBusinessInfo({ onNext }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vat, setVat] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (name) {
      localStorage.setItem('mp_biz_name', name);
      localStorage.setItem('mp_biz_phone', phone);
      localStorage.setItem('mp_biz_vat', vat);
      localStorage.setItem('mp_biz_email', email);
    }
    onNext();
  };

  return (
    <div className="ob-step">
      <div className="ob-bot-msg">
        <div className="ob-bot-avatar"><ReuvenFace size={40} /></div>
        <div className="ob-bot-bubble">
          מעולה! עכשיו בוא נגדיר את פרטי העסק שלך —<br/>
          אלה יופיעו אוטומטית על כל החשבוניות וההצעות.
        </div>
      </div>
      <div className="ob-form">
        <div className="ob-field">
          <label className="ob-label">שם בעל העסק / שם העסק</label>
          <input className="input-field" placeholder='ישראל ישראלי / "ישראלי שיפוצים"' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="ob-field">
          <label className="ob-label">טלפון</label>
          <input className="input-field" placeholder="050-0000000" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" />
        </div>
        <div className="ob-field">
          <label className="ob-label">דוא"ל</label>
          <input className="input-field" placeholder="israel@gmail.com" value={email} onChange={e => setEmail(e.target.value)} dir="ltr" type="email" />
        </div>
        <div className="ob-field">
          <label className="ob-label">עוסק מורשה / ח.פ (אופציונלי)</label>
          <input className="input-field" placeholder="123456789" value={vat} onChange={e => setVat(e.target.value)} dir="ltr" />
        </div>
      </div>
      <div className="ob-cta">
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={handleNext}>
          המשך ←
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onNext}>
          דלג לעכשיו
        </button>
      </div>
    </div>
  );
}

/* ─── Step 3: Message style ─── */
function StepMessages({ onNext }) {
  const [tone, setTone] = useState('');
  const [types, setTypes] = useState([]);

  const toggleType = (id) =>
    setTypes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleNext = () => {
    if (tone) localStorage.setItem('mp_msg_tone', tone);
    if (types.length) localStorage.setItem('mp_msg_types', JSON.stringify(types));
    onNext();
  };

  return (
    <div className="ob-step">
      <div className="ob-bot-msg">
        <div className="ob-bot-avatar"><ReuvenFace size={40} /></div>
        <div className="ob-bot-bubble">
          בחרתי לכלול בשבילך תבניות הודעות מוכנות לשליחה ב-WhatsApp.<br/>
          איך אתה מעדיף לתקשר עם הלקוחות שלך?
        </div>
      </div>

      {/* Tone */}
      <div className="ob-msg-section">
        <div className="ob-label" style={{ marginBottom: 8 }}>סגנון הכתיבה</div>
        <div className="ob-msg-tones">
          <button
            type="button"
            className={`ob-tone-btn${tone === 'formal' ? ' ob-tone-btn--active' : ''}`}
            onClick={() => setTone('formal')}
          >
            <span className="ob-tone-btn__emoji">📋</span>
            <span className="ob-tone-btn__label">רשמי / עסקי</span>
            <span className="ob-tone-btn__sub">"לכבוד הלקוח, ..."</span>
          </button>
          <button
            type="button"
            className={`ob-tone-btn${tone === 'casual' ? ' ob-tone-btn--active' : ''}`}
            onClick={() => setTone('casual')}
          >
            <span className="ob-tone-btn__emoji">😊</span>
            <span className="ob-tone-btn__label">ידידותי / קולח</span>
            <span className="ob-tone-btn__sub">"היי [שם], רק רציתי..."</span>
          </button>
        </div>
      </div>

      {/* Message types */}
      <div className="ob-msg-section">
        <div className="ob-label" style={{ marginBottom: 8 }}>אילו הודעות תשלח הכי הרבה?</div>
        <div className="ob-chips">
          {MSG_TYPES.map(t => (
            <button
              key={t.id}
              type="button"
              className={`filter-chip${types.includes(t.id) ? ' filter-chip--active' : ''}`}
              onClick={() => toggleType(t.id)}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      {tone && types.length > 0 && (
        <div className="ob-bot-msg">
          <div className="ob-bot-avatar"><ReuvenFace size={40} /></div>
          <div className="ob-bot-bubble">
            מעולה! הכנתי לך תבניות ב{tone === 'formal' ? 'סגנון רשמי' : 'סגנון ידידותי'} עבור {types.length} סוגי הודעות.<br/>
            תמצא אותן תמיד תחת "תבניות הודעות" בתפריט. 🎉
          </div>
        </div>
      )}

      <div className="ob-cta">
        <button
          type="button"
          className="btn btn--primary btn--lg btn--full"
          onClick={handleNext}
          disabled={!tone || types.length === 0}
        >
          המשך ←
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onNext}>
          דלג לעכשיו
        </button>
      </div>
    </div>
  );
}

/* ─── Step 5: Signature ─── */
function StepSignature({ onNext }) {
  const [saved, setSaved] = useState(() => !!localStorage.getItem('mp_sig_contractor'));
  const existing = localStorage.getItem('mp_sig_contractor');

  return (
    <div className="ob-step">
      <div className="ob-bot-msg">
        <div className="ob-bot-avatar"><ReuvenFace size={40} /></div>
        <div className="ob-bot-bubble">
          {saved
            ? '✅ יפה מאוד! החתימה שלך נשמרה ותופיע אוטומטית על כל החשבוניות וההצעות.'
            : 'כמעט גמרנו! בוא ניצור את החתימה האישית שלך — היא תופיע על כל המסמכים שתפיק.'}
        </div>
      </div>

      {saved ? (
        <div className="ob-sig-preview">
          <div className="ob-sig-preview__label">החתימה שלך:</div>
          <div className="ob-sig-preview__frame">
            <img src={existing} alt="חתימה" className="ob-sig-preview__img" />
          </div>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setSaved(false)}>
            שנה חתימה
          </button>
        </div>
      ) : (
        <>
          <div className="ob-sig-tip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            חתום עם האצבע על המסך, או עם העכבר אם אתה בדסקטופ
          </div>
          <InlineSigPad onSave={() => setSaved(true)} />
        </>
      )}

      <div className="ob-cta" style={{ marginTop: 20 }}>
        <button type="button" className="btn btn--primary btn--lg btn--full" onClick={onNext}>
          {saved ? 'המשך ←' : 'דלג על שלב זה'}
        </button>
      </div>
    </div>
  );
}

/* ─── Step 6: Done ─── */
function StepDone({ onFinish }) {
  return (
    <div className="ob-step ob-done">
      <div className="ob-done__avatar-wrap">
        <ReuvenFace size={90} />
        <div className="ob-done__online" />
      </div>
      <h2 className="ob-done__title">הכל מוכן! 🎉</h2>
      <p className="ob-done__sub">
        ראובן מוכן לעזור לך לנהל את העסק בצורה<br/>
        חכמה, מסודרת ומקצועית.
      </p>
      <div className="ob-features">
        <div className="ob-feature">
          <span className="ob-feature__check">✅</span>
          <span>פרטי העסק נשמרו על המסמכים</span>
        </div>
        <div className="ob-feature">
          <span className="ob-feature__check">✅</span>
          <span>חתימה אישית מוגדרת לחשבוניות</span>
        </div>
        <div className="ob-feature">
          <span className="ob-feature__check">✅</span>
          <span>ראובן הסוכן פעיל ומוכן לשאלות</span>
        </div>
        <div className="ob-feature">
          <span className="ob-feature__check">✅</span>
          <span>תבניות הודעות בעברית מוכנות לשימוש</span>
        </div>
      </div>
      <button type="button" className="btn btn--primary btn--lg btn--full" style={{ marginTop: 28 }} onClick={onFinish}>
        כניסה לדשבורד →
      </button>
    </div>
  );
}

/* ─── Main Page ─── */
const TOTAL_CONTENT_STEPS = 4;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const next = () => setStep(s => s + 1);

  const STEP_TITLES = ['', 'אפיון המקצוע', 'פרטי העסק', 'תבניות הודעות', 'החתימה שלך', 'הכל מוכן!'];
  const isLastStep = step === 5;

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <Logo size={28} />
        <button type="button" className="onboarding-header__skip" onClick={() => navigate('/dashboard')}>
          דלג
        </button>
      </header>

      {!isLastStep && (
        <div className="onboarding-progress px-container">
          <div className="onboarding-progress__label">
            <span className="text-caption text-mute">שלב {step} מתוך {TOTAL_CONTENT_STEPS}</span>
            <span className="text-caption text-mute">{Math.round((step / TOTAL_CONTENT_STEPS) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${(step / TOTAL_CONTENT_STEPS) * 100}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      )}

      <div className="px-container onboarding-title">
        <h1 className="text-h1">{STEP_TITLES[step]}</h1>
      </div>

      <div className="px-container">
        {step === 1 && <StepProfession onNext={next} />}
        {step === 2 && <StepBusinessInfo onNext={next} />}
        {step === 3 && <StepMessages onNext={next} />}
        {step === 4 && <StepSignature onNext={next} />}
        {step === 5 && <StepDone onFinish={() => navigate('/dashboard')} />}
      </div>

      <Footer />
    </div>
  );
}
