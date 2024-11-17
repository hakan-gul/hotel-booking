"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

interface ImageWavesProps {
    myclassname?: string
}
const ImageWaves = ({myclassname}: ImageWavesProps) => {

    const {theme} = useTheme();
    const [clientSideRendered, setClientSideRendered] = useState(false);
    useEffect(() =>{
        setClientSideRendered(true);
    }, [])
    if(!clientSideRendered){
        return null;
    }
  return (
    <>
    {theme === "light" && (
        <Image 
        src="/white.png" 
        alt="waves" 
        width={2000} 
        height={62} 
        className={`w-full lg:block ${myclassname}`}
        />
    )}

    {theme === "dark" && (
        <Image 
        src="/dark.png" 
        alt="waves" 
        width={2000} 
        height={62} 
        className={`w-full lg:block ${myclassname}`}
        />
    )}
        
    </>
  )
}

export default ImageWaves