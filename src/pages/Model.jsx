import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import Loader from '../components/Loader'
import { MdFavorite } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import FlashMessage from '../components/FlashMessage'
import CommonParagraph from '../components/CommonParagraph'
// mobx imports
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'
import UtilsStore from '../stores/UtilsStore'

function Model() {
    const [editing, setEditing] = useState(false)

    let now = new Date
    const { id } = useParams()
    const navigate = useNavigate()

    const makeRef = useRef()
    const nameRef = useRef()
    const abbrevRef = useRef()
    const yearRef = useRef()
    const imageRef = useRef()

    const options = ['Toyota', 'BMW', 'Mercedes', 'VW', 'Audi', 'Ford']

    useEffect(() => {
        CarsStore.getOneModel(id)
        if (UtilsStore.flashMessage) {
            const newTimeout = setTimeout(() => {
                UtilsStore.flashMessage = ""
            }, 5000)

            return () => {
                clearTimeout(newTimeout);
            };
        }
    }, [])

    const handleAddToFavoritesClick = () => UtilsStore.addToLocalStorage()

    const handleDelete = async () => {
        const { data } = await CarsStore.deleteModel(id)
        UtilsStore.flashMessage = data
        navigate('/models?page=1&make=All')
    }

    const handleEditOpen = () => setEditing(prevState => !prevState)
    const handleEditClose = () => setEditing(prevState => !prevState)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newModel = {
            make: makeRef.current.value,
            name: nameRef.current.value,
            abbreviation: abbrevRef.current.value,
            productionStart: yearRef.current.value.toString().substring(0, 4),
            image: imageRef.current.value
        }
        const { data } = await CarsStore.updateModel(id, newModel)
        setEditing(prevState => !prevState)
        UtilsStore.flashMessage = data
        const newTimeout = setTimeout(() => {
            UtilsStore.flashMessage = ""
        }, 5000)

        return () => {
            clearTimeout(newTimeout);
        }
    }

    return (
        <Container>
            {!CarsStore.loading && CarsStore.specificModel ?
                <>
                    <PageHeading children={CarsStore.specificModel.name} />

                    <main className="border-2 border-cyan-400 w-11/12 mx-auto pt-8 mt-16 2xl:mt-24 rounded-md relative">
                        <div className='flex flex-col md:flex-row p-2 items-center md:space-x-8'>
                            {/* Model details */}
                            <section className='md:w-3/5 flex flex-col space-y-4 pb-4 md:pb-0'>
                                <div className='h-1/2'>
                                    <img src={CarsStore.specificModel.image} alt={CarsStore.specificModel.name} className="mx-auto fancy-img" />
                                </div>
                                <p className='text-sm md:text-xl md:w-4/5'> <span className='uppercase text-cyan-400 text-sm md:text-xl'>Description:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium labore magni in vel reprehenderit odit molestiae, vitae iste quasi aliquid tenetur nostrum facere doloremque velit tempora corporis eligendi repudiandae maxime natus accusamus expedita porro id eveniet. Nulla pariatur blanditiis tempore dolores quos ab. Harum laudantium ratione, quaerat veniam repudiandae quidem?</p>
                                <CommonParagraph text={"Entered production: "}>{CarsStore.specificModel.productionStart}</CommonParagraph>
                                <CommonParagraph text={"Abbreviated to: "}>{CarsStore.specificModel.abbreviation}</CommonParagraph>
                            </section>

                            {/* Manufacturer details */}
                            <section className='md:w-2/5 flex flex-col space-y-4 border-t-2 border-cyan-400 md:border-0 pt-4 md:pt-0'>
                                <div className='h-1/2'>
                                    <img src={CarsStore.specificModel.makeId.logo} alt={CarsStore.specificModel.makeId.name} className="pb-8 mx-auto" />
                                </div>
                                <CommonParagraph text={"Manufacturer: "}>{CarsStore.specificModel.makeId.abbreviation}</CommonParagraph>
                                <CommonParagraph text={"Description: "}>{CarsStore.specificModel.makeId.description}</CommonParagraph>
                                <CommonParagraph text={"Founded in: "}>{CarsStore.specificModel.makeId.founded}</CommonParagraph>
                                <CommonParagraph text={"Headquarters: "}>{CarsStore.specificModel.makeId.headquarters}</CommonParagraph>
                            </section>

                        </div>

                        {/* Add to favorites functionality */}
                        <div className='absolute left-1/2 -translate-x-1/2 -top-12 flex md:space-x-12 space-x-2'>
                            <div onClick={handleAddToFavoritesClick} className="uppercase hover:bg-cyan-800 transition duration-200 py-1 px-1 md:px-3 hover:opacity-75 cursor-pointer rounded-md text-center border border-cyan-900">
                                {UtilsStore.localStorage.some(e => e.name === CarsStore.specificModel.name)
                                    ?
                                    <div className='md:w-64 w-44  mx-auto'>
                                        <p className='text-sm md:text-xl text-cyan-400'>Already in favorites!</p>
                                    </div>
                                    :
                                    <div className='flex space-x-4 items-center md:w-64 w-44 mx-auto'>
                                        <p className='text-sm md:text-xl text-cyan-400'>Add to favorites</p>
                                        <MdFavorite className='text-cyan-400 text-xl mb-1' />
                                    </div>
                                }

                            </div>
                            <div className='flex space-x-2 items-center justify-center border border-red-800 py-1 px-1 md:px-3 rounded-md hover:bg-red-900'>
                                <button onClick={handleDelete} className="text-sm  md:text-xl uppercase md:w-64 w-32 ">Delete model</button>
                            </div>
                        </div>
                    </main>
                </>
                :
                <Loader />
            }

            {/* Edit button */}
            <div className='group fixed top-1/2 -translate-y-1/2 right-0 h-24 w-12 bg-cyan-800 flex items-center justify-center rounded-l-xl cursor-pointer transition duration-300 hover:bg-cyan-300 z-10' title='Edit' onClick={handleEditOpen}>
                <div>
                    <FiEdit className='h-full w-8 ml-1 text-cyan-100 group-hover:text-cyan-900' />
                </div>
            </div>

            {/* Edit modal */}
            {editing &&
                <section className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-11/12 md:w-2/3 lg:w-1/2 bg-cyan-900 text-slate-100 rounded-lg border-2 border-cyan-500 opacity-95'>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-3 md:space-y-5 lg:space-y-6 w-10/12 xl:w-9/12 text-xl font-righteous my-2 lg:my-10">
                        <h1 className='text-2xl md:text-4xl my-3 md:my-5 uppercase'>Update model</h1>

                        <div className='flex flex-col lg:flex-row justify-between w-full items-center'>
                            <label htmlFor="name"> Model name:</label>
                            <input
                                type="text"
                                id="name"
                                className='w-64 lg:w-56 2xl:w-80 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                                required
                                ref={nameRef}
                                placeholder="Enter model name"
                                defaultValue={CarsStore.specificModel.name}
                            />
                        </div>

                        <div className='flex flex-col lg:flex-row justify-between w-full items-center'>
                            <label htmlFor="abbrev"> Model abbreviation:</label>
                            <input
                                type="text"
                                id="abbrev"
                                className='w-64 lg:w-56 2xl:w-80 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                                required
                                ref={abbrevRef}
                                placeholder="Enter abbreviation"
                                defaultValue={CarsStore.specificModel.abbreviation}
                            />
                        </div>


                        <div className='mx-auto flex flex-col lg:flex-row items-center justify-between w-full '>
                            <label htmlFor="manufacturer-select"> Select a manufacturer:</label>
                            <select
                                className='bg-cyan-600 text-slate-50 text-center w-64 lg:w-56 2xl:w-80 rounded-sm focus:outline-cyan-400 p-1'
                                id="manufacturer-select"
                                required
                                ref={makeRef}
                                defaultValue={CarsStore.specificModel.makeId.abbreviation}>
                                {options.map(opt => (
                                    <option key={opt} name={opt}>{opt}</option>
                                ))}
                            </select>

                        </div>

                        <div className='mx-auto flex flex-col lg:flex-row items-center justify-between w-full'>
                            <label htmlFor="image" > Link to image:</label>
                            <input
                                type="url"
                                id="image"
                                className='w-64 lg:w-56 2xl:w-80 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                                title="Please enter a valid URL."
                                required
                                ref={imageRef}
                                placeholder="Enter valid URL"
                                defaultValue={CarsStore.specificModel.image}
                            />
                        </div>

                        <div className='mx-auto flex flex-col lg:flex-row items-center justify-between w-full'>
                            <label htmlFor="year" > Production start:</label>
                            <input
                                type="date"
                                id="year"
                                className='w-64 lg:w-56 2xl:w-80 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                                required
                                ref={yearRef}
                                max={now.toISOString().substring(0, 10)}
                                defaultValue={CarsStore.specificModel.productionStart}
                            />
                        </div>

                        <div className='flex space-x-12'>
                            <button type='submit' className='bg-cyan-800 text-slate-50 text-lg md:text-2xl px-3 py-1 md:px-6 md:py-2 rounded-md md:rounded-full hover:bg-cyan-600 transition duration-150'>Submit changes</button>
                        </div>

                    </form>
                    <AiOutlineCloseSquare className='absolute top-2 left-2 h-12 w-12 2xl:h-16 2xl:w-16 cursor-pointer hover:scale-105 hover:text-cyan-200 rounded-full' title='Close' onClick={handleEditClose} />
                </section>}

            {/* Flash message */}
            {UtilsStore.flashMessage && <FlashMessage text={UtilsStore.flashMessage} />}

        </Container>
    )
}

export default observer(Model)