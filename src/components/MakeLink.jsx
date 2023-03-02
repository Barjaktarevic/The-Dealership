import { Link } from 'react-router-dom'
// mobx imports
import { observer } from 'mobx-react'
import CarsStore from '../stores/CarsStore'
import { action } from 'mobx'

function MakeLink({ manufacturer, image, background }) {
    return (
        <Link to={`/manufacturers/${manufacturer}`} className={`scale-75 md:scale-100 py-1 px-2 md:py-5 md:px-4 md:w-fit w-[4.5rem] text-xl ${background} left-0 hover:bg-cyan-300 transition duration-200`} onClick={action(() => CarsStore.getAllModelsByMake(manufacturer))} data-cy="make-link">
            <img src={image} className='h-10 w-10 object-cover mx-auto' />
        </Link>
    )
}

export default observer(MakeLink)
