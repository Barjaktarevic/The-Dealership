import React from 'react'
import { observer } from 'mobx-react'
import CarsStore from '../common/mobx/CarsStore'

function MobX() {

    return (

        <div>
            <button onClick={() => CarsStore.getAllCarsAndManufacturers()}>Click to render data!</button>
            {CarsStore.loading ? 'loading...' : CarsStore.models.map(model => (
                <div className='flex space-x-5' key={model.id}>
                    <p>{model.name}</p>
                    <p>{model.makeId.name}</p>
                    <img src={model.makeId.logo} className="h-8 w-8" />
                </div>
            ))}
        </div>
    )
}

export default observer(MobX)