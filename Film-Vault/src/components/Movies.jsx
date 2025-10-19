import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import Pagination from './Pagination'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // controlled input and applied query (appliedQuery triggers fetch)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('') // empty = use default

  const defaultQuery = 'guardians' // used when nothing searched

  useEffect(() => {
    const key = import.meta.env.VITE_OMDB_API_KEY
    if (!key) {
      setError('OMDb API key not found. Set VITE_OMDB_API_KEY in .env')
      setLoading(false)
      return
    }

    const effectiveQuery = (searchQuery && searchQuery.trim()) || defaultQuery

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const searchRes = await axios.get('https://www.omdbapi.com/', {
          params: { apikey: key, s: effectiveQuery, type: 'movie', page }
        })

        if (searchRes.data.Response === 'False') {
          setMovies([])
          setTotalResults(0)
          setError(searchRes.data.Error || 'No results')
          return
        }

        const list = searchRes.data.Search || []
        setTotalResults(Number(searchRes.data.totalResults || 0))

        // optionally fetch full details for each item on this page
        const details = await Promise.all(
          list.map(async (item) => {
            try {
              const r = await axios.get('https://www.omdbapi.com/', {
                params: { apikey: key, i: item.imdbID, plot: 'short' }
              })
              return r.data
            } catch (e) {
              // fallback to search item if detail fetch fails
              return item
            }
          })
        )

        setMovies(details)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch movies')
        setMovies([])
        setTotalResults(0)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
    // run when page or applied search query changes
  }, [page, searchQuery])

  const totalPages = Math.max(1, Math.ceil(totalResults / 10) || 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    // apply the typed query (empty string will use defaultQuery)
    setPage(1)
    setSearchQuery(searchInput.trim())
  }

  const handleClear = () => {
    setSearchInput('')
    setSearchQuery('') // will use defaultQuery
    setPage(1)
  }

  if (loading) return <div className="text-center m-4">Loading...</div>
  if (error) return <div className="text-center m-4 text-red-500">{error}</div>

  return (
    <div className="mx-4">
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 my-4">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search movies (e.g. batman, inception)..."
          className="w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
        <button type="button" onClick={handleClear} className="px-3 py-2 bg-gray-200 rounded">Clear</button>
      </form>

      <div className="text-xl font-bold m-4 text-center">
        Showing: { (searchQuery && searchQuery.trim()) || defaultQuery }
      </div>

      <div className="flex flex-row justify-center flex-wrap">
        {movies.length === 0 ? (
          <div className="text-center p-8">No movies found.</div>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID || movie.Title} movie={movie} />
          ))
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
    </div>
  )
}

export default Movies