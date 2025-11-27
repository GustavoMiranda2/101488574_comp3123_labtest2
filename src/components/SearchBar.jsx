import { useEffect, useState } from 'react'

function SearchBar({ onSearch, defaultCity = '' }) {
  const [value, setValue] = useState(defaultCity)

  useEffect(() => {
    setValue(defaultCity)
  }, [defaultCity])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSearch(value.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" aria-label="Search city">
        Search
      </button>
    </form>
  )
}

export default SearchBar
