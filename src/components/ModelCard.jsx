import { Link } from 'react-router-dom'
// mobx imports
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'
import { action } from 'mobx'

function ModelCard({ model }) {

    return (
        <Link to={`/models/${model._id}`} onClick={action(() => CarsStore.getOneModel(model._id))}>
            <div key={model.id} className="hover:scale-95 hover:shadow-sm hover:shadow-cyan-200 transition duration-200 hover:cursor-pointer">
                <div className='flex flex-col md:flex-row md:space-x-12 group p-1 md:p-4 items-center'>

                    <div className='flex items-center w-11/12 md:w-1/2 text-center my-2 md:my-0'>
                        <div className='relative mx-auto'>
                            <img src={model.image} alt="Car model." className='md:w-[450px] w-[360px] h-72 rounded-md border-4 border-cyan-700 object-cover' />
                            <img src={model.makeId.logo} className="h-12 w-12 absolute top-3 right-3" />
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2 text-left w-11/12 md:w-1/2'>
                        <h1 className='text-xl lg:text-5xl font-righteous'>{model.name}</h1>
                        <h1 className='text-left text-xl'>{model.abbreviation}</h1>
                        <p>{model.makeId.name}</p>
                        <p className='text-sm md:text-base'>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum eum, deleniti vero aliquid laborum eaque delectus repellendus. Harum blanditiis molestias esse nam iure ipsum numquam. Amet molestias quisquam impedit eum accusamus earum optio.</p>
                        <p>Entered production: {model.productionStart}</p>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default observer(ModelCard)

