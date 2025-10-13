import React from 'react'
import Logo from '../assets/movieLogo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 pr-4'>
        <img src={Logo} className="inline h-12 w-12 mr-2" alt="Cinema Icon"/>
        <Link to='/' className='text-blue-500 text-xl font-bold'>Movies</Link>
        <Link to='/watchlist' className='text-blue-500 text-xl font-bold'>Watchlist</Link>
    </div>
  )
}

export default Navbar