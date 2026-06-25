import { useState } from 'react';
import Layout from '../components/Layout';
import './MessagesPage.css';

function ReuvenFace({ size = 38 }) {
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

/* ─── Template Data ─── */
const CATEGORIES = [
  { id: 'payment', label: 'תזכורת תשלום', emoji: '💰' },
  { id: 'confirm', label: 'אישור עבודה', emoji: '🔨' },
  { id: 'followup', label: 'מעקב לקוח', emoji: '📞' },
  { id: 'cancel', label: 'ביטול / שינוי', emoji: '📅' },
  { id: 'thanks', label: 'תודה והערכה', emoji: '🙏' },
  { id: 'quote', label: 'הצעת מחיר', emoji: '📄' },
];

const TEMPLATES = {
  payment: {
    formal: [
      {
        title: 'תזכורת ראשונה',
        text: `לכבוד [שם הלקוח],

הריני להזכיר לך בכבוד כי עדיין לא התקבל תשלום עבור העבודה שבוצעה בתאריך [תאריך].
סכום לתשלום: ₪[סכום]
מספר חשבונית: [מספר חשבונית]

אבקש לסדר את התשלום בהקדם האפשרי.
תודה על שיתוף הפעולה,
[שם העסק]`,
      },
      {
        title: 'תזכורת שנייה – דחופה',
        text: `לכבוד [שם הלקוח],

פנייתי אליך בשנית בנוגע לחוב בסך ₪[סכום] המתייחס לעבודה שבוצעה בתאריך [תאריך].
על אף פנייתי הקודמת, טרם התקבל כל תשלום.

הינך מתבקש לסדר את התשלום תוך 5 ימי עסקים.
אי-תשלום עשוי להחייב נקיטת צעדים נוספים.

בכבוד,
[שם העסק]`,
      },
    ],
    casual: [
      {
        title: 'תזכורת ראשונה',
        text: `היי [שם הלקוח] 👋

רק רציתי להזכיר לך שעדיין לא הגיע אלינו תשלום על העבודה שעשינו אצלך ב-[תאריך].
הסכום: ₪[סכום]

אם יש בעיה כלשהי — תמיד אפשר לדבר 😊
תודה רבה!
[שם העסק]`,
      },
      {
        title: 'תזכורת שנייה',
        text: `שלום [שם הלקוח] 😊

פנינו אליך פעם נוספת בנוגע לתשלום של ₪[סכום] על העבודה שביצענו.
זה כבר [X] ימים מאז שסיימנו, ועדיין לא קיבלנו תשלום.

אנא הסדר את זה בהקדם — תודה מראש!
[שם העסק]`,
      },
    ],
  },

  confirm: {
    formal: [
      {
        title: 'אישור ביצוע עבודה',
        text: `לכבוד [שם הלקוח],

הריני לאשר כי העבודה שהוזמנה בתאריך [תאריך] בוצעה במלואה.
סוג העבודה: [תיאור העבודה]
כתובת: [כתובת]
סכום: ₪[סכום]

אנא אשר קבלת העבודה בחתימה על המסמך המצורף.

בכבוד,
[שם העסק]`,
      },
      {
        title: 'אישור קביעת ביקור',
        text: `לכבוד [שם הלקוח],

הביקור לביצוע [תיאור העבודה] נקבע לתאריך [תאריך] בשעה [שעה].
כתובת: [כתובת]

נא לוודא נוכחות ופינוי שטח העבודה.
לשינויים — צרו קשר בהקדם.

בכבוד,
[שם העסק]`,
      },
    ],
    casual: [
      {
        title: 'אישור ביצוע עבודה',
        text: `היי [שם הלקוח]! 🔨

רצינו להודיע שסיימנו את העבודה אצלך!
עשינו: [תיאור העבודה]
הכל עבד בסדר גמור 👍

אם יש שאלות או משהו לא כשורה — תתקשר ישר.
תודה שבחרת בנו!
[שם העסק]`,
      },
      {
        title: 'אישור קביעת ביקור',
        text: `היי [שם הלקוח] 👋

אישור: נגיע אליך ב-[תאריך] בשעה [שעה] לטיפול ב[תיאור העבודה].

🏠 כתובת: [כתובת]
📞 לכל שינוי — צור קשר

מחכים לראותך!
[שם העסק]`,
      },
    ],
  },

  followup: {
    formal: [
      {
        title: 'מעקב אחר הצעת מחיר',
        text: `לכבוד [שם הלקוח],

שלחנו לך הצעת מחיר בתאריך [תאריך] בנוגע ל[תיאור].
לא קיבלנו עד כה את תשובתך.

אנו עומדים לרשותך לכל שאלה והבהרה.
נשמח לשמוע ממך בהקדם.

בכבוד,
[שם העסק]`,
      },
    ],
    casual: [
      {
        title: 'מעקב אחר הצעת מחיר',
        text: `היי [שם הלקוח] 😊

שלחנו לך הצעת מחיר לפני כמה ימים ל[תיאור] —
רציתי לבדוק אם קיבלת ואם יש שאלות?

אנחנו כאן בשבילך!
[שם העסק]`,
      },
      {
        title: 'בדיקת שביעות רצון',
        text: `היי [שם הלקוח]! 🌟

שבוע שעבר סיימנו אצלך את [תיאור העבודה] —
רציתי לדעת אם הכל תקין ואם אתה מרוצה?

אם יש משהו — פשוט תגיד ונסדר 💪
[שם העסק]`,
      },
    ],
  },

  cancel: {
    formal: [
      {
        title: 'ביטול ביקור',
        text: `לכבוד [שם הלקוח],

הינך מיודע בזאת כי הביקור שנקבע לתאריך [תאריך] בשעה [שעה] מבוטל.

הסיבה: [סיבה]

ניצור עמך קשר לקביעת מועד חלופי.

בכבוד,
[שם העסק]`,
      },
    ],
    casual: [
      {
        title: 'ביטול ביקור',
        text: `היי [שם הלקוח],

סליחה! 🙏 צריכים לבטל את הביקור שתכננו ל[תאריך].
[סיבה]

נחזור אליך לתאם מועד חדש בהקדם!
[שם העסק]`,
      },
      {
        title: 'דחיית ביקור',
        text: `היי [שם הלקוח] 👋

משהו הסתבך אצלנו ל[תאריך] — האם אפשר להזיז ל[תאריך חלופי]?

ממש מצטערים על אי הנוחות!
[שם העסק]`,
      },
    ],
  },

  thanks: {
    formal: [
      {
        title: 'תודה לאחר עבודה',
        text: `לכבוד [שם הלקוח],

תודה רבה על אמונך בשירותינו ועל ההזדמנות לבצע עבור [תיאור העבודה].
אנו מקווים כי שביעות רצונך מהעבודה מלאה.

נשמח לעמוד לשירותך בכל פעם.

בכבוד,
[שם העסק]`,
      },
    ],
    casual: [
      {
        title: 'תודה לאחר עבודה',
        text: `היי [שם הלקוח]! 🙏

תודה ענקית שבחרת בנו! שמחנו מאוד לעבוד אצלך.
אם תצטרך אותנו שוב — אנחנו תמיד פה 💪

ממליצים לחברים? זה העזרה הכי גדולה שאפשר לתת לנו ❤️
[שם העסק]`,
      },
      {
        title: 'חג שמח ללקוח',
        text: `[שם הלקוח] יקר/ה,

חג [שם החג] שמח וסוכרייה! 🎉
מאחלים לך ולמשפחתך בריאות, אושר, ושנה מלאה בהצלחה.

תמיד שמחים לשרת,
[שם העסק]`,
      },
    ],
  },

  quote: {
    formal: [
      {
        title: 'שליחת הצעת מחיר',
        text: `לכבוד [שם הלקוח],

בהמשך לפנייתך, הריני לשלוח הצעת מחיר עבור: [תיאור העבודה].

סה"כ עלות משוערת: ₪[סכום] + מע"מ
כולל: [מה כולל]
אינו כולל: [מה לא כולל]
תקף עד: [תאריך]

לאישור ותיאום — ניתן ליצור קשר.

בכבוד,
[שם העסק]`,
      },
    ],
    casual: [
      {
        title: 'שליחת הצעת מחיר',
        text: `היי [שם הלקוח] 😊

הכנתי לך הצעת מחיר ל[תיאור העבודה]:

💰 סה"כ: ₪[סכום] (כולל מע"מ)
✅ כולל: [מה כולל]
📅 תקף עד: [תאריך]

שאלות? תכתוב ישר 🙏
[שם העסק]`,
      },
    ],
  },
};

/* ─── Template Card ─── */
function TemplateCard({ template, tone }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(template.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const waText = encodeURIComponent(template.text);

  return (
    <div className={`msg-card msg-card--${tone}`}>
      <div className="msg-card__title">{template.title}</div>
      <div className="msg-card__text">{template.text}</div>
      <div className="msg-card__actions">
        <button type="button" className="msg-card__btn msg-card__btn--copy" onClick={handleCopy}>
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              הועתק!
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              העתק טקסט
            </>
          )}
        </button>
        <a
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="msg-card__btn msg-card__btn--wa"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          שלח ב-WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function MessagesPage() {
  const [activeCat, setActiveCat] = useState('payment');
  const [tone, setTone] = useState('casual');

  const templates = TEMPLATES[activeCat]?.[tone] || [];

  return (
    <Layout title="תבניות הודעות" mainClass="messages-page">

      {/* ראובן header card */}
      <div className="px-container">
        <div className="msg-reuven-card">
          <div className="msg-reuven-card__avatar">
            <ReuvenFace size={48} />
            <span className="msg-reuven-card__dot" />
          </div>
          <div className="msg-reuven-card__text">
            <div className="msg-reuven-card__title">תבניות הודעות מוכנות</div>
            <div className="msg-reuven-card__sub">בחר קטגוריה וסגנון — העתק ושלח ב-WhatsApp</div>
          </div>
        </div>
      </div>

      {/* Tone toggle */}
      <div className="px-container">
        <div className="msg-tone-toggle">
          <button
            type="button"
            className={`msg-tone-btn${tone === 'formal' ? ' msg-tone-btn--active' : ''}`}
            onClick={() => setTone('formal')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            רשמי / עסקי
          </button>
          <button
            type="button"
            className={`msg-tone-btn${tone === 'casual' ? ' msg-tone-btn--active' : ''}`}
            onClick={() => setTone('casual')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ידידותי / קולח
          </button>
        </div>
      </div>

      {/* Tone description */}
      <div className="px-container">
        <div className="msg-tone-desc">
          {tone === 'formal'
            ? '📋 טקסט רשמי — מתאים לחשבוניות, מסמכים רשמיים ולקוחות עסקיים'
            : '😊 טקסט ידידותי — מתאים לוואטסאפ, SMS ולקוחות פרטיים'}
        </div>
      </div>

      {/* Category chips */}
      <div className="px-container">
        <div className="msg-cats">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`msg-cat-chip${activeCat === cat.id ? ' msg-cat-chip--active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="px-container">
        {templates.length > 0 ? (
          <div className="msg-list">
            {templates.map((t, i) => (
              <TemplateCard key={i} template={t} tone={tone} />
            ))}
          </div>
        ) : (
          <div className="msg-empty">
            <div className="msg-empty__icon">📝</div>
            <div className="msg-empty__text">אין תבניות לקטגוריה זו בסגנון זה</div>
          </div>
        )}
      </div>

      {/* Tip */}
      <div className="px-container">
        <div className="msg-tip">
          <ReuvenFace size={28} />
          <div className="msg-tip__text">
            <strong>טיפ מראובן:</strong> החלף את השדות בסוגריים [כך] בפרטים האמיתיים לפני השליחה.
          </div>
        </div>
      </div>

    </Layout>
  );
}
