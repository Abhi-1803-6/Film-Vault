import { useEffect, useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import Watchlist from './components/Watchlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const STORAGE_KEY = 'filmvault_watchlist_v1'

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.error('Failed to read watchlist from localStorage', e)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e)
    }
  }, [watchlist])

  const handleAddtoWatchList = (movie) => {
    if (!movie || !movie.imdbID) return
    setWatchlist((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev
      return [...prev, movie]
    })
  }

  const handleRemoveFromWatchList = (imdbID) => {
    setWatchlist((prev) => prev.filter((m) => m.imdbID !== imdbID))
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  handleAddtoWatchList={handleAddtoWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} onRemove={handleRemoveFromWatchList} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App