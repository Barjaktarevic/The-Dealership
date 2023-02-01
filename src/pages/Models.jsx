import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { modelsContext } from '../firebase/FirebaseContext'

export default function Models() {
    const models = useContext(modelsContext)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [loading])


    return (

        <div className='min-h-screen bg-slate-900 text-white'>
            <h1 className='text-slate-100 text-2xl lg:text-7xl font-righteous uppercase py-4 text-center bg-gradient-to-l from-transparent via-cyan-500 to-transparent px-20'>All models</h1>
            <div className='flex flex-col space-y-6 p-2 md:p-20 w-full md:w-9/10 pt-6 mx-auto' >
                {models?.length
                    ?
                    models.map(model => (
                        <div key={model.id}>
                            <div className='flex flex-row space-x-12 group'>
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
                                    <p className='text-sm md:text-base'>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum eum, deleniti vero aliquid laborum eaque delectus repellendus. Harum blanditiis molestias esse nam iure ipsum numquam. Amet molestias quisquam impedit eum accusamus earum optio, blanditiis obcaecati cum exercitationem.</p>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className='flex flex-col space-y-6 items-center'>
                        <img src='loader.svg' className='h-24 w-24 bg-slate-900' />
                        <p className='text-4xl uppercase font-righteous'>Fetching...</p>
                    </div>
                }
            </div>
        </div>
    )
}
