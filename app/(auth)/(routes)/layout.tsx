import ToastProvider from '@/components/providers/ToastProvider'

type TProps = {
    children: React.ReactNode
}

const AuthLayout = ({children}: TProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ToastProvider />
        {children}
    </div>
  )
}

export default AuthLayout