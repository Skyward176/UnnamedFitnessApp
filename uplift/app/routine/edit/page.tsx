'use client'
import Navbar from '@/components/Navbar';
import Week from './Week';
import DescriptionForm from './DescriptionForm';
import {useState, useEffect} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, collection,getDoc,deleteDoc,doc, addDoc, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation'
export default function RoutineEditor() {

    // state variables
    const [routineData, setRoutineData] = useState({
        title: '',
        description: ''
    });
    const [docRef, setDocRef] = useState();

    const [weeks, setWeeks] = useState([]); // local state of the weeks array
    
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
        setRoutineData({ // save basic routine details to state
            title: currentData.title,
            description: currentData.description
        });
        // save weeks array to state
        setWeeks(currentData.weeks);
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
                                    title: "",
                                    sets: 0,
                                    reps: 0
                                }
                            ]
                        }
                    ]
                }
            let newWeeks = [...weeks, newWeek]
            setWeeks(newWeeks);
            await updateDoc(docRef, {
                weeks: newWeeks
            })
        }
        console.log("Create Week Fired");
        createWeek(docRef);
    }
    const deleteWeek = (docRef, data) => {
        const removeWeek = async () => {
            let newWeeks = weeks.filter(function (week) {
                return(week!=data);
            });
            setWeeks(newWeeks);
            await updateDoc(docRef, {
                weeks: newWeeks
            })
        }
        removeWeek();
        getDoc(docRef).then((data)=>console.log(data.data().weeks))
    }
    return(
        <div className='flex flex-col flex-wrap h-full w-full'>
                <Navbar />
                <div className='w-screen grow flex lg:flex-row flex-col text-white '>
                    <div className='flex flex-col justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2 border-b border-b-white lg:border-b-0 lg:border-r lg:border-r-white'>
                        {weeks.map((week, i) => <div className='h-full p-4 block w-full'>
                                                <Week routineRef ={docRef} weekCount={weeks.length} deleteWeek={deleteWeek} newWeekHandler={newWeekHandler} data={week} key={i}/>
                                                </div>)}
                    </div>
                    <div className='flex justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2'>
                        <div className='h-full p-4 block w-full'>
                            <DescriptionForm saveFunction={saveDetails} title={routineData.title} changeTitle={changeTitle} changeDescription={changeDescription} description={routineData.description}/>
                        </div>
                    </div>
                </div>
        </div>
    );
}
