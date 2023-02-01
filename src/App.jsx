import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Manufacturers from './pages/Manufacturers'
import Models from './pages/Models'
import NotFound from './pages/NotFound'

import FirebaseContext from './firebase/FirebaseContext'
import Manufacturer from './pages/Manufacturer'
import Model from './pages/Model'

function App() {

  return (
    <FirebaseContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/manufacturers/:make" element={<Manufacturer />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:id" element={<Model />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ FirebaseContext>

  )
}

export default App
