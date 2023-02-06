import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import UtilsStore from '../stores/UtilsStore'
import { observer } from 'mobx-react'

function MyFavorites() {

    return (
        <Container>
            <PageHeading children={"My favorites"} />
            {!UtilsStore.localStorage.length
                ?
                <h1 className='font-righteous text-2xl md:text-5xl text-center my-16 '>No favorites yet!</h1>
                :
                <>
                    <Carousel className='w-9/12 h-8/12 mx-auto py-12 hidden md:block' autoPlay infiniteLoop interval={6500}>
                        {UtilsStore.localStorage.length && UtilsStore.localStorage.map(model => (
                            <div onClick={() => UtilsStore.removeFromLocalStorage(model.id)} className="relative group">
                                <h1 className='text-xl md:text-4xl font-righteous uppercase'>{model.name}</h1>
                                <img src={model.image} className="w-full h-full aspect-video object-cover" />
                                <div className='opacity-0 group-hover:opacity-100 absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black cursor-pointer transition duration-500 before'></div>
                            </div>
                        ))
                        }
                    </Carousel>
                    {UtilsStore.localStorage.length && UtilsStore.localStorage.map(model => (
                        <div className='flex flex-col md:hidden relative'>
                            <h1 className='text-xl md:text-4xl font-righteous uppercase text-center'>{model.name}</h1>
                            <img src={model.image} className="w-full h-full aspect-video object-cover" />
                            <div className='absolute left-1/2 bottom-2 -translate-x-1/2 uppercase font-righteous text-cyan-400 bg-slate-900 py-1 px-3'>Click to remove</div>
                        </div>
                    ))
                    }
                </>
            }
        </Container>
    )
}

export default observer(MyFavorites)
