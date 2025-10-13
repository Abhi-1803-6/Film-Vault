import React from 'react'
import MovieCard from './MovieCard'

const Movies = () => {
  return (
    <div>
       <div className='text-xl font-bold m-4 text-center'>
          Trending Movies
       </div>
       <div className='flex flex-row justify-around  flex-wrap'>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
       </div>
    </div>
  )
}

export default Movies