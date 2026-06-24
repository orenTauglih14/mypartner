# MyPartner · Design System

> השותף החכם לניהול עסק מהשטח — מערכת עיצוב לאפליקציית מובייל פרימיום בעברית · RTL · Mobile-first

---

## Brand Identity

**Name:** MyPartner  
**Mark:** M גיאומטרי בתוך ריבוע-בועת-צ׳אט מעוגל, עם נקודה לבנה (spark) בפינה הימנית עליונה.  
**Wordmark:** `MyPartner.` (סיומת בנקודה כחולה)  
**Tagline:** "השותף החכם לניהול העסק מהשטח"

**Brand personality:** חכם · אמין · מהיר · פרקטי · מותאם לשטח · עסקי · AI-powered · לא קורפורייט-משעמם.

---

## Color System

פלטה מונוכרומטית כחולה — Navy + Cobalt + Pale Blue Tint. ללא ירוק/ליים. צבעי סטטוס בלבד כששמיש.

### Primary

| Token | Hex | Use |
|---|---|---|
| `primary` | `#0050CB` | CTA ראשי, אקסנט, לוגו |
| `primaryBright` | `#0066FF` | Hover/highlight |
| `primaryDeep` | `#003FA4` | Pressed states |
| `primarySoft` | `#E6EEFF` | Backgrounds רכים, badges |
| `primaryGhost` | `#F2F3FF` | Surfaces סופר-עדינים |

### Ink (Text & Dark Surfaces)

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A1430` | Dark hero surfaces, AI tile bg |
| `ink2` | `#131B2E` | Primary text |
| `ink3` | `#2A3147` | Secondary text |
| `inkMute` | `#5B6377` | Labels, meta |
| `inkFaint` | `#9298AB` | Timestamps, hints |
| `inkGhost` | `#C2C6D8` | Dividers (heavy) |

### Surfaces

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FAF8FF` | App background |
| `white` | `#FFFFFF` | Card surfaces |
| `tint` | `#F2F3FF` | Soft surface |
| `tint2` | `#EAEDFF` | Slightly tinted |
| `border` | `#E2E5F2` | Card borders |
| `border2` | `#D2D6E5` | Heavier dividers |

### Status

| Token | Hex | Soft | Ink | Use |
|---|---|---|---|---|
| `success` | `#0AB571` | `#D6F5E8` | `#054934` | Paid, completed |
| `warn` | `#FF9533` | `#FFE7D1` | `#5A2C00` | Pending, attention |
| `danger` | `#E5484D` | `#FCE2E3` | `#7A0F12` | Overdue, errors |

### Usage Rules

- **Navy `ink`** = dark hero card per screen. תמיד עם טקסט לבן.
- **Primary `#0050CB`** = CTA יחיד דומיננטי.
- **Red `danger`** = רק חוב/פיגור/שגיאות.
- **Green `success`** = תשלום שהתקבל, סטטוס "פעיל".
- **Avoid:** gradients צבעוניים, ניאון, צבעים סלסליים.

---

## Typography

**Family:** Rubik (primary), Heebo fallback, system-ui  
**Mono:** JetBrains Mono — למספרים טכניים (זמן הקלטה, מספרי חשבונית)

### Scale

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display` | 32-34px | 800 | 1.05-1.1 | Hero titles |
| `h1` | 26px | 800 | 1.2 | Screen titles |
| `h2` | 22px | 800 | 1.2 | Section heroes |
| `h3` | 17-20px | 700 | 1.3 | Section titles |
| `body` | 14px | 500 | 1.5 | Default body |
| `bodySmall` | 13px | 500 | 1.45 | Card text |
| `caption` | 12px | 600 | 1.4 | Meta, labels |
| `micro` | 11px | 600/700 | 1.3 | Tags, badges |
| `nano` | 10-10.5px | 600 | 1.3 | Timestamps, fine print |

### Numbers (Stats & Pricing)

- **Money huge:** 28-40px / weight 800 / letter-spacing -0.9 to -1.5px
- **Stat tile:** 24px / weight 800 / -0.8 letter-spacing
- **Mono timer:** 18-22px JetBrains Mono / weight 800

---

## Spacing & Radii

### Spacing Scale

| Token | Value | Use |
|---|---|---|
| `base` | 8px | Default unit |
| `stack-sm` | 12px | Tight stacks |
| `gutter` | 16px | Grid gaps |
| `stack-md` | 24px | Section spacing |
| `container` | 20px | Edge margin |
| `stack-lg` | 48px | Major separation |

### Radii

| Token | Value | Use |
|---|---|---|
| `xs` | 6-7px | Tiny chips |
| `sm` | 9-10px | Buttons inline |
| `md` | 11-12px | Action buttons |
| `lg` | 14-16px | Form fields, list cards |
| `xl` | 18-22px | Hero cards |
| `pill` | 999px | Chips, status pills |

### Shadows

- **Card:** `0 1px 2px rgba(15,30,80,0.04), 0 8px 24px rgba(15,30,80,0.04)`
- **Button primary:** `0 6px 18px rgba(0,80,203,0.28)`
- **Hero:** `0 16px 40px rgba(10,20,48,0.18)`
- **FAB:** `0 10px 28px rgba(0,80,203,0.50)`

---

## Layout Principles

1. **Single dominant dark card per screen** — נייבי `ink` כ"גיבור" אחד.
2. **Navbar (56px top) + Footer/BottomNav (64px bottom)** — תוכן חי בין שניהם.
3. **Bottom nav glass blur (64px)** — קבוע במסכים ראשיים.
4. **Edge margin 18-20px** — מסכים נושמים.
5. **Cards gap 10-14px** — לא דחוסים, לא מרווחים מדי.

### Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | 375px | Default — single column, bottom nav |
| Tablet | 768px | Wider container, side nav option |
| Desktop | 1024px+ | Max-width centered, traditional nav |

---

## Component Atoms

### Buttons

| Kind | Background | Foreground | Use |
|---|---|---|---|
| `primary` | `#0050CB` | white | פעולה ראשית |
| `bright` | `#0066FF` | white | אקסנט |
| `dark` | `#131B2E` | white | פעולה משנית כהה |
| `ghost` | transparent | primary | Tertiary |
| `outline` | white | `#2A3147` | פעולות שניוניות |
| `soft` | `#F2F3FF` | `#2A3147` | Subtle |
| `danger` | `#E5484D` | white | פעולה הרסנית |

**Sizes:** `sm` (36px), `md` (48px), `lg` (56px)  
**Radius:** 12-14px  
**Animation:** `active:scale-95` — 100ms

### Cards

```css
background: white;
border: 1px solid #E2E5F2;
border-radius: 18-22px;
padding: 14-18px;
box-shadow: 0 1px 2px rgba(15,30,80,0.04);
```

### Input Field

- Height: 48-52px / radius 14px
- Border: 1.5px `#D2D6E5` → `#0050CB` (focus) → `#E5484D` (error)

### Navbar (Top App Bar)

- Height: 56px
- Fixed top
- Glass blur: `backdrop-filter: blur(16px)`
- Logo right (RTL), actions left
- Back button on sub-pages

### Footer / Bottom Nav (5 items)

- Height: 64px (mobile bottom nav) + 40px copyright strip
- Glass: `backdrop-filter: blur(16px)` + `rgba(255,255,255,0.92)`
- Items: דשבורד · לידים · הצעות · יומן · עוד
- Active: tab indicator 36×4px top + primary color

---

## File Structure

```
src/
├── styles/
│   └── globals.css          CSS Variables + base styles
├── components/
│   ├── Navbar.jsx           Top navigation bar
│   ├── Footer.jsx           Bottom footer / copyright
│   ├── Layout.jsx           Page wrapper (Navbar + content + Footer)
│   ├── BottomNav.jsx        Mobile bottom navigation (5 tabs)
│   ├── AppHeader.jsx        Legacy top bar (used internally by Navbar)
│   ├── Logo.jsx             Brand mark + wordmark
│   ├── Button.jsx           Button component (variants + sizes)
│   ├── Card.jsx             Card wrapper (white/navy/tint)
│   ├── StatCard.jsx         Stat tile with label + number
│   ├── StatusChip.jsx       Status indicator chip
│   ├── FilterChip.jsx       Toggle filter button
│   └── LeadCard.jsx         Lead list item card
└── pages/
    ├── WelcomePage.jsx      Landing / onboarding entry
    ├── LoginPage.jsx        Authentication
    ├── OnboardingPage.jsx   AI business setup
    ├── DashboardPage.jsx    Business overview
    ├── LeadsPage.jsx        Incoming leads management
    ├── CustomersPage.jsx    CRM customer list
    ├── CalendarPage.jsx     Visit schedule
    ├── QuotesPage.jsx       Quote management
    ├── CreateQuotePage.jsx  3-step quote builder
    ├── PaymentsPage.jsx     Payment tracking
    ├── CollectionsPage.jsx  Debt collection dashboard
    ├── RemindersPage.jsx    Automated reminders
    ├── PricingPage.jsx      Plans & pricing
    └── MorePage.jsx         Additional menu
```

---

## Design DNA

> **לבן הרבה · נייבי כשצריך · קובלט אחד דומיננטי · ללא ניאון · ללא קישוט מיותר · מספרים גדולים · הירארכיה ברורה · RTL נכון.**
