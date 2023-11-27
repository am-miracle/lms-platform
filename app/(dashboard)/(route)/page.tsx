import Logout from "@/app/(auth)/(routes)/logout/Logout";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <section className='text-sky-600'>
      <UserButton
        afterSignOutUrl="/"
      />
      <Logout />
    </section>
  )
}
