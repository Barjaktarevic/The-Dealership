import { useSearchParams } from 'react-router-dom';
// mobx imports
import CarsStore from '../stores/CarsStore'

export default function SortModels() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSort = (e) => {
        CarsStore.sortModels(e.target.value)
        setSearchParams(CarsStore.searchParams)
    }

    return (
        <div className='flex flex-row items-center text-center space-x-16'>
            <label htmlFor="sort-by" className='text-base md:text-3xl'>Sort by:</label>
            <select id='sort-by' className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' onChange={handleSort} value={CarsStore.searchParams.sort === undefined ? "" : CarsStore.searchParams.sort === 1 ? 'Oldest' : 'Newest'}>
                <option value="">Select an option</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
        </div>
    )
}
