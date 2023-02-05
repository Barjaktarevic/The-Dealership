import { Link, Navigate } from 'react-router-dom'
import ModelCard from '../components/ModelCard'
import MakeLink from '../components/MakeLink'
import Container from '../components/Container'

// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'

function ManufacturerModels() {

    return (
        <Container>
            {!CarsStore.loading ?
                <main>
                    <div className='flex flex-col space-y-6 px-2 py-12 md:px-20 md:pb-6 w-full md:w-9/10mx-auto'>
                        {CarsStore.filteredModels.map(model => (
                            <ModelCard model={model} key={model.id} />
                        ))}
                    </div>

                    <nav className='fixed flex left-1/2 -translate-x-1/2 top-[50px] space-x-1 md:left-0 md:top-[15vh] md:flex-col md:space-y-1 md:space-x-0 md:translate-x-0 items-center'>

                        <Link to="/manufacturers" className='py-1 px-2 md:py-5 md:px-4 w-fit text-2xl text-center bg-white text-black left-0 top-[20vh] hover:bg-cyan-300 transition duration-200 font-righteous'>
                            <div className='w-10 h-10'>ALL</div>
                        </Link>

                        <MakeLink image={'/src/assets/audi.png'} manufacturer={'Audi'} top={' top-[30vh] '} background={' bg-slate-300 '} />
                        <MakeLink image={'/src/assets/bmw.png'} manufacturer={'BMW'} top={' top-[40vh] '} background={' bg-white '} />
                        <MakeLink image={'/src/assets/mercedes.webp'} manufacturer={'Mercedes'} top={' top-[50vh] '} background={' bg-slate-300 '} />
                        <MakeLink image={'/src/assets/toyota.png'} manufacturer={'Toyota'} top={' top-[60vh] '} background={' bg-white '} />
                        <MakeLink image={'/src/assets/ford.webp'} manufacturer={'Ford'} top={' top-[70vh] '} background={' bg-slate-300 '} />
                        <MakeLink image={'/src/assets/volkswagen.png'} manufacturer={'VW'} top={' top-[80vh] '} background={' bg-white '} />

                    </nav>
                </main>
                :
                <Navigate to="/manufacturers" replace />
            }
        </Container>
    )
}

export default observer(ManufacturerModels)