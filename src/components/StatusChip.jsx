const statusMap = {
  new: { label: 'חדש', variant: 'primary' },
  active: { label: 'בטיפול', variant: 'warn' },
  closed: { label: 'נסגר', variant: 'neutral' },
  paid: { label: 'שולם', variant: 'success' },
  pending: { label: 'ממתין', variant: 'warn' },
  overdue: { label: 'באיחור', variant: 'danger' },
  hot: { label: 'פנייה חמה', variant: 'hot' },
};

export default function StatusChip({ status, label, variant }) {
  const resolved = statusMap[status] || { label: label || status, variant: variant || 'neutral' };
  return (
    <span className={`chip chip--${resolved.variant}`}>
      {label || resolved.label}
    </span>
  );
}
