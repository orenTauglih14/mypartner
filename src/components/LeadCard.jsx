import StatusChip from './StatusChip';

const statusKeyMap = {
  'חדש': 'new',
  'בטיפול': 'active',
  'נסגר': 'closed',
};

export default function LeadCard({ lead }) {
  const { name, jobType, date, phone, status, hot } = lead;
  const statusKey = statusKeyMap[status] || 'neutral';

  return (
    <div className="lead-card">
      <div className="lead-card__header">
        <div className="lead-card__identity">
          <div className="lead-card__avatar">{name.charAt(0)}</div>
          <div>
            <div className="lead-card__name">{name}</div>
            <div className="lead-card__job">{jobType}</div>
          </div>
        </div>
        <div className="lead-card__meta">
          <div className="lead-card__date">{date}</div>
          <StatusChip status={statusKey} />
        </div>
      </div>

      {hot && (
        <div className="lead-card__hot">
          <span className="lead-card__hot-dot" />
          פנייה חמה
        </div>
      )}

      <div className="lead-card__phone">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z" />
        </svg>
        <span>{phone}</span>
      </div>

      <div className="lead-card__actions">
        <button type="button" className="lead-card__action lead-card__action--call">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z" />
          </svg>
          התקשר
        </button>
        <button type="button" className="lead-card__action lead-card__action--open">
          פתח לקוח
        </button>
        <button type="button" className="lead-card__action lead-card__action--quote">
          צור הצעת מחיר
        </button>
      </div>
    </div>
  );
}
