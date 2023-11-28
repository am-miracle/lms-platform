import Image from 'next/image'

const Logo = () => {
  return (
    <Image
      src="/assets/logo.svg"
      alt="logo"
      height={130}
      width={130}
    />
  )
}

export default Logo