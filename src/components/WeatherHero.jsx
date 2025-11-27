function WeatherHero({ weather, loading, statusNote }) {
  if (!weather && !loading) {
    return (
      <div className="panel hero">
        <p className="muted">Search for a city to see the weather.</p>
      </div>
    )
  }

  const formattedDate = weather
    ? new Date(weather.date).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : ''

  return (
    <div className="panel hero">
      {loading ? (
        <div className="hero-skeleton">
          <div className="line w-60" />
          <div className="line w-40" />
          <div className="line w-80" />
        </div>
      ) : (
        <>
          <div className="hero-header">
            <div>
              <p className="eyebrow">Current weather</p>
              <h2>{weather.city}</h2>
              <p className="subtle">
                {formattedDate} {weather.country ? `• ${weather.country}` : ''}
              </p>
            </div>
            {weather.icon && (
              <img
                className="hero-icon"
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
              />
            )}
          </div>
          <div className="hero-body">
            <div className="temp">{Math.round(weather.temp)}°C</div>
            <div>
              <p className="description">{weather.main}</p>
              <p className="subtle">{weather.description}</p>
              <div className="chips">
                <span className="chip">Feels like {Math.round(weather.feelsLike)}°C</span>
                <span className="chip">Min {Math.round(weather.min)}°C</span>
                <span className="chip">Max {Math.round(weather.max)}°C</span>
              </div>
            </div>
          </div>
          {statusNote && <p className="muted status-note">{statusNote}</p>}
        </>
      )}
    </div>
  )
}

export default WeatherHero
