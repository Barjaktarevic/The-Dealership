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
import Pagination from '../components/Pagination'

function AllModels() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        CarsStore.searchParams = { ...{ "page": 1, "make": "All" } }
        setSearchParams(CarsStore.searchParams)
        CarsStore.getModels()
    }, [])

    return (
        <Container>
            <PageHeading children={"All models"} />
            {!CarsStore.loading && CarsStore.models.length > 0
                ?
                <div>

                    {/* FILTERS */}
                    <section className='pt-5 flex flex-col md:flex-row md:items-center justify-around space-y-2 md:space-y-0'>
                        {/* <CarsPerPage />  removed to simplify backend API, but can be added if required*/}
                        <FilterManufacturer />
                        <SortModels />
                    </section>

                    {/* TOP PAGINATION */}
                    <Pagination />

                    {/* MODELS */}
                    <main className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto'>
                        {CarsStore.models.map(model => (
                            <ModelCard model={model} key={model._id} />
                        ))}
                    </main>

                    {/* BOTTOM PAGINATION */}
                    <Pagination />

                </div>
                :
                <Loader />}
        </Container>
    )
}

export default observer(AllModels)