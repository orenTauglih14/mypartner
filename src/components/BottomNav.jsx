import { NavLink } from 'react-router-dom';

function ReuvenFace() {
  return (
    <svg width="46" height="46" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', display: 'block' }}>
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

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'בית',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: '/customers',
    label: 'לקוחות',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: '/agent',
    label: 'ראובן',
    ai: true,
  },
  {
    to: '/quotes',
    label: 'הצעות',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    to: '/more',
    label: 'עוד',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav__item${item.ai ? ' bottom-nav__item--ai' : ''}${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          {() => (
            <>
              {!item.ai && <div className="bottom-nav__indicator" />}
              <div className={item.ai ? 'bottom-nav__ai-btn' : 'bottom-nav__icon'}>
                {item.ai ? <ReuvenFace /> : item.icon}
              </div>
              <span className="bottom-nav__label">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
