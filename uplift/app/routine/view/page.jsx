'use client'
import Navbar from '@/components/Navbar'
import { collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {firebase_app} from '@/config/firebaseInit'
import { useEffect } from 'react';
export default function Routines (){
    useEffect(() => {
        const db = getFirestore(firebase_app)
        const getAllRoutines = async () => {
            console.log('Hello')
            const routinesRef = collection(db, 'routines');
            const q = query(routinesRef, where('title', '==', ''))
            const querySnapshot = await getDocs(q);

            const readIds = async(array) => {
                const readPromises = array.map(id => getDoc(id));
                const result = await Promise.all(readPromises);
                return result.map(doc => doc.data());
            }
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' = > ', doc.data());
            });
        }
        const allRoutines = getAllRoutines();
    }, [])
    return(
        <>
            <Navbar/>
                {allRoutines.map((routine) => <div className='h-full p-4 block w-full'> 
                            </div>)}
        </>
    )
}
