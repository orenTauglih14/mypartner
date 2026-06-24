export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      className={`filter-chip${active ? ' filter-chip--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
