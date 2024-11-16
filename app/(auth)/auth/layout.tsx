import React from 'react'

interface AuthLayoutProps {
    children:React.ReactNode
}
const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div>
        header
        {children}
        footer
    </div>
  )
}

export default AuthLayout