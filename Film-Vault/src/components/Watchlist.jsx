import React, { useMemo, useState } from 'react'

const Watchlist = ({ watchlist = [], onRemove = () => {} }) => {
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState(null) // 'asc' | 'desc' | null

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase()
    if (!q) return watchlist
    return watchlist.filter((m) => {
      const title = (m?.Title || m?.title || '').toString().toLowerCase()
      const genre = (m?.Genre || '').toString().toLowerCase()
      const year = (m?.Year || '').toString().toLowerCase()
      return title.includes(q) || genre.includes(q) || year.includes(q)
    })
  }, [watchlist, query])

  const sorted = useMemo(() => {
    if (!sortOrder) return filtered
    const copy = [...filtered]
    copy.sort((a, b) => {
      const ra = parseFloat(a?.imdbRating) || 0
      const rb = parseFloat(b?.imdbRating) || 0
      if (ra === rb) {
        const ta = (a?.Title || a?.title || '').toString().toLowerCase()
        const tb = (b?.Title || b?.title || '').toString().toLowerCase()
        return ta.localeCompare(tb)
      }
      return sortOrder === 'asc' ? ra - rb : rb - ra
    })
    return copy
  }, [filtered, sortOrder])

  const handleSortClick = (order) => {
    setSortOrder((prev) => (prev === order ? null : order))
  }

  return (
    <>
      <div className='flex justify-center flex-wrap m-4'>
        <div className='bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center mx-4'>Action</div>
        <div className='bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center'>Action</div>
      </div>

      <div className='flex justify-center my-4'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search your watchlist...'
          className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4'
        />
      </div>

      <div className='border border-gray-500 m-8 rounded-lg overflow-hidden'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th className='text-left pl-6'>Name</th>
              <th className='flex items-center justify-center gap-2'>
                <button
                  type='button'
                  onClick={() => handleSortClick('asc')}
                  aria-pressed={sortOrder === 'asc'}
                  className={`px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-blue-600 text-white' : 'bg-white'} hover:bg-gray-100`}
                  title='Sort by rating ascending'
                >
                  ↑
                </button>
                <span className='font-semibold'>Rating</span>
                <button
                  type='button'
                  onClick={() => handleSortClick('desc')}
                  aria-pressed={sortOrder === 'desc'}
                  className={`px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-blue-600 text-white' : 'bg-white'} hover:bg-gray-100`}
                  title='Sort by rating descending'
                >
                  ↓
                </button>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={5} className='p-8 text-center text-gray-600'>
                  Your watchlist is empty.
                </td>
              </tr>
            ) : (
              sorted.map((movie) => {
                const poster =
                  movie?.Poster && movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                const title = movie?.Title || movie?.title || 'Unknown'
                const rating = movie?.imdbRating || movie?.Rating || 'N/A'
                const popularity = movie?.imdbVotes || movie?.Popularity || 'N/A'
                const genre = movie?.Genre || 'N/A'
                const id = movie?.imdbID || movie?.id || title

                return (
                  <tr key={id} className='border-b-2'>
                    <td className='flex items-center px-6 py-4 text-left'>
                      <img className='h-[6rem] w-[10rem] object-cover' src={poster} alt={title} />
                      <div className='mx-10'>{title}</div>
                    </td>
                    <td className='align-middle'>{rating}</td>
                    <td className='align-middle'>{popularity}</td>
                    <td className='align-middle'>{genre}</td>
                    <td className='align-middle'>
                      <button
                        type='button'
                        onClick={() => onRemove(id)}
                        className='text-red-800'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Watchlist