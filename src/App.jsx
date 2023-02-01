import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Manufacturers from './pages/Manufacturers'
import Models from './pages/Models'

import { db, collection, getDocs } from './firebase/config'
import { getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import FirebaseContext from './firebase/FirebaseContext'

function App() {
  // const [models, setModels] = useState()
  // // Fetch all models from database and populate makeId field with manufacturer object
  // useEffect(() => {
  //   const modelsRef = collection(db, 'vehiclemodel')
  //   getDocs(modelsRef).then((snapshot) => {
  //     let models = []
  //     snapshot.docs.forEach(async (doc) => {
  //       if (doc.data().makeId) {
  //         const makeRef = doc.data().makeId
  //         getDoc(makeRef)
  //           .then((res) => {
  //             let makeRef = res.data()
  //             models.push({ ...doc.data(), id: doc.id, makeId: makeRef })
  //           })
  //       }
  //     })
  //     setModels(models)
  //   })
  // }, [])

  // console.log(models)
  return (
    <FirebaseContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/models" element={<Models />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ FirebaseContext>

  )
}

export default App
