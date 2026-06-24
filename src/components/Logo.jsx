export default function Logo({ size = 32, dark = false }) {
  const bg = dark ? '#FFFFFF' : '#0050CB';
  const fg = dark ? '#0050CB' : '#FFFFFF';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Icon: rounded square chat bubble with M + spark */}
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill={bg} />
        {/* M letter */}
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontFamily="Rubik, sans-serif"
          fontWeight="800"
          fontSize="16"
          fill={fg}
        >M</text>
        {/* Spark dot top-right */}
        <circle cx="25" cy="7" r="3" fill={dark ? '#0050CB' : '#FFFFFF'} opacity="0.9" />
        <circle cx="25" cy="7" r="1.5" fill={dark ? '#0066FF' : '#E6EEFF'} />
      </svg>

      {/* Wordmark */}
      <span style={{
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 800,
        fontSize: size * 0.56,
        color: dark ? '#FFFFFF' : '#131B2E',
        letterSpacing: '-0.3px',
        lineHeight: 1,
      }}>
        MyPartner<span style={{ color: '#0050CB' }}>.</span>
      </span>
    </div>
  );
}
