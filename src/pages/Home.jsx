import React from 'react'
import HomeLink from '../components/HomeLink'

export default function Home() {
    return (
        <div className='font-sans text-2xl flex flex-col'>
            <HomeLink link={'/manufacturers'} bgGradient={"bg-gradient-to-r"} overlayGradient={"bg-gradient-to-l"} mdHeight={'md:h-[60vh]'} text={"Browse manufacturers"} image={'/src/assets/dashboard.jpg'} textPosition={"right-5"} />

            <HomeLink link={'/models'} bgGradient={"bg-gradient-to-l"} overlayGradient={"bg-gradient-to-r"} mdHeight={'md:h-[60vh]'} text={"View all models"} image={'/src/assets/dashboard-2.jpg'} textPosition={"left-5"} />

            <HomeLink link={'#'} bgGradient={"bg-gradient-to-r"} overlayGradient={"bg-gradient-to-l"} mdHeight={'md:h-[60vh]'} text={"Video gallery"} image={'/src/assets/dashboard-3.jfif'} textPosition={"right-5"} />

            <HomeLink link={'#'} bgGradient={"bg-gradient-to-l"} overlayGradient={"bg-gradient-to-r"} mdHeight={'md:h-[60vh]'} text={"Image gallery"} image={'/src/assets/dashboard-4.jpg'} textPosition={"left-5"} />
        </div>
    )
}
