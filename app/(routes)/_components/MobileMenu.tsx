import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { AlignJustify } from 'lucide-react'
import { NavMenu } from '@/constans'
import NavItem from './NavItem'

const MobileMenu = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <AlignJustify />
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription asChild >
                    <div className='flex flex-col text-xl mt-8 lg:hidden items-center justify-center ml-auto gap-9 w-full' >
                        {NavMenu.map((item, index)=>(
                            <NavItem key={index} title={item.title} url={item.url}/>
                        ))}
                    </div>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
  )
}

export default MobileMenu