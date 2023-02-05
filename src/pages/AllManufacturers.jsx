import React from 'react'
import Container from '../components/Container'
import MakeCard from '../components/MakeCard'

// mobx imports
import CarsStore from '../stores/CarsStore'
import { observer } from 'mobx-react'

function Manufacturers() {

    return (
        <Container>
            {!CarsStore.loading ?
                <div className='grid justify-around mx-8 items-center gap-6 py-12' style={{ "grid-template-columns": "repeat(auto-fit, minmax(650px, 1fr))" }}>
                    {CarsStore.makes.map(make => (
                        <MakeCard make={make} key={make.id} />
                    ))}
                </div>
                :
                <div className='flex flex-col space-y-6 items-center'>
                    <img src='/src/assets/loader.svg' className='h-48 w-48 bg-slate-900' />
                </div>}
        </Container>
    )
}

export default observer(Manufacturers)
