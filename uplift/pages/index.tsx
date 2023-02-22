import Link from 'next/link';
import Navbar from '../components/Navbar'
export const metadata = {
  title: 'upLift',
}
export default function Home() {
  return (
    <>
      <Navbar />
      <p className='text-lg text-red-500'>Hi, mom!</p>
      <Link href='auth/signin'> Sign in. </Link>
    </>
  )
}
