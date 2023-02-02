import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { db, collection, getDocs, getDoc } from './config'

export const modelsContext = createContext()


export default function FirebaseContext({ children }) {

    const [models, setModels] = useState()

    // Fetch all models from database and populate makeId field with manufacturer object
    useEffect(() => {

        const fetchData = async () => {
            let dbModels = []
            const querySnapshot = await getDocs(collection(db, 'vehiclemodel'));
            querySnapshot.forEach(async (doc) => {
                let newModel = { id: doc.id, ...doc.data() };
                if (newModel.makeId) {
                    let makeData = await getDoc(newModel.makeId);
                    if (makeData.exists()) {
                        newModel.makeId = { makeID: makeData.id, ...makeData.data() }
                        dbModels.push(newModel)
                    }
                }
            })
            setModels(dbModels)
        }

        fetchData()
    }, [])

    console.log('Fetching data again!')

    return (
        <modelsContext.Provider value={models}>
            {children}
        </modelsContext.Provider >
    )
}
