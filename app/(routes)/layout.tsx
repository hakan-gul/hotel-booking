import React from 'react'

interface RoutesLayoutProps {
    children:React.ReactNode
}
const RoutesLayout = ({children}:RoutesLayoutProps) => {
  return (
    <>
        Navbar
        <div className='min-h-screen'>
            {children}    
        </div>
        Footer
    </>
  )
}

export default RoutesLayout