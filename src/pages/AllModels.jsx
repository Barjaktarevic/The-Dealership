import ModelCard from '../components/ModelCard'
import Container from '../components/Container'
import FilterManufacturer from '../components/FilterManufacturer'
import CarsPerPage from '../components/CarsPerPage'
import SortModels from '../components/SortModels'
import PageHeading from '../components/PageHeading'
import Loader from '../components/Loader'
// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

function AllModels() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        CarsStore.searchParams = { ...{ "page": 1, "make": "All", "sort": null } }
        setSearchParams(CarsStore.searchParams)
        CarsStore.getAllModelsFromApi()
    }, [])  //tu možda treba staviti searchParams kao dependency

    // subsume under one 'handle page change'
    const handleNextPage = async () => {
        CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) + 1 }
        setSearchParams(CarsStore.searchParams)
        await CarsStore.getAllModelsFromApi()

        if (CarsStore.apimodels < 1) {
            CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) - 1 }
            setSearchParams(CarsStore.searchParams)
            CarsStore.getAllModelsFromApi()
        }
    }

    const handlePreviousPage = async () => {
        CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) - 1 }
        // setSearchParams(CarsStore.searchParams)

        if (parseInt(CarsStore.searchParams.page) < 1) {
            CarsStore.searchParams = { ...CarsStore.searchParams, "page": 1 }
        }

        if (CarsStore.apimodels < 1) {
            CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) + 1 }
        }

        setSearchParams(CarsStore.searchParams)
        await CarsStore.getAllModelsFromApi()
    }

    // const handleSortDesc = () => {
    //     CarsStore.searchParams = { ...CarsStore.searchParams, "sort": -1 }
    //     setSearchParams(CarsStore.searchParams)
    //     CarsStore.getAllModelsFromApi()
    // }

    // const handleSortAsc = () => {
    //     CarsStore.searchParams = { ...CarsStore.searchParams, "sort": 1 }
    //     setSearchParams(CarsStore.searchParams)
    //     CarsStore.getAllModelsFromApi()
    // }

    // const handleSort = (e) => {
    //     if (e.target.value === 'Newest') {
    //         CarsStore.searchParams = { ...CarsStore.searchParams, "page": 1, "sort": -1 }
    //     } else if (e.target.value === 'Oldest') {
    //         CarsStore.searchParams = { ...CarsStore.searchParams, "page": 1, "sort": 1 }
    //     }
    //     setSearchParams(CarsStore.searchParams)
    //     CarsStore.getAllModelsFromApi()
    // }

    // const handleFilter = (e) => {
    //     CarsStore.searchParams = { ...CarsStore.searchParams, "page": 1, "make": e.target.value }
    //     setSearchParams(CarsStore.searchParams)
    //     CarsStore.getAllModelsFromApi()
    // }


    return (
        <Container>
            <PageHeading children={"All models"} />
            {!CarsStore.loading && CarsStore.apimodels
                ?
                <div>

                    {/* FILTERS */}
                    <section className='pt-5 flex flex-col md:flex-row md:items-center justify-around space-y-2 md:space-y-0'>
                        {/* <CarsPerPage /> */}
                        <FilterManufacturer />
                        <SortModels />
                    </section>

                    {/* MODELS */}
                    <main className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto'>
                        {CarsStore.apimodels.map(model => (
                            <ModelCard model={model} key={model._id} />
                        ))}
                    </main>

                    {/* PAGINATION */}
                    <nav className='flex space-x-6 items-center justify-center'>
                        {/* <ul className='flex space-x-1 md:space-x-2 text-center items-center justify-center'>
                            {[...Array(CarsStore.totalPages)].map((page, index) => (
                                <li key={index} className="text-white border-2 border-slate-100 rounded-sm px-1 md:px-3 cursor-pointer hover:bg-cyan-300 hover:text-black transition duration-100 md:text-3xl text-base" onClick={() => CarsStore.setCurrentPage(index + 1)}>{index + 1} </li>
                            ))}
                        </ul> */}
                        <button className='bg-cyan-300 text-black text-2xl' onClick={handlePreviousPage}>Previous page</button>
                        <button className='bg-cyan-300 text-black text-2xl' onClick={handleNextPage}>Next page</button>
                        {/* <button className='bg-cyan-300 text-black text-2xl' onClick={handleSortAsc}>Sort Asc</button>
                        <button className='bg-cyan-300 text-black text-2xl' onClick={handleSortDesc}>Sort Desc</button> */}
                        {/* <label htmlFor="sort-by" className='text-base md:text-3xl'>Sort by:</label>
                        <select id='sort-by' className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' onChange={handleSort} value={CarsStore.searchParams.sort === null ? "" : CarsStore.searchParams.sort === 1 ? 'Oldest' : 'Newest'}>
                            <option value="">Select an option</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                        </select> */}

                        {/* <div className='flex flex-row items-center text-center space-x-4'>
                            <label htmlFor="per-manufacturer" className='text-base md:text-3xl'>Cars made by:</label>
                            <select id='per-manufacturer' onChange={handleFilter} className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' value={searchParams.get('make')}>
                                <option value="All">All</option>
                                <option value="Audi">Audi</option>
                                <option value="Mercedes">Mercedes</option>
                                <option value="BMW">BMW</option>
                                <option value="Toyota">Toyota</option>
                                <option value="VW">VW</option>
                                <option value="Ford">Ford</option>
                            </select>
                        </div> */}

                    </nav>
                    <div className='text-white text-2xl text-center'>Current page: {searchParams.get('page')}</div>

                </div>
                :
                <Loader />}
        </Container>
    )
}

export default observer(AllModels)