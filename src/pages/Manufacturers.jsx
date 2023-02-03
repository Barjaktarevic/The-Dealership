import React from 'react'
import Container from '../components/Container'
import { useNavigate } from 'react-router-dom'
import { db, collection, getDocs } from '../firebase/config'

import { useState, useEffect } from 'react'
import MakeCard from '../components/MakeCard'

export default function Manufacturers() {
    const [makes, setMakes] = useState([])

    const navigate = useNavigate()

    // Fetch all makes from database
    useEffect(() => {
        const makesRef = collection(db, 'vehiclemake')
        getDocs(makesRef).then((snapshot) => {
            let makes = []
            snapshot.docs.forEach(async (doc) => {
                makes.push({ ...doc.data(), id: doc.id })
            })
            setMakes(makes)
        })
    }, [])

    return (
        <Container>
            <div className='grid justify-around mx-8 items-center gap-6 py-12' style={{ "grid-template-columns": "repeat(auto-fit, minmax(650px, 1fr))" }}>
                {makes && makes.map(make => (

                    <MakeCard make={make} />

                ))}
            </div>
        </Container>
    )
}
