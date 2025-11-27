import { useEffect, useMemo, useState } from 'react'
import IdentityBar from './components/IdentityBar'
import SearchBar from './components/SearchBar'
import StatsGrid from './components/StatsGrid'
import WeatherHero from './components/WeatherHero'
import { fetchWeather } from './services/weatherService'
import './App.css'

function formatWeather(payload) {
  if (!payload || !payload.main) return null

  const isKelvin = payload.main.temp > 200
  const toCelsius = (value) => Math.round((value - 273.15) * 10) / 10
  const temp = isKelvin ? toCelsius(payload.main.temp) : payload.main.temp
  const feelsLike = isKelvin ? toCelsius(payload.main.feels_like) : payload.main.feels_like
  const min = isKelvin ? toCelsius(payload.main.temp_min) : payload.main.temp_min
  const max = isKelvin ? toCelsius(payload.main.temp_max) : payload.main.temp_max

  const visibilityKm =
    typeof payload.visibility === 'number' ? Math.max(payload.visibility / 1000, 0).toFixed(1) : null
  const windKmh =
    payload.wind && typeof payload.wind.speed === 'number'
      ? Math.round(payload.wind.speed * 3.6)
      : null

  const timezoneOffset = payload.timezone ?? 0
  const localDate = (payload.dt + timezoneOffset) * 1000

  const sunrise = payload.sys?.sunrise ? (payload.sys.sunrise + timezoneOffset) * 1000 : null
  const sunset = payload.sys?.sunset ? (payload.sys.sunset + timezoneOffset) * 1000 : null

  return {
    city: payload.name,
    country: payload.sys?.country,
    main: payload.weather?.[0]?.main ?? '',
    description: payload.weather?.[0]?.description ?? '',
    icon: payload.weather?.[0]?.icon,
    temp,
    feelsLike,
    min,
    max,
    pressure: payload.main.pressure,
    humidity: payload.main.humidity,
    visibilityKm,
    windKmh,
    sunrise,
    sunset,
    date: localDate
  }
}

function App() {
  const DEFAULT_CITY = 'Toronto'

  const [city, setCity] = useState(DEFAULT_CITY)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusNote, setStatusNote] = useState('')

  const stats = useMemo(() => {
    if (!weather) return []
    return [
      { label: 'Humidity', value: weather.humidity, suffix: '%', note: 'Air moisture' },
      { label: 'Wind', value: weather.windKmh, suffix: ' km/h', note: 'Speed' },
      { label: 'Pressure', value: weather.pressure, suffix: ' hPa' },
      { label: 'Visibility', value: weather.visibilityKm, suffix: ' km' }
    ]
  }, [weather])

  const loadWeather = async (cityName) => {
    setLoading(true)
    setError('')
    setStatusNote('')
    try {
      const data = await fetchWeather(cityName)
      setWeather(formatWeather(data))
      setStatusNote('')
    } catch (err) {
      setWeather(null)
      setError(err.message)
      setStatusNote('Check the city spelling or try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeather(DEFAULT_CITY)
  }, [])

  const handleSearch = (nextCity) => {
    setCity(nextCity)
    loadWeather(nextCity)
  }

  return (
    <div className="app-shell">
      <div className="bg-overlay" />
      <div className="content">
        <IdentityBar />
        <section className="panel hero-shell">
          <div className="hero-top">
            <div>
              <p className="label">Real-time weather insight</p>
              <h2 className="title">Find the forecast for any city</h2>
            </div>
            <div className="api-chip">OpenWeatherMap</div>
          </div>
          <SearchBar onSearch={handleSearch} defaultCity={city} />
          {error && <div className="error">{error}</div>}
        </section>

        <section className="layout">
          <WeatherHero weather={weather} loading={loading} statusNote={statusNote} />
          <div className="panel details">
            <p className="eyebrow">Quick stats</p>
            <StatsGrid stats={stats} loading={loading} />
            {weather?.sunrise && weather?.sunset && (
              <div className="sun-row">
                <div>
                  <p className="eyebrow">Sunrise</p>
                  <p className="subtle">{new Date(weather.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div>
                  <p className="eyebrow">Sunset</p>
                  <p className="subtle">{new Date(weather.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
