import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db, collection, getDocs } from '../firebase/config'


import { useState, useEffect } from 'react'

export default function Manufacturers() {
    const [makes, setMakes] = useState([])
    const [category, setCategory] = useState()

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
        <div className='min-h-screen bg-slate-900 text-white'>
            <div className='grid justify-around mx-8 items-center gap-6 py-12' style={{ "grid-template-columns": "repeat(auto-fit, minmax(600px, 1fr))" }}>
                {makes && makes.map(make => (

                    <div key={make.id} className="relative group flex space-x-4 items-center border-4 border-cyan-700 rounded-lg shadow-lg shadow-slate-500 h-96 p-2 hover:scale-95 transition duration-100 cursor-pointer" onClick={() => navigate(`/manufacturers/${make.abbreviation}`)}>
                        <div className='flex flex-col w-2/5 text-center space-y-6'>
                            <h1 className='text-xl px-4 font-sans uppercase'>{make.name}</h1>
                            <img src={make.logo} className="h-48 w-48 md:h-64 md:w-64 mx-auto" />
                        </div>
                        <div className='w-3/5 text-left'>
                            <h1 className='text-md md:text-lg uppercase text-cyan-300'>Abbreviated to: <span className='text-sm md:text-base text-slate-50 capitalize'>{make.abbreviation}</span></h1>
                            <h1 className='text-md md:text-lg uppercase text-cyan-300'>Founded in: <span className='text-sm  md:text-base text-slate-50 capitalize'> {make.founded} </span></h1>
                            <h1 className='text-md md:text-lg uppercase text-cyan-300'>Headquarters: <span className='text-sm  md:text-base text-slate-50 capitalize'> {make.headquarters}</span></h1>
                            <p className='text-md md:text-lg uppercase text-cyan-300'>Description:  <span className='text-sm  md:text-base text-slate-50 capitalize'> {make.description}</span></p>
                        </div>

                        <div className='absolute hidden group-hover:block bottom-2 left-1/2 -translate-x-1/2 uppercase z-10 bg-cyan-600 px-4 py-1'>
                            Click to view all models
                        </div>

                    </div>

                ))}
            </div>
        </div>
    )
}
