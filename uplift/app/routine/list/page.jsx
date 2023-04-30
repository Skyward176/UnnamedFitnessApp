'use client'
import Navbar from '@/components/Navbar'
import { collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {firebase_app, auth} from '@/config/firebaseInit'
import { useEffect, useState, useContext} from 'react';
import {AiFillEdit, AiFillPushpin } from 'react-icons/ai';
import {HiXMark, HiPlus} from 'react-icons/hi2';
import Link from 'next/link';
import {deleteDoc,doc, setDoc} from 'firebase/firestore';
import {AuthContext} from '@/context/AuthContext';
export default function Routines (){
    const [routines, setRoutines] = useState([]);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const db = getFirestore(firebase_app);
        const routinesRef = collection(db, 'routines');
        const q = query(routinesRef, where('uid', '==', auth.currentUser.uid))
        const querySnapshot = await getDocs(q);
        let routineArr = [];

        querySnapshot.forEach((doc) => {
            routineArr.push(doc);
        });
        setRoutines(routineArr);
    }
    const deleteHandler = (routineID)=> {
        const db = getFirestore(firebase_app);
        deleteDoc(doc(db,'routines', routineID));
        fetchData();

    }

    const [profile, setProfile] = useContext(AuthContext);
    const pinHandler = (routineID) => {
        const db = getFirestore(firebase_app);
        let newData = profile.pinnedRoutines;
        if(!newData.includes(routineID)){
            newData.push(routineID);
        }
        setProfile({...profile,
                   pinnedRoutines:newData
                });
        setDoc(doc(db, 'users', auth.currentUser.uid), profile);
    }
    return(
        <div className='overflow-hidden h-full'>
            <Navbar/>
            <div className='w-full flex justify-center items-center h-full'>
                <div className = 'flex flex-col h-full md:w-96 lg:w-1/2 md:h-3/4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900'>
                    <div className='border-b border-white h-20 p-4 w-72 md:w-96 lg:w-full'>
                        <Link href={{pathname: 'routine/edit', query: {newRoutine: true}}}> 
                            <div className='h-full w-full flex items-center justify-between'>
                                <p className='text-white font-sans text-2xl font-light hover:text-accent-100'>Create a routine</p>
                                <HiPlus color='white' size='1.75rem'/>
                            </div>
                        </Link>
                    </div>
                    {routines.map((doc)=> <div key={doc.id} className='border-b border-white h-20 p-4 w-72 md:w-96 lg:w-full flex items-center justify-between'>
                                    <Link href={{pathname:'routine/view',query:{routineID:doc.id}}} className='text-white text-2xl font-sans font-light'>{doc.data().title}</Link>
                                    <div id='buttonSection' className='flex'>
                                        <Link href={{pathname:'routine/edit',query:{newRoutine:false, routineID:doc.id}}} className='text-white text-2xl font-sans font-light'><AiFillEdit color='white' size = '1.75rem' /></Link>
                                        <button onClick={() => pinHandler(doc.id)}><AiFillPushpin color='white' size='1.75rem'/></button>
                                        <button onClick={() => deleteHandler(doc.id)}><HiXMark color='red' size='1.75rem'/></button>
                                    </div>
                                </div>)}

                </div>

            </div>
        </div>
    )
}
