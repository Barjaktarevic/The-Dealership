import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'

function FilterManufacturer() {
    return (
        <div className='flex flex-col md:flex-row items-center'>
            <label htmlFor="per-manufacturer" className='text-xl md:text-3xl'>Cars made by:</label>
            <select id='per-manufacturer' onChange={(e) => CarsStore.filterModelsByManufacturer(e.target.value)} className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' value={CarsStore.filterCategory}>
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
