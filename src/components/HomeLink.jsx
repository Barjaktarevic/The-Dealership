import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeLink({ link, bgGradient, overlayGradient, mdHeight, text, image }) {
    return (
        <Link to={link}>
            <div className={`relative border-b-4 border-cyan-500 hover:brightness-150 h-64 ${mdHeight} cursor-pointer transition duration-200`}>
                <img src={image} alt="Car dashboard" className='w-full h-full' />
                <div className={`absolute w-full h-full top-0 left-0 ${bgGradient} from-transparent to-black`}></div>
                <h3 className={`absolute bottom-10 right-5 text-3xl md:text-6xl text-slate-100 font-righteous ${overlayGradient} from-cyan-600 to-transparent px-8 py-1`}>{text}</h3>
            </div>
        </Link>
    )
}

