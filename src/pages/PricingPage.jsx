import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import './PricingPage.css';

const PLANS = [
  {
    key: 'basic',
    name: 'בסיסי',
    priceMonthly: 99,
    priceAnnual: 79,
    desc: 'מתאים לעצמאי שמתחיל',
    features: ['עד 20 לידים בחודש', 'הצעות מחיר בסיסיות', 'יומן ביקורים', 'תמיכה במייל'],
    cta: 'התחל בחינם',
    recommended: false,
  },
  {
    key: 'pro',
    name: 'מקצועי',
    priceMonthly: 199,
    priceAnnual: 159,
    desc: 'הכי פופולרי לבעלי עסק פעיל',
    features: ['לידים ולקוחות ללא הגבלה', 'AI לכתיבת הצעות מחיר', 'ניהול תשלומים וגבייה', 'תזכורות אוטומטיות', 'CRM מלא', 'תמיכה מועדפת'],
    cta: 'התחל עכשיו',
    recommended: true,
  },
  {
    key: 'premium',
    name: 'פרמיום',
    priceMonthly: 349,
    priceAnnual: 279,
    desc: 'לעסק גדול עם צוות',
    features: ['כל מה שב-מקצועי', 'עד 5 משתמשים', 'לוגו מותאם אישית', 'API גישה', 'מנהל חשבון אישי'],
    cta: 'דבר איתנו',
    recommended: false,
  },
];

const COMPARE_ROWS = [
  { feature: 'לידים', basic: '20/חודש', pro: 'ללא הגבלה', premium: 'ללא הגבלה' },
  { feature: 'AI הצעות מחיר', basic: false, pro: true, premium: true },
  { feature: 'גבייה אוטומטית', basic: false, pro: true, premium: true },
  { feature: 'תזכורות', basic: false, pro: true, premium: true },
  { feature: 'משתמשים', basic: '1', pro: '1', premium: '5' },
  { feature: 'תמיכה', basic: 'מייל', pro: 'עדיפות', premium: 'אישית 24/7' },
];

const FAQ = [
  { q: 'האם יש חוזה מחייב?', a: 'לא. אפשר לבטל בכל עת, ללא קנסות.' },
  { q: 'האם אני יכול לשנות תוכנית?', a: 'כן, בכל עת. שינוי ישפיע על החיוב הבא.' },
  { q: 'מה כולל ה-AI?', a: 'הסוכן לומד את פריטי העבודה שלך ומייצר הצעות מחיר מותאמות מדיקטציה קולית.' },
  { q: 'האם יש תקופת ניסיון?', a: '14 יום חינם, ללא כרטיס אשראי.' },
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const X = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-ghost)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pricing-page">
      {/* Back */}
      <header className="pricing-header">
        <Logo size={28} />
        <Link to="/more" className="pricing-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </Link>
      </header>

      {/* Hero */}
      <section className="pricing-hero px-container">
        <span className="chip chip--primary" style={{ marginBottom: 14, display: 'inline-flex' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          בחר תוכנית
        </span>
        <h1 className="pricing-hero__title">מחיר ישר.<br />ערך אמיתי.</h1>
        <p className="pricing-hero__sub">ללא עמלות מוסתרות. ביטול בכל עת.</p>
      </section>

      {/* Social proof */}
      <section className="px-container pricing-social">
        <div className="pricing-avatars">
          {['א', 'מ', 'ר', 'י'].map((l, i) => (
            <div key={i} className="pricing-avatar" style={{ right: `${i * 22}px` }}>{l}</div>
          ))}
        </div>
        <span className="pricing-social__text">מעל 1,200 בעלי עסקים כבר משתמשים</span>
      </section>

      {/* Toggle */}
      <section className="px-container pricing-toggle-row">
        <span className={`pricing-toggle-label${!annual ? ' pricing-toggle-label--active' : ''}`}>חודשי</span>
        <div className={`pricing-toggle${annual ? ' pricing-toggle--on' : ''}`} onClick={() => setAnnual(!annual)}>
          <div className="pricing-toggle__thumb" />
        </div>
        <span className={`pricing-toggle-label${annual ? ' pricing-toggle-label--active' : ''}`}>
          שנתי
          <span className="pricing-save-badge">חיסכון 20%</span>
        </span>
      </section>

      {/* Plan cards */}
      <section className="px-container pricing-plans">
        {PLANS.map((plan) => (
          <div key={plan.key} className={`pricing-plan${plan.recommended ? ' pricing-plan--recommended' : ''}`}>
            {plan.recommended && (
              <div className="pricing-plan__badge">הכי פופולרי</div>
            )}
            <div className="pricing-plan__top">
              <div className="pricing-plan__name">{plan.name}</div>
              <div className="pricing-plan__desc">{plan.desc}</div>
            </div>
            <div className="pricing-plan__price">
              <span className="pricing-plan__currency">₪</span>
              <span className="pricing-plan__amount">
                {annual ? plan.priceAnnual : plan.priceMonthly}
              </span>
              <span className="pricing-plan__period">/חודש</span>
            </div>
            {annual && (
              <div className="pricing-plan__annual-note">
                מחויב שנתית — ₪{annual ? plan.priceAnnual * 12 : plan.priceMonthly * 12} בשנה
              </div>
            )}
            <ul className="pricing-plan__features">
              {plan.features.map((f, i) => (
                <li key={i} className="pricing-plan__feature">
                  <Check /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard"
              className={`btn btn--lg btn--full ${plan.recommended ? 'btn--dark' : 'btn--outline'}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* Comparison table */}
      <section className="px-container pricing-compare">
        <div className="pricing-compare__title">השוואת תוכניות</div>
        <div className="pricing-compare__table">
          <div className="pricing-compare__header">
            <div className="pricing-compare__feat" />
            {PLANS.map((p) => (
              <div key={p.key} className={`pricing-compare__col-head${p.recommended ? ' pricing-compare__col-head--active' : ''}`}>
                {p.name}
              </div>
            ))}
          </div>
          {COMPARE_ROWS.map((row, i) => (
            <div key={i} className="pricing-compare__row">
              <div className="pricing-compare__feat">{row.feature}</div>
              {['basic', 'pro', 'premium'].map((k) => (
                <div key={k} className="pricing-compare__cell">
                  {typeof row[k] === 'boolean'
                    ? (row[k] ? <Check /> : <X />)
                    : <span>{row[k]}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-container pricing-testimonial">
        <div className="testimonial-card">
          <div className="testimonial-card__quote">"חסכתי שעות בשבוע. הצעות המחיר שלי נראות מקצועיות יותר, והלקוחות משלמים מהר יותר."</div>
          <div className="testimonial-card__author">
            <div className="testimonial-card__avatar">א</div>
            <div>
              <div className="testimonial-card__name">אבי כהן</div>
              <div className="testimonial-card__role">שיפוצניק, 12 שנות ניסיון</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-container pricing-faq">
        <div className="pricing-faq__title">שאלות נפוצות</div>
        {FAQ.map((item, i) => (
          <div key={i} className={`faq-item${openFaq === i ? ' faq-item--open' : ''}`}>
            <button type="button" className="faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <span>{item.q}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points={openFaq === i ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/>
              </svg>
            </button>
            {openFaq === i && (
              <div className="faq-item__a">{item.a}</div>
            )}
          </div>
        ))}
      </section>

      {/* Trust footer */}
      <footer className="pricing-footer">
        <span className="text-nano text-faint">🔒 SSL מאובטח</span>
        <span className="text-nano text-faint">·</span>
        <span className="text-nano text-faint">ביטול בכל עת</span>
        <span className="text-nano text-faint">·</span>
        <span className="text-nano text-faint">תמיכה בעברית</span>
      </footer>
      <Footer />
    </div>
  );
}
