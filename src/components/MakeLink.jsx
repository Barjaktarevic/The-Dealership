import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import CarsStore from '../common/mobx/CarsStore'


function MakeLink({ manufacturer, top, image, background }) {
    return (
        <Link to={`/manufacturers/${manufacturer}`} className={`py-1 px-2 md:py-5 md:px-4 md:w-fit w-[4.5rem] text-xl ${background} left-0 ${top} hover:bg-cyan-300 transition duration-200`} onClick={() => CarsStore.filterCarsByManufacturer(manufacturer)}>
            <img src={image} className='h-10 w-10 object-cover mx-auto' />
        </Link>
    )
}

export default observer(MakeLink)
