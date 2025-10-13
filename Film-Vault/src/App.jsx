import './App.css'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import Watchlist from './components/Watchlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/watchlist' element={<Watchlist />} />


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
