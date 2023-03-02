import { Link } from 'react-router-dom'
// mobx imports
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'
import { action } from 'mobx'

function MakeCard({ make }) {

    return (
        <Link to={`/manufacturers/${make.abbreviation}`} onClick={action(() => CarsStore.getAllModelsByMake(make.abbreviation))}>
            <div key={make.id} className="relative group flex space-x-4 items-center border-4 border-cyan-700 rounded-lg shadow-lg shadow-slate-500 h-96 p-1 ,md:p-2 hover:scale-95 transition duration-100 cursor-pointer" data-cy="make-card">
                <div className='flex flex-col w-2/5 text-center space-y-6'>
                    <h1 className='text-xs md:text-xl md:px-4 px-1 font-sans uppercase'>{make.name}</h1>
                    <img src={make.logo} className="h-32 w-28 md:h-64 md:w-64 mx-auto" />
                </div>
                <div className='w-3/5 text-left'>
                    <h1 className='text-sm md:text-lg text-cyan-300'>Abbreviated to: <span className='text-xs md:text-base text-slate-50'>{make.abbreviation}</span></h1>
                    <h1 className='text-sm md:text-lg text-cyan-300'>Founded in: <span className='text-xs  md:text-base text-slate-50'> {make.founded} </span></h1>
                    <h1 className='text-sm md:text-lg text-cyan-300'>Headquarters: <span className='text-xs  md:text-base text-slate-50'> {make.headquarters}</span></h1>
                    <p className='text-sm md:text-lg text-cyan-300'>Description:  <span className='text-xs  md:text-base text-slate-50'> {make.description}</span></p>
                </div>

                <div className='absolute hidden group-hover:block bottom-2 left-1/2 -translate-x-1/2 uppercase z-10 bg-cyan-600 px-4 py-1'>
                    Click to view all models
                </div>
            </div>
        </Link>
    )
}

export default observer(MakeCard)
