import React from 'react'

const MovieCard = ({
  movie,
  handleAddtoWatchList,
  handleRemoveFromWatchList,
  isInWatchlist = false
}) => {
  const poster = movie && movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null
  const title = movie?.Title || 'Unknown Title'

  const onAddClick = (e) => {
    e.stopPropagation()
    if (typeof handleAddtoWatchList === 'function') handleAddtoWatchList(movie)
    else console.warn('handleAddtoWatchList not provided')
  }

  const onRemoveClick = (e) => {
    e.stopPropagation()
    if (typeof handleRemoveFromWatchList === 'function') {
      const id = movie?.imdbID || movie?.id
      handleRemoveFromWatchList(id)
    } else {
      console.warn('handleRemoveFromWatchList not provided')
    }
  }

  const btnHandler = isInWatchlist ? onRemoveClick : onAddClick
  const btnAria = isInWatchlist ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`
  const btnEmoji = isInWatchlist ? '❌' : '😎'
  const btnBg = isInWatchlist ? 'bg-black/70 hover:bg-black/90' : 'bg-black/70 hover:bg-black/90'

  return (
    <div className='group relative m-4 h-[40vh] w-[30vw] md:h-[60vh] md:w-[20vw] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out'>
      {/* top-right action button with hover & active effects */}
      <button
        type='button'
        onClick={btnHandler}
        aria-label={btnAria}
        aria-pressed={isInWatchlist}
        className={`absolute top-2 right-2 z-50 text-white text-sm rounded-full p-2 shadow-md transition transform ${btnBg} focus:outline-none focus:ring-2 focus:ring-blue-300 hover:scale-110 active:scale-95`}
      >
        <span aria-hidden='true' className='select-none'>{btnEmoji}</span>
      </button>

      {poster ? (
        <img src={poster} alt={title} className='absolute inset-0 w-full h-full object-cover' />
      ) : (
        <div
          style={{ backgroundImage: `url("https://www.tallengestore.com/cdn/shop/products/Joker_-_Put_On_A_Happy_Face_-_Joaquin_Phoenix_-_Hollywood_English_Movie_Poster_3_de5e4cfc-cfd4-4732-aad1-271d6bdb1587.jpg?v=1579504979")` }}
          className='absolute inset-0 bg-center bg-cover'
        />
      )}

      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-end justify-center'>
        <div className='text-white text-center text-xl font-semibold truncate px-2 bg-gray-900/60'>
          {title}
        </div>
      </div>

      <div className='absolute left-1/2 bottom-6 transform -translate-x-1/2 translate-y-4 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 z-50'>
        <div className='bg-black/90 text-white text-sm px-3 py-2 rounded-md shadow-md max-w-[85vw] md:max-w-[18vw] text-center whitespace-normal'>
          {title}
        </div>
      </div>
    </div>
  )
}

export default MovieCard