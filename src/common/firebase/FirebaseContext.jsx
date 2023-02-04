import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { db, collection, getDocs, getDoc, doc, updateDoc } from '../firebase/config'

export const modelsContext = createContext()
export const updatingContext = createContext()
export const makesContext = createContext()

export default function FirebaseContext({ children }) {

    const [models, setModels] = useState([])
    const [makes, setMakes] = useState([])
    const [updatingDB, setUpdatingDB] = useState(false)

    // Fetch all models from database and populate makeId field with manufacturer object; at the same time set manufacturers in a separate array; provide both in context below
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
    }, [updatingDB])

    // on update refetch models
    const handleUpdate = () => {
        setUpdatingDB(prevState => !prevState)
    }

    console.log("Refetching data")

    return (
        <modelsContext.Provider value={models}>
            <makesContext.Provider value={makes}>
                <updatingContext.Provider value={handleUpdate}>
                    {children}
                </updatingContext.Provider>
            </makesContext.Provider>
        </modelsContext.Provider >
    )
}
