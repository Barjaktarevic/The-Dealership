import React from 'react'

import { db, collection, getDocs } from '../firebase/config'
import { getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function Models({ models }) {
    // const [models, setModels] = useState()

    // // Fetch all models from database and populate makeId field with manufacturer object
    // useEffect(() => {
    //     const modelsRef = collection(db, 'vehiclemodel')
    //     getDocs(modelsRef).then((snapshot) => {
    //         let models = []
    //         snapshot.docs.forEach(async (doc) => {
    //             if (doc.data().makeId) {
    //                 const makeRef = doc.data().makeId
    //                 getDoc(makeRef)
    //                     .then((res) => {
    //                         let makeRef = res.data()
    //                         models.push({ ...doc.data(), id: doc.id, makeId: makeRef })
    //                     })
    //             }
    //         })
    //         setModels(models)
    //     })
    // }, [])

    // console.log(models)

    return (

        <div className='min-h-screen bg-slate-900 text-white'>
            <h1 className='text-slate-100 text-2xl lg:text-7xl font-righteous uppercase py-4 text-center bg-gradient-to-l from-transparent via-cyan-500 to-transparent px-20'>All models</h1>
            <div className='flex flex-col space-y-6 p-2 md:p-20 w-full md:w-9/10 pt-6 mx-auto' >
                {models && models.map(model => (
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
                ))}
            </div>
        </div>
    )
}
