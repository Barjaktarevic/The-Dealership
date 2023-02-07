import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import VideoElement from '../components/VideoElement'

// video imports
import video1 from '../assets/videos/video1.mp4'
import video2 from '../assets/videos/video2.mp4'
import video3 from '../assets/videos/video3.mp4'
import video4 from '../assets/videos/video4.mp4'
import video5 from '../assets/videos/video5.mp4'
import video6 from '../assets/videos/video6.mp4'
import video7 from '../assets/videos/video7.mp4'

export default function VideoGallery() {

    const lgClasses = "h-[80vh] hover:sepia transition duration-1000"

    return (
        <Container>
            <PageHeading children={"Video gallery"} />

            {/* One large carousel for large screens and up */}
            <Carousel className='w-[70vw] h-[50vh] mx-auto my-12 hidden lg:block' autoPlay infiniteLoop interval={6500}>
                <VideoElement source={video2} classes={lgClasses} />
                <VideoElement source={video3} classes={lgClasses} />
                <VideoElement source={video4} classes={lgClasses} />
                <VideoElement source={video1} classes={lgClasses} />
                <VideoElement source={video5} classes={lgClasses} />
                <VideoElement source={video6} classes={lgClasses} />
                <VideoElement source={video7} classes={lgClasses} />
            </Carousel>

            {/* Two smaller carousels for small and medium screens */}
            <main className='flex flex-col space-y-4 lg:hidden'>
                <Carousel className='w-11/12 h-full mx-auto mt-6'>
                    <VideoElement source={video1} classes={"h-[35vh]"} />
                    <VideoElement source={video2} classes={"h-[35vh]"} />
                    <VideoElement source={video3} classes={"h-[35vh]"} />
                    <VideoElement source={video4} classes={"h-[35vh]"} />
                </Carousel>

                <Carousel className='w-11/12 h-full mx-auto'>
                    <VideoElement source={video5} classes={"h-[35vh]"} />
                    <VideoElement source={video6} classes={"h-[35vh]"} />
                    <VideoElement source={video7} classes={"h-[35vh]"} />
                </Carousel>
            </main>

        </Container>
    )
}
