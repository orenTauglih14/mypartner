import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import './AgentPage.css';

/* ── Reuven avatar — friendly cartoon professional ── */
function ReuvenAvatar({ size = 68 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', display: 'block' }}>
      {/* BG */}
      <circle cx="80" cy="80" r="80" fill="#1B3A6B"/>

      {/* Suit body */}
      <path d="M8 160 Q8 118 80 108 Q152 118 152 160Z" fill="#243F7A"/>
      {/* Jacket lapels */}
      <path d="M80 108 L64 128 L54 160 L80 160Z" fill="#162D58"/>
      <path d="M80 108 L96 128 L106 160 L80 160Z" fill="#162D58"/>
      {/* White shirt */}
      <path d="M70 108 L80 122 L90 108 L87 102 L80 108 L73 102Z" fill="#EEF3FF"/>
      {/* Tie — dark red, clean */}
      <path d="M77 108 L80 122 L83 108 L82 102 L78 102Z" fill="#C0392B"/>
      <rect x="77" y="102" width="6" height="4" rx="2" fill="#96281B"/>

      {/* Neck */}
      <rect x="71" y="91" width="18" height="19" rx="7" fill="#E8A87C"/>

      {/* Face — round, friendly */}
      <circle cx="80" cy="72" r="34" fill="#F0B27A"/>

      {/* Ears */}
      <circle cx="46" cy="73" r="6" fill="#E29B65"/>
      <circle cx="114" cy="73" r="6" fill="#E29B65"/>

      {/* Hair — neat short side-part */}
      <path d="M47 65 Q47 36 80 34 Q113 36 113 65 Q110 46 80 44 Q50 46 47 65Z" fill="#1C0F00"/>
      {/* Left fade */}
      <path d="M47 65 Q44 74 47 82 Q46 68 50 62Z" fill="#1C0F00"/>
      {/* Right fade */}
      <path d="M113 65 Q116 74 113 82 Q114 68 110 62Z" fill="#1C0F00"/>
      {/* Side part accent */}
      <path d="M80 44 Q78 50 76 60" stroke="#2A1A00" strokeWidth="1.5" fill="none" opacity="0.4"/>

      {/* Eyebrows — soft arched */}
      <path d="M58 60 Q66 56 74 59" stroke="#1C0F00" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M86 59 Q94 56 102 60" stroke="#1C0F00" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Eyes — big, warm, friendly */}
      <circle cx="66" cy="70" r="9" fill="white"/>
      <circle cx="94" cy="70" r="9" fill="white"/>
      {/* Iris */}
      <circle cx="67" cy="71" r="6" fill="#4A2800"/>
      <circle cx="95" cy="71" r="6" fill="#4A2800"/>
      {/* Pupil */}
      <circle cx="67" cy="71" r="3.5" fill="#1C0F00"/>
      <circle cx="95" cy="71" r="3.5" fill="#1C0F00"/>
      {/* Shine — two dots makes it more alive */}
      <circle cx="69" cy="69" r="1.8" fill="white"/>
      <circle cx="97" cy="69" r="1.8" fill="white"/>
      <circle cx="66" cy="73" r="0.8" fill="white" opacity="0.6"/>
      <circle cx="94" cy="73" r="0.8" fill="white" opacity="0.6"/>

      {/* Nose — clean two-dot style */}
      <circle cx="76" cy="80" r="1.8" fill="#D4894A" opacity="0.7"/>
      <circle cx="84" cy="80" r="1.8" fill="#D4894A" opacity="0.7"/>

      {/* Mouth — warm smile with teeth */}
      <path d="M64 89 Q80 101 96 89" stroke="#1C0F00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M67 90 Q80 100 93 90 Q80 96 67 90Z" fill="white" opacity="0.6"/>

      {/* Cheeks */}
      <circle cx="55" cy="82" r="7" fill="#F07050" opacity="0.22"/>
      <circle cx="105" cy="82" r="7" fill="#F07050" opacity="0.22"/>
    </svg>
  );
}

/* ── Quick suggestion chips ── */
const QUICK = [
  { label: 'מה חדש?',           msg: 'מה חדש?' },
  { label: 'מי חייב לי כסף?',   msg: 'מי חייב לי כסף?' },
  { label: 'הצעות פתוחות',       msg: 'כמה הצעות מחיר פתוחות?' },
  { label: 'ביקורים היום',        msg: 'מה יש לי ביומן היום?' },
  { label: 'לידים חדשים',         msg: 'כמה לידים חדשים יש לי?' },
  { label: 'סיכום הכנסות',        msg: 'מה סיכום ההכנסות שלי?' },
  { label: 'צור הצעת מחיר',       msg: 'צור לי הצעת מחיר' },
  { label: 'שלח תזכורות',         msg: 'שלח תזכורות לחייבים' },
];

/* ── AI brain ── */
function buildReply(msg, data) {
  const m = msg.trim();
  const ml = m;

  // Greetings
  if (/שלום|היי|הי|בוקר|ערב|צהריים|מה שלומ|שלומך/.test(ml)) {
    const h = new Date().getHours();
    const g = h < 12 ? 'בוקר טוב' : h < 17 ? 'צהריים טובים' : 'ערב טוב';
    return { text: `${g}! אני ראובן הסוכן, כאן לעזור. אני מכיר את כל הנתונים בעסק — לידים, לקוחות, הצעות מחיר, תשלומים, ספקים ומלאי. מה תרצה לדעת?` };
  }

  // Summary / what's new
  if (/מה חדש|סיכום|מצב|overview|תפריט|עזרה/.test(ml)) {
    const newLeads = data.leads.filter(l => l.status === 'חדש');
    const openQ = data.quotes.filter(q => q.status === 'open' || q.status === 'pending');
    const overdue = data.payments.filter(p => p.status === 'overdue');
    const overdueAmt = overdue.reduce((s, p) => s + p.amountNum, 0);
    const todayEv = data.events.filter(e => e.dayIndex === 3);
    return {
      text:
        `הנה מה שקורה עכשיו בעסק שלך:\n\n` +
        `📥 ${newLeads.length} לידים חדשים ממתינים לטיפול\n` +
        `📄 ${openQ.length} הצעות מחיר פתוחות / ממתינות\n` +
        `💸 ₪${overdueAmt.toLocaleString()} בתשלומים באיחור\n` +
        `📅 ${todayEv.length} ביקורים ביומן היום\n\n` +
        `${newLeads.length > 0 ? `🔥 הדחוף ביותר: הליד של ${newLeads[0]?.name} — ${newLeads[0]?.jobType}` : 'הכל מסודר!'}`,
      actions: [
        { label: 'לידים', to: '/leads' },
        { label: 'הצעות', to: '/quotes' },
        { label: 'תשלומים', to: '/payments' },
      ],
    };
  }

  // Leads
  if (/ליד|לידים|פניה|פניות/.test(ml)) {
    const newL = data.leads.filter(l => l.status === 'חדש');
    const inP = data.leads.filter(l => l.status === 'בטיפול');
    const closed = data.leads.filter(l => l.status === 'נסגר');
    if (newL.length === 0) {
      return { text: `אין לידים חדשים כרגע. יש ${inP.length} בטיפול ו-${closed.length} שנסגרו.`, actions: [{ label: 'פתח לידים', to: '/leads' }] };
    }
    const list = newL.map(l => `• ${l.name} — ${l.jobType}`).join('\n');
    return {
      text: `יש לך ${newL.length} לידים חדשים:\n\n${list}\n\nהכי דחוף: ${newL[0].name} (${newL[0].date})`,
      actions: [{ label: 'פתח לידים', to: '/leads' }, { label: 'ליד חדש', to: '/leads' }],
    };
  }

  // Payments / debts
  if (/חוב|חייב|תשלום|גביי|כסף מגיע|לא שילם|מי שלא/.test(ml)) {
    const overdue = data.payments.filter(p => p.status === 'overdue');
    const pending = data.payments.filter(p => p.status === 'pending');
    const paid = data.payments.filter(p => p.status === 'paid');
    const total = overdue.reduce((s, p) => s + p.amountNum, 0);
    if (overdue.length === 0) {
      return { text: `מצוין! אין תשלומים באיחור. יש ${pending.length} תשלומים עתידיים ו-${paid.length} שכבר שולמו. כל הכבוד!`, actions: [{ label: 'תשלומים', to: '/payments' }] };
    }
    const list = overdue.map(p => `• ${p.client}: ${p.amount} — ${p.daysLate} ימי איחור`).join('\n');
    return {
      text: `🔴 ${overdue.length} תשלומים באיחור בסך ₪${total.toLocaleString()}:\n\n${list}\n\nממליץ לשלוח תזכורות עכשיו.`,
      actions: [{ label: 'תשלומים', to: '/payments' }, { label: 'גבייה', to: '/collections' }],
    };
  }

  // Quotes
  if (/הצע|הצעות|מחיר|quote/.test(ml) && !/צור|חדש/.test(ml)) {
    const open = data.quotes.filter(q => q.status === 'open');
    const pend = data.quotes.filter(q => q.status === 'pending');
    const acc = data.quotes.filter(q => q.status === 'accepted');
    const rej = data.quotes.filter(q => q.status === 'rejected');
    const potentialRev = [...open, ...pend].reduce((s, q) => s + q.amountNum, 0);
    return {
      text:
        `סטטוס הצעות המחיר:\n\n` +
        `📄 ${open.length} פתוחות — ממתינות לתגובה\n` +
        `⏳ ${pend.length} נשלחו — מחכות ללקוח\n` +
        `✅ ${acc.length} אושרו\n` +
        `❌ ${rej.length} נדחו\n\n` +
        `💰 פוטנציאל: ₪${potentialRev.toLocaleString()}`,
      actions: [{ label: 'הצעות מחיר', to: '/quotes' }, { label: 'צור הצעה', to: '/create-quote' }],
    };
  }

  // Create quote
  if (/צור הצע|הצע חדש|צור מחיר|הצעת מחיר חדש|הקם הצע/.test(ml)) {
    return {
      text: 'בסדר! עוברים ליצירת הצעת מחיר. תוכל לבחור לקוח, לבחור פריטים מהמלאי שלך, ולשלוח ישירות ב-WhatsApp.',
      actions: [{ label: '📄 צור הצעה חדשה', to: '/create-quote' }],
      autoNav: '/create-quote',
    };
  }

  // Create invoice
  if (/צור חשבונ|הקם חשבונ|חשבונית חדש|הפק חשבונ/.test(ml)) {
    return {
      text: 'פותח עמוד חשבוניות — משם תוכל להפיק חשבונית מס, חשבונית מס/קבלה או קבלה.',
      actions: [{ label: '🧾 חשבוניות', to: '/invoices' }],
      autoNav: '/invoices',
    };
  }

  // Add lead
  if (/הוסף ליד|ליד חדש|הקם ליד|צור ליד|פניה חדש/.test(ml)) {
    return {
      text: 'פותח עמוד הלידים — לחץ על "+" כדי להוסיף ליד חדש.',
      actions: [{ label: '➕ לידים חדשים', to: '/leads' }],
      autoNav: '/leads',
    };
  }

  // Add customer
  if (/הוסף לקוח|לקוח חדש|הקם לקוח|צור לקוח/.test(ml)) {
    return {
      text: 'עוברים ללקוחות — לחץ על "+" כדי להוסיף לקוח חדש.',
      actions: [{ label: '👤 לקוחות', to: '/customers' }],
      autoNav: '/customers',
    };
  }

  // Add visit / calendar
  if (/הוסף ביקור|קבע ביקור|קבע תור|הוסף תור|ביקור חדש|הקם ביקור|הקם תור/.test(ml)) {
    return {
      text: 'פותח יומן — לחץ "+" כדי לקבוע ביקור חדש.',
      actions: [{ label: '📅 יומן', to: '/calendar' }],
      autoNav: '/calendar',
    };
  }

  // Send reminder
  if (/שלח תזכורת|הוסף תזכורת|הקם תזכורת/.test(ml)) {
    return {
      text: 'עוברים לניהול תזכורות — שם תוכל להגדיר תזכורות אוטומטיות ב-WhatsApp וSMS.',
      actions: [{ label: '🔔 תזכורות', to: '/reminders' }],
      autoNav: '/reminders',
    };
  }

  // Suppliers
  if (/ספק|ספקים|מחירון ספק/.test(ml)) {
    const s = data.suppliers || [];
    return {
      text: s.length
        ? `יש לך ${s.length} ספקים:\n\n${s.map(sp => `• ${sp.name} (${sp.category}) — ${sp.phone}`).join('\n')}`
        : 'עוד אין ספקים מוגדרים.',
      actions: [{ label: '🏭 ספקים', to: '/suppliers' }],
    };
  }

  // Inventory
  if (/מלאי|מוצר|פריט|כמות|מחסן/.test(ml)) {
    const inv = data.inventory || [];
    const low = inv.filter(i => i.qty <= i.minQty);
    return {
      text: inv.length
        ? `מלאי: ${inv.length} פריטים.\n\n${low.length > 0 ? `⚠️ ${low.length} פריטים במלאי נמוך:\n${low.map(i => `• ${i.name}: נותרו ${i.qty} ${i.unit}`).join('\n')}` : '✅ כל הפריטים מעל המינימום.'}`
        : 'עוד אין פריטים במלאי.',
      actions: [{ label: '📦 מלאי', to: '/inventory' }],
    };
  }

  // Calendar / visits
  if (/יומן|ביקור|פגישה|היום|מחר|לוח זמן/.test(ml)) {
    const today = data.events.filter(e => e.dayIndex === 3);
    const tmrw = data.events.filter(e => e.dayIndex === 4);
    if (today.length === 0) {
      return { text: `אין ביקורים מתוכננים להיום. יש ${tmrw.length} ביקורים מחר.`, actions: [{ label: 'פתח יומן', to: '/calendar' }] };
    }
    const done = today.filter(e => e.status === 'done').length;
    const list = today.map(e => `• ${e.time} ${e.name} — ${e.job}`).join('\n');
    return {
      text: `📅 יש לך ${today.length} ביקורים היום:\n\n${list}\n\n✅ הושלמו: ${done}/${today.length}`,
      actions: [{ label: 'פתח יומן', to: '/calendar' }],
    };
  }

  // Customers
  if (/לקוח|לקוחות|crm|רשימת לקוח/.test(ml)) {
    const vip = data.customers.filter(c => c.status === 'vip');
    const allRev = data.customers.reduce((s, c) => {
      const n = parseFloat((c.revenue || '').replace(/[^\d.]/g, ''));
      return s + (isNaN(n) ? 0 : n);
    }, 0);
    return {
      text:
        `יש לך ${data.customers.length} לקוחות:\n\n` +
        `⭐ ${vip.length} לקוחות VIP\n` +
        `💰 סה"כ הכנסות: ₪${allRev.toLocaleString()}\n` +
        `👑 הלקוח הטוב ביותר: ${data.customers[0]?.name} (${data.customers[0]?.revenue})`,
      actions: [{ label: 'רשימת לקוחות', to: '/customers' }],
    };
  }

  // Reminders
  if (/תזכורת|תזכורות|אוטומ|שלח תז/.test(ml)) {
    const active = data.reminders.filter(r => r.active);
    const total = data.reminders.reduce((s, r) => s + r.count, 0);
    return {
      text:
        `🔔 מערכת התזכורות שלך:\n\n` +
        `✅ ${active.length} תזכורות פעילות\n` +
        `📨 ${total} הודעות נשלחו החודש\n\n` +
        `התזכורות שולחות הודעות ב-WhatsApp, SMS ואימייל באופן אוטומטי.`,
      actions: [{ label: 'ניהול תזכורות', to: '/reminders' }],
    };
  }

  // Monthly income summary
  if (/חודש|הכנסה|רווח|כמה הרווח|סיכום הכנסות|כסף/.test(ml)) {
    const paid = data.payments.filter(p => p.status === 'paid');
    const pTotal = paid.reduce((s, p) => s + p.amountNum, 0);
    const pend = data.payments.filter(p => p.status !== 'paid');
    const pendTotal = pend.reduce((s, p) => s + p.amountNum, 0);
    const pct = Math.round((pTotal / 50000) * 100);
    return {
      text:
        `💰 סיכום כלכלי החודש:\n\n` +
        `✅ נגבה: ₪${pTotal.toLocaleString()}\n` +
        `⏳ ממתין לגבייה: ₪${pendTotal.toLocaleString()}\n` +
        `🎯 יעד חודשי: ₪50,000\n` +
        `📊 הושג: ${pct}% מהיעד\n\n` +
        `${pct >= 80 ? '🔥 כל הכבוד, תוצאות מצוינות!' : pct >= 50 ? '💪 בדרך הנכונה, המשך כך!' : '📈 יש מקום לשיפור — רוצה שאנתח את הפוטנציאל?'}`,
      actions: [{ label: 'גבייה', to: '/collections' }, { label: 'תשלומים', to: '/payments' }],
    };
  }

  // Navigation commands
  if (/עבור ל|פתח|לך ל|הצג/.test(ml)) {
    if (/ליד/.test(ml)) return { text: 'עוברים ללידים!', autoNav: '/leads', actions: [{ label: 'לידים →', to: '/leads' }] };
    if (/לקוח/.test(ml)) return { text: 'עוברים ללקוחות!', autoNav: '/customers', actions: [{ label: 'לקוחות →', to: '/customers' }] };
    if (/יומן/.test(ml)) return { text: 'פותח יומן!', autoNav: '/calendar', actions: [{ label: 'יומן →', to: '/calendar' }] };
    if (/הצע/.test(ml)) return { text: 'עוברים להצעות!', autoNav: '/quotes', actions: [{ label: 'הצעות →', to: '/quotes' }] };
    if (/חשבונ/.test(ml)) return { text: 'עוברים לחשבוניות!', autoNav: '/invoices', actions: [{ label: 'חשבוניות →', to: '/invoices' }] };
    if (/תשלום/.test(ml)) return { text: 'עוברים לתשלומים!', autoNav: '/payments', actions: [{ label: 'תשלומים →', to: '/payments' }] };
  }

  // Invoices
  if (/חשבונ/.test(ml)) {
    return {
      text: 'אפשר להפיק חשבוניות מס, חשבוניות מס/קבלה וקבלות. כל חשבונית כוללת חתימה דיגיטלית ואפשרות הורדה ל-PDF.',
      actions: [{ label: 'חשבוניות', to: '/invoices' }],
    };
  }

  // Default fallback
  const suggest = QUICK[Math.floor(Math.random() * 4)];
  return {
    text:
      `לא הבנתי לגמרי, אבל אני כאן לעזור! אני יכול:\n\n` +
      `📥 לעדכן על לידים ופניות חדשות\n` +
      `👥 לחפש מידע על לקוחות\n` +
      `📄 לעקוב אחר הצעות מחיר\n` +
      `💸 לאתר חובות ותשלומים\n` +
      `📅 להציג את היומן\n` +
      `📊 לסכם הכנסות\n\n` +
      `נסה לשאול: "${suggest.label}"`,
  };
}

/* ── Message bubble ── */
function Bubble({ msg, navigate }) {
  return (
    <div className={`agent-bubble agent-bubble--${msg.from}`}>
      {msg.from === 'agent' && (
        <div className="agent-bubble__avatar">
          <ReuvenAvatar size={34} />
        </div>
      )}
      <div className="agent-bubble__content">
        <div className="agent-bubble__text">{msg.text}</div>
        {msg.actions && msg.actions.length > 0 && (
          <div className="agent-bubble__actions">
            {msg.actions.map((a) => (
              <button key={a.to + a.label} type="button" className="agent-action-btn" onClick={() => navigate(a.to)}>
                {a.label}
              </button>
            ))}
          </div>
        )}
        <div className="agent-bubble__time">{msg.time}</div>
      </div>
    </div>
  );
}

/* ── Typing indicator ── */
function Typing() {
  return (
    <div className="agent-bubble agent-bubble--agent">
      <div className="agent-bubble__avatar">
        <ReuvenAvatar size={34} />
      </div>
      <div className="agent-bubble__content">
        <div className="agent-typing">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function nowTime() {
  return new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

const WELCOME = {
  id: 0,
  from: 'agent',
  time: nowTime(),
  text: 'שלום! אני ראובן — הסוכן העסקי החכם שלך.\n\nאני מכיר את כל הנתונים בעסק: לידים, לקוחות, הצעות מחיר, תשלומים, ספקים ומלאי. תשאל בעברית חופשית ואני אדאג לשאר. מה תרצה לדעת?',
};

export default function AgentPage() {
  const navigate = useNavigate();
  const appData = useApp();
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = useCallback((text) => {
    const t = text.trim();
    if (!t || typing) return;

    const userMsg = { id: Date.now(), from: 'user', text: t, time: nowTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      const reply = buildReply(t, appData);
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'agent', time: nowTime(), ...reply }]);
      if (reply.autoNav) {
        setTimeout(() => navigate(reply.autoNav), 1200);
      }
    }, delay);
  }, [typing, appData, navigate]);

  const handleSubmit = (e) => { e.preventDefault(); send(input); };

  return (
    <div className="agent-page">

      {/* Header */}
      <div className="agent-header">
        <button type="button" className="agent-header__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
        </button>
        <div className="agent-header__inner">
          <div className="agent-header__photo">
            <ReuvenAvatar size={68} />
            <span className="agent-header__online" />
          </div>
          <div className="agent-header__info">
            <div className="agent-header__label">התייעץ עם</div>
            <div className="agent-header__name">ראובן</div>
            <div className="agent-header__role">יועץ עסקי · MyPartner AI</div>
            <div className="agent-header__status">
              <span className="agent-header__dot" />
              זמין עכשיו — מוכן לשאלות
            </div>
          </div>
        </div>
      </div>

      {/* Messages list */}
      <div className="agent-messages" ref={listRef}>
        {messages.map(msg => (
          <Bubble key={msg.id} msg={msg} navigate={navigate} />
        ))}
        {typing && <Typing />}
      </div>

      {/* Quick chips */}
      <div className="agent-quick">
        {QUICK.map(q => (
          <button key={q.msg} type="button" className="agent-quick-chip" onClick={() => send(q.msg)}>
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form className="agent-input-bar" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="agent-input"
          type="text"
          placeholder="שאל אותי כל דבר..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={typing}
          autoComplete="off"
        />
        <button type="submit" className="agent-send" disabled={!input.trim() || typing}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>

      <BottomNav />
    </div>
  );
}
