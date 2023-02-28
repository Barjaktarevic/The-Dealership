import { useRef, useState } from 'react'
import Container from '../components/Container'
// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'


function AddModel() {
    const [newModel, setNewModel] = useState({})
    const [previewing, setPreviewing] = useState(false)

    let now = new Date

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!previewing) {
            setNewModel({
                make: makeRef.current.value,
                name: nameRef.current.value,
                abbreviation: abbrevRef.current.value,
                productionStart: yearRef.current.value.toString().substring(0, 4),
                image: imageRef.current.value
            })
            setPreviewing(prevState => !prevState)

            setTimeout(() => {
                previewRef.current.scrollIntoView({ behavior: 'smooth' })
            }, 150)

        } else if (previewing) {
            console.log('dispatch to database!')
            setPreviewing(prevState => !prevState)
            e.target.reset()
        }
    }

    const handleCancel = () => {
        setPreviewing(prevState => !prevState)
        setNewModel({})
        makeRef.current.value = "Toyota"
        nameRef.current.value = ""
        abbrevRef.current.value = ""
        yearRef.current.value = ""
        imageRef.current.value = ""
    }

    const makeRef = useRef()
    const nameRef = useRef()
    const abbrevRef = useRef()
    const yearRef = useRef()
    const imageRef = useRef()

    const previewRef = useRef()

    const options = ['Toyota', 'BMW', 'Mercedes', 'VW', 'Audi', 'Ford']


    return (
        <Container >
            <main className='mx-auto flex items-center justify-center w-full lg:w-1/2 bg-cyan-900 text-slate-100 rounded-lg border-2 border-cyan-500 relative top-6'>

                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-8 w-8/12 text-xl font-righteous my-10">
                    <h1 className='text-4xl my-5 uppercase'>Add new model</h1>

                    <div className='flex justify-between w-full items-center'>
                        <label htmlFor="name"> Model name:</label>
                        <input
                            type="text"
                            id="name"
                            className='w-56 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                            required
                            ref={nameRef}
                            placeholder="Enter model name"
                        />
                    </div>

                    <div className='flex justify-between w-full items-center'>
                        <label htmlFor="abbrev"> Model abbreviation:</label>
                        <input
                            type="text"
                            id="abbrev"
                            className='w-56 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                            required
                            ref={abbrevRef}
                            placeholder="Enter abbreviation"
                        />
                    </div>


                    <div className='mx-auto flex items-center justify-between w-full '>
                        <label htmlFor="manufacturer-select"> Select a manufacturer:</label>
                        <select
                            className='bg-cyan-600 text-slate-50 text-center w-56 rounded-sm focus:outline-cyan-400 p-1'
                            id="manufacturer-select"
                            required
                            ref={makeRef}>
                            {options.map(opt => (
                                <option key={opt} name={opt}>{opt}</option>
                            ))}
                        </select>

                    </div>

                    <div className='mx-auto flex items-center justify-between w-full'>
                        <label htmlFor="image" > Link to image:</label>
                        <input
                            type="url"
                            id="image"
                            className='w-56 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                            title="Please enter a valid URL."
                            required
                            ref={imageRef}
                            placeholder="Enter valid URL"
                        />
                    </div>

                    <div className='mx-auto flex items-center justify-between w-full'>
                        <label htmlFor="year" > Production start:</label>
                        <input
                            type="date"
                            id="year"
                            className='w-56 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                            required
                            ref={yearRef}
                            max={now.toISOString().substring(0, 10)}
                        />
                    </div>

                    <div className='flex space-x-12'>
                        <button ref={previewRef} type='submit' className='bg-cyan-800 text-slate-50 text-2xl py-2 px-6 rounded-full hover:bg-cyan-600 transition duration-150'>{!previewing ? "Preview submission" : "Submit new model"}</button>

                        {previewing && <button ref={previewRef} type='button' className='bg-red-800 text-slate-50 text-2xl py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-150' onClick={handleCancel}>Cancel</button>}
                    </div>
                </form>
            </main>

            {/* Preview section */}
            {previewing && <section ref={previewRef} className="hover:scale-95 hover:shadow-sm hover:shadow-cyan-200 transition duration-200 hover:cursor-pointer mt-16 pb-4">
                <div className='flex flex-col md:flex-row md:space-x-12 group p-1 md:p-4 items-center'>

                    <div className='flex items-center w-11/12 md:w-1/2 text-center my-2 md:my-0'>
                        <div className='relative mx-auto'>
                            <img src={newModel.image} alt="Car model." className='md:w-[450px] w-[360px] h-72 rounded-md border-4 border-cyan-700 object-cover' />
                            {/* logo preview? */}
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
