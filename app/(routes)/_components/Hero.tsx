"use client"
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

 import Autoplay from "embla-carousel-autoplay"
import { apiImagesUrl } from '@/constans'
import Image from 'next/image'
import ImageWaves from '@/components/ImageWaves'
import HeroForm from './HeroForm'
import { get } from 'http'
import { getSlider } from '@/actions/getSlider'
import { RecordModel } from 'pocketbase'
import { Skeleton } from '@/components/ui/skeleton'


const Hero = () => {

  
  const [SliderImages, setSliderImages] = useState<RecordModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
      async function fetchSlider(){
      try {
        const images = await getSlider();
        setSliderImages(images);
        console.log('Slider Images:', images)

      } catch (error) {
        console.log('Error getting slider images:', error)
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchSlider();
  },[])

  if(isLoading){
    return(
      <div className='relative h-[32rem]'>
        <div className='h-[32rem] lg:h-[44rem] w-full'>
          <Skeleton  className='h-full w-full bg-slate-600'/>
        </div>
        <HeroForm />

      </div>
    )
    
  }
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
               {SliderImages.map((data, index)=>(
                    <CarouselItem key={index}>
                          <Image 
                          src={`${apiImagesUrl}/${data.collectionId}/${data.id}/${data.image}`} 
                          alt={data.alt} 
                          width={1920} 
                          height={1080}
                          className='h-[32rem] lg:h-[44rem] w-full object-cover brightness-75'
                          />
                          <ImageWaves myclassname='absolute lg:-bottom-3' />
                    </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className='left-1 top-52 md:top-1/2'/>
            <CarouselNext className='right-1 top-52 md:top-1/2'/>
        </Carousel>
        <HeroForm />
    </div>

  )
}

export default Hero