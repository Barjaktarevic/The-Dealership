import React from 'react'
import { useContext, useState, useEffect } from 'react'
import ModelCard from '../components/ModelCard'
import { modelsContext } from '../common/firebase/FirebaseContext'
import Container from '../components/Container'
import FilterManufacturer from '../components/FilterManufacturer'
import CarsPerPage from '../components/CarsPerPage'
import SortModels from '../components/SortModels'
import PageHeading from '../components/PageHeading'

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

    // sets number of cars per page displayed, returns to first page, and causes rerender
    const handleChange = (e) => {
        setCarsPerPage(e.target.value)
        setCurrentPage(1)
    }

    function finishChangingManufacturer(array, amFiltering, num, str) {
        setFilteredModels(array)
        setFiltering(amFiltering)
        setCurrentPage(num)
        setSelectValue(str)
    }

    const handleManufacturerChange = (e) => {
        if (e.target.value !== 'All') {
            let filteredArray = models && models.filter(model => model.makeId.abbreviation == e.target.value)
            finishChangingManufacturer(filteredArray, true, 1, "")
        } else {
            finishChangingManufacturer(models, false, 1, "")
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

    console.log('RERENDERED!')

    return (
        <Container>
            <PageHeading children={"All models"} />

            {currentCars?.length ?
                <div>
                    {/* FILTERS */}
                    <div className='pt-5 flex items-center justify-around'>
                        <CarsPerPage handleChange={handleChange} />
                        <FilterManufacturer handleManufacturerChange={handleManufacturerChange} />
                        <SortModels selectValue={selectValue} handleSort={handleSort} />
                    </div>

                    {/* MODELS */}
                    <div className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto' >
                        {currentCars.map(model => (
                            <ModelCard model={model} key={model.id} />
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <nav>
                        <ul className='flex space-x-2 text-center items-center justify-center'>
                            {totalPages && [...Array(totalPages)].map((page, index) => (
                                <li key={index} className="text-white border-2 border-slate-100 rounded-sm px-3 cursor-pointer hover:bg-cyan-300 hover:text-black transition duration-100 text-3xl" onClick={() => paginate(index + 1)}>{index + 1} </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                :

                <div className='flex flex-col space-y-6 items-center'>
                    <img src='/src/assets/loader.svg' className='h-48 w-48 bg-slate-900' />
                </div>}
        </Container>
    )
}
