import React from 'react'
import { useContext, useState, useEffect } from 'react'
import ModelCard from '../components/ModelCard'
import { modelsContext } from '../firebase/FirebaseContext'
import Container from '../components/Container'

const CARS_PER_PAGE = 5

export default function Models() {
    // models context
    const models = useContext(modelsContext)

    // fetching context data state
    const [loading, setLoading] = useState(true)
    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCars, setCurrentCars] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [carsPerPage, setCarsPerPage] = useState(CARS_PER_PAGE)
    // filtering state
    const [filteredModels, setFilteredModels] = useState([models])
    const [filtering, setFiltering] = useState(false)
    // sorting state
    const [sort, setSort] = useState(false)
    const [selectValue, setSelectValue] = useState("")

    // rerenders only on initial data load - deferred otherwise data not fetched in full or at all
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(false)
            setCurrentCars(models.slice((currentPage * carsPerPage) - carsPerPage, currentPage * carsPerPage))
            setTotalPages(Math.ceil(models?.length / carsPerPage))
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [loading])


    // rerenders for pagination
    useEffect(() => {
        if (!filtering) {
            models && setCurrentCars(models.slice((currentPage * carsPerPage) - carsPerPage, currentPage * carsPerPage))
            setTotalPages(Math.ceil(models?.length / carsPerPage))
            setSort(false)
        } else {
            filteredModels && setCurrentCars(filteredModels.slice((currentPage * carsPerPage) - carsPerPage, currentPage * carsPerPage))
            setTotalPages(Math.ceil(filteredModels?.length / carsPerPage))
            setSort(false)
        }
    }, [currentPage, carsPerPage, filteredModels[0]?.id, sort])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        !filtering && setCurrentCars(models.slice((currentPage * carsPerPage) - carsPerPage, currentPage * carsPerPage))
    }

    // sets number of cars per page, returns to first page, and causes rerender
    const handleChange = (e) => {
        setCarsPerPage(e.target.value)
        setCurrentPage(1)
    }

    // complete this function!
    function finishChangingManufacturer() {
        return
    }

    const handleManufacturerChange = (e) => {
        if (e.target.value !== 'All') {
            let filteredArray = models && models.filter(model => model.makeId.abbreviation == e.target.value)
            setFilteredModels(filteredArray)
            setFiltering(true)
            setCurrentPage(1)
            setSelectValue("")
        } else {
            setFilteredModels(models)
            setFiltering(false)
            setCurrentPage(1)
            setSelectValue("")
        }
    }

    function finishSorting(array, page, amSorting, selectValue) {
        setFilteredModels(array)
        setCurrentPage(page)
        setSort(amSorting)
        setSelectValue(selectValue)
    }

    // sort filtered and unfiltered models (asc and desc) and reset select value and current page when filter changes
    const handleSort = (e) => {
        if (!filtering && e.target.value == "Oldest") {
            const sorted = models.sort(function (a, b) {
                return a.productionStart - b.productionStart
            })
            finishSorting(sorted, 1, true, "Oldest")

        } else if (!filtering && e.target.value == "Newest") {
            const sorted = models.sort(function (a, b) {
                return b.productionStart - a.productionStart
            })
            finishSorting(sorted, 1, true, "Newest")

        } else if (filtering && e.target.value == "Oldest") {
            const sorted = filteredModels.sort(function (a, b) {
                return a.productionStart - b.productionStart
            })
            finishSorting(sorted, 1, true, "Oldest")

        } else if (filtering && e.target.value == "Newest") {
            const sorted = filteredModels.sort(function (a, b) {
                return b.productionStart - a.productionStart
            })
            finishSorting(sorted, 1, true, "Newest")
        }
    }

    return (
        <Container>
            <h1 className='text-slate-100 text-2xl lg:text-7xl font-righteous uppercase py-4 text-center bg-gradient-to-l from-transparent via-cyan-500 to-transparent px-20 tilt-in-left-1'>All models</h1>

            {currentCars?.length ? <div className='pt-5 flex items-center justify-around'>
                <div>
                    <label htmlFor="per-page" className='text-3xl'>Cars per page:</label>
                    <select onChange={handleChange} id='per-page' className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' defaultValue={5}>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="per-manufacturer" className='text-3xl'>Cars made by:</label>
                    <select id='per-manufacturer' onChange={handleManufacturerChange} className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' defaultValue={'All'}>
                        <option value="All">All</option>
                        <option value="Audi">Audi</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="BMW">BMW</option>
                        <option value="Toyota">Toyota</option>
                        <option value="VW">VW</option>
                        <option value="Ford">Ford</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sort-by" className='text-3xl'>Sort by:</label>
                    <select id='sort-by' className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' value={selectValue} onChange={handleSort}>
                        <option value="">Select an option</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
            </div> : ''}


            <div className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto' >
                {currentCars?.length
                    ?
                    currentCars.map(model => (
                        <ModelCard model={model} key={model.id} />
                    ))
                    :
                    <div className='flex flex-col space-y-6 items-center'>
                        <img src='/loader.svg' className='h-48 w-48 bg-slate-900' />
                    </div>
                }
            </div>
            {currentCars?.length
                ?
                <nav>
                    <ul className='flex space-x-2 text-center items-center justify-center'>
                        {totalPages && [...Array(totalPages)].map((page, index) => (
                            <li key={index} className="text-white border-2 border-slate-100 rounded-sm px-3 cursor-pointer hover:bg-cyan-300 hover:text-black transition duration-100 text-3xl" onClick={() => paginate(index + 1)}>{index + 1} </li>
                        ))}
                    </ul>
                </nav>
                :
                ''}
        </Container>
    )
}
