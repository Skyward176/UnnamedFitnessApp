'use client'
import Link from 'next/link';
import Navbar from '../components/Navbar';
import {HiPlus} from 'react-icons/Hi2';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {getDoc, getFirestore, doc} from 'firebase/firestore';
import {firebase_app} from '@/config/firebaseInit';
export const metadata = {
    title: 'upLift',
}
export default function Home() {
    //write functions to fetch full user profile
    // consider having a user context that stores al l of this instead
    const [profile, setProfile]= useContext(AuthContext);
    const [fetchedRoutines, setFetchedRoutines] = useState([]);
    useEffect(() => {
        const db = getFirestore(firebase_app);
        let routineArr = [];
        profile.pinnedRoutines.forEach(async(routine) => {
            let data = await getDoc(doc(db, 'routines', routine));
            routineArr.push(data);
            setFetchedRoutines([...routineArr]);
        })
        console.log('useeffect run')
    },[profile])
    return (
        <>
            <Navbar />
            <div className = 'w-full flex flex-col text-xl md:text-4xl font-sans font-light text-white items-center'>
                <div className='flex h-36 justify-center text-center items-center'>
        <p>Hello, <span className='text-accent-100'>{profile.name}</span>! Here are your pinned routines: </p>
                </div>
                <div className='flex flex-col w-full justify-center items-center'>

                    {fetchedRoutines.map((routine) => <div key={routine.id} className='border-b border-white h-20 p-4 w-72 md:w-96 lg:w-1/2 flex items-center justify-between'>
                                    <Link href={{pathname:'routine/view',query:{routineID:routine.id}}} className='text-white text-2xl font-sans font-light'>{routine.data().title}</Link>
                    </div>)}

                </div>
                <div className='h-36 flex'>
                    <Link href={{pathname: 'routine/edit', query: {newRoutine: true}}}> 
                        <div className='h-full w-full flex items-center justify-between'>
                            <p className='text-white font-sans text-xl md:text-2xl font-light hover:text-accent-100'>Create a routine</p>
                            <HiPlus color='white' size='1.75rem'/>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
