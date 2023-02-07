import HomeLink from '../components/HomeLink'
// image imports
import dashboard from '../assets/dashboard.jpg'
import dashboard2 from '../assets/dashboard-2.jpg'
import dashboard3 from '../assets/dashboard-3.jfif'
import dashboard4 from '../assets/dashboard-4.jpg'

export default function Home() {
    return (
        <main className='font-sans text-2xl flex flex-col'>
            <HomeLink link={'/manufacturers'} bgGradient={"bg-gradient-to-r"} overlayGradient={"bg-gradient-to-l"} mdHeight={'md:h-[60vh]'} text={"Browse manufacturers"} image={dashboard} textPosition={"right-5"} />

            <HomeLink link={'/models'} bgGradient={"bg-gradient-to-l"} overlayGradient={"bg-gradient-to-r"} mdHeight={'md:h-[60vh]'} text={"View all models"} image={dashboard2} textPosition={"left-5"} />

            <HomeLink link={'/videos'} bgGradient={"bg-gradient-to-r"} overlayGradient={"bg-gradient-to-l"} mdHeight={'md:h-[60vh]'} text={"Video gallery"} image={dashboard3} textPosition={"right-5"} />

            <HomeLink link={'/favorites'} bgGradient={"bg-gradient-to-l"} overlayGradient={"bg-gradient-to-r"} mdHeight={'md:h-[60vh]'} text={"My favorites"} image={dashboard4} textPosition={"left-5"} />
        </main>
    )
}
