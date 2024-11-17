"use client"
import React from 'react'
import Image from 'next/image'
import { ModeToggle } from '@/components/ModeToggle'
import UserToggle from './UserToggle'
import MobileMenu from './MobileMenu'
import { NavMenu } from '@/constans'
import NavItem from './NavItem'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);
  return (
    <div className={`w-full z-20 items-center ${pathname != '/'? 'bg-mydark2' : 'fixed'}`}>
        <div className='container'>
            <div className='px-4 py-6 flex flex-row items-center justify-center'>
                <div className='w-24 py-4 px-3 rounded-xl bg-white'>
                    <Image 
                    src="/logo.png"
                    alt="logo"
                    width={500}
                    height={500}
                    className='w-full'
                    />
                </div>
                <div className='flex-row lg:flex hidden items-center gap-9 ml-auto text-white'>
                    {NavMenu.map((item, index)=>(
                        <NavItem key={index} title={item.title} url={item.url}/>
                    ))}
                </div>
                <div className='flex lg:flex items-center ml-auto gap-2'>
                    <UserToggle />
                    <ModeToggle />
                    <div className='lg:hidden flex flex-row items-center ml-auto gap-2'>
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar