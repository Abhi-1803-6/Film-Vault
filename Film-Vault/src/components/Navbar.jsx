import React from 'react'
import Logo from '../assets/movieLogo.png'
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 pr-4'>
        <img src={Logo} className="inline h-12 w-12 mr-2" alt="Cinema Icon"/>
        <a href='/' className='text-blue-500 text-xl font-bold'>Home</a>
        <a href='/watchlist' className='text-blue-500 text-xl font-bold'>Watchlist</a>
    </div>
  )
}

export default Navbar