import React from 'react'

export default function AddFormInput({ labelText, type, id, onChange = () => { }, placeholder, value, max, min, previewing }) {
    return (
        <div className='flex flex-col md:flex-row justify-between w-full items-center'>
            <label htmlFor={id}> {labelText}</label>
            <input
                type={type}
                id={id}
                className='w-64 md:w-56 2xl:w-80 rounded-sm text-slate-800 text-center focus:outline-cyan-400 p-1 bg-slate-200'
                required
                onChange={onChange}
                placeholder={placeholder ? placeholder : ""}
                value={value}
                data-cy="add-input"
                max={max ? max : ""}
                min={min ? min : ""}
                disabled={previewing}
            />
        </div>
    )
}
