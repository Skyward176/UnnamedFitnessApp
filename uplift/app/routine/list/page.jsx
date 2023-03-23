'use client'
import Navbar from '@/components/Navbar'
import { collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {firebase_app, auth} from '@/config/firebaseInit'
import { useEffect, useState} from 'react';
import {AiFillEdit} from 'react-icons/Ai';
import Link from 'next/link';
export default function Routines (){
    const [routines, setRoutines] = useState([]);
    useEffect(() => {
        const db = getFirestore(firebase_app)
        const getAllRoutines = async () => {
            const routinesRef = collection(db, 'routines');
            const q = query(routinesRef, where('uid', '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(q);
            let routineArr = [];

            querySnapshot.forEach((doc) => {
                routineArr.push(doc);
                console.log(doc.id, ' = > ', doc.data());
            });
            console.log(routineArr);
            setRoutines(routineArr);
            console.log(routines);
        }
        getAllRoutines();
        console.log(routines);
    }, [])
    return(
        <div className='overflow-hidden h-full'>
            <Navbar/>
            <div className='w-full flex justify-center items-center h-full'>
                <div className = 'flex flex-col justify-center items-center'>
                    {routines.map((doc)=> <div key={doc.id} className='border-b border-white h-20 p-4 w-96 flex items-center justify-between'>
                                    <Link href={{pathname:'routine/view',query:{routineID:doc.id}}} className='text-white text-2xl font-sans font-light'>{doc.data().title}</Link>
                                    <Link href={{pathname:'routine/edit',query:{newRoutine:false, routineID:doc.id}}} className='text-white text-2xl font-sans font-light'><AiFillEdit color='white' size = '1.75rem' /></Link>
                                </div>)}

                </div>

            </div>
        </div>
    )
}
