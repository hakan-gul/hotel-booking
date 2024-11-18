import ImageWaves from '@/components/ImageWaves'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, PhoneIcon, PinIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='relative text-white'>
        <div className='z-10 absolute inset-0'>
            <ImageWaves myclassname='absolute -top-5 transform rotate-180'/>
        </div>
        <div className='z-0 absolute inset-0'>
            <div className='h-full w-full bg-cover bg-center' style={{backgroundImage:'url(/slider/1.jpg)'}}></div>
            <div className="absolute inset-0 bg-black opacity-75">

            </div>
        </div>
        <div className='z-20 relative'>
            <div className='container mx-auto pt-24 pb-16 px-4'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl font-bold'>Subscribe newsletter</h2>
                    <p className='text-gray*400 mt-2'>Get the latest news and updates</p>
                    <div className='mt-4 flex justify-center ml-auto'>
                        <Input placeholder='Enter your email' type='email' className='max-w-lg'/>
                        <Button variant="mybutton">Subscribe</Button>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div>
                        <div className='w-24 py-4 px-3 rounded-xl bg-white'>
                            <Image 
                            src="/logo.png"
                            alt="logo"
                            width={500}
                            height={500}
                            className='w-full'
                            />
                        </div>
                        <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ad, laborum ea ipsa totam natus nostrum quibusdam numquam deleniti officia libero quisquam porro maxime, aspernatur sed doloremque veritatis</p>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-4'>Rooms</h3>
                        <ul className='space-y-2'>
                            <li className='text-gray-400'>Hotel One Suite Turkey Antalya Lux Spa Welness</li>
                            <li className='text-gray-400'>Hotel One Suite Turkey Antalya Lux Spa Welness</li>
                            <li className='text-gray-400'>Hotel One Suite Turkey Antalya Lux Spa Welness</li>
                            <li className='text-gray-400'>Hotel One Suite Turkey Antalya Lux Spa Welness</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-4'>Contact</h3>
                        <p className='text-gray-400 space-y-2'>
                            <span className='flex'><PinIcon className='me-2 ' width={21} height={21}/> Turkey Antalya</span>
                            <span className='flex'> <PhoneIcon className='me-2'  width={21} height={21}/> +90 123 456 78 90 </span>
                            <span className='flex'><Mail className='me-2'  width={21} height={21}/> info@hotelsantalya.com</span>
                        </p>
                    </div>

                </div>
                <div className='flex text-center justify-center mt-10'>
                    <p>Designed by <span className='text-mylight2 font-bold'>Hakan Gül</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer