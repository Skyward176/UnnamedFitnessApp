import Link from 'next/link';
import Navbar from '../components/Navbar';
import {HiPlus} from 'react-icons/Hi2';
export const metadata = {
    title: 'upLift',
}
export default function Home() {
    //write functions to fetch full user profile
    // consider having a user context that stores al l of this instead
    return (
        <>
            <Navbar />
            <div className = 'w-full h-full flex flex-col text-4xl font-sans font-light text-white items-center'>
                <div className='flex h-36 justify-center items-center'>
                    <p>Hello, <span className='text-accent-100'>User</span>! Here are your pinned routines: </p>
                </div>
                <div className='flex flex-col'>
                {/*map the saved routines part of the user profile here*/}
                </div>
                <div className='h-36 flex'>
                    <Link href={{pathname: 'routine/edit', query: {newRoutine: true}}}> 
                        <div className='h-full w-full flex items-center justify-between'>
                            <p className='text-white font-sans text-2xl font-light hover:text-accent-100'>Create a routine</p>
                            <HiPlus color='white' size='1.75rem'/>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
