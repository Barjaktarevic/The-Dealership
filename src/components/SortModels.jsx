import React from 'react'

export default function SortModels({ handleSort, selectValue }) {
    return (
        <div className='flex flex-col md:flex-row  items-center'>
            <label htmlFor="sort-by" className='text-xl md:text-3xl'>Sort by:</label>
            <select id='sort-by' className='text-slate-50 outline-none bg-slate-900 border-2 border-slate-100 ml-4 p-2 hover:bg-cyan-700' value={selectValue} onChange={handleSort}>
                <option value="">Select an option</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
        </div>
    )
}
