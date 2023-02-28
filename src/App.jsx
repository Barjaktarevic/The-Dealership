import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllModels from './pages/AllModels'
import NotFound from './pages/NotFound'
import Make from './pages/Make'
import Model from './pages/Model'
import VideoGallery from './pages/VideoGallery'
import MyFavorites from './pages/MyFavorites'
import AllManufacturers from './pages/AllManufacturers'
import ScrollToTop from './common/ScrollToTop'
import AddModel from './pages/AddModel'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/manufacturers" element={<AllManufacturers />} />
        <Route path="/manufacturers/:make" element={<Make />} />
        <Route path="/models" element={<AllModels />} />
        <Route path="/models/:id" element={<Model />} />
        <Route path="/new" element={<AddModel />} />
        <Route path="/videos" element={< VideoGallery />} />
        <Route path="/favorites" element={< MyFavorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default App
