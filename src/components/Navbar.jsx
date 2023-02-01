import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook } from 'react-icons/ai'


export default function Navbar() {
    return (
        <div className='w-full h-16 bg-slate-900 text-white flex justify-between p-2'>

            <Link to="/">
                <div className='flex flex-row space-x-4 items-center'>
                    <img src="../../public/car.svg" alt="Car logo" className='h-12 w-12' />
                    <p className='uppercase text-xl font-righteous'>The dealership</p>
                </div>
            </Link>

            {/* Google login button */}
            {/* @todo Replace with hamburget menu and sidebar on small screens; actually, replace these ugly-looking buttons as well */}
            {/* <div className='flex items-center space-x-8'>
                <div className='flex items-center space-x-2 bg-orange-200 p-2 cursor-pointer hover:opacity-75 rounded-md'>
                    <p className='text-2xl font-righteous text-black'>Log in</p>
                    <FcGoogle className='text-3xl' />
                </div>

                <div className='flex items-center space-x-2 bg-indigo-500 p-2 text-white cursor-pointer rounded-md hover:opacity-75'>
                    <p className='text-2xl font-righteous'>Log in</p>
                    <AiFillFacebook className='text-3xl' />
                </div>
            </div> */}


        </div>
    )
}
