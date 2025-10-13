import React from 'react'

const Banner = () => {
  return (
    <div className='h-[20vh] md:h-[75vh] bg-cover  flex items-end ' style={{
        backgroundImage: `url("https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg")`,
        backgroundSize: 'cover',}}>
        <div className='text-white text-xl w-full text-center bg-gray-900/60 p-4'>The Amazing Spider-Man</div>
    </div>
  )
}

export default Banner