import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Container from '../components/Container'
import PageHeading from '../components/PageHeading'
import VideoElement from '../components/VideoElement'

export default function VideoGallery() {

    return (
        <Container>
            <PageHeading children={"Video gallery"} />

            {/* One large carousel for large screens and up */}
            <Carousel className='w-[70vw] h-[50vh] mx-auto my-12 hidden lg:block' autoPlay infiniteLoop interval={6500}>
                <VideoElement source={"/src/assets/videos/video2.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
                <VideoElement source={"/src/assets/videos/video3.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
                <VideoElement source={"/src/assets/videos/video4.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
                <VideoElement source={"/src/assets/videos/video1.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
                <VideoElement source={"/src/assets/videos/video5.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
                <VideoElement source={"/src/assets/videos/video6.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
                <VideoElement source={"/src/assets/videos/video7.mp4"} classes={"h-[80vh] hover:sepia transition duration-1000"} />
            </Carousel>

            {/* Two smaller carousels for small and medium screens */}
            <div className='flex flex-col space-y-4 lg:hidden'>
                <Carousel className='w-11/12 h-full mx-auto mt-6'>
                    <VideoElement source={"/src/assets/videos/video1.mp4"} classes={"h-[35vh]"} />
                    <VideoElement source={"/src/assets/videos/video2.mp4"} classes={"h-[35vh]"} />
                    <VideoElement source={"/src/assets/videos/video3.mp4"} classes={"h-[35vh]"} />
                    <VideoElement source={"/src/assets/videos/video4.mp4"} classes={"h-[35vh]"} />
                </Carousel>

                <Carousel className='w-11/12 h-full mx-auto'>
                    <VideoElement source={"/src/assets/videos/video5.mp4"} classes={"h-[35vh]"} />
                    <VideoElement source={"/src/assets/videos/video6.mp4"} classes={"h-[35vh]"} />
                    <VideoElement source={"/src/assets/videos/video7.mp4"} classes={"h-[35vh]"} />
                </Carousel>
            </div>

        </Container>
    )
}
