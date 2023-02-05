import { Navigate } from 'react-router-dom'
import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'

function Model() {

    let now = new Date

    const handleSubmit = (e) => {
        const newStartProduction = e.target[0].value.toString().substring(0, 4)
        e.preventDefault()
        CarsStore.updateOneCar(CarsStore.specificModel.id, newStartProduction)
        CarsStore.getAllCarsAndManufacturers()
        CarsStore.editing = !CarsStore.editing
        CarsStore.specificModel.productionStart = newStartProduction
    }

    return (
        <Container>
            {CarsStore.specificModel ?
                <>
                    <PageHeading children={CarsStore.specificModel.name} />

                    <form onSubmit={handleSubmit} className="border-2 border-cyan-400 w-9/12 md:w-11/12 mx-auto pt-8 mt-8 rounded-md">
                        <div className='flex flex-col md:flex-row p-2 items-center md:space-x-8'>
                            <div className='md:w-3/5 flex flex-col space-y-4 pb-4 md:pb-0'>
                                <div className='h-1/2'>
                                    <img src={CarsStore.specificModel.image} alt={CarsStore.specificModel.name} className="mx-auto fancy-img" />
                                </div>
                                <p className='text-xl md:w-4/5'> <span className='uppercase text-cyan-400 text-xl'>Description:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium labore magni in vel reprehenderit odit molestiae, vitae iste quasi aliquid tenetur nostrum facere doloremque velit tempora corporis eligendi repudiandae maxime natus accusamus expedita porro id eveniet. Nulla pariatur blanditiis tempore dolores quos ab. Harum laudantium ratione, quaerat veniam repudiandae quidem?</p>

                                {!CarsStore.editing && <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Entered production:</span> {CarsStore.specificModel.productionStart} <span onClick={() => CarsStore.toggleEditing()} className='bg-cyan-200 text-black py-1 px-2 cursor-pointer ml-4'>Click to change</span> </p>}
                                {CarsStore.editing &&
                                    <div className='flex items-center space-x-3'>
                                        <label htmlFor="new-production-start" className='text-xl'>New production start: </label>
                                        <input id="new-production-start" type="date" max={now.toISOString().substring(0, 10)} className='text-xl text-black px-2 bg-cyan-100' />
                                        <img onClick={() => CarsStore.toggleEditing()} src="/src/assets/close.svg" className='h-10 w-10 hover:scale-110 hover:saturate-150 transition duration-200 cursor-pointer' />
                                        <button type="submit" className='bg-cyan-200 text-black py-1 px-1 md:px-2 cursor-pointer md:text-xl'>Submit changes</button>
                                    </div>}

                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Car ID:</span> {CarsStore.specificModel.id}</p>
                            </div>

                            <div className='md:w-2/5 flex flex-col space-y-4 border-t-2 border-cyan-400 md:border-0 pt-4 md:pt-0'>
                                <div className='h-1/2'>
                                    <img src={CarsStore.specificModel.makeId.logo} alt={CarsStore.specificModel.makeId.name} className="pb-8 mx-auto" />
                                </div>
                                <h1 className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Manufacturer:</span> {CarsStore.specificModel.makeId.abbreviation}</h1>
                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Description:</span> {CarsStore.specificModel.makeId.description}</p>
                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Founded in:</span> {CarsStore.specificModel.makeId.founded}</p>
                                <p className='text-xl'><span className='uppercase text-cyan-400 text-xl'>Headquarters:</span> {CarsStore.specificModel.makeId.headquarters}</p>
                            </div>

                        </div>

                    </form>
                </>
                :
                <Navigate to="/models" replace />
            }
        </Container>
    )
}

export default observer(Model)