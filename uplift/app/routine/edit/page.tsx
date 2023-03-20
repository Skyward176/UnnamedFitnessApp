'use client'
import Navbar from '@/components/Navbar';
import Week from './Week';
import DescriptionForm from './DescriptionForm';
import {useState, useEffect} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, collection,getDoc,deleteDoc,doc, addDoc, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation'
import {RoutineContext} from '@/context/RoutineContext';

export default function RoutineEditor() {

    // state variables
    const [routineData, setRoutineData] = useState({
        uid: 0,
        title: "",
        description: "",
        weeks: [{
            title: "",
            days: [{
                title: "",
                exercises: [{
                    name: "",
                    sets: 0,
                    reps: 0
                }],
            }],
        }],
    });
    const [docRef, setDocRef] = useState();

    
    // db ref
    const db = getFirestore(firebase_app);

    // router
    const router = useRouter();
    // parameters to control creation of routine
    const searchParams = useSearchParams();

    // routine creation function
    const createRoutine = async (db) => {
        const newRoutine = await addDoc(collection(db, 'routines'), {
            uid: auth.currentUser.uid,
            title: "",
            description: "",
            weeks: [{
                title: 'Week 1',
                days: [{
                    title: 'Day 1',
                    exercises: [{
                        exerciseId: 1,
                        name: 'Bench Press',
                        sets: 0,
                        reps: 0
                    }],
                }],
            }],
        });
        console.log("Created new routine");
        //save docref to state
        setDocRef(newRoutine);
        let currentData = await getDoc(newRoutine);
        currentData = currentData.data();
        setRoutineData({
            uid: currentData.uid,
            title: currentData.title,
            description: currentData.description,
            weeks: currentData.weeks
        });
    }

    // on page load, check params to determine creation of new routine, else grab routine reference passed through params
    // use
    useEffect(() => {
        if(searchParams.get('newRoutine')) {
            createRoutine(db).catch(console.error);
            router.push('routine/edit', undefined,{shallow: true})
        }
    }, []);

    const saveDetails = (e) => {
        console.log("Save attempted for docref" + docRef);
        updateDoc(docRef, routineData);
    }
    
    const changeTitle = (e) => {
        console.log(e.target.value);
        routineData.title=e.target.value; 
    }
    const changeDescription = (e) => {
        routineData.description=e.target.value; 
    }
    const newWeekHandler = () => {
        const createWeek= async (docRef) => {
            const newWeek = {
                    title:"newWeek",
                    days: [{
                            title: "newDay",
                            exercises: [{
                                    name: "",
                                    sets: 0,
                                    reps: 0
                                }
                            ]
                        }
                    ]
                }
            let newWeeks = [...routineData.weeks, newWeek]
            await updateDoc(docRef, {
                weeks: newWeeks
            })
            setRoutineData({
                ...routineData,
                weeks:newWeeks
            });
        }
        console.log("Create Week Fired");
        createWeek(docRef);
    }
    const deleteWeek = (docRef, data) => {
        const removeWeek = async () => {
            let newWeeks = routineData.weeks.filter(function (week) {
                return(week!=data);
            });
            setRoutineData({
                ...routineData,
                weeks:newWeeks
            });
            await updateDoc(docRef, {
                weeks: newWeeks
            })
        }
        removeWeek();
        getDoc(docRef).then((data) => {setRoutineData(data.data()); console.log(data.data())})
    }
    return(
        <div className='flex flex-col flex-wrap h-full w-full overflow-hidden'>
                <Navbar />
                <RoutineContext.Provider value={[routineData, setRoutineData]}>
                    <div className='w-screen grow flex lg:flex-row flex-col text-white '>
                        <div className='flex flex-col justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2 border-b border-b-white lg:border-b-0 lg:border-r lg:border-r-white'>
                            {routineData.weeks.map((week, i) => <div className='h-full p-4 block w-full'>
                                                    <Week index={i} routineRef ={docRef} weekCount={routineData.weeks.length} deleteWeek={deleteWeek} newWeekHandler={newWeekHandler} data={week} key={week}/>
                                                    </div>)}
                        </div>
                        <div className='flex justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2'>
                            <div className='h-full p-4 block w-full'>
                                <DescriptionForm saveFunction={saveDetails} title={routineData.title} changeTitle={changeTitle} changeDescription={changeDescription} description={routineData.description}/>
                            </div>
                        </div>
                    </div>
                </RoutineContext.Provider>
        </div>
    );
}
