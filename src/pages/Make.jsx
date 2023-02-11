import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ModelCard from '../components/ModelCard'
import MakeLink from '../components/MakeLink'
import Container from '../components/Container'
import Loader from '../components/Loader'

// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'

// logo imports
import audiLogo from '../assets/audi.png'
import bmwLogo from '../assets/bmw.png'
import mercedesLogo from '../assets/mercedes.webp'
import toyotaLogo from '../assets/toyota.png'
import fordLogo from '../assets/ford.webp'
import vwLogo from '../assets/volkswagen.png'

function Make() {

    const { make } = useParams()

    useEffect(() => {
        CarsStore.getAllModelsByMake(make)
    }, [])

    return (
        <Container>
            {!CarsStore.loading ?
                <main>
                    <div className='flex flex-col space-y-6 px-2 py-12 md:px-20 md:pb-6 w-full md:w-9/10mx-auto'>
                        {CarsStore.modelsByMake.map(model => (
                            <ModelCard model={model} key={model._id} />
                        ))}
                    </div>

                    <nav className='fixed flex left-1/2 -translate-x-1/2 top-[50px] -space-x-5 md:left-0 md:top-[15vh] md:flex-col md:space-y-1 md:space-x-0 md:translate-x-0 items-center justify-center'>

                        <Link to="/manufacturers" className='mr-2 md:mr-0 px-2 md:py-5 md:px-4 w-fit md:text-2xl text-center bg-white text-black left-0 hover:bg-cyan-300 transition duration-200 font-righteous'><div className='w-8 h-9 md:h-10 md:w-10 flex items-center'>ALL</div></Link>

                        <MakeLink image={audiLogo} manufacturer={'Audi'} background={' bg-slate-300 '} />
                        <MakeLink image={bmwLogo} manufacturer={'BMW'} background={' bg-white '} />
                        <MakeLink image={mercedesLogo} manufacturer={'Mercedes'} background={' bg-slate-300 '} />
                        <MakeLink image={toyotaLogo} manufacturer={'Toyota'} background={' bg-white '} />
                        <MakeLink image={fordLogo} manufacturer={'Ford'} background={' bg-slate-300 '} />
                        <MakeLink image={vwLogo} manufacturer={'VW'} background={' bg-white '} />

                    </nav>
                </main>
                :
                <Loader />

            }
        </Container>
    )
}

export default observer(Make)