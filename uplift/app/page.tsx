import Link from 'next/link';
import Navbar from '../components/Navbar'
export const metadata = {
    title: 'upLift',
}
export default function Home() {
    return (
        <>
            <div className = 'h-100%'>
                <Navbar />
                <p className='text-lg text-white'>Hi, mom!</p>
                <Link href='auth/signin' > <p className='text-white font-sans text-lg hover:text-accent-100'>Sign in.</p> </Link>
                <Link href='RoutineEditor' > <p className='text-white font-sans text-lg hover:text-accent-100'>Create a routine</p> </Link>
            </div>
        </>
    )
}
