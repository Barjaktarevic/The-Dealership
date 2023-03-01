import React from 'react'

export default function FlashMessage({ text }) {
    return (
        <div className='fixed top-1/3 left-1/2 -translate-x-1/2 px-20 py-2 bg-gradient-to-l from-transparent via-black to-transparent font-righteous text-xl md:text-4xl uppercase w-screen text-center'>
            <p>{text}</p>
        </div>
    )
}
