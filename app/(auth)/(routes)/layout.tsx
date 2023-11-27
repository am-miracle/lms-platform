import React from 'react'

type TProps = {
    children: React.ReactNode
}

const AuthLayout = ({children}: TProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
        {children}
    </div>
  )
}

export default AuthLayout