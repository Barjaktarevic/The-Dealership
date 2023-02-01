import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div className='font-sans text-2xl flex flex-col'>
            <Link to="/manufacturers">
                <div className='relative border-b-4 border-cyan-500 hover:brightness-150 h-64 md:h-[60vh] cursor-pointer transition duration-200 '>
                    <img src="dashboard.jpg" alt="Car dashboard" className='w-full h-full' />
                    <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-r from-transparent to-black'></div>
                    <h3 className='absolute bottom-10 right-5 text-6xl text-slate-100 font-righteous bg-gradient-to-l from-cyan-600 to-transparent px-8 py-1 '>Browse Manufacturers</h3>
                </div>
            </Link>

            <Link to="/models">
                <div className='relative border-b-4 border-cyan-500 hover:brightness-150 h-64 md:h-[60vh] cursor-pointer transition duration-200'>
                    <img src="dashboard-2.jpg" alt="Car dashboard" className='w-full h-full' />
                    <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-l from-transparent to-black'></div>
                    <h3 className='absolute bottom-10 left-5 text-6xl text-slate-100 font-righteous bg-gradient-to-r from-cyan-600 to-transparent px-8 py-1'>View All Models</h3>
                </div>
            </Link>

            <div className='relative border-b-4 border-cyan-500 hover:brightness-150 h-64 md:h-[60vh] cursor-pointer transition duration-200'>
                <img src="dashboard-3.jfif" alt="Car dashboard" className='w-full h-full' />
                <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-r from-transparent to-black'></div>
                <h3 className='absolute bottom-10 right-5 text-6xl text-slate-100 font-righteous bg-gradient-to-l from-cyan-600 to-transparent px-8 py-1'>Video Gallery</h3>
            </div>

            <div className='relative hover:brightness-150 h-52 md:h-[50vh] cursor-pointer transition duration-200'>
                <img src="dashboard-4.jpg" alt="Car dashboard" className='w-full h-full' />
                <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-l from-transparent to-black'></div>
                <h3 className='absolute bottom-10 left-5 text-6xl text-slate-100 font-righteous bg-gradient-to-r from-cyan-600 to-transparent px-8 py-1'>Image Gallery</h3>
            </div>
        </div>
    )
}
