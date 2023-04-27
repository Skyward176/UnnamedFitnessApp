'use client'
import Navbar from '@/components/Navbar';
import Week from './Week';
import Description from './Description';
import { useState, useEffect } from 'react';
import { firebase_app, auth } from '@/config/firebaseInit';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import { RoutineContext } from '@/context/RoutineContext';
import ReviewForm from '@/components/ReviewForm';

export default function RoutineView({ docId }) {

    // state variables
    const [routineData, setRoutineData] = useState({
        uid: 0,
        title: "",
        description: "",
        weeks: [{
            title: "",
            wuid: "",
            days: [{
                title: "",
                duid: "",
                exercises: [{
                    eid: "",
                    name: "",
                    sets: 0,
                    reps: 0
                }],
            }],
        }],
        tags: []
    });
    const [docRef, setDocRef] = useState();


    // db ref
    const db = getFirestore(firebase_app);


    useEffect(() => {
        const docRef = doc(db, 'routines', docId);
        setDocRef(docRef);
        const hydrateData = async (docRef) => {
            const data = await getDoc(docRef);
            setRoutineData(data.data());
        }
        hydrateData(docRef);
    }, [docId]);

    return (
        <div className='flex flex-col flex-wrap h-full w-full overflow-hidden'>
            <RoutineContext.Provider value={[routineData, setRoutineData]}>
                <div className='w-full h-full flex flex-col text-white '>
                    <div className='flex justify-center items-center lg:w-full lg:h-1/3 w-full h-1/2'>
                        <div className='h-full p-4 block w-full'>
                            <Description tags={routineData.tags} title={routineData.title} description={routineData.description} />
                        </div>
                    </div>
                    <div className='flex overflow-y-scroll flex-col justify-center items-center lg:w-full lg:h-2/3 w-full h-1/2 border-t border-t-white lg:border-b-0 lg:border-t lg:border-r-white'>
                        {routineData.weeks.map((week, i) => <div className='h-full p-4 block w-full'>
                            <Week index={i} data={week} key={week.wuid} />
                        </div>)}
                    </div>
                    <ReviewForm routineId={docRef} />
                </div>

            </RoutineContext.Provider>
        </div>
    );
}
