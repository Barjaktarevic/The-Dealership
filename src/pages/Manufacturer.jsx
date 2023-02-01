import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ModelCard from '../components/ModelCard'

import { modelsContext } from '../firebase/FirebaseContext'

export default function ManufacturerModels() {
    const models = useContext(modelsContext)
    const [currentModels, setCurrentModels] = useState([])
    const [loading, setLoading] = useState(true)

    const { make } = useParams()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log('models: ', models)
            setLoading(false)
            let filteredModels = models && models.filter(model => model.makeId.abbreviation == make)
            console.log('filtered models: ', filteredModels)
            setCurrentModels(filteredModels)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [loading])



    return (
        <div className='min-h-screen bg-slate-900 text-white'>
            <Link to="/manufacturers" className='md:py-4 py-5 px-4 text-2xl mx-auto block bg-cyan-800 w-fit uppercase rounded-md'>Back to all manufacturers</Link>
            <div className='flex flex-col space-y-6 px-2 py-12 md:px-20 md:pb-6 w-full md:w-9/10mx-auto'>
                {currentModels?.length && currentModels.map(model => (
                    <ModelCard model={model} key={model.id} />
                ))}
            </div>
        </div>
    )
}