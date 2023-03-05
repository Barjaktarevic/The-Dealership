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
import EditFormInput from '../components/EditFormInput'

function Model() {
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({})

    let now = new Date
    const { id } = useParams()
    const navigate = useNavigate()
    const handleInputChange = (e, field) => setFormData(form => ({ ...form, [field]: e.target.value }))

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

    const handleEditOpen = () => {
        setFormData({
            name: CarsStore.specificModel?.name,
            abbreviation: CarsStore.specificModel?.abbreviation,
            make: CarsStore.specificModel?.makeId?.abbreviation,
            image: CarsStore.specificModel?.image,
            productionStart: CarsStore.specificModel?.productionStart
        })
        setEditing(prevState => !prevState)
    }
    const handleEditClose = () => setEditing(prevState => !prevState)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newModel = { ...formData, productionStart: formData.productionStart.toString().substring(0, 4) }
        const data = await CarsStore.updateModel(id, newModel)
        console.log(data)
        if (!CarsStore.error) {
            setEditing(prevState => !prevState)
            UtilsStore.flashMessage = data.data
            const newTimeout = setTimeout(() => {
                UtilsStore.flashMessage = ""
            }, 3000)

            return () => {
                clearTimeout(newTimeout);
            }
        } else {
            const newTimeout = setTimeout(() => {
                CarsStore.error = ""
            }, 4000)

            return () => {
                clearTimeout(newTimeout);
            }
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
                                        <p className='text-sm md:text-xl text-cyan-400' data-cy="in-favorites-button">Already in favorites!</p>
                                    </div>
                                    :
                                    <div className='flex space-x-4 items-center md:w-64 w-44 mx-auto'>
                                        <p className='text-sm md:text-xl text-cyan-400' data-cy="favorites-button">Add to favorites</p>
                                        <MdFavorite className='text-cyan-400 text-xl mb-1' />
                                    </div>
                                }

                            </div>
                            <div className='flex space-x-2 items-center justify-center border border-red-800 py-1 px-1 md:px-3 rounded-md hover:bg-red-900'>
                                <button onClick={handleDelete} className="text-sm  md:text-xl uppercase md:w-64 w-32" data-cy="delete-button">Delete model</button>
                            </div>
                        </div>
                    </main>
                </>
                :
                <Loader />
            }

            {/* Edit button */}
            <div className='group fixed top-1/2 -translate-y-1/2 right-0 h-24 w-12 bg-cyan-800 flex items-center justify-center rounded-l-xl cursor-pointer transition duration-300 hover:bg-cyan-300 z-10' title='Edit' onClick={handleEditOpen} data-cy="edit-button">
                <div>
                    <FiEdit className='h-full w-8 ml-1 text-cyan-100 group-hover:text-cyan-900' />
                </div>
            </div>

            {/* Edit modal */}
            {editing &&
                <section className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-11/12 md:w-2/3 lg:w-1/2 bg-cyan-900 text-slate-100 rounded-lg border-2 border-cyan-500 opacity-95' data-cy="edit-modal">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-3 md:space-y-5 lg:space-y-6 w-10/12 xl:w-9/12 text-xl font-righteous my-2 lg:my-10">

                        <div className='text-center'>
                            <h1 className='text-2xl md:text-4xl my-3 md:my-5 uppercase'>Update model</h1>
                            {CarsStore.error && <p className='text-lg text-red-500'>{CarsStore.error}</p>}
                        </div>

                        <EditFormInput
                            labelText={"Model name:"}
                            type={"text"}
                            id={"name"}
                            placeholder={"Enter model name"}
                            onChange={e => handleInputChange(e, "name")}
                            value={formData.name}
                        />

                        <EditFormInput
                            labelText={"Model abbreviation:"}
                            type={"text"}
                            id={"abbrev"}
                            placeholder={"Enter abbreviation"}
                            onChange={e => handleInputChange(e, "abbreviation")}
                            value={formData.abbreviation}
                        />

                        <div className='mx-auto flex flex-col lg:flex-row items-center justify-between w-full '>
                            <label htmlFor="manufacturer-select"> Select a manufacturer:</label>
                            <select
                                className='bg-cyan-600 text-slate-50 text-center w-64 lg:w-56 2xl:w-80 rounded-sm focus:outline-cyan-400 p-1'
                                id="manufacturer-select"
                                required
                                onChange={e => handleInputChange(e, "make")}
                                value={formData.make}
                                data-cy="edit-select">
                                {options.map(opt => (
                                    <option key={opt} name={opt}>{opt}</option>
                                ))}
                            </select>

                        </div>

                        <EditFormInput
                            labelText={"Link to image:"}
                            type={"url"}
                            id={"image"}
                            placeholder={"Enter a valid URL"}
                            onChange={e => handleInputChange(e, "image")}
                            value={formData.image}
                        />

                        <EditFormInput
                            labelText={"Production start:"}
                            type={"date"}
                            id={"year"}
                            onChange={e => handleInputChange(e, "productionStart")}
                            value={formData.productionStart}
                            max={now.toISOString().substring(0, 10)}
                            min={"1930-01-01"}
                        />

                        <div className='flex space-x-12'>
                            <button type='submit' className='bg-cyan-800 text-slate-50 text-lg md:text-2xl px-3 py-1 md:px-6 md:py-2 rounded-md md:rounded-full hover:bg-cyan-600 transition duration-150' data-cy="submit-update-button">Submit changes</button>
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