export default function Card({ children, variant = 'default', className = '', style = {} }) {
  const cls = [
    'card',
    variant === 'navy' ? 'card--navy' : '',
    variant === 'tint' ? 'card--tint' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
