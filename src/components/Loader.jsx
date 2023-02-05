import React from 'react'

export default function Loader() {
    return (
        <div className='flex flex-col space-y-6 items-center'>
            <img src='/src/assets/loader.svg' className='h-48 w-48 bg-slate-900' />
        </div>
    )
}
