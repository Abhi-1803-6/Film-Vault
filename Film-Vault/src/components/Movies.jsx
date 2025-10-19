import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const key = import.meta.env.VITE_OMDB_API_KEY
    if (!key) {
      setError('OMDb API key not found. Set VITE_OMDB_API_KEY in .env')
      setLoading(false)
      return
    }

    const fetchMovies = async () => {
      try {
        // first get a search list (change query as needed)
        const searchQuery = 'guardians'
        const searchRes = await axios.get('https://www.omdbapi.com/', {
          params: { apikey: key, s: searchQuery, type: 'movie' }
        })
        const list = searchRes.data.Search || []

        // fetch full details for up to 8 results
        const details = await Promise.all(
          list.slice(0, 8).map(async (item) => {
            const r = await axios.get('https://www.omdbapi.com/', {
              params: { apikey: key, i: item.imdbID, plot: 'short' }
            })
            return r.data
          })
        )

        setMovies(details)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) return <div className="text-center m-4">Loading...</div>
  if (error) return <div className="text-center m-4 text-red-500">{error}</div>

  return (
    <div>
       <div className='text-xl font-bold m-4 text-center'>
          Trending Movies
       </div>
       <div className='flex flex-row justify-around flex-wrap'>
            {movies.length === 0
              ? <MovieCard />
              : movies.map(movie => <MovieCard key={movie.imdbID || movie.Title} movie={movie} />)
            }
       </div>
    </div>
  )
}

export default Movies