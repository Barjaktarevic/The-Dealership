import React from 'react'
import { Link } from 'react-router-dom'


export default function MakeLink({ manufacturer, top, image, loading, background, setLoading }) {
    return (
        <Link to={loading ? "#" : `/manufacturers/${manufacturer}`} className={`py-1 px-2 md:py-5 md:px-4 md:w-fit w-[4.5rem] text-xl ${background} left-0 ${top} hover:bg-cyan-300 transition duration-200`} onClick={() => setLoading(true)}>
            <img src={image} className='h-10 w-10 object-cover mx-auto' />
        </Link>
    )
}
