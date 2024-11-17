"use client"
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  import Autoplay from "embla-carousel-autoplay"
import { SliderImage } from '@/constans'
import Image from 'next/image'
import ImageWaves from '@/components/ImageWaves'


const Hero = () => {
  return (
    <div className='relative h-[32rem]'>
        <Carousel  
         plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        
        opts={{
            align: "start",
            loop: true,
        }}
       >
            <CarouselContent>
               {SliderImage.map((image, index)=>(
                    <CarouselItem key={index}>
                          <Image 
                          src={image.href} 
                          alt={image.alt} 
                          width={1920} 
                          height={1080}
                          className='h-[32rem] lg:h-[44rem] w-full object-cover brightness-75'
                          />
                          <ImageWaves myclassname='absolute lg:-bottom-3' />
                    </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className='left-0'/>
            <CarouselNext className='right-0'/>
        </Carousel>
    </div>
  )
}

export default Hero