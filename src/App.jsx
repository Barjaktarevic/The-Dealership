import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllManufacturers from './pages/AllManufacturers'
import AllModels from './pages/AllModels'
import NotFound from './pages/NotFound'

import FirebaseContext from './common/firebase/FirebaseContext'
import Manufacturer from './pages/Manufacturer'
import Model from './pages/Model'

function App() {

  return (
    <FirebaseContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/manufacturers" element={<AllManufacturers />} />
          <Route path="/manufacturers/:make" element={<Manufacturer />} />
          <Route path="/models" element={<AllModels />} />
          <Route path="/models/:id" element={<Model />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ FirebaseContext>

  )
}

export default App
