import Container from '../components/Container'
import MakeCard from '../components/MakeCard'
import { useEffect } from 'react'

// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'
import Loader from '../components/Loader'

function AllManufacturers() {

    useEffect(() => {
        CarsStore.getMakes()
    }, [])


    return (
        <Container>
            {!CarsStore.loading ?
                <>
                    {/* Grid for medium screens and up */}
                    <main className='hidden md:grid justify-around mx-8 items-center gap-6 py-12' style={{ "grid-template-columns": "repeat(auto-fit, minmax(650px, 1fr))" }}>
                        {CarsStore.makes.map(make => (
                            <MakeCard make={make} key={make._id} />
                        ))}
                    </main>
                    {/* Flex col for small screens */}
                    <main className='flex md:hidden justify-center items-center flex-col space-y-8'>
                        {CarsStore.makes.map(make => (
                            <MakeCard make={make} key={make._id} />
                        ))}
                    </main>
                </>
                :
                <Loader />}
        </Container>
    )
}

export default observer(AllManufacturers)
