import React from 'react'

export default function Container({ children }) {
    return (
        <div className='min-h-screen bg-slate-900 text-white'>
            {children}
        </div>
    )
}
