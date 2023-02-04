
import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../components/Container'

// firebase stuff for deletion later on
import { db, doc, updateDoc } from '../common/firebase/config'
import { modelsContext, updatingContext } from '../common/firebase/FirebaseContext'

export default function Model() {
    const { id } = useParams()
    const models = useContext(modelsContext)
    const handleUpdate = useContext(updatingContext)
    const navigate = useNavigate()

    let now = new Date

    const [specificModel, setSpecificModel] = useState()
    const [newProductionStart, setNewProductionStart] = useState()
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (models?.length) {
            const filteredModel = models.filter(model => model.id == id)
            setSpecificModel(filteredModel[0])
        } else {
            navigate('/models')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('SUBMITTING FORM!')
        const docRef = doc(db, 'vehiclemodel', specificModel.id)
        updateDoc(docRef, { productionStart: parseInt(newProductionStart) })
        setEditing(false)
        handleUpdate()
    }

    const handleClose = () => {
        setEditing(prevState => !prevState)
    }

    const handleClick = () => {
        setEditing(prevState => !prevState)
    }

    const handleChange = (e) => {
        const newDate = e.target.value
        setNewProductionStart(newDate.toString().substring(0, 4))
    }

    return (

        <Container>
            {specificModel &&
                <>
                    <h1 className='text-slate-100 text-2xl lg:text-7xl font-righteous uppercase py-4 text-center bg-gradient-to-l from-transparent via-cyan-500 to-transparent px-20 tilt-in-left-1'>{specificModel.name}</h1>

                    <form onSubmit={handleSubmit} className="border-2 border-cyan-400 w-9/12 md:w-11/12 mx-auto pt-8 mt-8 rounded-md">
                        <div className='flex flex-col md:flex-row p-2 items-center md:space-x-8'>
                            <div className='md:w-3/5 flex flex-col space-y-4 pb-4 md:pb-0'>
                                <div className='h-1/2'>
                                    <img src={specificModel.image} alt={specificModel.name} className="mx-auto fancy-img" />
                                </div>
                                <p className='text-xl md:w-4/5'> <span className='uppercase text-cyan-400 text-xl'>Description:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium labore magni in vel reprehenderit odit molestiae, vitae iste quasi aliquid tenetur nostrum facere doloremque velit tempora corporis eligendi repudiandae maxime natus accusamus expedita porro id eveniet. Nulla pariatur blanditiis tempore dolores quos ab. Harum laudantium ratione, quaerat veniam repudiandae quidem?</p>

                                {!editing && <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Entered production:</span> {newProductionStart ? newProductionStart : specificModel.productionStart} <span onClick={handleClick} className='bg-cyan-200 text-black py-1 px-2 cursor-pointer ml-4'>Click to change</span> </p>}
                                {editing &&
                                    <div className='flex items-center space-x-3'>
                                        <label htmlFor="new-production-start" className='text-xl'>New production start: </label>
                                        <input id="new-production-start" type="date" max={now.toISOString().substring(0, 10)} className='text-xl text-black px-2 bg-cyan-100' onChange={handleChange} />
                                        <img onClick={handleClose} src="/src/assets/close.svg" className='h-10 w-10 hover:scale-110 hover:saturate-150 transition duration-200 cursor-pointer' />
                                        <button type="submit" className='bg-cyan-200 text-black py-1 px-1 md:px-2 cursor-pointer md:text-xl'>Submit changes</button>
                                    </div>}

                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Car ID:</span> {specificModel.id}</p>
                            </div>

                            <div className='md:w-2/5 flex flex-col space-y-4 border-t-2 border-cyan-400 md:border-0 pt-4 md:pt-0'>
                                <div className='h-1/2'>
                                    <img src={specificModel.makeId.logo} alt={specificModel.makeId.name} className="pb-8 mx-auto" />
                                </div>
                                <h1 className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Manufacturer:</span> {specificModel.makeId.abbreviation}</h1>
                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Description:</span> {specificModel.makeId.description}</p>
                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Founded in:</span> {specificModel.makeId.founded}</p>
                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Headquarters:</span> {specificModel.makeId.headquarters}</p>
                            </div>

                        </div>

                    </form>
                </>
            }
        </Container>
    )
}
