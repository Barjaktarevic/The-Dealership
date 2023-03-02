import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
// mobx imports
import UtilsStore from '../stores/UtilsStore'
import { observer } from 'mobx-react'
import { action } from 'mobx'

function MyFavorites() {

    return (
        <Container>
            <PageHeading children={"My favorites"} />
            {!UtilsStore.localStorage.length
                ?
                <h1 className='font-righteous text-2xl md:text-5xl text-center my-16' data-cy="no-favorites-heading">No favorites yet!</h1>
                :
                <>
                    {/* Carousel for medium screens and up */}
                    <Carousel className='w-9/12 h-8/12 mx-auto py-12 hidden md:block' autoPlay infiniteLoop interval={6500}>
                        {UtilsStore.localStorage.length && UtilsStore.localStorage.map(model => (
                            <div key={model._id} onClick={action(() => UtilsStore.removeFromLocalStorage(model._id))} className="relative group  border-4 border-cyan-400 rounded-lg">
                                <h1 className='text-xl md:text-4xl font-righteous uppercase' data-cy="carousel-model-name">{model.name}</h1>
                                <img src={model.image} className="w-full h-full aspect-video object-cover" />
                                <div className='opacity-0 group-hover:opacity-100 absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black cursor-pointer transition duration-500 before' data-cy="carousel-model-image"></div>
                            </div>
                        ))
                        }
                    </Carousel>
                    {/* Flex col for small screens */}
                    {UtilsStore.localStorage.length && UtilsStore.localStorage.map(model => (
                        <div className='flex flex-col md:hidden relative' key={model._id} onClick={action(() => UtilsStore.removeFromLocalStorage(model._id))}>
                            <h1 className='text-xl md:text-4xl font-righteous uppercase text-center' data-cy="favorite-model-name">{model.name}</h1>
                            <img src={model.image} className="w-full h-full aspect-video object-cover border-4 border-cyan-400 rounded-lg" />
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
