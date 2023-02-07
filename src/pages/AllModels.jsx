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

function AllModels() {

    return (
        <Container>
            <PageHeading children={"All models"} />
            {!CarsStore.loading && CarsStore.currentCars.length > 0
                ?
                <div>

                    {/* FILTERS */}
                    <section className='pt-5 flex flex-col md:flex-row md:items-center justify-around space-y-2 md:space-y-0'>
                        <CarsPerPage />
                        <FilterManufacturer />
                        <SortModels />
                    </section>

                    {/* MODELS */}
                    <main className='flex flex-col space-y-6 p-2 md:pt-20 md:px-20 md:pb-6 w-full md:w-9/10 pt-6 mx-auto' >
                        {CarsStore.currentCars.map(model => (
                            <ModelCard model={model} key={model.id} />
                        ))}
                    </main>

                    {/* PAGINATION */}
                    <nav>
                        <ul className='flex space-x-1 md:space-x-2 text-center items-center justify-center'>
                            {[...Array(CarsStore.totalPages)].map((page, index) => (
                                <li key={index} className="text-white border-2 border-slate-100 rounded-sm px-1 md:px-3 cursor-pointer hover:bg-cyan-300 hover:text-black transition duration-100 md:text-3xl text-base" onClick={() => CarsStore.setCurrentPage(index + 1)}>{index + 1} </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                :
                <Loader />}
        </Container>
    )
}

export default observer(AllModels)