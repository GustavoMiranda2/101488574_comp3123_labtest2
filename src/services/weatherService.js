const API_BASE = 'https://api.openweathermap.org/data/2.5/weather'

/**
 * Fetch weather by city name using OpenWeatherMap current-weather endpoint.
 * Uses metric units by default.
 */
export async function fetchWeather(city) {
  if (!city) {
    throw new Error('City is required to fetch weather data.')
  }

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) {
    throw new Error('Missing OpenWeather API key. Set VITE_OPENWEATHER_API_KEY in your .env file.')
  }

  const url = `${API_BASE}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  const response = await fetch(url)

  if (!response.ok) {
    const message = response.status === 404 ? 'City not found. Try another search.' : 'Unable to fetch weather data.'
    throw new Error(message)
  }

  return response.json()
}
