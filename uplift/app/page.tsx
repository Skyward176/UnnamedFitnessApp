'use client'
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {HiPlus} from 'react-icons/Hi2';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {getDoc, getFirestore, doc} from 'firebase/firestore';
import {firebase_app} from '@/config/firebaseInit';
import {useRouter} from 'next/navigation';
export const metadata = {
    title: 'upLift',
}
export default function Home() {
    //write functions to fetch full user profile
    // consider having a user context that stores al l of this instead
    const [profile, setProfile]= useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        if(profile!=null) {
            router.push('/home')
        }
        console.log('useeffect run')
    },[profile, router])
    return (
        <>
            <Navbar />
            <div className = 'w-full flex flex-col items-center text-xl md:text-2xl font-sans font-light text-white'>
                <div className='h-36 flex items-center justify-center text-center'>
                    <h1 className='text-3xl md:text-4xl'> Create, share, and explore workout routines with <span className='text-accent-100'>up</span>Lift! </h1>
                </div>
                <div className='w-1/2 h-0 border border-1 border-white'></div>
                <div className='p-8 flex flex-col md:flex-row'>
                    <div className='w-full md:w-1/2 my-4'>
                        <p>
                            upLift marks the end of the ugly spreadsheets and the endless digging for the right workout routine. On upLift, you can search for whatever you need, whether that's a short, daily calisthenics routine that suits your busy lifestyle or an intense, six day per week weight training regimen. If you have a routine you love, share it with the community with the simple and intuitive routine editor. Look at what others in the community have to say about routines, so that you can decide what's right for you.
                        </p>
                    </div>
                    <div className='text-3xl md:text-4xl w-full md:w-1/2 flex flex-col items-center justify-center my-4'>
                        <Link className='' href='/auth/signup'> Sign <span className='text-accent-100'>up</span> now!</Link>
                        <p className=''> -or-</p>
                        <Link className='' href='/auth/signin'> Sign <span className='text-accent-100'>in</span>!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
