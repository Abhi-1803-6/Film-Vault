import React, { useMemo, useState } from 'react'

const Watchlist = ({ watchlist = [], onRemove = () => {} }) => {
  const [query, setQuery] = useState('')

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
              <th>Name</th>
              <th>Rating</th>
              <th>Popularity</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className='p-8 text-center text-gray-600'>
                  Your watchlist is empty.
                </td>
              </tr>
            ) : (
              filtered.map((movie) => {
                const poster =
                  movie?.Poster && movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                const title = movie?.Title || movie?.title || 'Unknown'
                const rating = movie?.imdbRating || movie?.Rating || 'N/A'
                const popularity = movie?.imdbVotes || movie?.Popularity || 'N/A'
                const genre = movie?.Genre || 'N/A'
                const id = movie?.imdbID || movie?.id

                return (
                  <tr key={id || title} className='border-b-2'>
                    <td className='flex items-center px-6 py-4'>
                      <img className='h-[6rem] w-[10rem] object-cover' src={poster} alt={title} />
                      <div className='mx-10'>{title}</div>
                    </td>
                    <td>{rating}</td>
                    <td>{popularity}</td>
                    <td>{genre}</td>
                    <td>
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