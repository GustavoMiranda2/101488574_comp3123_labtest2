const formatValue = (value, suffix) => {
  if (value === null || value === undefined) return '—'
  return `${value}${suffix ?? ''}`
}

function StatsGrid({ stats = [], loading }) {
  if (loading) {
    return (
      <div className="stats-grid">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div className="panel stat-card skeleton" key={idx}>
            <div className="line w-40" />
            <div className="line w-60" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <div className="panel stat-card" key={item.label}>
          <p className="eyebrow">{item.label}</p>
          <p className="stat-value">{formatValue(item.value, item.suffix)}</p>
          {item.note && <p className="subtle">{item.note}</p>}
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
