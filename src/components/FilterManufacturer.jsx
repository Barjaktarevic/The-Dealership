// mobx imports
import { action } from 'mobx'
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'
import { useSearchParams } from "react-router-dom";

function FilterManufacturer() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = (e) => {
        CarsStore.searchParams = { ...CarsStore.searchParams, "page": 1, "make": e.target.value }
        setSearchParams(CarsStore.searchParams)
        CarsStore.getAllModelsFromApi()
    }

    return (
        <div className='flex flex-row items-center text-center space-x-4'>
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
        </div>
    )
}

export default observer(FilterManufacturer)
