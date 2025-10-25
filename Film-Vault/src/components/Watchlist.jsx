import React from 'react'

const Watchlist = () => {
  return (
    <>

    <div className='flex justify-center flex-wrap m-4'>
      <div className='bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center mx-4'>Action</div>
      <div className='bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center'>Action</div>
    </div>
    <div className='flex justify-center my-4'>
        <input type="text" placeholder='Search your watchlist...' className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4'/>
    </div>
    <div className='border border-gray-500 m-8 rounded-lg overflow-hidden'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b-2'>
              <td className='flex items-center px-6 py-4'>
                <img className='h-[6rem] w-[10rem]' src={`https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg`}/>
                <div className='mx-10'>TASM</div>
              </td>
              <td>8.5</td>
              <td>9</td>
              <td>Science-Fiction</td>
              <td className='text-red-800'>Delete</td>
            </tr>

          </tbody>
        
      </table>
    </div>
    </>
  )
}

export default Watchlist