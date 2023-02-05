import React from 'react'
import { useContext, useState, useEffect } from 'react'
import ModelCard from '../components/ModelCard'
import { modelsContext } from '../common/firebase/FirebaseContext'
import Container from '../components/Container'
import FilterManufacturer from '../components/FilterManufacturer'
import CarsPerPage from '../components/CarsPerPage'
import SortModels from '../components/SortModels'
import PageHeading from '../components/PageHeading'
import { sliceArray } from '../common/utils'

import CarsStore from '../common/mobx/CarsStore'
import { observer } from 'mobx-react'

const CARS_PER_PAGE = 5

function Models() {
    // CONTEXT
    // models context
    const models = useContext(modelsContext)

    // STATE
    // fetching context data state
    const [currentTimeout, setCurrentTimeout] = useState(1500)
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

    // rerenders only on initial data load, and only if the data hasn't been fetched previously - deferred with timeout, which is then set to 0 - otherwise data not fetched in full or at all
    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         setCurrentCars(sliceArray(models, currentPage, carsPerPage))
    //         setTotalPages(Math.ceil(models?.length / carsPerPage))
    //         setCurrentTimeout(0)
    //     }, currentTimeout)

    //     return () => clearTimeout(delayDebounceFn)
    // }, [currentTimeout])

    // rerenders for pagination
    // useEffect(() => {
    //     if (!filtering) {
    //         models && setCurrentCars(sliceArray(models, currentPage, carsPerPage))
    //         setTotalPages(Math.ceil(models?.length / carsPerPage))
    //         setSort(false)
    //     } else {
    //         filteredModels && setCurrentCars(sliceArray(filteredModels, currentPage, carsPerPage))
    //         setTotalPages(Math.ceil(filteredModels?.length / carsPerPage))
    //         setSort(false)
    //     }
    // }, [currentPage, carsPerPage, filteredModels[0]?.id, sort])

    // const paginate = (pageNumber) => {
    //     CarsStore.setCurrentPage(pageNumber)
    // !filtering && setCurrentCars(sliceArray(models, currentPage, carsPerPage))

    // sets number of cars per page displayed, returns to first page, and causes rerender
    // const handleChange = (e) => {
    //     CarsStore.setCarsPerPage(e.target.value)
    // }

    // const handleManufacturerChange = (e) => {
    //     if (e.target.value !== 'All') {
    //         let filteredArray = models && models.filter(model => model.makeId.abbreviation == e.target.value)
    //         finishChangingManufacturer(filteredArray, true, 1, "")
    //     } else {
    //         finishChangingManufacturer(models, false, 1, "")
    //     }
    // }

    // function finishChangingManufacturer(array, amFiltering, num, str) {
    //     setFilteredModels(array)
    //     setFiltering(amFiltering)
    //     setCurrentPage(num)
    //     setSelectValue(str)
    // }

    // sort filtered and unfiltered models (asc and desc) and reset select value and current page when filter changes
    // const handleSort = (e) => {
    //     if (!filtering && e.target.value == "Oldest") {
    //         const sorted = models.sort((a, b) => a.productionStart - b.productionStart)
    //         finishSorting(sorted, 1, true, "Oldest")
    //     } else if (!filtering && e.target.value == "Newest") {
    //         const sorted = models.sort((a, b) => b.productionStart - a.productionStart)
    //         finishSorting(sorted, 1, true, "Newest")
    //     } else if (filtering && e.target.value == "Oldest") {
    //         const sorted = filteredModels.sort((a, b) => a.productionStart - b.productionStart)
    //         finishSorting(sorted, 1, true, "Oldest")
    //     } else {
    //         const sorted = filteredModels.sort((a, b) => b.productionStart - a.productionStart)
    //         finishSorting(sorted, 1, true, "Newest")
    //     }
    // }

    // function finishSorting(array, page, amSorting, selectValue) {
    //     setFilteredModels(array)
    //     setCurrentPage(page)
    //     setSort(amSorting)
    //     setSelectValue(selectValue)
    // }

    return (
        <Container>
            <PageHeading children={"All models"} />
            {!CarsStore.loading
                ?
                <div>

                    {/* FILTERS */}
                    <div className='pt-5 flex items-center justify-around'>
                        <CarsPerPage />
                        <FilterManufacturer />
                        <SortModels />
                    </div>

                    {/* MODELS */}
                    <div className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto' >
                        {CarsStore.currentCars.map(model => (
                            <ModelCard model={model} key={model.id} />
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <nav>
                        <ul className='flex space-x-2 text-center items-center justify-center'>
                            {CarsStore.totalPages && [...Array(CarsStore.totalPages)].map((page, index) => (
                                <li key={index} className="text-white border-2 border-slate-100 rounded-sm px-3 cursor-pointer hover:bg-cyan-300 hover:text-black transition duration-100 text-3xl" onClick={() => CarsStore.setCurrentPage(index + 1)}>{index + 1} </li>
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

export default observer(Models)