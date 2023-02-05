import ModelCard from '../components/ModelCard'
import Container from '../components/Container'
import FilterManufacturer from '../components/FilterManufacturer'
import CarsPerPage from '../components/CarsPerPage'
import SortModels from '../components/SortModels'
import PageHeading from '../components/PageHeading'

import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'

function Models() {

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
                            {[...Array(CarsStore.totalPages)].map((page, index) => (
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