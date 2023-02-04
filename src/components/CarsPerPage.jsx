import React from 'react'

export default function CarsPerPage({ handleChange }) {
    return (
        <div className='flex flex-col md:flex-row  items-center'>
            <label htmlFor="per-page" className='text-xl md:text-3xl'>Cars per page:</label>
            <select onChange={handleChange} id='per-page' className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' defaultValue={5}>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </div>
    )
}
