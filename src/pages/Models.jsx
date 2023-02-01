import React from 'react'
import { useContext, useState, useEffect } from 'react'
import ModelCard from '../components/ModelCard'
import { modelsContext } from '../firebase/FirebaseContext'

const CARS_PER_PAGE = 5

export default function Models() {
    const models = useContext(modelsContext)

    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [currentCars, setCurrentCars] = useState([])
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(false)
            setCurrentCars(models.slice((currentPage * CARS_PER_PAGE) - CARS_PER_PAGE, currentPage * CARS_PER_PAGE))
            setTotalPages(Math.ceil(models?.length / CARS_PER_PAGE))
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [loading])


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        setCurrentCars(models.slice((currentPage * CARS_PER_PAGE) - CARS_PER_PAGE, currentPage * CARS_PER_PAGE))
    }

    useEffect(() => {
        models && setCurrentCars(models.slice((currentPage * CARS_PER_PAGE) - CARS_PER_PAGE, currentPage * CARS_PER_PAGE))
    }, [currentPage])

    console.log(currentPage)

    return (

        <div className='min-h-screen bg-slate-900 text-white'>
            <h1 className='text-slate-100 text-2xl lg:text-7xl font-righteous uppercase py-4 text-center bg-gradient-to-l from-transparent via-cyan-500 to-transparent px-20'>All models</h1>
            <div className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto' >
                {currentCars?.length
                    ?
                    currentCars.map(model => (
                        <ModelCard model={model} key={model.id} />
                    ))
                    :
                    <div className='flex flex-col space-y-6 items-center'>
                        <img src='loader.svg' className='h-24 w-24 bg-slate-900' />
                        <p className='text-4xl uppercase font-righteous'>Fetching...</p>
                    </div>
                }
            </div>
            <nav>
                <ul className='flex space-x-2 text-center items-center justify-center'>
                    {totalPages && [...Array(totalPages)].map((page, index) => (
                        <li key={index} className="text-white border-2 border-slate-100 rounded-sm px-2 cursor-pointer hover:bg-cyan-300 hover:text-black transition duration-100" onClick={() => paginate(index + 1)}>{index + 1} </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
