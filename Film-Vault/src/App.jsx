import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import Watchlist from './components/Watchlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [watchlist, setWatchlist] = useState([])

  const handleAddToWatchlist = (movie) => {
    if (!movie || !movie.imdbID) return
    setWatchlist(prev => {
      if (prev.some(m => m.imdbID === movie.imdbID)) return prev
      return [...prev, movie]
    })
  }

  const handleRemoveFromWatchlist = (imdbID) => {
    setWatchlist(prev => prev.filter(m => m.imdbID !== imdbID))
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
                  handleAddtoWatchList={handleAddToWatchlist}
                  handleRemoveFromWatchList={handleRemoveFromWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} onRemove={handleRemoveFromWatchlist} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App