import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            navigate('/')
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [])



    return (
        <div className='min-h-screen bg-slate-900 flex flex-col space-y-4 items-center'>
            <h1 className='text-4xl text-slate-100 pt-24'>That page doesn't exist.</h1>
            <Link to="/" className='text-2xl text-slate-100 hover:text-cyan-300 font-bold'>Redirecting ...</Link>

        </div>
    )
}
