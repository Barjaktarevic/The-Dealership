import { Link } from 'react-router-dom'
import logo from '../assets/car.svg'
// mobx imports
import UtilsStore from '../stores/UtilsStore'
import { observer } from 'mobx-react'
import { action } from 'mobx'

function Navbar() {

    const commonClasses = "top-6 right-6 flex justify-center items-center hover:cursor-pointer scale-150 z-30"

    return (
        <nav className='w-full h-16 bg-slate-900 text-white flex justify-between p-2 relative'>

            <Link to="/">
                <div className='flex flex-row space-x-4 items-center'>
                    <img src={logo} alt="Car logo" className='h-12 w-12' />
                    <p className='uppercase text-xl md:text-4xl font-righteous'>The dealership</p>
                </div>
            </Link>

            <div className={UtilsStore.sidebarOpen ? 'fixed ' + commonClasses : 'absolute ' + commonClasses} onClick={action(() => UtilsStore.sidebarOpen = !UtilsStore.sidebarOpen)}>
                <button id="menu-btn" className={!UtilsStore.sidebarOpen ? "z-30 block focus:outline-none hamburger" : "z-30 block focus:outline-none hamburger open "}>
                    <span className="hamburger-top"></span>
                    <span className="hamburger-middle"></span>
                    <span className="hamburger-bottom"></span>
                </button>
            </div>

            {UtilsStore.sidebarOpen ?
                <div className="fixed flex flex-col space-y-16 top-0 right-0 w-64 md:w-96 h-screen text-2xl md:text-4xl text-white uppercase bg-gradient-to-b from-cyan-900 to-black z-10 text-center mb-14 border-l-8 border-slate-900 items-center opacity-90 font-righteous">
                    <Link to="/" className='mt-28 hover:text-cyan-500 transition duration-150'>Home</Link>
                    <Link to="/manufacturers" className='hover:text-cyan-500 transition duration-150'>Manufacturers</Link>
                    <Link to="/models" className='hover:text-cyan-500 transition duration-150'>Models</Link>
                    <Link to="/videos" className='hover:text-cyan-500 transition duration-150'>Video Gallery</Link>
                    <Link to="/favorites" className='hover:text-cyan-500 transition duration-150'>My Favorites</Link>
                </div>
                :
                ''
            }


        </nav>
    )
}

export default observer(Navbar)