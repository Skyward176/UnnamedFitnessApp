'use client'
import {firebase_app} from '@/config/firebaseInit';
import { getFirestore,getDoc, addDoc, updateDoc, collection} from 'firebase/firestore';

export default function testNewData() {
    const db = getFirestore(firebase_app);

    const runTestCreate = async () => {
        const testDocument = await addDoc(collection(db, 'routines'), {
            weekOrder: [1],
            weeks: {
                1:{
                    weekId: 1,
                    dayOrder: [],
                    days: {
                        1: {
                            dayId: 1,
                            exerciseOrder: [1],
                            exercises: {
                                1: {
                                    exerciseId: 1,
                                    name: 'Bench Press'
                                }
                            }
                        }
                    }
                },
            }
        });
        let data = await (await getDoc(testDocument)).data();
        console.log(data);
    }
    return(
        <>
            <button className = 'text-white' onClick = {runTestCreate}> TestCreation</button>
        </>
    )
}