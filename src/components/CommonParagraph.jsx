import React from 'react'

export default function CommonParagraph({ text, children }) {
    return (
        <p className='text-sm md:text-xl'><span className='uppercase text-cyan-400 text-sm md:text-xl'>{text}</span>{children}</p>
    )
}
