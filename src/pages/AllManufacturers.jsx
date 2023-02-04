import React from 'react'
import Container from '../components/Container'

import { useState, useEffect, useContext } from 'react'
import MakeCard from '../components/MakeCard'
import { makesContext } from '../common/firebase/FirebaseContext'

export default function Manufacturers() {
    const [currentTimeout, setCurrentTimeout] = useState(1500)

    const makes = useContext(makesContext)

    // Deferring state update until the data is fetched on first render; then timeout is set to 0
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setCurrentTimeout(0)
        }, currentTimeout)
        return () => clearTimeout(delayDebounceFn)
    }, [currentTimeout])


    return (
        <Container>
            {makes.length ?
                <div className='grid justify-around mx-8 items-center gap-6 py-12' style={{ "grid-template-columns": "repeat(auto-fit, minmax(650px, 1fr))" }}>
                    {makes && makes.map(make => (
                        <MakeCard make={make} key={make.id} />
                    ))}
                </div>
                :
                <div className='flex flex-col space-y-6 items-center'>
                    <img src='/src/assets/loader.svg' className='h-48 w-48 bg-slate-900' />
                </div>}
        </Container>
    )
}
