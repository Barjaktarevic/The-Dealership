import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import Loader from '../components/Loader'
// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'
import UtilsStore from '../stores/UtilsStore'
import AddFormInput from '../components/AddFormInput'

function AddModel() {
    const [newModel, setNewModel] = useState({})
    const [previewing, setPreviewing] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        abbreviation: "",
        make: "",
        image: "",
        productionStart: "",
    })

    let now = new Date
    const navigate = useNavigate()

    const handleInputChange = (e, field) => setFormData(form => ({ ...form, [field]: e.target.value }))
    const handleCancel = () => setPreviewing(prevState => !prevState)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!previewing) {
            setNewModel({ ...formData, productionStart: formData.productionStart.toString().substring(0, 4) })
            setPreviewing(prevState => !prevState)
            setTimeout(() => {
                previewRef.current.scrollIntoView({ behavior: 'smooth' })
            }, 150)

        } else if (previewing) {
            const data = await CarsStore.addModel(newModel)
            if (!CarsStore.error) {
                setPreviewing(prevState => !prevState)
                e.target.reset()
                UtilsStore.flashMessage = data.data.message
                navigate(`/models/${data.data.addedModel._id}`)
            } else {
                const newTimeout = setTimeout(() => {
                    CarsStore.error = ""
                }, 4000)
                setPreviewing(prevState => !prevState)

                return () => {
                    clearTimeout(newTimeout);
                }
            }
        }
    }

    const previewRef = useRef()
    const options = ['Select a manufacturer', 'Toyota', 'BMW', 'Mercedes', 'VW', 'Audi', 'Ford']

    return (
        <Container >
            {CarsStore.loading ?
                <Loader />
                :
                <main className='mx-auto flex items-center justify-center w-11/12 lg:w-1/2 bg-cyan-900 text-slate-100 rounded-lg border-2 border-cyan-500 relative top-1 2xl:top-16'>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-8 w-10/12 xl:w-9/12 text-xl font-righteous my-2 md:my-10">
                        <div className='text-center'>
                            <h1 className='text-2xl md:text-4xl my-5 uppercase'>Add new model</h1>
                            {CarsStore.error && <p className='text-lg text-red-500'>{CarsStore.error}</p>}
                        </div>

                        <AddFormInput
                            labelText={"Model name:"}
                            type={"text"}
                            id={"name"}
                            placeholder={"Enter model name"}
                            onChange={e => handleInputChange(e, "name")}
                            previewing={previewing ? true : undefined}
                            value={formData.name}
                        />

                        <AddFormInput
                            labelText={"Model abbreviation:"}
                            type={"text"}
                            id={"abbrev"}
                            placeholder={"Enter abbreviation"}
                            onChange={e => handleInputChange(e, "abbreviation")}
                            previewing={previewing ? true : undefined}
                            value={formData.abbreviation}
                        />

                        <div className='mx-auto flex flex-col md:flex-row items-center justify-between w-full '>
                            <label htmlFor="manufacturer-select"> Select a manufacturer:</label>
                            <select
                                className='bg-cyan-600 text-slate-50 text-center w-64 md:w-56 2xl:w-80 rounded-sm focus:outline-cyan-400 p-1'
                                id="manufacturer-select"
                                required
                                data-cy="select-input"
                                onChange={e => handleInputChange(e, "make")}
                                disabled={previewing ? true : undefined}
                                value={formData.make}
                            >
                                {options.map(opt => (
                                    <option key={opt} name={opt}>{opt}</option>
                                ))}
                            </select>

                        </div>

                        <AddFormInput
                            labelText={"Link to image:"}
                            type={"url"} id={"image"}
                            placeholder={"Enter a valid URL"}
                            onChange={e => handleInputChange(e, "image")}
                            previewing={previewing ? true : undefined}
                            value={formData.image}
                        />

                        <AddFormInput
                            labelText={"Production start:"}
                            type={"date"}
                            id={"year"}
                            onChange={e => handleInputChange(e, "productionStart")}
                            max={now.toISOString().substring(0, 10)}
                            min={"1930-01-01"}
                            previewing={previewing ? true : undefined}
                            value={formData.productionStart}
                        />

                        {/* Preview, submit and cancel buttons */}
                        <div className='flex space-x-4 md:space-x-12'>
                            <button type='submit' className='bg-cyan-800 text-slate-50 text-lg md:text-2xl px-3 py-1 md:px-6 md:py-2  rounded-md md:rounded-full hover:bg-cyan-600 transition duration-150' data-cy="preview-and-submit-button">{!previewing ? "Preview submission" : "Submit new model"}</button>

                            {previewing && <button type='button' className='bg-red-800 text-slate-50 text-lg md:text-2xl px-3 py-1 md:px-6 md:py-2 rounded-md md:rounded-full hover:bg-indigo-700 transition duration-150' onClick={handleCancel}>Cancel</button>}
                        </div>
                    </form>
                </main>}

            {/* Preview section */}
            {previewing && <section ref={previewRef} className="hover:scale-95 hover:shadow-sm hover:shadow-cyan-200 transition duration-200 hover:cursor-pointer mt-16 pb-4" data-cy="preview-section">
                <div className='flex flex-col md:flex-row md:space-x-12 group p-1 md:p-4 items-center'>

                    <div className='flex items-center w-11/12 md:w-1/2 text-center my-2 md:my-0'>
                        <div className='relative mx-auto'>
                            <img src={newModel.image} alt="Car model." className='md:w-[450px] w-[360px] h-72 rounded-md border-4 border-cyan-700 object-cover' />
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2 text-left w-11/12 md:w-1/2'>
                        <h1 className='text-xl lg:text-5xl font-righteous'>{newModel.name}</h1>
                        <h1 className='text-left text-xl'>{newModel.abbreviation}</h1>
                        <p>{newModel.make}</p>
                        <p className='text-sm md:text-base'>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum eum, deleniti vero aliquid laborum eaque delectus repellendus. Harum blanditiis molestias esse nam iure ipsum numquam. Amet molestias quisquam impedit eum accusamus earum optio.</p>
                        <p>Entered production: {newModel.productionStart}</p>
                    </div>

                </div>
            </section>}

        </Container>
    )
}

export default observer(AddModel)
