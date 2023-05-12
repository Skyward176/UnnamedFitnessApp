'use client'
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {getDoc, getFirestore, doc, setDoc} from 'firebase/firestore';
import {firebase_app, auth} from '@/config/firebaseInit';
import {HiPlus, HiOutlineListBullet, HiXMark} from 'react-icons/hi2';
export const metadata = {
    title: 'upLift',
}
export default function Home() {
    //write functions to fetch full user profile
    // consider having a user context that stores al l of this instead
    const [profile, setProfile]= useContext(AuthContext);
    const [fetchedRoutines, setFetchedRoutines] = useState([]);

    const db = getFirestore(firebase_app);

    const unpinHandler = (routineID) => {
        let newData = profile.pinnedRoutines;
        if(newData.includes(routineID)){
            newData = newData.filter(function (pin) {
                    return(pin!=routineID);
            });
            setProfile({...profile,
                       pinnedRoutines:newData
                    });
        }
        setDoc(doc(db, 'users', auth.currentUser.uid), profile)

    }

    if(profile==null) {
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
    } else{
        const routineArr = [];
        profile.pinnedRoutines.forEach(async(routine) => {
            let data = await getDoc(doc(db, 'routines', routine));
            if(data!=null){
                routineArr.push(data);
            } else{
                //logic to remove delted routine from pins here 
            }
            setFetchedRoutines([...routineArr]);
        })
        return (
            <>
                <Navbar />
                <div className = 'w-full flex flex-col text-xl md:text-4xl font-sans font-light text-white items-center'>
                    <div className='flex h-36 justify-center text-center items-center'>
                    <p>Hello, <span className='text-accent-100'>{profile!=null ? profile.name : "User"}</span>! Here are your pinned routines: </p>
                    </div>
                    <div className='flex flex-col w-full justify-center items-center'>

                        {fetchedRoutines.map((routine) => <div key={routine.id} className='border-b border-white h-20 p-4 w-72 md:w-96 lg:w-1/2 flex items-center justify-between'>
                                             <Link href={{pathname:'routine/view',query:{routineID:routine.id}}} 
                                                    className='text-white text-lg md:text-2xl font-sans font-light'>
                                                {routine.data().title}
                                             </Link>
                                             <button onClick={(e) => unpinHandler(routine.id)}>
                                                <HiXMark color = 'red' size='1.5rem'/>
                                             </button>
                                             
                        </div>)}

                    </div>
                    <div className='h-36 flex'>
                        <Link href={{pathname: 'routine/edit', query: {newRoutine: true}}}> 
                            <div className='h-full w-full flex items-center justify-between'>
                                <p className='text-white font-sans text-xl md:text-2xl font-light hover:text-accent-100 mr-2 '>Create a routine</p>
                                <HiPlus color='white' size='2rem'/>
                            </div>
                        </Link>
                    </div>
                    <div className='h-36 flex'>
                        <Link href='routine/list'> 
                            <div className='h-full w-full flex items-center justify-between'>
                                <p className='text-white font-sans text-xl md:text-2xl font-light hover:text-accent-100 mr-2'>View My Routines</p>
                                <HiOutlineListBullet color='white' size='2rem'/>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        )

    }
}
