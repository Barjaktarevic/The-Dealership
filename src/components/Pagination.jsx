import CarsStore from "../stores/CarsStore"
import { useSearchParams } from "react-router-dom";

export default function Pagination() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = async (e) => {
        if (e.target.innerText === 'Previous page') {
            CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) - 1 }
            if (parseInt(CarsStore.searchParams.page) < 1) CarsStore.searchParams = { ...CarsStore.searchParams, "page": 1 }
        } else if (e.target.innerText === 'Next page') {
            CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) + 1 }
            setSearchParams(CarsStore.searchParams)
            await CarsStore.getModels()
            if (CarsStore.models < 1) {
                CarsStore.searchParams = { ...CarsStore.searchParams, "page": parseInt(CarsStore.searchParams.page) - 1 }
            }
        }
        setSearchParams(CarsStore.searchParams)
        CarsStore.getModels()
    }

    return (
        <nav className='flex flex-col space-y-4 pt-8'>
            <div className='text-white text-2xl text-center uppercase font-righteous'>Current page: {searchParams.get('page')}</div>
            <div className='flex space-x-6 items-center justify-center'>
                <button className={CarsStore.searchParams.page === 1 ? 'bg-cyan-400 text-black text-2xl py-1 px-3 rounded-lg opacity-50 cursor-not-allowed' : 'bg-cyan-400 text-black text-2xl py-1 px-3 rounded-lg'} onClick={handlePageChange} disabled={CarsStore.searchParams.page === 1 ? true : false}>Previous page</button>
                <button className='bg-cyan-400 text-black text-2xl py-1 px-3 rounded-lg' onClick={handlePageChange}>Next page</button>
            </div>
        </nav>
    )
}
