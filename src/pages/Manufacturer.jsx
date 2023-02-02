import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ModelCard from '../components/ModelCard'
import MakeLink from '../components/MakeLink'

import { modelsContext } from '../firebase/FirebaseContext'

export default function ManufacturerModels() {
    const models = useContext(modelsContext)
    const [currentModels, setCurrentModels] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentTimeout, setCurrentTimeout] = useState(1000)

    const { make } = useParams()

    // Deferring state update until the data is fetched on first render; then timeout is set to 0
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(false)
            let filteredModels = models && models.filter(model => model.makeId.abbreviation == make)
            setCurrentModels(filteredModels)
        }, currentTimeout)
        setCurrentTimeout(0)

        return () => clearTimeout(delayDebounceFn)
    }, [loading])


    return (
        <Container>

            <div className='flex flex-col space-y-6 px-2 py-12 md:px-20 md:pb-6 w-full md:w-9/10mx-auto'>
                {currentModels && currentModels.map(model => (
                    <ModelCard model={model} key={model.id} />
                ))}
            </div>

            <div className='fixed flex left-1/2 -translate-x-1/2 top-[50px] space-x-1 md:left-0 md:top-[15vh] md:flex-col md:space-y-1 md:space-x-0 md:translate-x-0 items-center'>

                <Link to="/manufacturers" className='py-1 px-2 md:py-5 md:px-4 w-fit text-2xl text-center bg-white text-black left-0 top-[20vh] hover:bg-cyan-300 transition duration-200 font-righteous'>
                    <div className='w-10 h-10'>ALL</div>
                </Link>

                <MakeLink image={'/audi.png'} manufacturer={'Audi'} top={' top-[30vh] '} background={' bg-slate-300 '} setLoading={setLoading} />
                <MakeLink image={'/bmw.png'} manufacturer={'BMW'} top={' top-[40vh] '} background={' bg-white '} setLoading={setLoading} />
                <MakeLink image={'/mercedes.webp'} manufacturer={'Mercedes'} top={' top-[50vh] '} background={' bg-slate-300 '} setLoading={setLoading} />
                <MakeLink image={'/toyota.png'} manufacturer={'Toyota'} top={' top-[60vh] '} background={' bg-white '} setLoading={setLoading} />
                <MakeLink image={'/ford.webp'} manufacturer={'Ford'} top={' top-[70vh] '} background={' bg-slate-300 '} setLoading={setLoading} />
                <MakeLink image={'/volkswagen.png'} manufacturer={'VW'} top={' top-[80vh] '} background={' bg-white '} setLoading={setLoading} />

            </div>

        </Container>
    )
}