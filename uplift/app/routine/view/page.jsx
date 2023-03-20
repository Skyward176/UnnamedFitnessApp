'use client'
import Navbar from '@/components/Navbar'
import { collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {firebase_app, auth} from '@/config/firebaseInit'
import { useEffect, useState} from 'react';
export default function Routines (){
    const [routines, setRoutines] = useState({});
    useEffect(() => {
        const db = getFirestore(firebase_app)
        const getAllRoutines = async () => {
            const routinesRef = collection(db, 'routines');
            const q = query(routinesRef, where('uid', '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' = > ', doc.data());
            });
            console.log(querySnapshot);
            setRoutines(querySnapshot);
        }
        getAllRoutines();
        console.log(routines);
    }, [])
    return(
        <>
            <Navbar/>
            {Object.entries(routines).map((doc)=> <div className='h-full p-4 block w-full'><p className='text-white'>{doc.id}</p> 
                        </div>)}
        </>
    )
}
