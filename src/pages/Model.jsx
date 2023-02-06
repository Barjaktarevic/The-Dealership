import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'
import UtilsStore from '../stores/UtilsStore'
import Loader from '../components/Loader'
import { MdFavorite } from 'react-icons/md'

function Model() {

    let now = new Date
    const { id } = useParams()

    const handleSubmit = (e) => {
        const newStartProduction = e.target[0].value.toString().substring(0, 4)
        e.preventDefault()
        CarsStore.updateOneCar(CarsStore.specificModel.id, newStartProduction)
        CarsStore.getOneCar(id)
        UtilsStore.editing = !UtilsStore.editing
    }

    useEffect(() => {
        CarsStore.getOneCar(id)
    }, [])

    const handleClick = () => {
        if (UtilsStore.localStorage.some(e => e.name === CarsStore.specificModel.name)) {
            return
        } else {
            UtilsStore.localStorage.push(CarsStore.specificModel)
            localStorage.setItem('favorites', JSON.stringify(UtilsStore.localStorage))
        }
    }

    return (
        <Container>
            {!CarsStore.loading ?
                <>
                    <PageHeading children={CarsStore.specificModel.name} />

                    <form onSubmit={handleSubmit} className="border-2 border-cyan-400 w-11/12 mx-auto pt-8 mt-16 rounded-md relative">
                        <main className='flex flex-col md:flex-row p-2 items-center md:space-x-8'>
                            <section className='md:w-3/5 flex flex-col space-y-4 pb-4 md:pb-0'>
                                <div className='h-1/2'>
                                    <img src={CarsStore.specificModel.image} alt={CarsStore.specificModel.name} className="mx-auto fancy-img" />
                                </div>
                                <p className='text-sm md:text-xl md:w-4/5'> <span className='uppercase text-cyan-400 text-sm md:text-xl'>Description:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium labore magni in vel reprehenderit odit molestiae, vitae iste quasi aliquid tenetur nostrum facere doloremque velit tempora corporis eligendi repudiandae maxime natus accusamus expedita porro id eveniet. Nulla pariatur blanditiis tempore dolores quos ab. Harum laudantium ratione, quaerat veniam repudiandae quidem?</p>

                                {!UtilsStore.editing && <p className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>Entered production:</span> {CarsStore.specificModel.productionStart} <span onClick={() => UtilsStore.editing = !UtilsStore.editing} className='bg-cyan-200 text-black py-1 px-1 md:px-2 cursor-pointer md:ml-4 text-sm md:text-xl'>Click to change</span> </p>}
                                {UtilsStore.editing &&
                                    <div className='flex items-center space-x-3'>
                                        <label htmlFor="new-production-start" className='text-sm md:text-xl text-center'>New production start: </label>
                                        <input id="new-production-start" type="date" max={now.toISOString().substring(0, 10)} className='text-sm md:text-xl text-black px-2 bg-cyan-100' />
                                        <img onClick={() => UtilsStore.editing = !UtilsStore.editing} src="/src/assets/close.svg" className='h-6 w-6 md:h-10 md:w-10 hover:scale-110 hover:saturate-150 transition duration-200 cursor-pointer' />
                                        <button type="submit" className='bg-cyan-200 text-black py-1 px-1 md:px-2 cursor-pointer text-sm md:text-xl'>Submit changes</button>
                                    </div>}

                                <p className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>Abbreviated to:</span> {CarsStore.specificModel.abbreviation}</p>
                            </section>

                            <section className='md:w-2/5 flex flex-col space-y-4 border-t-2 border-cyan-400 md:border-0 pt-4 md:pt-0'>
                                <div className='h-1/2'>
                                    <img src={CarsStore.specificModel.makeId.logo} alt={CarsStore.specificModel.makeId.name} className="pb-8 mx-auto" />
                                </div>
                                <h1 className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>Manufacturer:</span> {CarsStore.specificModel.makeId.abbreviation}</h1>
                                <p className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>Description:</span> {CarsStore.specificModel.makeId.description}</p>
                                <p className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>Founded in:</span> {CarsStore.specificModel.makeId.founded}</p>
                                <p className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>Headquarters:</span> {CarsStore.specificModel.makeId.headquarters}</p>
                            </section>

                        </main>
                        <div onClick={handleClick} className="absolute left-1/2 -translate-x-1/2 -top-12 uppercase hover:bg-cyan-800 transition duration-200 py-1 px-3 hover:opacity-75 cursor-pointer rounded-md text-center border border-cyan-900">
                            {UtilsStore.localStorage.some(e => e.name === CarsStore.specificModel.name)
                                ?
                                <div className='w-64 mx-auto'>
                                    <p className='text-xl text-cyan-400'>Already in favorites!</p>
                                </div>
                                :
                                <div className='flex space-x-4 items-center w-64 mx-auto'>
                                    <p className='text-xl text-cyan-400'>Add to favorites</p>
                                    <MdFavorite className='text-cyan-400 text-xl mb-1' />
                                </div>
                            }
                        </div>
                    </form>
                </>
                :
                <Loader />
            }
        </Container>
    )
}

export default observer(Model)