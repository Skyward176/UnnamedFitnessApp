'use client'
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {HiPlus, HiOutlineListBullet, HiXMark} from 'react-icons/hi2';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {getDoc, getFirestore, doc, setDoc} from 'firebase/firestore';
import {firebase_app, auth} from '@/config/firebaseInit';
import {useRouter} from 'next/navigation';
export default function Home() {
    //write functions to fetch full user profile
    // consider having a user context that stores al l of this instead
    const [profile, setProfile]= useContext(AuthContext);
    const [fetchedRoutines, setFetchedRoutines] = useState([]);
    const router = useRouter();
    const unpinHandler = (routineID) => {
        const db = getFirestore(firebase_app);
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
    useEffect(() => {
        const db = getFirestore(firebase_app);
        let routineArr = [];
        if(profile==null) {
            router.push('/')
        } else{
            profile.pinnedRoutines.forEach(async(routine) => {
                let data = await getDoc(doc(db, 'routines', routine));
                if(data!=null){
                    routineArr.push(data);
                } else{
                    //logic to remove delted routine from pins here 
                }
                setFetchedRoutines([...routineArr]);
            })

        }
        console.log('useeffect run')
    },[profile])
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
