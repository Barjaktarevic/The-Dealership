import React from 'react'

export default function Manufacturers({ makes }) {
    return (
        <div className='min-h-screen'>
            {makes && makes.map(make => (
                <div>
                    <h1>{make.name}</h1>
                    <h1>{make.abbreviation}</h1>
                    <img src={make.image} className="h-32 w-32" />
                </div>
            ))}
        </div>
    )
}
