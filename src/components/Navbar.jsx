import React from 'react'

export default function Navbar() {
    return (
        <div className='w-full h-16 bg-slate-200 flex justify-between p-2'>
            {/* Logo and site name */}
            <div className='flex flex-row space-x-4 items-center'>
                <img src="car.svg" alt="Car logo" className='h-12 w-12' />
                <p className='uppercase text-xl font-righteous'>The dealership</p>
            </div>

        </div>
    )
}
