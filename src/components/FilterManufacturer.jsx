import React from 'react'

export default function FilterManufacturer({ handleManufacturerChange }) {
    return (
        <div className='flex flex-col md:flex-row items-center'>
            <label htmlFor="per-manufacturer" className='text-xl md:text-3xl'>Cars made by:</label>
            <select id='per-manufacturer' onChange={handleManufacturerChange} className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' defaultValue={'All'}>
                <option value="All">All</option>
                <option value="Audi">Audi</option>
                <option value="Mercedes">Mercedes</option>
                <option value="BMW">BMW</option>
                <option value="Toyota">Toyota</option>
                <option value="VW">VW</option>
                <option value="Ford">Ford</option>
            </select>
        </div>
    )
}
