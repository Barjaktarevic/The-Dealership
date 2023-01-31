import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Manufacturers from './pages/Manufacturers'


import { db, collection, getDocs } from './firebase/config'
import { getDoc } from 'firebase/firestore'
import { useState } from 'react'

function App() {
  const [makes, setMakes] = useState([])

  const colRef = collection(db, 'vehiclemodel')
  getDocs(colRef).then((snapshot) => {
    let models = []
    let makes = []
    snapshot.docs.forEach(async (doc) => {
      if (doc.data().makeId) {
        const makeRef = doc.data().makeId
        await getDoc(makeRef)
          .then((res) => {
            makes.push(res.data())  // this used to be a console log of res.data
          })
      }
      models.push({ ...doc.data(), id: doc.id })
      setMakes(models)
    })
    console.log(makes)
    console.log(models)
  })

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/manufacturers" element={<Manufacturers makes={makes} />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default App
