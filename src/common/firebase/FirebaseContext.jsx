import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { db, collection, getDocs, getDoc, doc, updateDoc } from '../firebase/config'

export const modelsContext = createContext()

export const makesContext = createContext()
export const updateModel = createContext()

export default function FirebaseContext({ children }) {

    const [models, setModels] = useState([])
    const [makes, setMakes] = useState([])

    // Fetch all models from database and populate makeId field with manufacturer object; at the same time set manufacturers in a separate array; provide both in the context below
    useEffect(() => {
        const fetchData = async () => {
            let dbModels = []
            let dbMakes = []
            const querySnapshot = await getDocs(collection(db, 'vehiclemodel'));
            querySnapshot.forEach(async (doc) => {
                let newModel = { id: doc.id, ...doc.data() };
                if (newModel.makeId) {
                    let makeData = await getDoc(newModel.makeId);
                    if (makeData.exists()) {
                        newModel.makeId = { makeID: makeData.id, ...makeData.data() }
                        dbModels.push(newModel)
                        let finalMakeData = makeData.data()
                        if (!dbMakes.some(e => e.name === finalMakeData.name)) {
                            dbMakes.push(finalMakeData)
                        }
                    }
                }
            })
            setModels(dbModels)
            setMakes(dbMakes)
        }
        fetchData()
    }, [])

    const updateDocument = (id, newYear) => {
        const docRef = doc(db, 'vehiclemodel', id)
        updateDoc(docRef, { productionStart: parseInt(newYear) })
    }

    return (
        <modelsContext.Provider value={models}>
            <makesContext.Provider value={makes}>
                <updateModel.Provider value={updateDocument}>
                    {children}
                </updateModel.Provider>
            </makesContext.Provider>
        </modelsContext.Provider >
    )
}
