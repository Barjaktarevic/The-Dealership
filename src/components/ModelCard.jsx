import React from 'react'
import { Link } from 'react-router-dom'

export default function ModelCard({ model }) {

    return (
        <Link to={`/models/${model.id}`}>
            <div key={model.id} className="hover:scale-95 hover:shadow-sm hover:shadow-cyan-200 transition duration-200 hover:cursor-pointer">
                <div className='flex flex-row space-x-12 group p-4'>
                    <div className='flex items-center w-1/2'>
                        <div className='relative'>
                            <img src={model.image} alt="Car model." className='w-[450px] h-72 rounded-md border-4 border-cyan-700 object-cover lg:object-fill' />
                            <img src={model.makeId.logo} className="h-12 w-12 absolute top-3 right-3" />
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2 text-left w-1/2'>
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
